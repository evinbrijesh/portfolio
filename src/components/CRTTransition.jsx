function CRTTransition({ phase, mode, children }) {
  // GUI mode transitions
  if (mode === 'gui') {
    // fadeOut: portfolio fading away
    if (phase === 'fadeOut') {
      return (
        <div className="animate-fade-out">
          {children}
        </div>
      )
    }
    // collapse: white line shrinking
    if (phase === 'collapse') {
      return (
        <div className="fixed inset-0 z-[100] bg-bg flex items-center justify-center">
          <div className="h-[2px] bg-white animate-crt-collapse"></div>
        </div>
      )
    }
    // black: hold on black
    if (phase === 'black') {
      return <div className="fixed inset-0 z-[100] bg-bg"></div>
    }
    // terminalIn: portfolio fading back in (after exit)
    if (phase === 'terminalIn') {
      return (
        <div className="animate-fade-in">
          {children}
        </div>
      )
    }
    // idle: normal render
    return <>{children}</>
  }

  // Terminal mode transitions
  if (mode === 'terminal') {
    // terminalIn: CRT bezel fading in
    if (phase === 'terminalIn') {
      return (
        <div className="animate-fade-in">
          {children}
        </div>
      )
    }
    // fadeOut: terminal fading out (before exit)
    if (phase === 'fadeOut') {
      return (
        <div className="animate-fade-out">
          {children}
        </div>
      )
    }
    // collapse: white line expanding (exit transition)
    if (phase === 'collapse') {
      return (
        <div className="fixed inset-0 z-[100] bg-bg flex items-center justify-center">
          <div className="h-[2px] bg-white animate-crt-expand"></div>
        </div>
      )
    }
    // black: hold on black (exit transition)
    if (phase === 'black') {
      return <div className="fixed inset-0 z-[100] bg-bg"></div>
    }
    // booting or ready: render terminal normally
    if (phase === 'booting' || phase === 'ready') {
      return <>{children}</>
    }
  }

  return <>{children}</>
}

export default CRTTransition