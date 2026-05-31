import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionLabel from './SectionLabel.jsx'

export default function Contact() {
  const ref = useScrollReveal()

  return (
    <section id="contact" className="py-28 lg:py-36 bg-sand">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div ref={ref} className="fade-up max-w-2xl">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mt-4 leading-tight">
            Let's work<br />together.
          </h2>
          <p className="text-ink text-lg mt-6 leading-relaxed">
            I'm actively looking for data analyst roles. Whether you have a project,
            an opportunity, or just want to talk data — reach out.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-10">
            <a
              href="mailto:miguelmaiadasilva@gmail.com"
              className="px-6 py-3 bg-terra text-white rounded-full font-medium text-sm hover:bg-terra-hover transition-colors duration-200 text-center"
            >
              miguelmaiadasilva@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/miguelmaiadasilva"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border text-charcoal rounded-full font-medium text-sm hover:border-terra hover:text-terra hover:bg-terra-light transition-all duration-200 text-center"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/miguelmaiadasilva"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border text-charcoal rounded-full font-medium text-sm hover:border-terra hover:text-terra hover:bg-terra-light transition-all duration-200 text-center"
            >
              GitHub ↗
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs text-ink">
          © {new Date().getFullYear()} Miguel Maia da Silva — Built with React + Tailwind CSS
        </p>
        <p className="text-xs text-ink">Póvoa de Varzim, Portugal</p>
      </div>
    </section>
  )
}
