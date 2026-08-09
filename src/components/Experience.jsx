import { portfolio } from '../data/portfolio'
import { useScrollReveal } from '../hooks/useScrollReveal'

function Experience() {
  const ref = useScrollReveal()

  return (
    <section className="max-w-screen-2xl mx-auto px-8 md:px-12 mb-24 lg:mb-32">
      <div ref={ref} className="reveal">
        <span className="block font-headline text-[0.625rem] uppercase tracking-[0.4em] text-accent-green mb-6">
          EXPERIENCE
        </span>
        <h2 className="font-headline text-4xl font-bold tracking-tighter text-text-primary mb-16">
          PROFESSIONAL_PATH
        </h2>

        <div className="flex flex-col" style={{ gap: '3rem' }}>
          {portfolio.experience.map((entry) => (
            <div key={entry.dateRange + entry.company}>
              {/* Date range */}
              <span className="font-headline text-[0.625rem] uppercase tracking-[0.4em] text-text-dim block mb-3">
                {entry.dateRange}
              </span>

              {/* Square dot */}
              <div className="w-1 h-1 bg-accent-green mb-3"></div>

              {/* Role */}
              <h3 className="font-body text-xl font-semibold text-text-primary mb-1">
                {entry.role}
              </h3>

              {/* Company */}
              <p className="font-headline text-sm text-text-muted mb-3">
                {entry.company}
              </p>

              {/* Description */}
              <p className="font-body text-text-muted leading-relaxed max-w-xl">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience