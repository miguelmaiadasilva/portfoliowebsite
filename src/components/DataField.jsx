import { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * DataField — an immersive 3D point cloud behind the hero.
 *
 * A grid of data points drifting on a layered sine wave, reacting to the
 * cursor. Most points are charcoal/muted; a minority are terracotta accents.
 * Depth fog blends far points into the sand background so the field reads as
 * atmosphere, not a foreground object. Thematically: a data analyst's hero,
 * literally built from data points.
 */

// Brand colors as linear-ish RGB (sRGB values are fine here; three handles it).
const SAND = new THREE.Color('#F7F5F1')
const CHARCOAL = new THREE.Color('#2A2521')
const MUTED = new THREE.Color('#8A7F77')
const TERRA = new THREE.Color('#C25A35')

const COLS = 110
const ROWS = 64
const SPACING = 0.42

function buildGeometry() {
  const count = COLS * ROWS
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const seeds = new Float32Array(count)

  let i = 0
  const c = new THREE.Color()
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      const px = (x - (COLS - 1) / 2) * SPACING
      const py = (y - (ROWS - 1) / 2) * SPACING
      positions[i * 3] = px
      positions[i * 3 + 1] = py
      positions[i * 3 + 2] = 0

      // ~20% terracotta accents, clustered slightly via a cheap hash so they
      // don't read as uniform noise; the rest fade charcoal -> muted by depth.
      const hash = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
      const r = hash - Math.floor(hash)
      if (r < 0.2) {
        c.copy(TERRA)
      } else {
        c.copy(CHARCOAL).lerp(MUTED, r)
      }
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      seeds[i] = r
      i++
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  return geo
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vFog;

  void main() {
    vColor = color;

    vec3 p = position;

    // Layered traveling wave — the "surface" the data sits on.
    float w = sin(p.x * 0.35 + uTime * 0.6) * cos(p.y * 0.4 + uTime * 0.45);
    w += 0.6 * sin((p.x + p.y) * 0.22 - uTime * 0.7);
    p.z += w * 1.5;

    // Per-point shimmer so the field never feels rigidly gridded.
    p.z += sin(uTime * 1.2 + aSeed * 30.0) * 0.25;

    // Cursor ripple — points lift toward a soft well that follows the mouse.
    vec2 m = uMouse * vec2(COLS_HALF, ROWS_HALF);
    float d = distance(p.xy, m);
    p.z += exp(-d * 0.16) * 2.2;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float depth = -mv.z;

    // Fog: far points dissolve into the sand background.
    vFog = 1.0 - smoothstep(8.0, 22.0, depth);

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (10.0 / depth);
    // Terracotta points (warmer color) sit slightly larger to read as accents.
    gl_PointSize *= 1.0 + step(0.55, vColor.r) * 0.7;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uSand;
  varying vec3 vColor;
  varying float vFog;

  void main() {
    // Round, soft-edged points.
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    float alpha = smoothstep(0.5, 0.18, dist);
    if (alpha < 0.01) discard;

    vec3 col = mix(uSand, vColor, vFog);
    gl_FragColor = vec4(col, alpha * (0.35 + vFog * 0.65));
  }
`

function Field({ reducedMotion }) {
  const matRef = useRef()
  const pointsRef = useRef()
  const { size } = useThree()
  const mouse = useRef(new THREE.Vector2(0, 0))
  const target = useRef(new THREE.Vector2(0, 0))

  const geometry = useMemo(buildGeometry, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 11.0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSand: { value: SAND },
    }),
    []
  )

  useEffect(() => {
    if (reducedMotion) return
    const onMove = (e) => {
      target.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      )
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion])

  useFrame((state, delta) => {
    if (!matRef.current) return
    if (reducedMotion) {
      // Render a single composed frame, no time advance.
      matRef.current.uniforms.uTime.value = 1.2
      return
    }
    matRef.current.uniforms.uTime.value += delta

    // Ease mouse toward target.
    mouse.current.lerp(target.current, Math.min(1, delta * 3))
    matRef.current.uniforms.uMouse.value.copy(mouse.current)

    // Gentle parallax tilt of the whole field.
    if (pointsRef.current) {
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        -0.9 + mouse.current.y * 0.12,
        Math.min(1, delta * 2)
      )
      pointsRef.current.rotation.z = THREE.MathUtils.lerp(
        pointsRef.current.rotation.z,
        mouse.current.x * 0.1,
        Math.min(1, delta * 2)
      )
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry} rotation={[-0.9, 0, 0]}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader
          .replace('COLS_HALF', ((COLS * SPACING) / 2).toFixed(3))
          .replace('ROWS_HALF', ((ROWS * SPACING) / 2).toFixed(3))}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        vertexColors
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

export default function DataField() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <Canvas
      className="!absolute inset-0"
      style={{ pointerEvents: 'none' }}
      camera={{ position: [0, 0, 13], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={reducedMotion ? 'demand' : 'always'}
      aria-hidden="true"
    >
      <Field reducedMotion={reducedMotion} />
    </Canvas>
  )
}
