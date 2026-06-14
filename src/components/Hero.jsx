import { lazy, Suspense } from 'react'

// Lazy so three.js ships as its own chunk and the hero copy paints immediately.
const DataField = lazy(() => import('./DataField.jsx'))

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-sand overflow-hidden">
      {/* Immersive 3D data constellation */}
      <Suspense fallback={null}>
        <DataField />
      </Suspense>

      {/* Legibility veil — keeps the field atmospheric behind the copy */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-sand via-sand/75 to-sand/10 lg:to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-24 lg:py-32">

        {/* Location tag above grid — keeps it from offsetting photo alignment */}
        <p className="text-xs font-medium text-terra tracking-[0.2em] uppercase mb-6">
          Data Analyst · Póvoa de Varzim, Porto, Portugal
        </p>

        <div className="grid lg:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-12 items-start">

          {/* Left — copy */}
          <div className="space-y-8 order-2 lg:order-1">
            <h1 className="font-display text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold text-charcoal leading-[1.04] tracking-tight">
              Checked Out<br />
              of Hotels.<br />
              <span className="text-terra">Checked Into</span><br />
              Data.
            </h1>
            <p className="text-lg text-ink leading-relaxed max-w-md">
              I'm Miguel — a Hotel Front Office Manager turning operational instincts
              into data pipelines. I bring operational intuition and analytical rigour
              to every dataset.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="px-6 py-3 bg-terra text-white rounded-full font-medium text-sm hover:bg-terra-hover transition-colors duration-200"
              >
                View Projects
              </a>
              <a
                href="/Miguel_Maia_da_Silva_CV.pdf"
                download
                className="px-6 py-3 border border-border text-charcoal rounded-full font-medium text-sm hover:border-terra hover:text-terra hover:bg-terra-light transition-all duration-200"
              >
                Download CV ↓
              </a>
            </div>

            <div className="flex items-center gap-6 pt-1">
              <a
                href="https://github.com/miguelmaiadasilva"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ink hover:text-charcoal transition-colors duration-200"
              >
                GitHub ↗
              </a>
              <span className="w-px h-4 bg-border" />
              <a
                href="https://linkedin.com/in/miguelmaiadasilva"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ink hover:text-charcoal transition-colors duration-200"
              >
                LinkedIn ↗
              </a>
              <span className="w-px h-4 bg-border" />
              <a
                href="mailto:miguelmaiadasilva@gmail.com"
                className="text-sm font-medium text-ink hover:text-charcoal transition-colors duration-200"
              >
                Email ↗
              </a>
            </div>
          </div>

          {/* Right — photo
              Height is calculated to match the h1:
                4 lines × font-size × leading-[1.04]
                lg  (text-6xl  = 3.75rem): 4 × 3.75 × 1.04 ≈ 15.6rem → h-[16rem]
                xl  (4.5rem)            : 4 × 4.5  × 1.04 ≈ 18.7rem → h-[19rem]
          */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative w-64 h-80 lg:w-[20rem] lg:h-[26rem] xl:w-[24rem] xl:h-[30rem]">
              {/* Decorative layers */}
              <div className="absolute inset-0 bg-terra-light rounded-2xl rotate-6 scale-95" />
              <div className="absolute inset-0 bg-terra/15 rounded-2xl -rotate-3 scale-[0.97]" />
              {/* Photo */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-charcoal/10">
                <img src="/photo.jpeg" alt="Miguel Maia da Silva" className="w-full h-full object-cover object-[center_15%]" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
