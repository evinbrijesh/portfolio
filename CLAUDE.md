# Portfolio — Dual-Mode Developer Portfolio (GUI + TUI)

## Stack
- React 18 (functional components + hooks only)
- Vite (dev server + bundler)
- Tailwind CSS v3 (configured via tailwind.config.js, NOT v4)
- Google Fonts: Inter (300,400,600,700) + Space Grotesk (400,500) + JetBrains Mono (400,700)
- Pure CSS keyframe animations — NO Framer Motion, NO GSAP
- No UI libraries (no shadcn, no Radix, no component libraries)

## Structure
```
src/
  components/    — All UI components, one concern per file
  hooks/         — useTerminal.js (boot seq, commands, history, output)
  data/          — portfolio.js (SINGLE SOURCE OF TRUTH for all content)
  App.jsx        — terminalMode state, phase state, layout switching
  index.css      — CSS variables, keyframes, global resets, scrollbar
  main.jsx       — ReactDOM entry point
```

## Module Map
| File/Folder | Owns What |
|---|---|
| `App.jsx` | terminalMode boolean, phase state machine, enterTerminal/exitTerminal, renders GUI or TUI |
| `CRTTransition.jsx` | Phase-driven animation wrapper: fadeOut→collapse→black→terminalIn→booting→ready |
| `Navbar.jsx` | Fixed top nav, site name, nav links, [ TERMINAL ] button |
| `Hero.jsx` | Full-viewport typographic hero with role label, name, tagline, CTA |
| `About.jsx` | 12-col grid: bio + quote (left), SYSTEM STATUS card (right) |
| `Skills.jsx` | Three columns: Systems & Dev, Observability & Infra, Hardware & Low-Level |
| `Projects.jsx` | List-layout project rows with hover animation |
| `Experience.jsx` | Left-aligned entries with square dots, no vertical line |
| `Contact.jsx` | Centered: inquiry label, email, icon links, [ ENTER TUI MODE_ ] |
| `Terminal.jsx` | Full-screen CRT UI: bezel, screen, scanlines, vignette, knobs, output, prompt |
| `useTerminal.js` | Boot sequence, command dispatch, output streaming, history navigation, input handling |
| `portfolio.js` | All personal data: name, tagline, about, skills, projects, experience, contact |

## Conventions
- All personal data lives in src/data/portfolio.js — never hardcode in components
- CSS tokens: defined in :root (index.css) AND mapped to Tailwind config hex values
- Components use Tailwind utility classes (text-text-primary, bg-surface-low)
- Nav labels use stylized aliases: ARCHIVE→#projects, THOUGHTS→#about, SYSTEM→#experience, CONTACT→#contact
- Project names always UPPERCASE_WITH_UNDERSCORES
- Experience section: NO vertical connecting line, only 4×4px square dots
- Borders almost never used; boundaries via tonal shifts + negative space
- Only permitted border: rgba(72,72,72,0.15) as project row separator (border-t on each row)
- Pure white (#FFF) never used for text — brightest is #C6C7C5 (var(--text-primary))
- Border-radius default: 0.125rem (Tailwind config)
- Footer included with copyright + social links (GITHUB, LINKEDIN, CV_REQUEST)
- Side decoration: fixed left-side system status indicator, visible on xl screens only
- Mobile: [ TERMINAL ] button hidden below 768px, animations simplified

## Key State (App.jsx)
- terminalMode: boolean — false=GUI, true=TUI
- phase: string — idle | fadeOut | collapse | black | terminalIn | booting | ready
- isTransitioning: boolean guard — disables [ TERMINAL ] and [ EXIT ] during animation

## CSS Token Reference
| Variable | Hex | Tailwind Class | Usage |
|---|---|---|---|
| --bg | #0E0E0E | bg-bg | Page background |
| --surface-low | #131313 | bg-surface-low | Section backgrounds, About card |
| --surface-mid | #191A1A | bg-surface-mid | Subtle elevation |
| --surface-high | #252626 | bg-surface-high | Skill tags, hover states |
| --surface-bright | #2C2C2C | bg-surface-bright | Navbar button bg |
| --text-primary | #C6C7C5 | text-text-primary | Main body text |
| --text-muted | #767676 | text-text-muted | Subtitles, descriptions |
| --text-dim | #484848 | text-text-dim | Dates, metadata, dim labels |
| --accent-green | #76AA83 | text-accent-green | Section labels, dots, links |
| --amber | #FFB000 | text-amber | All TUI text |
| --amber-glow | rgba(255,176,0,0.6) | — | TUI text-shadow |

## Typography Scale
| Element | Size | Font | Weight |
|---|---|---|---|
| Hero H1 | clamp(4rem, 10vw, 7rem) | Inter | 700, tight tracking |
| Section H2 | 2.25rem | Space Grotesk | 700 |
| Project H3 | clamp(2rem, 5vw, 3.5rem) | Space Grotesk | 700 |
| Labels | 0.625rem uppercase tracking-[0.4em] | Space Grotesk | 500 |
| Body | 1rem line-height 1.7 | Inter | 400 |
| Meta/dates | 0.75rem | Space Grotesk | 400, text-dim |

## Spacing Rules
- Hero bottom margin: mb-[40vh] — intentional void before Projects
- Between sections: mb-40 (10rem)
- Between experience items: 48px (3rem)
- Project row padding: py-16 (4rem)
- Navbar height: ~80px with py-6

## TUI Command System (useTerminal.js)
Commands: help, about, skills, projects, experience, contact, clear, exit
Boot sequence: 80ms delay per line, 400ms pause before prompt
Output streaming: 30ms delay per line
Input: hidden <input> with ref.focus(), visible prompt "visitor@local:~$"
History: ↑/↓ arrows navigate commandHistory array, Escape clears input

## Animations (CSS keyframes only)
- crt-collapse: width 60vw→0
- crt-expand: width 0→60vw
- fade-in / fade-out: opacity transitions
- blink: cursor blinking 1Hz
- pulse-dot: opacity 0.4→1→0.4
- flicker: opacity 0.97→1 (TUI screen ambient)

## CRT Transition Phases
### Enter Terminal
1. fadeOut (150ms) — portfolio opacity 1→0
2. collapse (300ms) — white 2px line, width 60vw→0, centered
3. black (200ms) — hold on full black
4. terminalIn (400ms) — CRT bezel fades in
5. booting — boot sequence streams line by line
6. ready — prompt active, hidden input focused

### Exit Terminal
Exact reverse using crt-expand. isTransitioning=true at start, false only after final phase.

## Known Gotchas
- TUI mode hidden below 768px — [ TERMINAL ] button must be hidden on mobile
- isTransitioning guard is critical — both [ TERMINAL ] and [ EXIT ] must check it
- Hidden <input> must use position:absolute + opacity:0 + pointer-events:none (NOT display:none — focus won't work)
- Auto-scroll on output: useEffect watching outputLines length, set scrollTop=scrollHeight
- Boot sequence is async — must complete before prompt becomes interactive
- CRT transition uses sequential phase state machine, not simultaneous animations
- Tailwind border-radius DEFAULT set to 0.125rem — components get tight corners by default
- Scanlines overlay and vignette both z-40, must use pointer-events:none so clicks pass through
- The [ EXIT ] button inside Terminal must be z-50 to be above the scanline/vignette overlays

## Deployment
- Vercel: auto-detects Vite, zero config
- Push to main triggers deploy
- Add OG meta tags to index.html before deploy