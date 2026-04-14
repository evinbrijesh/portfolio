import { portfolio } from '../data/portfolio'

function Navbar({ enterTerminal, isTransitioning }) {
  const links = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50" style={{ backgroundColor: 'rgba(14, 14, 14, 0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
      <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
        {/* Site name */}
        <a href="#" className="font-headline text-xl font-bold tracking-tighter text-text-primary">
          {portfolio.name}
        </a>

        {/* Nav links */}
        <div className="hidden md:flex gap-12 items-center">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-headline text-sm tracking-tighter text-text-muted hover:text-text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Terminal button */}
        <button
          onClick={enterTerminal}
          disabled={isTransitioning}
          className="hidden md:block bg-surface-bright text-text-primary px-4 py-2 text-[10px] font-headline font-bold tracking-widest uppercase rounded-[0.125rem] hover:bg-surface-high transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          [ TERMINAL ]
        </button>
      </div>
    </nav>
  )
}

export default Navbar