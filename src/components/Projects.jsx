import { useState } from 'react'
import { portfolio } from '../data/portfolio'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ProjectDiagram } from './ProjectDiagram'

const CATEGORIES = ['ALL', 'SECURITY', 'AI / ML', 'GEOSPATIAL']

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

  const handleTagTap = (tag) => {
    const nextTag = hoveredSkill === tag ? null : tag
    setHoveredSkill?.(nextTag)

    // On mobile screens, auto-scroll up to TOOLSET section so user sees matching skill
    if (nextTag && window.innerWidth < 768) {
      setTimeout(() => {
        const skillsEl = document.getElementById('skills')
        if (skillsEl) {
          skillsEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 80)
    }
  }

  return (
    <div
      id={`project-card-${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
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
      className="grid grid-cols-1 lg:grid-cols-2 border rounded-sm overflow-hidden bg-[#131313]/90"
    >
      {/* ── LEFT: Custom Interactive SVG Architecture Diagram ── */}
      <div
        className="relative bg-surface-low/60 flex items-center justify-center p-6 lg:p-8 min-h-[220px] lg:min-h-[260px] border-b lg:border-b-0 lg:border-r border-[#2A2A2A] overflow-hidden"
      >
        {/* Subtle grid background texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #76AA83 1px, transparent 1px)',
            backgroundSize:  '16px 16px',
          }}
        />

        {/* Corner marks */}
        <span className="absolute top-0 left-0   w-3 h-3 border-t border-l border-accent-green/20 pointer-events-none" />
        <span className="absolute top-0 right-0  w-3 h-3 border-t border-r border-accent-green/20 pointer-events-none" />
        <span className="absolute bottom-0 left-0  w-3 h-3 border-b border-l border-accent-green/20 pointer-events-none" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent-green/20 pointer-events-none" />

        <div className="w-full max-w-md">
          <ProjectDiagram name={project.name} isHovered={isCardActive} />
        </div>
      </div>

      {/* ── RIGHT: Content ── */}
      <div className="flex flex-col justify-between p-8 lg:p-10">
        <div>
          {/* Index + Category + Stamp */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="font-headline text-[0.625rem] uppercase tracking-[0.4em] text-accent-green">
              {String(index + 1).padStart(2, '0')} / {project.type}
            </span>
            {project.stamp && (
              <span className="px-2 py-0.5 border border-accent-green/40 text-accent-green text-[9px] font-mono tracking-widest rounded-sm uppercase">
                {project.stamp}
              </span>
            )}
            {isProjectSkillMatch && (
              <span className="text-amber font-mono text-[9px] tracking-widest animate-pulse-dot">
                [ MATCH: {hoveredSkill.toUpperCase()} ]
              </span>
            )}
          </div>

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
                  onClick={(e) => {
                    e.stopPropagation()
                    handleTagTap(tag)
                  }}
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
            {project.badge && (
              <span className="text-accent-green font-mono text-[9px]">[ {project.badge} ]</span>
            )}
          </div>

          {isLink && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-headline text-[0.625rem] uppercase tracking-[0.3em] text-text-dim hover:text-accent-green transition-colors duration-300"
            >
              <span>SOURCE_CODE</span>
              <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                ↗
              </span>
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
  const [showArchive, setShowArchive] = useState(false)
  const ref = useScrollReveal(0.05)

  // Filter projects by category
  const filteredProjects = portfolio.projects.filter(project => {
    if (activeCategory === 'ALL') return true
    const type = project.type.toUpperCase()
    if (activeCategory === 'SECURITY') return type.includes('SECURITY')
    if (activeCategory === 'AI / ML') return type.includes('AI') || type.includes('ML')
    if (activeCategory === 'GEOSPATIAL') return type.includes('GEOSPATIAL')
    return true
  })

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat)
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const projectsEl = document.getElementById('projects')
        if (projectsEl) {
          projectsEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 80)
    }
  }

  return (
    <section className="max-w-screen-2xl mx-auto px-8 md:px-12 mb-24 lg:mb-32">
      <div ref={ref} className="reveal">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="block font-headline text-[0.625rem] uppercase tracking-[0.4em] text-accent-green mb-3">
              FEATURED CASES
            </span>
            <h2 className="font-headline text-4xl font-bold tracking-tighter text-text-primary">
              PRIMARY_SYSTEMS
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
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
        <div className="flex flex-col gap-6">
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

        {/* ── Secondary / Archived Works Drawer ── */}
        {portfolio.archive && portfolio.archive.length > 0 && (
          <div className="mt-12 border border-[#2A2A2A] rounded-sm bg-[#131313]/50 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2A2A2A]">
              <div>
                <span className="font-headline text-[0.625rem] uppercase tracking-[0.3em] text-accent-green block mb-1">
                  SECONDARY CATALOG
                </span>
                <h3 className="font-headline text-lg font-bold text-text-primary tracking-tight">
                  ARCHIVED_&amp;_SPECIALIZED_WORKS
                </h3>
              </div>
              <button
                onClick={() => setShowArchive(!showArchive)}
                className="self-start sm:self-auto px-4 py-2 border border-[#383838] hover:border-accent-green text-xs font-mono text-text-muted hover:text-accent-green rounded-sm transition-colors duration-200"
              >
                {showArchive ? '[-] COLLAPSE CATALOG' : `[+] EXPAND CATALOG (${portfolio.archive.length} WORKS)`}
              </button>
            </div>

            {showArchive && (
              <div className="divide-y divide-[#2A2A2A] mt-2 animate-term-in">
                {portfolio.archive.map((item) => (
                  <div key={item.name} className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-headline font-bold text-base text-text-primary">
                          {item.name}
                        </span>
                        <span className="text-text-dim font-mono text-xs">({item.year})</span>
                        <span className="px-2 py-0.5 bg-surface-high border border-[#383838] text-[9px] font-mono text-accent-green rounded-sm uppercase tracking-wider">
                          {item.stamp}
                        </span>
                      </div>
                      <p className="font-body text-xs text-text-muted leading-relaxed max-w-3xl">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map(t => (
                          <span key={t} className="text-[10px] font-mono text-text-dim bg-surface-low px-1.5 py-0.5 rounded-sm border border-[#252525]">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="self-start md:self-center font-mono text-xs text-text-dim hover:text-accent-green transition-colors flex items-center gap-1.5 shrink-0 px-3 py-1 border border-[#2A2A2A] rounded-sm hover:border-accent-green/40"
                      >
                        <span>[ REPO ]</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects