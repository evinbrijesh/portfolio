import { useState } from 'react'
import { portfolio } from '../data/portfolio'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ProjectDiagram } from './ProjectDiagram'

const CATEGORIES = ['ALL', 'SECURITY', 'AI / ML', 'WEB & CLOUD', 'MOBILE']

// ── Single project card ────────────────────────────────────────────────────
function ProjectCard({ project, index, hoveredSkill, setHoveredSkill }) {
  const [hovered, setHovered] = useState(false)
  const isLink = Boolean(project.url)

  // Check if any tag matches the globally hovered skill
  const isTagMatch = (tag) => {
    if (!hoveredSkill) return false
    const t1 = tag.toLowerCase()
    const t2 = hoveredSkill.toLowerCase()
    return t1.includes(t2) || t2.includes(t1)
  }

  const isProjectSkillMatch = project.tags.some(isTagMatch)

  const isCardActive = hovered || isProjectSkillMatch

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition:  'transform 0.3s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s ease, border-color 0.3s ease',
        transform:   isCardActive ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow:   isCardActive
          ? isProjectSkillMatch
            ? '0 8px 36px rgba(118,170,131,0.18)'
            : '0 12px 36px rgba(118,170,131,0.08)'
          : 'none',
        borderColor: isCardActive
          ? isProjectSkillMatch
            ? 'rgba(118,170,131,0.7)'
            : 'rgba(118,170,131,0.35)'
          : 'rgba(42,42,42,1)',
      }}
      className="grid grid-cols-1 lg:grid-cols-2 border rounded-sm overflow-hidden"
    >
      {/* ── LEFT: Architecture diagram ── */}
      <div className="relative bg-surface-low border-b lg:border-b-0 lg:border-r border-[#2A2A2A] flex items-center justify-center p-6 min-h-[200px] lg:min-h-[240px]">
        {/* HUD corner ticks */}
        <span className="absolute top-0 left-0  w-3 h-3 border-t border-l border-accent-green/20 pointer-events-none" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent-green/20 pointer-events-none" />
        <span className="absolute bottom-0 left-0  w-3 h-3 border-b border-l border-accent-green/20 pointer-events-none" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent-green/20 pointer-events-none" />

        <div className="w-full max-w-md">
          <ProjectDiagram name={project.name} isHovered={isCardActive} />
        </div>
      </div>

      {/* ── RIGHT: Content ── */}
      <div className="flex flex-col justify-between p-8 lg:p-10">
        <div>
          {/* Index + category */}
          <span className="font-headline text-[0.625rem] uppercase tracking-[0.4em] text-accent-green mb-4 block flex items-center justify-between">
            <span>{String(index + 1).padStart(2, '0')} / {project.type}</span>
            {isProjectSkillMatch && (
              <span className="text-amber font-mono text-[9px] tracking-widest animate-pulse-dot">
                [ MATCH: {hoveredSkill.toUpperCase()} ]
              </span>
            )}
          </span>

          {/* Project name */}
          <h3
            className="font-headline font-bold text-text-primary mb-4 leading-none"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            {project.name}
          </h3>

          {/* Description */}
          <p className="font-body text-sm text-text-muted leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tag pills */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => {
              const activeTag = isTagMatch(tag)
              return (
                <span
                  key={tag}
                  onMouseEnter={() => setHoveredSkill?.(tag)}
                  onMouseLeave={() => setHoveredSkill?.(null)}
                  className={`px-2.5 py-1 text-xs font-headline tracking-wider rounded-[0.125rem] transition-all duration-200 cursor-pointer ${
                    activeTag
                      ? 'bg-accent-green text-bg font-bold shadow-[0_0_10px_rgba(118,170,131,0.4)] scale-105'
                      : 'bg-surface-high text-text-muted hover:text-accent-green hover:bg-surface-bright'
                  }`}
                >
                  {tag}
                </span>
              )
            })}
          </div>
        </div>

        {/* Footer: year + status + optional link */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#2A2A2A]">
          <div className="font-headline text-[0.625rem] tracking-widest text-text-dim flex items-center gap-3">
            <span>{project.year}</span>
            {project.status === 'ONGOING' && (
              <span className="text-accent-green">[ ONGOING ]</span>
            )}
          </div>

          {isLink && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-headline text-[0.625rem] uppercase tracking-[0.3em] text-text-dim hover:text-accent-green transition-colors duration-300"
            >
              <span>VIEW</span>
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
function Projects({ hoveredSkill, setHoveredSkill }) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const ref = useScrollReveal(0.05)

  // Filter projects by category
  const filteredProjects = portfolio.projects.filter(project => {
    if (activeCategory === 'ALL') return true
    const type = project.type.toUpperCase()
    if (activeCategory === 'SECURITY') return type.includes('SECURITY')
    if (activeCategory === 'AI / ML') return type.includes('AI') || type.includes('ML')
    if (activeCategory === 'WEB & CLOUD') return type.includes('WEB') || type.includes('CLOUD')
    if (activeCategory === 'MOBILE') return type.includes('MOBILE')
    return true
  })

  return (
    <section className="max-w-screen-2xl mx-auto px-8 md:px-12 mb-24 lg:mb-32">
      <div ref={ref} className="reveal">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="block font-headline text-[0.625rem] uppercase tracking-[0.4em] text-accent-green mb-3">
              PORTFOLIO
            </span>
            <h2 className="font-headline text-4xl font-bold tracking-tighter text-text-primary">
              TECHNICAL_WORKS
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-headline tracking-wider rounded-[0.125rem] transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-accent-green text-bg border-accent-green font-semibold'
                    : 'bg-transparent text-text-muted border-surface-high hover:border-text-dim hover:text-text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects