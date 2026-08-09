import { useState } from 'react'
import { portfolio } from '../data/portfolio'
import { useScrollReveal } from '../hooks/useScrollReveal'

function Skills({ hoveredSkill, setHoveredSkill }) {
  const [activeCategory, setActiveCategory] = useState(null) // null = show all
  const ref = useScrollReveal()

  const categories = portfolio.skills.map(g => g.category)

  // Build a Set of items in the active category for quick lookup
  const activeItems = activeCategory
    ? new Set(portfolio.skills.find(g => g.category === activeCategory)?.items ?? [])
    : null

  const isMatch = (skillName) => {
    if (!hoveredSkill) return false
    const s1 = skillName.toLowerCase()
    const s2 = hoveredSkill.toLowerCase()
    return s1.includes(s2) || s2.includes(s1)
  }

  const handleCategorySelect = (cat) => {
    const nextCat = activeCategory === cat ? null : cat
    setActiveCategory(nextCat)

    // On mobile devices, smoothly auto-scroll down to the selected category card
    if (nextCat && window.innerWidth < 768) {
      const cardId = `skill-card-${nextCat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
      setTimeout(() => {
        const el = document.getElementById(cardId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 80)
    }
  }

  const handleSkillTap = (skill) => {
    const nextSkill = hoveredSkill === skill ? null : skill
    setHoveredSkill?.(nextSkill)

    // On mobile devices, auto-scroll to matching project in TECHNICAL_WORKS
    if (nextSkill && window.innerWidth < 768) {
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
        <span className="block font-headline text-[0.625rem] uppercase tracking-[0.4em] text-accent-green mb-6">
          SKILLS
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 className="font-headline text-4xl font-bold tracking-tighter text-text-primary">
            TOOLSET
          </h2>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter skills by category">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1 text-xs font-headline tracking-wider rounded-[0.125rem] transition-all duration-200 border ${
                activeCategory === null
                  ? 'bg-accent-green text-bg border-accent-green font-semibold'
                  : 'bg-transparent text-text-muted border-surface-high hover:border-text-dim hover:text-text-primary'
              }`}
            >
              ALL
            </button>
            {categories.map(cat => (
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolio.skills.map((group) => {
            const cardId = `skill-card-${group.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
            return (
              <div
                key={group.category}
                id={cardId}
                onClick={() => handleCategorySelect(group.category)}
                className={`bg-surface-low p-6 rounded-[0.25rem] cursor-pointer transition-all duration-300 ${
                  activeCategory === null || activeCategory === group.category
                    ? 'opacity-100 ring-1 ring-transparent hover:ring-accent-green/30'
                    : 'opacity-30'
                }`}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-1.5 bg-accent-green rounded-full"></div>
                  <h3 className="font-headline text-sm font-bold tracking-wider uppercase text-text-primary">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => {
                    const highlighted = isMatch(skill)
                    return (
                      <span
                        key={skill}
                        onMouseEnter={() => setHoveredSkill?.(skill)}
                        onMouseLeave={() => setHoveredSkill?.(null)}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSkillTap(skill)
                        }}
                        className={`px-3 py-1 text-xs font-headline tracking-wider rounded-[0.125rem] transition-all duration-200 cursor-pointer ${
                          highlighted
                            ? 'bg-accent-green text-bg font-bold shadow-[0_0_12px_rgba(118,170,131,0.4)] scale-105'
                            : activeItems === null || activeItems.has(skill)
                            ? 'bg-surface-high text-text-muted hover:text-accent-green hover:bg-surface-bright'
                            : 'bg-surface-low text-text-dim'
                        }`}
                      >
                        {skill}
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills