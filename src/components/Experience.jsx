import { portfolio } from '../data/portfolio'
import { useScrollReveal } from '../hooks/useScrollReveal'

function Experience() {
  const ref = useScrollReveal()

  return (
    <section className="max-w-screen-2xl mx-auto px-8 md:px-12 mb-24 lg:mb-32">
      <div ref={ref} className="reveal">
        <span className="block font-headline text-[0.625rem] uppercase tracking-[0.4em] text-accent-green mb-6">
          TRACK RECORD
        </span>
        <h2 className="font-headline text-4xl font-bold tracking-tighter text-text-primary mb-16">
          EXPERIENCE_&amp;_LEADERSHIP
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* ── COLUMN 1: ACTUAL WORK & RESEARCH ── */}
          <div>
            <div className="flex items-center gap-2 mb-8 pb-3 border-b border-[#2A2A2A]">
              <span className="w-1.5 h-1.5 bg-accent-green rounded-full"></span>
              <h3 className="font-headline text-xs uppercase tracking-[0.3em] text-accent-green font-bold">
                01 // WORK &amp; RESEARCH
              </h3>
            </div>

            <div className="flex flex-col gap-10">
              {portfolio.experience.map((entry) => (
                <div key={entry.dateRange + entry.company} className="relative">
                  {/* Date range */}
                  <span className="font-headline text-[0.625rem] uppercase tracking-[0.4em] text-text-dim block mb-2 font-mono">
                    {entry.dateRange}
                  </span>

                  {/* Dot */}
                  <div className="w-1 h-1 bg-accent-green mb-2.5"></div>

                  {/* Role */}
                  <h4 className="font-body text-xl font-semibold text-text-primary mb-1">
                    {entry.role}
                  </h4>

                  {/* Company */}
                  <p className="font-headline text-xs text-accent-green/80 uppercase tracking-wider mb-3">
                    {entry.company}
                  </p>

                  {/* Description */}
                  <p className="font-body text-text-muted leading-relaxed text-sm">
                    {entry.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── COLUMN 2: CLUBS & COMMUNITY LEADERSHIP ── */}
          {portfolio.leadership && portfolio.leadership.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-8 pb-3 border-b border-[#2A2A2A]">
                <span className="w-1.5 h-1.5 bg-amber rounded-full"></span>
                <h3 className="font-headline text-xs uppercase tracking-[0.3em] text-amber font-bold">
                  02 // CLUBS &amp; COMMUNITY
                </h3>
              </div>

              <div className="flex flex-col gap-10">
                {portfolio.leadership.map((entry) => (
                  <div key={entry.dateRange + entry.company} className="relative">
                    {/* Date range */}
                    <span className="font-headline text-[0.625rem] uppercase tracking-[0.4em] text-text-dim block mb-2 font-mono">
                      {entry.dateRange}
                    </span>

                    {/* Dot */}
                    <div className="w-1 h-1 bg-amber mb-2.5"></div>

                    {/* Role */}
                    <h4 className="font-body text-xl font-semibold text-text-primary mb-1">
                      {entry.role}
                    </h4>

                    {/* Organization */}
                    <p className="font-headline text-xs text-amber/80 uppercase tracking-wider mb-3">
                      {entry.company}
                    </p>

                    {/* Description */}
                    <p className="font-body text-text-muted leading-relaxed text-sm">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Experience