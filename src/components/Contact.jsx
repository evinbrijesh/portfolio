import { useState } from 'react'
import { portfolio } from '../data/portfolio'
import resumePDF from '../assets/evin_brijesh_resume.pdf'
import { useScrollReveal } from '../hooks/useScrollReveal'

function Contact({ enterTerminal, isTransitioning }) {
  const [copied, setCopied] = useState(false)
  const ref = useScrollReveal()

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolio.contact.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <section className="max-w-screen-2xl mx-auto px-8 md:px-12 mb-24 lg:mb-32">
      <div ref={ref} className="reveal flex flex-col items-center text-center space-y-8">
        {/* Label */}
        <span className="font-headline text-[0.625rem] uppercase tracking-[0.4em] text-text-dim">
          {portfolio.contact.label}
        </span>

        {/* Tagline */}
        <p className="font-body font-light text-text-muted" style={{ fontSize: '1.2rem' }}>
          {portfolio.contact.tagline}
        </p>

        {/* Email — click to copy */}
        <div className="relative flex flex-col items-center gap-2">
          <button
            onClick={handleCopyEmail}
            title="Click to copy email address"
            className="group font-body text-accent-green hover:text-accent-green/70 transition-colors duration-300 flex items-center gap-2 cursor-pointer bg-transparent border-none"
            style={{ fontSize: '1.25rem' }}
          >
            {portfolio.contact.email}
            {/* Copy icon */}
            <svg
              className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Copy toast */}
          {copied && (
            <span
              key={Date.now()}
              className="copy-toast font-headline text-[0.625rem] uppercase tracking-widest text-accent-green pointer-events-none"
            >
              [ COPIED_ ]
            </span>
          )}
        </div>

        {/* Icon links */}
        <div className="flex items-center gap-6">
          {/* GitHub */}
          <a
            href={portfolio.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-text-dim hover:text-text-primary transition-colors duration-300"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={portfolio.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-text-dim hover:text-text-primary transition-colors duration-300"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          {/* Mail */}
          <a
            href={`mailto:${portfolio.contact.email}`}
            aria-label="Send email"
            className="text-text-dim hover:text-text-primary transition-colors duration-300"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 8.818h-18.893l5.627-8.813zm9.201-1.259l4.623-3.746v9.458l-4.623-5.712z"/>
            </svg>
          </a>

          {/* Resume download */}
          <a
            href={resumePDF}
            download="Evin_Brijesh_Resume.pdf"
            aria-label="Download resume PDF"
            className="text-text-dim hover:text-text-primary transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            </svg>
          </a>
        </div>

        {/* Divider */}
        <hr className="border-0 h-px w-full max-w-md bg-[rgba(72,72,72,0.3)]" />

        {/* Enter TUI button */}
        <button
          onClick={enterTerminal}
          disabled={isTransitioning}
          className="font-headline text-[0.625rem] uppercase tracking-[0.4em] text-text-dim hover:text-accent-green transition-colors duration-300 bg-transparent border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-8"
        >
          [ ENTER TUI MODE (CTRL+K)<span className="animate-blink">_</span> ]
        </button>
      </div>
    </section>
  )
}

export default Contact