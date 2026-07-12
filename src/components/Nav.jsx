import { useEffect, useState } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-0.5 bg-white/85 backdrop-blur-lg border border-border rounded-full px-2 py-1.5 shadow-lg shadow-charcoal/8">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="px-3 sm:px-4 py-1.5 text-sm font-medium text-ink rounded-full hover:bg-terra-light hover:text-terra transition-all duration-200"
          >
            {label}
          </a>
        ))}
        <a
          href="/Miguel_Maia_Silva_cv.pdf"
          download
          className="ml-1.5 px-3 sm:px-4 py-1.5 text-sm font-medium whitespace-nowrap bg-charcoal text-white rounded-full hover:bg-terra transition-colors duration-200"
        >
          CV ↓
        </a>
      </div>
    </nav>
  )
}
