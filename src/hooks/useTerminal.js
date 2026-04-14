import { useState, useEffect, useRef, useCallback } from 'react'
import { portfolio } from '../data/portfolio'

export function useTerminal({ exitTerminal, onBootComplete }) {
  const [outputLines, setOutputLines] = useState([])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [bootComplete, setBootComplete] = useState(false)

  const outputRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll on new output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [outputLines])

  // Run boot sequence on mount
  useEffect(() => {
    const bootLines = [
      '[ <span class="font-bold">OK</span> ] BIOS v1.4 .............. [OK]',
      '[ <span class="font-bold">OK</span> ] MEMORY CHECK 640K ....... [OK]',
      '[ <span class="font-bold">OK</span> ] LOADING KERNEL .......... [OK]',
      '[ <span class="font-bold">OK</span> ] MOUNTING /dev/portfolio . [OK]',
      '',
      '<span class="font-bold">PORTFOLIO OS</span> — Ready.',
      'Unauthorized access is recorded.',
      "Type 'help' for commands or 'exit' to return to GUI.",
    ]

    let i = 0
    const delayedLines = []

    const printLine = () => {
      if (i < bootLines.length) {
        setOutputLines(prev => [...prev, bootLines[i]])
        i++
        setTimeout(printLine, 80)
      } else {
        setTimeout(() => {
          setBootComplete(true)
          onBootComplete?.()
          inputRef.current?.focus()
        }, 400)
      }
    }

    printLine()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const streamOutput = useCallback((lines) => {
    let i = 0
    const stream = () => {
      if (i < lines.length) {
        setOutputLines(prev => [...prev, lines[i]])
        i++
        setTimeout(stream, 30)
      }
    }
    stream()
  }, [])

  const processCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase()

    // Add the command echo to output
    setOutputLines(prev => [...prev, `<span class="text-text-muted">visitor@local:~$</span> ${cmd}`])

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
          '  <span class="text-accent-green">about</span>       — Who I am and what I do',
          '  <span class="text-accent-green">skills</span>      — Technical skillset by category',
          '  <span class="text-accent-green">projects</span>    — Project portfolio',
          '  <span class="text-accent-green">experience</span>  — Work history',
          '  <span class="text-accent-green">contact</span>     — How to reach me',
          '  <span class="text-accent-green">clear</span>       — Clear terminal output',
          '  <span class="text-accent-green">exit</span>        — Return to GUI mode',
        ])
        break

      case 'about':
        streamOutput([
          '',
          `<span class="font-bold">${portfolio.name}</span>`,
          `${portfolio.about.bio}`,
          '',
          `"${portfolio.about.quote}"`,
          '',
        ])
        break

      case 'skills': {
        const lines = ['', '<span class="font-bold">SKILL MATRIX</span>', '']
        portfolio.skills.forEach(group => {
          lines.push(`  <span class="text-accent-green">${group.category.toUpperCase()}</span>`)
          const items = group.items.join(' · ')
          lines.push(`    ${items}`)
          lines.push('')
        })
        streamOutput(lines)
        break
      }

      case 'projects': {
        const lines = ['', '<span class="font-bold">PROJECTS</span>', '']
        portfolio.projects.forEach(p => {
          lines.push(`  <span class="text-accent-green">[${p.name}]</span>  ${p.year} // ${p.description}`)
          lines.push(`    Tags: ${p.tags.join(', ')}`)
          lines.push('')
        })
        streamOutput(lines)
        break
      }

      case 'experience': {
        const lines = ['', '<span class="font-bold">EXPERIENCE</span>', '']
        portfolio.experience.forEach(e => {
          lines.push(`  <span class="text-text-dim">${e.dateRange}</span>`)
          lines.push(`  <span class="font-bold">${e.role}</span> @ ${e.company}`)
          lines.push(`    ${e.description}`)
          lines.push('')
        })
        streamOutput(lines)
        break
      }

      case 'contact':
        streamOutput([
          '',
          '<span class="font-bold">CONTACT</span>',
          '',
          `  Email:    <span class="text-accent-green">${portfolio.contact.email}</span>`,
          `  GitHub:   <span class="text-accent-green">${portfolio.contact.github}</span>`,
          `  LinkedIn: <span class="text-accent-green">${portfolio.contact.linkedin}</span>`,
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
            `command not found: ${trimmed} — type 'help' for available commands`,
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