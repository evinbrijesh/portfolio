import { portfolio } from '../data/portfolio'

function Skills() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 md:px-12 mb-40">
      <span className="block font-headline text-[0.625rem] uppercase tracking-[0.4em] text-accent-green mb-6">
        SKILLS
      </span>
      <h2 className="font-headline text-4xl font-bold tracking-tighter text-text-primary mb-12">
        TOOLSET
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolio.skills.map((group) => (
          <div key={group.category} className="bg-surface-low p-6 rounded-[0.25rem]">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-1 bg-accent-green"></div>
              <h3 className="font-headline text-sm font-bold tracking-wider uppercase text-text-primary">
                {group.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-surface-high text-text-muted text-xs font-headline tracking-wider rounded-[0.125rem]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills