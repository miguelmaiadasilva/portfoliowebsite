import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionLabel from './SectionLabel.jsx'

const projects = [
  {
    number: '01',
    title: 'Hotel Booking Analytics Dashboard',
    description:
      'Multi-page Power BI dashboard with a star schema data model, 35+ custom DAX measures, and analysis across booking trends, cancellation risk, and revenue optimisation. From raw SQL data to executive-ready insight.',
    tags: ['Power BI', 'SQL', 'DAX', 'Star Schema'],
    links: {
      github: 'https://github.com/miguelmaiadasilva/hotel-booking-analytics-dashboard',
    },
  },
  {
    number: '02',
    title: 'M.A.I.A. — Automated Data Analysis App',
    description:
      'Web application for interactive exploratory data analysis of CSV and Excel files. Upload any dataset and instantly explore distributions, correlations, missing values, and descriptive stats — no code required.',
    tags: ['Python', 'Streamlit', 'pandas', 'EDA'],
    links: {
      github: 'https://github.com/miguelmaiadasilva/maia-data-analysis-app',
      live: 'https://maia-app.streamlit.app/',
    },
  },
  {
    number: '03',
    title: 'Retail Sales Forecasting',
    description:
      'Time series forecasting model for retail sales prediction. Evaluated using MAE, RMSE, and WMAE metrics, with seasonal decomposition and actionable insights for stock planning.',
    tags: ['Python', 'Time Series', 'scikit-learn', 'pandas'],
    links: {
      github: 'https://github.com/miguelmaiadasilva/retail-sales-forecasting-timeseries',
    },
  },
]

export default function Projects() {
  const headingRef = useScrollReveal()

  return (
    <section id="projects" className="py-28 lg:py-36 bg-sand">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div ref={headingRef} className="fade-up mb-14">
          <SectionLabel>Projects</SectionLabel>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mt-4">
            Work that matters.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.number} project={project} delay={i * 110} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ProjectCard({ project, delay }) {
  const ref = useScrollReveal()

  return (
    <div
      ref={ref}
      className="fade-up group bg-white rounded-2xl p-7 border border-border hover:border-terra/25 hover:shadow-xl hover:shadow-terra/6 transition-all duration-300 flex flex-col"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex-1 space-y-4">
        <span className="font-display text-sm font-bold text-terra/40">
          {project.number}
        </span>
        <h3 className="font-display text-xl font-bold text-charcoal leading-snug group-hover:text-terra transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-ink text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-terra-light text-terra text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-5 mt-6 pt-5 border-t border-border">
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-ink hover:text-charcoal transition-colors duration-200"
        >
          GitHub ↗
        </a>
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-terra hover:text-terra-hover transition-colors duration-200"
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  )
}
