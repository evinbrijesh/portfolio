import { portfolio } from '../data/portfolio'

function Projects() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 md:px-12 mb-40">
      <div className="flex justify-between items-end mb-16">
        <h2 className="font-headline text-4xl font-bold tracking-tighter text-text-primary">
          TECHNICAL_WORKS
        </h2>
        <span className="font-headline text-xs tracking-widest uppercase text-text-dim pb-2">
          01 — {portfolio.projects.length.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-col">
        {portfolio.projects.map((project, index) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-t border-[rgba(72,72,72,0.15)] py-16 px-4 hover:bg-surface-low transition-all duration-500"
            style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)' }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="md:w-1/2">
                <span className="font-headline text-[0.625rem] uppercase tracking-[0.4em] text-accent-green mb-4 block">
                  {String(index + 1).padStart(2, '0')} / {project.type}
                </span>
                <h3 className="font-headline font-bold mb-6 group-hover:text-accent-green transition-colors duration-300"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                  {project.name}
                </h3>
                <p className="font-body text-text-muted max-w-md leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="md:w-1/3 mt-8 md:mt-0 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surface-high text-text-muted text-xs font-headline tracking-wider rounded-[0.125rem]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-4 text-accent-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ transform: 'translateX(0)', transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)' }}>
                <span className="font-headline text-sm">VIEW DETAILS</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
            <div className="font-headline text-[0.625rem] tracking-widest text-text-dim mt-6">
              {project.year} — {project.type}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Projects