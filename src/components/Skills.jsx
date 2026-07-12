import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionLabel from './SectionLabel.jsx'

const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', devicon: 'devicon-python-plain colored' },
      { name: 'SQL', devicon: 'devicon-postgresql-plain colored' },
      { name: 'DAX', abbr: 'DAX', color: '#C25A35', bg: '#F5EDE8' },
    ],
  },
  {
    category: 'BI & Visualisation',
    skills: [
      { name: 'Power BI', svg: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="14" width="4" height="8" rx="1" fill="#F2C811"/><rect x="8" y="9" width="4" height="13" rx="1" fill="#F2C811" opacity="0.8"/><rect x="14" y="4" width="4" height="18" rx="1" fill="#F2C811" opacity="0.6"/><rect x="20" y="7" width="2" height="15" rx="1" fill="#F2C811" opacity="0.4"/></svg>' },
      { name: 'Excel', svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="3" fill="#217346"/><text x="12" y="17" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#fff">X</text></svg>' },
      { name: 'matplotlib', devicon: 'devicon-matplotlib-plain colored' },
      { name: 'seaborn', abbr: 'SB', color: '#444876', bg: '#E9EAF2' },
    ],
  },
  {
    category: 'Libraries',
    skills: [
      { name: 'pandas', devicon: 'devicon-pandas-plain colored' },
      { name: 'NumPy', devicon: 'devicon-numpy-plain colored' },
      { name: 'scikit-learn', devicon: 'devicon-scikitlearn-plain colored' },
      { name: 'statsmodels', abbr: 'SM', color: '#1F6FB4', bg: '#E7F0F8' },
      { name: 'Streamlit', svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 19.5h20L12 2z" fill="#FF4B4B"/><path d="M12 8l-5 9.5h10L12 8z" fill="#FF4B4B" opacity="0.6"/></svg>' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', devicon: 'devicon-git-plain colored' },
      { name: 'GitHub', devicon: 'devicon-github-original' },
      { name: 'VS Code', devicon: 'devicon-vscode-plain colored' },
    ],
  },
]

export default function Skills() {
  const headingRef = useScrollReveal()

  return (
    <section id="skills" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div ref={headingRef} className="fade-up mb-14">
          <SectionLabel>Skills</SectionLabel>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mt-4">
            The toolkit.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.category} group={group} delay={i * 90} />
          ))}
        </div>

      </div>
    </section>
  )
}

function SkillGroup({ group, delay }) {
  const ref = useScrollReveal()

  return (
    <div
      ref={ref}
      className="fade-up"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-xs font-semibold text-terra tracking-[0.18em] uppercase pb-4 border-b border-border mb-5">
        {group.category}
      </p>
      <div className="space-y-4">
        {group.skills.map((skill) => (
          <div key={skill.name} className="flex items-center gap-3.5">
            {skill.devicon ? (
              <i className={`${skill.devicon} text-[1.6rem] leading-none`} />
            ) : skill.svg ? (
              <div
                className="w-7 h-7 flex-shrink-0"
                dangerouslySetInnerHTML={{ __html: skill.svg }}
              />
            ) : (
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                style={{ backgroundColor: skill.bg, color: skill.color }}
              >
                {skill.abbr}
              </div>
            )}
            <span className="text-sm font-medium text-charcoal">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
