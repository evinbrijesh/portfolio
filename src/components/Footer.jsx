import { portfolio } from '../data/portfolio'

function Footer() {
  return (
    <footer className="w-full py-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-12 w-full max-w-screen-2xl mx-auto opacity-40 hover:opacity-100 transition-opacity duration-300 font-headline text-[0.625rem] tracking-[0.2em] uppercase">
        <div className="text-text-dim mb-6 md:mb-0">
          ©{new Date().getFullYear()} {portfolio.name.toUpperCase()}. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-12">
          <a href={portfolio.contact.github} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-text-primary transition-colors duration-300">
            GITHUB
          </a>
          <a href={portfolio.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-text-primary transition-colors duration-300">
            LINKEDIN
          </a>
          <a href={portfolio.contact.cv} download className="text-text-dim hover:text-text-primary transition-colors duration-300">
            DOWNLOAD_CV
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer