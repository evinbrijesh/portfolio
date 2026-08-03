import { portfolio } from '../data/portfolio'

function About() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 md:px-12 mb-40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left: Manifesto + Bio */}
        <div className="md:col-span-7">
          <span className="block font-headline text-[0.625rem] uppercase tracking-[0.4em] text-accent-green mb-6">
            ABOUT
          </span>
          {/* Code-comment styled manifesto */}
          <div className="mb-8">
            <span className="block font-mono text-[0.75rem] text-text-dim mb-2">{'// system_philosophy'}</span>
            <blockquote className="font-body font-light text-2xl md:text-3xl text-text-primary leading-snug">
              {portfolio.about.quote}
            </blockquote>
          </div>
          <p className="font-body text-text-muted leading-relaxed">
            {portfolio.about.bio}
          </p>
        </div>

        {/* Right: SYSTEM STATUS Card */}
        <div className="md:col-span-5">
          <div className="bg-surface-low p-6 rounded-[0.25rem]">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-[6px] h-[6px] bg-accent-green rounded-sm animate-pulse-dot"></div>
              <span className="font-headline text-[0.625rem] uppercase tracking-[0.4em] text-text-primary">
                SYSTEM STATUS: ACTIVE
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <span className="font-headline text-[0.625rem] uppercase tracking-[0.3em] text-text-dim block mb-1">
                  CURRENTLY BUILDING
                </span>
                <p className="font-body text-sm text-text-muted">{portfolio.about.currently.building}</p>
              </div>
              <div>
                <span className="font-headline text-[0.625rem] uppercase tracking-[0.3em] text-text-dim block mb-1">
                  CURRENTLY READING
                </span>
                <p className="font-body text-sm text-text-muted">{portfolio.about.currently.reading}</p>
              </div>
              <div>
                <span className="font-headline text-[0.625rem] uppercase tracking-[0.3em] text-text-dim block mb-1">
                  CURRENTLY LISTENING
                </span>
                <p className="font-body text-sm text-text-muted">{portfolio.about.currently.listening}</p>
              </div>
            </div>

            {/* Build progress bar — only shown when a numeric % exists (completed/shipped work) */}
            {typeof portfolio.about.currently.buildProgress === 'number' && (
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-headline text-[0.625rem] uppercase tracking-[0.3em] text-text-dim">
                    {portfolio.about.currently.buildProject} BUILD PROGRESS
                  </span>
                  <span className="font-headline text-[0.625rem] uppercase tracking-[0.3em] text-amber">
                    {portfolio.about.currently.buildProgress}%
                  </span>
                </div>
                <div className="w-full h-[2px] bg-surface-high rounded-[0.125rem]">
                  <div
                    className="h-full bg-amber rounded-[0.125rem]"
                    style={{ width: `${portfolio.about.currently.buildProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About