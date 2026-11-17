import { useState, useEffect, useRef, useCallback } from 'react'
import { portfolio } from '../data/portfolio'
import profilePic from '../assets/evinbrijesh.jpg'

/** Escape user-supplied strings before injecting into innerHTML output lines. */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function useTerminal({ exitTerminal, onBootComplete }) {
  const [outputLines, setOutputLines] = useState([])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [bootComplete, setBootComplete] = useState(false)

  const outputRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll on new output with smooth behavior
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTo({
        top: outputRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [outputLines])

  // Run boot sequence on mount — with cleanup to prevent double execution in Strict Mode
  useEffect(() => {
    setOutputLines([])
    setBootComplete(false)

    const bootLines = [
      '[ <span class="font-bold">OK</span> ] BIOS v1.4 .............. [OK]',
      '[ <span class="font-bold">OK</span> ] MEMORY CHECK 640K ....... [OK]',
      '[ <span class="font-bold">OK</span> ] LOADING KERNEL .......... [OK]',
      '[ <span class="font-bold">OK</span> ] MOUNTING /dev/portfolio . [OK]',
      '',
      '<span class="font-bold">PORTFOLIO OS</span> — Ready.',
      'Unauthorized access is recorded.',
      "Type 'help' or 'about' for commands, or 'exit' (or ESC) to return to GUI.",
    ]

    let timeoutId
    let i = 0

    const printLine = () => {
      if (i < bootLines.length) {
        const line = bootLines[i]
        setOutputLines(prev => [...prev, line])
        i++
        timeoutId = setTimeout(printLine, 60)
      } else {
        timeoutId = setTimeout(() => {
          setBootComplete(true)
          onBootComplete?.()
          inputRef.current?.focus()
        }, 300)
      }
    }

    timeoutId = setTimeout(printLine, 60)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const streamOutput = useCallback((lines) => {
    let i = 0
    let timeoutId
    const stream = () => {
      if (i < lines.length) {
        const line = lines[i]
        setOutputLines(prev => [...prev, line])
        i++
        timeoutId = setTimeout(stream, 25)
      }
    }
    stream()
  }, [])

  const processCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase()

    // Add the command echo to output (user input MUST be escaped)
    setOutputLines(prev => [...prev, `<span class="text-text-muted">visitor@local:~$</span> ${escapeHtml(cmd)}`])

    // Add to history
    if (trimmed && trimmed !== '') {
      setCommandHistory(prev => [...prev, cmd])
      setHistoryIndex(-1)
    }

    switch (trimmed) {
      case 'help':
        streamOutput([
          '<span class="font-bold">Available commands:</span>',
          '',
          '  <span class="text-accent-green">about</span> / <span class="text-accent-green">fetch</span> — Fastfetch system info & profile',
          '  <span class="text-accent-green">skills</span>        — Technical skillset & toolset matrix',
          '  <span class="text-accent-green">projects</span>      — Primary flagship project roster',
          '  <span class="text-accent-green">archive</span>       — Secondary & archived project catalog',
          '  <span class="text-accent-green">experience</span>    — Work, research & leadership history',
          '  <span class="text-accent-green">contact</span>       — Contact details & links',
          '  <span class="text-accent-green">status</span>        — Live telemetry & current tasks',
          '  <span class="text-accent-green">clear</span>         — Clear terminal output',
          '  <span class="text-accent-green">exit</span>          — Return to GUI mode',
        ])
        break

      case 'about':
      case 'fastfetch':
      case 'neofetch':
      case 'fetch':
        setOutputLines(prev => [
          ...prev,
          `<div class="flex flex-col md:flex-row gap-8 items-center my-4 p-6 bg-[#131313]/95 border border-accent-green/40 rounded-sm shadow-xl">
            <div class="relative w-44 sm:w-52 h-56 sm:h-64 shrink-0 border-2 border-accent-green/60 rounded-sm overflow-hidden shadow-2xl">
              <img src="${profilePic}" alt="Evin Brijesh" class="w-full h-full object-cover filter grayscale contrast-125 brightness-95" />
              <div class="absolute inset-0 scanlines opacity-50 pointer-events-none"></div>
              <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent-green"></div>
              <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent-green"></div>
              <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent-green"></div>
              <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent-green"></div>
            </div>
            <div class="font-mono text-sm sm:text-base leading-relaxed space-y-1.5 flex-1 min-w-0">
              <div class="text-base sm:text-lg font-bold text-accent-green flex items-center justify-between border-b border-surface-high pb-2 mb-3">
                <span>evin@brijesh-sys</span>
                <span class="text-xs text-amber font-mono">[ ACTIVE_PROFILE ]</span>
              </div>
              <div><span class="text-accent-green font-bold">[ OS ]</span> Portfolio OS (CS Engineer &amp; Systems Builder)</div>
              <div><span class="text-accent-green font-bold">[ EDU ]</span> Mar Athanasius College of Engg (B.Tech CSE '27 · CGPA 7.88)</div>
              <div><span class="text-accent-green font-bold">[ ROLE ]</span> Cybersecurity Research Intern @ IIIT Kottayam</div>
              <div><span class="text-accent-green font-bold">[ FOCUS ]</span> AI Agent Security, Defensive Systems, Geospatial ML</div>
              <div><span class="text-accent-green font-bold">[ FLAGSHIP ]</span> RAVEN (AI Agent Security Regression &amp; Guardrails)</div>
              <div><span class="text-accent-green font-bold">[ HONEYPOT ]</span> MiragePot (LLM SSH Honeypot · 566 tests ✓)</div>
              <div><span class="text-accent-green font-bold">[ SATELLITE ]</span> SIREN (Glacial Flood Radar Early Warning)</div>
              <div><span class="text-accent-green font-bold">[ DOMAIN ]</span> evinbrijesh.is-a.dev</div>
              <div><span class="text-accent-green font-bold">[ LOC ]</span> Kothamangalam, IN</div>
              <div><span class="text-accent-green font-bold">[ STATUS ]</span> <span class="text-accent-green font-bold animate-pulse-dot">AVAILABLE FOR ROLES</span></div>
              <div class="pt-3 flex flex-wrap gap-2">
                <span class="px-2.5 py-1 bg-red-500/20 text-red-400 text-xs rounded font-bold border border-red-500/30">AGENT_SEC</span>
                <span class="px-2.5 py-1 bg-accent-green/20 text-accent-green text-xs rounded font-bold border border-accent-green/30">HONEYPOT</span>
                <span class="px-2.5 py-1 bg-amber/20 text-amber text-xs rounded font-bold border border-amber/30">GEOSPATIAL</span>
              </div>
            </div>
          </div>`
        ])
        break

      case 'skills': {
        const lines = ['', '<span class="font-bold">TECHNICAL SKILL MATRIX</span>', '']
        portfolio.skills.forEach(group => {
          lines.push(`  <span class="text-accent-green">${group.category.toUpperCase()}</span>`)
          const items = group.items.join('  ·  ')
          lines.push(`    ${items}`)
          lines.push('')
        })
        streamOutput(lines)
        break
      }

      case 'projects': {
        const lines = ['', '<span class="font-bold">FEATURED FLAGSHIP PROJECTS</span>', '']
        portfolio.projects.forEach((p, idx) => {
          const badge = p.badge ? ` <span class="text-accent-green">[${p.badge}]</span>` : ''
          const link = p.url ? ` <span class="text-text-dim">(${p.url})</span>` : ''
          lines.push(`  <span class="text-accent-green">0${idx + 1}. [${p.name}]</span>  ${p.year}${badge}`)
          lines.push(`     Type:  ${p.type}`)
          lines.push(`     Desc:  ${p.description}`)
          lines.push(`     Stack: ${p.tags.join(', ')}${link}`)
          lines.push('')
        })
        lines.push('  <span class="text-text-dim">Tip: Type \'archive\' to inspect secondary &amp; specialized projects.</span>')
        lines.push('')
        streamOutput(lines)
        break
      }

      case 'archive':
      case 'all': {
        const lines = ['', '<span class="font-bold">SECONDARY &amp; ARCHIVED PROJECTS CATALOG</span>', '']
        portfolio.archive.forEach((p, idx) => {
          const link = p.url ? ` <span class="text-text-dim">(${p.url})</span>` : ''
          lines.push(`  <span class="text-amber">0${idx + 1}. [${p.name}]</span>  ${p.year} <span class="text-accent-green">[${p.stamp}]</span>${link}`)
          lines.push(`     ${p.description}`)
          lines.push(`     Stack: ${p.tags.join(' · ')}`)
          lines.push('')
        })
        streamOutput(lines)
        break
      }

      case 'experience': {
        const lines = ['', '<span class="font-bold">01 // WORK &amp; RESEARCH EXPERIENCE</span>', '']
        portfolio.experience.forEach(e => {
          lines.push(`  <span class="text-text-dim">[ ${e.dateRange} ]</span>`)
          lines.push(`  <span class="font-bold text-accent-green">${e.role}</span> @ <span class="font-bold">${e.company}</span>`)
          lines.push(`    ${e.description}`)
          lines.push('')
        })
        if (portfolio.leadership && portfolio.leadership.length > 0) {
          lines.push('<span class="font-bold">02 // CLUBS &amp; COMMUNITY LEADERSHIP</span>')
          lines.push('')
          portfolio.leadership.forEach(l => {
            lines.push(`  <span class="text-text-dim">[ ${l.dateRange} ]</span>`)
            lines.push(`  <span class="font-bold text-amber">${l.role}</span> @ <span class="font-bold">${l.company}</span>`)
            lines.push(`    ${l.description}`)
            lines.push('')
          })
        }
        streamOutput(lines)
        break
      }

      case 'contact':
        streamOutput([
          '',
          '<span class="font-bold">INQUIRY & CONTACT PROTOCOL</span>',
          '',
          `  Email:    <span class="text-accent-green">${portfolio.contact.email}</span>`,
          `  Domain:   <span class="text-accent-green">${portfolio.contact.domain}</span>`,
          `  GitHub:   <span class="text-accent-green">${portfolio.contact.github}</span>`,
          `  LinkedIn: <span class="text-accent-green">${portfolio.contact.linkedin}</span>`,
          `  Resume:   <span class="text-accent-green">${portfolio.contact.cv}</span>`,
          '',
        ])
        break

      case 'status':
      case 'sys':
        streamOutput([
          '',
          '<span class="font-bold">SYSTEM TELEMETRY & LIVE READOUT</span>',
          '',
          `  Status:             <span class="text-accent-green">${portfolio.status}</span>`,
          `  Building:           <span class="text-amber">${portfolio.about.currently.building}</span>`,
          `  Reading:            ${portfolio.about.currently.reading}`,
          `  Listening:          ${portfolio.about.currently.listening}`,
          '',
        ])
        break

      case 'clear':
        setOutputLines([])
        break

      case 'exit':
        exitTerminal()
        break

      default:
        if (trimmed) {
          streamOutput([
            `command not found: ${escapeHtml(trimmed)} — type 'help' or 'about' for available commands`,
          ])
        }
        break
    }

    setCurrentInput('')
  }, [exitTerminal, streamOutput])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      processCommand(currentInput)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistoryIndex(prev => {
        if (commandHistory.length === 0) return prev
        const newIndex = Math.min(prev + 1, commandHistory.length - 1)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
        return newIndex
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistoryIndex(prev => {
        if (prev <= 0) {
          setCurrentInput('')
          return -1
        }
        const newIndex = prev - 1
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
        return newIndex
      })
    } else if (e.key === 'Escape') {
      setCurrentInput('')
    }
  }, [currentInput, commandHistory, processCommand])

  return {
    outputLines,
    currentInput,
    setCurrentInput,
    handleKeyDown,
    bootComplete,
    outputRef,
    inputRef,
  }
}