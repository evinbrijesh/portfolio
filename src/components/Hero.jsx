import { portfolio } from '../data/portfolio'

function Hero() {
  return (
    <section id="hero" className="w-full min-h-screen max-w-screen-2xl mx-auto px-8 md:px-12 mb-[40vh]" style={{ paddingTop: '96px' }}>
      <div className="max-w-4xl">
        {/* Role label */}
        <span className="block font-headline text-[0.625rem] uppercase tracking-[0.4em] text-accent-green mb-4">
          CS Engineer & Systems Builder
        </span>

        {/* Name */}
        <h1 className="font-body font-bold leading-none tracking-tighter text-text-primary mb-8"
            style={{ fontSize: 'clamp(4rem, 10vw, 7rem)' }}>
          {portfolio.name}
        </h1>

        {/* Tagline */}
        <p className="font-headline text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed">
          {portfolio.tagline}
        </p>

        {/* CTA */}
        <a href="#projects" className="inline-block mt-12 font-headline text-xs tracking-widest text-text-dim hover:text-text-primary transition-colors duration-300">
          VIEW WORK ↓
        </a>
      </div>
    </section>
  )
}

export default Hero