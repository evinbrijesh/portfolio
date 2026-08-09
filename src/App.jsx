import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Terminal from './components/Terminal'
import CRTTransition from './components/CRTTransition'

function App() {
  const [terminalMode, setTerminalMode] = useState(false)
  const [phase, setPhase] = useState('idle')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const enterTerminal = () => {
    if (isTransitioning) return
    setIsTransitioning(true)

    // Phase 1: fadeOut (150ms)
    setPhase('fadeOut')
    setTimeout(() => {
      // Phase 2: collapse (300ms)
      setPhase('collapse')
      setTimeout(() => {
        // Phase 3: black (200ms)
        setPhase('black')
        setTimeout(() => {
          setTerminalMode(true)
          // Phase 4: terminalIn (400ms)
          setPhase('terminalIn')
          setTimeout(() => {
            // Phase 5: booting
            setPhase('booting')
            // booting → ready is handled by Terminal/useTerminal
          }, 400)
        }, 200)
      }, 300)
    }, 150)
  }

  const exitTerminal = () => {
    if (isTransitioning) return
    setIsTransitioning(true)

    // Phase: fadeOut terminal
    setPhase('fadeOut')
    setTimeout(() => {
      setTerminalMode(false)
      // Phase: collapse (expand) — line appears and expands
      setPhase('collapse')
      setTimeout(() => {
        // Phase: black hold
        setPhase('black')
        setTimeout(() => {
          // Phase: portfolio fades back in
          setPhase('terminalIn')
          setTimeout(() => {
            setPhase('idle')
            setIsTransitioning(false)
          }, 400)
        }, 200)
      }, 300)
    }, 150)
  }

  const setReady = () => {
    setPhase('ready')
    setIsTransitioning(false)
  }

  // Keyboard shortcut (Ctrl+K or Cmd+K) to toggle terminal mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (terminalMode) {
          exitTerminal()
        } else {
          enterTerminal()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [terminalMode, isTransitioning])

  if (terminalMode) {
    return (
      <CRTTransition phase={phase} mode="terminal">
        <Terminal
          exitTerminal={exitTerminal}
          isTransitioning={isTransitioning}
          onBootComplete={setReady}
        />
      </CRTTransition>
    )
  }

  return (
    <CRTTransition phase={phase} mode="gui">
      <Navbar enterTerminal={enterTerminal} isTransitioning={isTransitioning} />
      <main>
        <Hero />
        <div id="about" style={{ scrollMarginTop: '100px' }}>
          <About />
        </div>
        <div id="skills" style={{ scrollMarginTop: '100px' }}>
          <Skills hoveredSkill={hoveredSkill} setHoveredSkill={setHoveredSkill} />
        </div>
        <div id="projects" style={{ scrollMarginTop: '100px' }}>
          <Projects hoveredSkill={hoveredSkill} setHoveredSkill={setHoveredSkill} />
        </div>
        <div id="experience" style={{ scrollMarginTop: '100px' }}>
          <Experience />
        </div>
        <div id="contact" style={{ scrollMarginTop: '100px' }}>
          <Contact enterTerminal={enterTerminal} isTransitioning={isTransitioning} />
        </div>
      </main>
      <Footer />
    </CRTTransition>
  )
}

export default App