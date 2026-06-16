import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionLabel from './SectionLabel.jsx'

const timeline = [
  {
    year: '2026',
    title: 'Postgraduate, Data Analysis for Business',
    org: 'Polytechnic University of Cávado and Ave (IPCA)',
  },
  {
    year: '2024',
    title: 'BSc Computer Engineering',
    org: 'Universidade Aberta',
    ongoing: true,
  },
  {
    year: '2018',
    title: 'Front Office Manager',
    org: 'Axis Vermar',
  },
  {
    year: '2017',
    title: 'BSc Tourism Management',
    org: 'Polytechnic University of Cávado and Ave (IPCA)',
  },
]

export default function About() {
  const headingRef = useScrollReveal()
  const bodyRef = useScrollReveal()
  const pathRef = useScrollReveal()

  return (
    <section id="about" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div ref={headingRef} className="fade-up">
            <SectionLabel>About</SectionLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mt-4 leading-tight">
              A different kind<br />of data analyst.
            </h2>
          </div>

          <div ref={bodyRef} className="fade-up space-y-5 text-ink leading-relaxed" style={{ transitionDelay: '120ms' }}>
            <p>
              For years I ran the front office of a hotel: coordinating teams,
              resolving guest issues in real time, and keeping operations moving
              through the daily rush. I was already reading occupancy, booking
              patterns, and guest behaviour every shift. I just didn't have the
              tools to formalise it yet.
            </p>
            <p>
              Now I do. A Postgraduate in Data Analysis for Business from IPCA, plus
              a Computer Engineering degree in progress at Universidade Aberta, gave
              me the technical framework to match the operational instinct. I can
              hold a conversation with business stakeholders and with the data, and
              translate cleanly between the two.
            </p>
            <p>
              Working in operations taught me which numbers actually drive a
              decision and which just fill a slide. I build for the first kind.
            </p>
          </div>
        </div>

        {/* The path: education + experience timeline */}
        <div className="mt-20 pt-14 border-t border-border grid lg:grid-cols-[16rem_1fr] gap-x-16 gap-y-10">
          <div ref={pathRef} className="fade-up">
            <h3 className="font-display text-2xl font-bold text-charcoal">The path here</h3>
            <p className="text-sm text-ink mt-3 max-w-xs leading-relaxed">
              From hotel floors to data pipelines, one shift at a time.
            </p>
            <p className="text-sm font-medium text-terra mt-8">
              <span className="font-display text-base">∞</span> coffees consumed along the way
            </p>
          </div>

          <ol className="relative">
            {timeline.map((item, i) => (
              <TimelineItem key={item.year + item.title} item={item} delay={i * 90} last={i === timeline.length - 1} />
            ))}
          </ol>
        </div>

      </div>
    </section>
  )
}

function TimelineItem({ item, delay, last }) {
  const ref = useScrollReveal()

  return (
    <li
      ref={ref}
      className="fade-up relative flex gap-5 sm:gap-8"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="font-display text-lg font-bold text-terra w-12 shrink-0 pt-1 tabular-nums">
        {item.year}
      </span>

      <div className={`relative flex-1 border-l border-border pl-7 ${last ? 'pb-1' : 'pb-9'}`}>
        <span className="absolute -left-[5.5px] top-2 w-2.5 h-2.5 rounded-full bg-terra ring-4 ring-white" />
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-medium text-charcoal">{item.title}</span>
          {item.ongoing && (
            <span className="text-[11px] font-semibold text-terra bg-terra-light px-2 py-0.5 rounded-full">
              In progress
            </span>
          )}
        </p>
        <p className="text-sm text-ink mt-1">{item.org}</p>
      </div>
    </li>
  )
}
