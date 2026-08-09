import { useState, useRef } from 'react'
import { useHoneypotCanvas } from '../hooks/useHoneypotCanvas'
import { portfolio } from '../data/portfolio'
import profilePic from '../assets/evinbrijesh.jpg'

function Hero() {
  const [imgError, setImgError] = useState(false)
  const canvasRef = useRef(null)
  useHoneypotCanvas(canvasRef)

  return (
    <section
      id="hero"
      className="w-full min-h-[85vh] max-w-screen-2xl mx-auto px-8 md:px-12 mb-20 lg:mb-28"
      style={{ paddingTop: '80px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Honeypot log stream background canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Hero content — sits above the canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[75vh]" style={{ position: 'relative', zIndex: 1 }}>
        {/* Left Column: text content */}
        <div className="lg:col-span-7 min-w-0">
          {/* Pre-heading Label */}
          <span className="block font-headline text-xs uppercase tracking-[0.3em] text-accent-green mb-4">
            CS ENGINEER & SYSTEMS BUILDER
          </span>

          {/* Main Heading */}
          <h1 className="font-body font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#C6C7C5] mb-6 leading-none">
            {portfolio.name}
          </h1>

          {/* Tagline */}
          <p className="font-headline text-lg text-[#767676] mt-4 max-w-xl leading-relaxed">
            {portfolio.tagline}
          </p>

          {/* Technical Spec Block */}
          <div className="font-mono text-xs text-[#767676] flex flex-wrap gap-6 mt-6 pt-6 border-t border-[#484848]/20">
            <div>
              <span className="text-accent-green mr-1.5">[ LOC ]</span>
              <span>{portfolio.location}</span>
            </div>
            <div>
              <span className="text-accent-green mr-1.5">[ EDU ]</span>
              <span>{portfolio.degree}</span>
            </div>
            <div>
              <span className="text-accent-green mr-1.5">[ STATUS ]</span>
              <span>{portfolio.status === 'AVAILABLE FOR ROLES' ? 'ONLINE // READY' : portfolio.status}</span>
            </div>
          </div>

          {/* CTA Section */}
          <a
            href="#projects"
            className="inline-flex items-center gap-3 px-5 py-3 mt-8 bg-[#131313] hover:bg-[#191A1A] border border-[#252626] text-[#C6C7C5] hover:text-[#76AA83] font-headline text-xs uppercase tracking-widest transition-all rounded-sm group"
          >
            <span>VIEW WORK</span>
            <span className="transform group-hover:translate-y-1 transition-transform duration-300">↓</span>
          </a>
        </div>

        {/* Right Column: profile image / technical card */}
        <div className="lg:col-span-5 shrink-0 flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-[#131313] border border-[#252626] p-2 rounded-sm relative group overflow-hidden">
            {/* HUD Corner Ticks */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent-green/40"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent-green/40"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent-green/40"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent-green/40"></div>

            {/* Top Bar */}
            <div className="font-mono text-[10px] text-[#767676] pb-2 px-1 flex justify-between items-center">
              <span>[ LIVE_FEED // ID: EVIN_BRIJESH ]</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse-dot"></span>
                <span>ONLINE</span>
              </div>
            </div>

            {/* Image Wrapper for Overlay */}
            <div className="relative overflow-hidden rounded-sm">
              {imgError ? (
                <div className="w-full aspect-[3/4] bg-surface-high flex items-center justify-center rounded-sm">
                  <span className="font-mono text-xs text-text-dim">[ NO_SIGNAL ]</span>
                </div>
              ) : (
                <img
                  src={profilePic}
                  alt={portfolio.name}
                  onError={() => setImgError(true)}
                  className="w-full aspect-[3/4] object-cover filter grayscale contrast-125 brightness-90 scale-100 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-500 rounded-sm"
                />
              )}

              {/* CRT SCANLINES */}
              <div className="absolute inset-0 scanlines z-10 pointer-events-none"></div>

              {/* HUD CROSSHAIR — targeting reticle */}
              <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                <div className="relative w-24 h-24 opacity-40 group-hover:opacity-70 transition-opacity duration-500">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-accent-green/70"></span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-accent-green/70"></span>
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-3 bg-accent-green/70"></span>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-3 bg-accent-green/70"></span>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-accent-green/70"></span>
                </div>
              </div>

              {/* GLITCH SLICES — RGB split displacement on hover */}
              <div className="absolute inset-0 z-10 pointer-events-none glitch-slices group-hover:animate-glitch"></div>

              {/* LIVE DATA READOUT — bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="font-mono text-[10px] leading-relaxed text-accent-green/90">
                  <div className="flex justify-between items-center">
                    <span className="tracking-widest">[ FEED_DECODE ]</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse-dot"></span>
                      <span className="text-red-400/90 tracking-widest">REC</span>
                    </span>
                  </div>
                  <div className="mt-1.5 space-y-0.5">
                    <div className="flex justify-between">
                      <span className="text-text-dim">SUBJ_ID</span>
                      <span>EVIN_BRIJESH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-dim">COORD</span>
                      <span>10.05°N / 76.63°E</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-dim">STATUS</span>
                      <span className="text-accent-green">ONLINE // READY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-dim">SIG</span>
                      <span className="text-amber">0x7F</span>
                    </div>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-text-dim">DECODING</span>
                    <span className="text-accent-green animate-blink">▊</span>
                  </div>
                </div>
              </div>

              {/* Gradient Vignette Overlay */}
              <div className="bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-60 absolute inset-0 pointer-events-none z-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero