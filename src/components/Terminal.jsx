import { useState, useEffect, useRef, useCallback } from 'react'
import { useTerminal } from '../hooks/useTerminal'

function Terminal({ exitTerminal, isTransitioning, onBootComplete }) {
  const {
    outputLines,
    currentInput,
    setCurrentInput,
    handleKeyDown,
    bootComplete,
    outputRef,
    inputRef,
  } = useTerminal({ exitTerminal, onBootComplete })

  // Focus hidden input on click anywhere in terminal
  const screenRef = useRef(null)
  const handleScreenClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-6">
      {/* OUTER BEZEL */}
      <div className="relative w-full h-full max-w-7xl bg-bezel-charcoal p-6 md:p-8 rounded-bezel flex flex-col shadow-2xl">
        {/* INNER TERMINAL SCREEN */}
        <div className="relative flex-1 bg-screen-bg rounded-3xl overflow-hidden screen-glow border-4 border-black/20 flex flex-col" style={{ animation: 'flicker 150ms steps(1) infinite' }}>
          {/* SCANLINE OVERLAY */}
          <div className="absolute inset-0 scanlines z-40"></div>

          {/* TERMINAL TOP BAR */}
          <header className="relative z-50 flex justify-end p-6">
            <button
              onClick={exitTerminal}
              disabled={isTransitioning}
              className="px-4 py-2 border border-amber/40 text-amber font-mono text-[10px] uppercase tracking-widest hover:bg-amber/10 transition-colors duration-200 rounded-[0.125rem] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              [ EXIT ]
            </button>
          </header>

          {/* MAIN TERMINAL CONTENT */}
          <main
            ref={outputRef}
            onClick={handleScreenClick}
            className="relative z-30 flex-1 px-8 pb-8 overflow-y-auto terminal-text text-amber font-mono leading-relaxed"
          >
            <div className="space-y-1">
              {outputLines.map((line, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: line }} />
              ))}

              {/* INPUT PROMPT — only show after boot complete */}
              {bootComplete && (
                <div className="pt-8 flex items-center">
                  <span className="mr-2">visitor@local:~$</span>
                  <span className="mr-0">{currentInput}</span>
                  <span className="w-[10px] h-[20px] bg-amber animate-blink inline-block ml-0.5"></span>
                </div>
              )}
            </div>
          </main>

          {/* HIDDEN INPUT */}
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute opacity-0 pointer-events-none"
            style={{ position: 'absolute' }}
            autoFocus
          />

          {/* CRT CURVATURE VIGNETTE */}
          <div className="absolute inset-0 crt-vignette z-40"></div>
        </div>

        {/* BEZEL DECORATIVE KNOBS */}
        <div className="absolute bottom-10 right-14 flex gap-4 items-center">
          <div className="w-4 h-4 rounded-full bg-[#333] shadow-inner"></div>
          <div className="w-4 h-4 rounded-full bg-[#333] shadow-inner"></div>
          <div className="w-3 h-3 rounded-full bg-amber animate-pulse-dot" style={{ boxShadow: '0 0 10px #FFB000' }}></div>
        </div>
      </div>
    </div>
  )
}

export default Terminal