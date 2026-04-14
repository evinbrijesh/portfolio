# Evin Brijesh — Portfolio

Dual-mode developer portfolio: **GUI** (dark minimal) + **TUI** (CRT terminal emulator) with cinematic transition animation.

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# → Open http://localhost:5173

# Production build
npm run build

# Preview production build
npm run preview
```

## What You're Looking At

**GUI Mode:** Editorial portfolio with typographic hierarchy, smooth animations, and system status card.

**TUI Mode:** Full-screen CRT emulator with 8 interactive commands, boot sequence, and command history.

**Transition:** Sequential CRT collapse animation (fadeOut → collapse → black → terminalIn → booting → ready).

## Before Deploying

1. **Add CV PDF**
   - See `/public/README.md` for three options
   - Quick: `pandoc public/CV_EVIN_BRIJESH.md -o public/cv.pdf`

2. **Test locally**
   ```bash
   npm run dev
   # [ TERMINAL ] button → transition
   # All 8 commands (help, about, skills, projects, experience, contact, clear, exit)
   # Command history: ↑/↓ arrows
   # [ EXIT ] button → reverse transition
   # Footer: DOWNLOAD_CV downloads cv.pdf
   ```

3. **Deploy to Vercel**
   ```bash
   git push origin main
   # Vercel auto-detects Vite, zero config needed
   ```

## File Structure

- `src/components/` — 10 React components (Navbar, Hero, About, Skills, Projects, Experience, Contact, Footer, Terminal, CRTTransition)
- `src/hooks/` — useTerminal.js (boot seq, command dispatch, history, output streaming)
- `src/data/` — portfolio.js (SINGLE SOURCE OF TRUTH for all content)
- `src/index.css` — CSS variables, 8 keyframe animations, global styles
- `public/` — Static assets (CV markdown, setup instructions)

## Key Decisions

| What | Why |
|---|---|
| **No UI libraries** | Pure Tailwind for lean bundle, no extra abstraction |
| **Pure CSS animations** | No Framer Motion — simpler, faster, CSS-native |
| **Phase state machine** | Prevents animation race conditions, forces sequential transitions |
| **Hidden input (not display:none)** | Allows ref.focus() for seamless terminal UX |
| **3-col skills grid** | Balances content at 1440px+ without overflow |
| **Code-comment quote** | Matches Arch/Neovim aesthetic, reinforces systems brand |

## Styling System

All colors, fonts, and animations are defined in `src/index.css` (CSS variables) and mapped to `tailwind.config.js` (Tailwind tokens).

**Tokens:**
- Backgrounds: `--bg`, `--surface-low`, `--surface-mid`, `--surface-high`, `--surface-bright`
- Text: `--text-primary`, `--text-muted`, `--text-dim`
- Accents: `--accent-green`, `--amber`, `--amber-glow`

**Fonts:**
- Inter (body text, hero)
- Space Grotesk (headlines, labels)
- JetBrains Mono (terminal, code comments)

**Animations:**
- `blink`, `pulse-dot`, `flicker`, `crt-collapse`, `crt-expand`, `fade-in`, `fade-out`

## Terminal Commands

| Command | Output |
|---|---|
| `help` | List all commands |
| `about` | Bio + quote |
| `skills` | Three-column skill matrix |
| `projects` | Project list with descriptions |
| `experience` | Work history timeline |
| `contact` | Email, GitHub, LinkedIn |
| `clear` | Clear output, show boot header |
| `exit` | Return to GUI with reverse transition |

## Performance

- CSS: 15.86 KB (gzipped: 4.19 KB)
- JS: 168.40 KB (gzipped: 53.65 KB)
- Total: ~185 KB (gzipped: ~58 KB)
- Build time: <1s

Expected Lighthouse score: **95+**

## Documentation

- `CLAUDE.md` — Architecture reference (for future engineers)
- `PROJECT_SUMMARY.md` — Complete feature breakdown & next steps
- `public/README.md` — CV setup instructions

## Ready to Deploy

✅ Zero build errors
✅ No console warnings
✅ All data fresh and personal
✅ Responsive (1440px + 768px)
✅ SEO-ready (OG meta tags)

**Next step:** Add CV PDF → Deploy to Vercel