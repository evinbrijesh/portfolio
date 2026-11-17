// ── Shared design tokens ───────────────────────────────────────────────────
const T = {
  bg:          '#131313',
  bgCard:      '#181818',
  border:      '#2A2A2A',
  borderLight: '#383838',
  active:      '#76AA83',
  activeGlow:  'rgba(118, 170, 131, 0.25)',
  amber:       '#FFB000',
  amberGlow:   'rgba(255, 176, 0, 0.25)',
  red:         '#E53935',
  textPrimary: '#C6C7C5',
  textMuted:   '#8E8E8E',
  textDim:     '#525252',
}

// ── Primitives ─────────────────────────────────────────────────────────────

/** Rectangular node with label & sub-label */
function Node({
  x, y, w = 82, h = 28,
  label, sub,
  active = false, amber = false, red = false, dim = false,
  badge
}) {
  const stroke = red ? T.red : amber ? T.amber : active ? T.active : dim ? T.border : T.borderLight
  const strokeW = (active || amber || red) ? 1.5 : 1
  const labelFill = red ? T.red : amber ? T.amber : active ? T.active : T.textPrimary
  const cx = x + w / 2
  const labelY = sub ? y + h / 2 - 5 : y + h / 2

  return (
    <g className="transition-all duration-300">
      <rect
        x={x} y={y} width={w} height={h} rx={4}
        fill={T.bg} stroke={stroke} strokeWidth={strokeW}
      />
      <text
        x={cx} y={labelY} textAnchor="middle" dominantBaseline="central"
        fill={labelFill} fontSize={8.5}
        fontFamily="'JetBrains Mono', monospace" fontWeight="600"
      >
        {label}
      </text>
      {sub && (
        <text
          x={cx} y={y + h / 2 + 7} textAnchor="middle" dominantBaseline="central"
          fill={T.textMuted} fontSize={7}
          fontFamily="'JetBrains Mono', monospace"
        >
          {sub}
        </text>
      )}
      {badge && (
        <g>
          <rect x={x + w - 18} y={y - 5} width={22} height={10} rx={2} fill={stroke} />
          <text x={x + w - 7} y={y} textAnchor="middle" dominantBaseline="central" fill="#000" fontSize={6} fontWeight="bold">
            {badge}
          </text>
        </g>
      )}
    </g>
  )
}

/** Container box for grouping sub-systems */
function BoundaryBox({ x, y, w, h, label, amber = false, active = false, red = false }) {
  const stroke = red ? T.red : amber ? T.amber : active ? T.active : T.borderLight
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx={6}
        fill="none" stroke={stroke} strokeWidth={1} strokeDasharray="4 3" opacity={0.6}
      />
      {label && (
        <g>
          <rect x={x + 10} y={y - 7} width={label.length * 5 + 10} height={14} rx={2} fill={T.bg} stroke={stroke} strokeWidth={0.8} />
          <text x={x + 15} y={y} dominantBaseline="central" fill={stroke} fontSize={6.5} fontFamily="'JetBrains Mono', monospace" fontWeight="700">
            {label}
          </text>
        </g>
      )}
    </g>
  )
}

/** Connected line edge — always visible base, glows on hover */
function Edge({ x1, y1, x2, y2, isHovered, delay = 0, amber = false, red = false, active = false }) {
  const accentColor = red ? T.red : amber ? T.amber : active ? T.active : T.active
  const dashLen = Math.hypot(x2 - x1, y2 - y1) + 20

  return (
    <g>
      {/* Permanent base edge */}
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#2E2E2E" strokeWidth={1}
      />
      {/* Animated glow edge */}
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={accentColor} strokeWidth={1.5}
        strokeDasharray={dashLen}
        style={{
          strokeDashoffset: isHovered ? 0 : dashLen,
          transition: `stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
          opacity: isHovered ? 1 : 0,
        }}
      />
    </g>
  )
}

/** Connected polyline edge */
function PolyEdge({ points, isHovered, delay = 0, amber = false, red = false, active = false }) {
  const accentColor = red ? T.red : amber ? T.amber : active ? T.active : T.active

  return (
    <g>
      {/* Permanent base edge */}
      <polyline
        points={points} fill="none"
        stroke="#2E2E2E" strokeWidth={1}
      />
      {/* Animated glow edge */}
      <polyline
        points={points} fill="none"
        stroke={accentColor} strokeWidth={1.5}
        strokeDasharray="400"
        style={{
          strokeDashoffset: isHovered ? 0 : 400,
          transition: `stroke-dashoffset 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
          opacity: isHovered ? 1 : 0,
        }}
      />
    </g>
  )
}

/** Arrowheads */
function ArrowR({ x, y, isHovered, delay = 0, amber = false, red = false, active = false }) {
  const accent = red ? T.red : amber ? T.amber : active ? T.active : T.active
  return (
    <g>
      <polygon points={`${x - 6},${y - 3} ${x},${y} ${x - 6},${y + 3}`} fill="#404040" />
      <polygon
        points={`${x - 6},${y - 3} ${x},${y} ${x - 6},${y + 3}`}
        fill={accent}
        style={{ opacity: isHovered ? 1 : 0, transition: `opacity 0.2s ease ${delay + 0.3}s` }}
      />
    </g>
  )
}

function ArrowD({ x, y, isHovered, delay = 0, amber = false, red = false, active = false }) {
  const accent = red ? T.red : amber ? T.amber : active ? T.active : T.active
  return (
    <g>
      <polygon points={`${x - 3},${y - 6} ${x},${y} ${x + 3},${y - 6}`} fill="#404040" />
      <polygon
        points={`${x - 3},${y - 6} ${x},${y} ${x + 3},${y - 6}`}
        fill={accent}
        style={{ opacity: isHovered ? 1 : 0, transition: `opacity 0.2s ease ${delay + 0.3}s` }}
      />
    </g>
  )
}

function ArrowL({ x, y, isHovered, delay = 0, amber = false, red = false, active = false }) {
  const accent = red ? T.red : amber ? T.amber : active ? T.active : T.active
  return (
    <g>
      <polygon points={`${x + 6},${y - 3} ${x},${y} ${x + 6},${y + 3}`} fill="#404040" />
      <polygon
        points={`${x + 6},${y - 3} ${x},${y} ${x + 6},${y + 3}`}
        fill={accent}
        style={{ opacity: isHovered ? 1 : 0, transition: `opacity 0.2s ease ${delay + 0.3}s` }}
      />
    </g>
  )
}

function ArrowU({ x, y, isHovered, delay = 0, amber = false, red = false, active = false }) {
  const accent = red ? T.red : amber ? T.amber : active ? T.active : T.active
  return (
    <g>
      <polygon points={`${x - 3},${y + 6} ${x},${y} ${x + 3},${y + 6}`} fill="#404040" />
      <polygon
        points={`${x - 3},${y + 6} ${x},${y} ${x + 3},${y + 6}`}
        fill={accent}
        style={{ opacity: isHovered ? 1 : 0, transition: `opacity 0.2s ease ${delay + 0.3}s` }}
      />
    </g>
  )
}

function Note({ x, y, text }) {
  return (
    <text
      x={x} y={y} textAnchor="middle"
      fill={T.textMuted} fontSize={7}
      fontFamily="'JetBrains Mono', monospace"
    >
      {text}
    </text>
  )
}

// ── Diagram 1: MIRAGEPOT ───────────────────────────────────────────────────
//  [ATTACKER] ──> [PARAMIKO] ──> [CMD ENGINE] ──> [MITRE DEF]
//                                     │
//               ┌─────────────────────┼─────────────────────┐
//               ↓                     ↓                     ↓
//          [FS LAYER]          [STATIC CACHE]          [OLLAMA LLM]
//              │                      │                     │
//              └──────────────────────┼─────────────────────┘
//                                     ↓
//                          [PROMETHEUS & GRAFANA]
function MiragepotDiagram({ isHovered }) {
  return (
    <svg viewBox="0 0 390 195" className="w-full h-full" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
      {/* Row 1 Nodes */}
      <Node x={6}   y={18} w={72}  h={28} label="ATTACKER" sub="SSH : 22" />
      <Node x={104} y={18} w={76}  h={28} label="PARAMIKO" sub="SSH Server" active />
      <Node x={206} y={18} w={88}  h={28} label="CMD ENGINE" sub="3-Tier Router" active />
      <Node x={318} y={18} w={66}  h={28} label="MITRE DEF" sub="50 ATT&CK" amber />

      {/* Row 1 Edges */}
      <Edge x1={78}  y1={32} x2={98}  y2={32} isHovered={isHovered} delay={0} />
      <ArrowR x={104} y={32} isHovered={isHovered} delay={0} />

      <Edge x1={180} y1={32} x2={200} y2={32} isHovered={isHovered} delay={0.1} active />
      <ArrowR x={206} y={32} isHovered={isHovered} delay={0.1} active />

      <Edge x1={294} y1={32} x2={312} y2={32} isHovered={isHovered} delay={0.15} amber />
      <ArrowR x={318} y={32} isHovered={isHovered} delay={0.15} amber />

      {/* Row 2 Branching Tier */}
      <Node x={6}   y={86} w={80}  h={28} label="FS LAYER" sub="154 Paths" />
      <Node x={104} y={86} w={80}  h={28} label="STATIC CACHE" sub="Fast Hits" />
      <Node x={206} y={86} w={88}  h={28} label="OLLAMA LLM" sub="GenAI Fallback" amber />
      <Node x={318} y={86} w={66}  h={28} label="HONEYTOKENS" sub="10 Types" active />

      {/* Cmd Engine Branching Lines */}
      <Edge x1={250} y1={46} x2={250} y2={64} isHovered={isHovered} delay={0.2} active />
      <Edge x1={46}  y1={64} x2={351} y2={64} isHovered={isHovered} delay={0.25} active />

      <Edge x1={46}  y1={64} x2={46}  y2={80} isHovered={isHovered} delay={0.3} />
      <ArrowD x={46}  y={86} isHovered={isHovered} delay={0.3} />

      <Edge x1={144} y1={64} x2={144} y2={80} isHovered={isHovered} delay={0.33} />
      <ArrowD x={144} y={86} isHovered={isHovered} delay={0.33} />

      <Edge x1={250} y1={64} x2={250} y2={80} isHovered={isHovered} delay={0.36} amber />
      <ArrowD x={250} y={86} isHovered={isHovered} delay={0.36} amber />

      <Edge x1={351} y1={64} x2={351} y2={80} isHovered={isHovered} delay={0.39} active />
      <ArrowD x={351} y={86} isHovered={isHovered} delay={0.39} active />

      {/* Row 3 Observability */}
      <Node x={90} y={148} w={210} h={28} label="PROMETHEUS + GRAFANA + STREAMLIT" sub="Observability & Live Metrics Telemetry" active />

      <Edge x1={46}  y1={114} x2={46}  y2={132} isHovered={isHovered} delay={0.45} />
      <Edge x1={250} y1={114} x2={250} y2={132} isHovered={isHovered} delay={0.48} amber />
      <PolyEdge points="46,132 195,132 195,142" isHovered={isHovered} delay={0.5} active />
      <PolyEdge points="250,132 195,132 195,142" isHovered={isHovered} delay={0.5} active />
      <ArrowD x={195} y={148} isHovered={isHovered} delay={0.52} active />

      <Note x={195} y={188} text="high-interaction SSH honeypot · 566 tests (100% pass)" />
    </svg>
  )
}

// ── Diagram 2: AEGISIMAGE ──────────────────────────────────────────────────
//  [INPUT IMAGE] ──> [ VAE ENSEMBLE  +  EoT / LPIPS LOSS ] ──> [PROTECTED IMAGE]
//                                                                     │
//                                                                     ↓
//                                                         [DIFFUSION MANIPULATION]
//                                                                     │
//                                                                     ↓
//                                                         [DEGRADED / BLOCKED OUTPUT]
function AegisimageDiagram({ isHovered }) {
  return (
    <svg viewBox="0 0 390 195" className="w-full h-full" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
      {/* Outer Boundary for UAP Optimization */}
      <BoundaryBox x={100} y={12} w={184} h={82} label="UNIVERSAL ADVERSARIAL PERTURBATION" active />

      {/* Nodes */}
      <Node x={6}   y={38} w={78}  h={30} label="INPUT IMAGE" sub="Clean Media" />

      <Node x={108} y={34} w={80}  h={44} label="SD VAEs" sub="1.5 / 2.1 / XL" active />
      <Node x={196} y={34} w={80}  h={44} label="EoT + LPIPS" sub="Perceptual Loss" active />

      <Node x={300} y={38} w={84}  h={30} label="PROTECTED" sub="UAP Embedded" amber />

      {/* Main Flow Edges */}
      <Edge x1={84}  y1={53} x2={102} y2={53} isHovered={isHovered} delay={0} />
      <ArrowR x={108} y={53} isHovered={isHovered} delay={0} />

      <Edge x1={188} y1={56} x2={190} y2={56} isHovered={isHovered} delay={0.12} active />

      <Edge x1={276} y1={53} x2={294} y2={53} isHovered={isHovered} delay={0.2} amber />
      <ArrowR x={300} y={53} isHovered={isHovered} delay={0.2} amber />

      {/* Adversarial Defense Test Branch */}
      <Node x={40}  y={124} w={145} h={30} label="DIFFUSION EDIT ATTEMPT" sub="Inpainting / Image-to-Image" />
      <Node x={224} y={124} w={160} h={30} label="MANIPULATION FAILED / BLOCKED" sub="Perturbation Disrupts GenAI" red />

      <PolyEdge points="342,68 342,104 112,104 112,118" isHovered={isHovered} delay={0.3} red />
      <ArrowD x={112} y={124} isHovered={isHovered} delay={0.35} red />

      <Edge x1={185} y1={139} x2={218} y2={139} isHovered={isHovered} delay={0.4} red />
      <ArrowR x={224} y={139} isHovered={isHovered} delay={0.4} red />

      <Note x={195} y={186} text="IIIT Kottayam Research · Universal Adversarial Protection" />
    </svg>
  )
}

// ── Diagram 3: VULNTRACKER ────────────────────────────────────────────────
//  [NVD API] ──> [ CVE INGEST ] ──> [ CVSS v3.1 ] ──> [ SUPABASE DB ]
//                     │                   │                 │
//                     └─────────┬─────────┘                 │
//                               ↓                           ↓
//                         [ JWT & RBAC ] ───────────> [ REACT UI ]
function VulntrackerDiagram({ isHovered }) {
  return (
    <svg viewBox="0 0 390 195" className="w-full h-full" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
      {/* Backend Engine Boundary */}
      <BoundaryBox x={94} y={12} w={184} h={116} label="FLASK API & WORKFLOW ENGINE" active />

      {/* Nodes */}
      <Node x={6}   y={30} w={72}  h={28} label="NVD API" sub="CVE Live Feed" />

      <Node x={102} y={32} w={74}  h={28} label="CVE INGEST" sub="Auto Scheduler" />
      <Node x={192} y={32} w={78}  h={28} label="CVSS v3.1" sub="Risk Scorer" active />

      <Node x={102} y={84} w={74}  h={28} label="JWT AUTH" sub="RBAC Guard" active />
      <Node x={192} y={84} w={78}  h={28} label="PATCH WORK" sub="Status Engine" amber />

      <Node x={294} y={30} w={90}  h={28} label="SUPABASE DB" sub="PostgreSQL" active />
      <Node x={294} y={136} w={90}  h={32} label="REACT UI" sub="Live Dashboard" active />

      {/* Edges */}
      <Edge x1={78}  y1={44} x2={96}  y2={44} isHovered={isHovered} delay={0} />
      <ArrowR x={102} y={44} isHovered={isHovered} delay={0} />

      <Edge x1={176} y1={46} x2={186} y2={46} isHovered={isHovered} delay={0.1} active />
      <ArrowR x={192} y={46} isHovered={isHovered} delay={0.1} active />

      <Edge x1={270} y1={44} x2={288} y2={44} isHovered={isHovered} delay={0.2} active />
      <ArrowR x={294} y={44} isHovered={isHovered} delay={0.2} active />

      {/* Internal Flask workflow */}
      <Edge x1={139} y1={60} x2={139} y2={78} isHovered={isHovered} delay={0.25} />
      <ArrowD x={139} y={84} isHovered={isHovered} delay={0.25} />

      <Edge x1={231} y1={60} x2={231} y2={78} isHovered={isHovered} delay={0.28} amber />
      <ArrowD x={231} y={84} isHovered={isHovered} delay={0.28} amber />

      {/* DB to UI & Backend to UI */}
      <Edge x1={339} y1={58} x2={339} y2={130} isHovered={isHovered} delay={0.35} active />
      <ArrowD x={339} y={136} isHovered={isHovered} delay={0.35} active />

      <PolyEdge points="270,98 339,98 339,130" isHovered={isHovered} delay={0.4} amber />

      <Note x={195} y={186} text="threat tracking · CVSS v3.1 · RBAC · automated CVE ingestion" />
    </svg>
  )
}

// ── Diagram 4: MED_SECURE_MIND ────────────────────────────────────────────
//  ┌────────────────────────────────────────────────────────────────────────┐
//  │ CLIENT BROWSER (ZERO NETWORK DATA LEAKAGE)                             │
//  │ [USER TEXT] ──> [TOKENIZER] ──> [WEBGPU] ──> [Bio_ClinBERT] ──> [RISK] │
//  └────────────────────────────────────────────────────────────────────────┘
//                                    ✖
//                         [CLOUD SERVER / EXTERNAL API]
function MedSecureMindDiagram({ isHovered }) {
  return (
    <svg viewBox="0 0 390 195" className="w-full h-full" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
      {/* Client Sandbox Boundary */}
      <BoundaryBox x={6} y={12} w={378} h={120} label="CLIENT BROWSER (ZERO NETWORK DATA LEAKAGE)" active />

      {/* Nodes inside Sandbox */}
      <Node x={14}  y={44} w={68}  h={32} label="USER TEXT" sub="Assessment" />
      <Node x={96}  y={44} w={68}  h={32} label="TOKENIZER" sub="In-Browser" active />
      <Node x={178} y={44} w={64}  h={32} label="WEBGPU" sub="Hardware Accel" active />
      <Node x={256} y={38} w={92}  h={44} label="Bio_ClinBERT" sub="ONNX Runtime" active />
      <Node x={256} y={92} w={92}  h={30} label="RISK SCORE 0-100" sub="Category Output" amber />

      {/* Flow Edges inside Sandbox */}
      <Edge x1={82}  y1={60} x2={90}  y2={60} isHovered={isHovered} delay={0} />
      <ArrowR x={96}  y={60} isHovered={isHovered} delay={0} />

      <Edge x1={164} y1={60} x2={172} y2={60} isHovered={isHovered} delay={0.12} active />
      <ArrowR x={178} y={60} isHovered={isHovered} delay={0.12} active />

      <Edge x1={242} y1={60} x2={250} y2={60} isHovered={isHovered} delay={0.2} active />
      <ArrowR x={256} y={60} isHovered={isHovered} delay={0.2} active />

      <Edge x1={302} y1={82} x2={302} y2={86} isHovered={isHovered} delay={0.28} amber />
      <ArrowD x={302} y={92} isHovered={isHovered} delay={0.28} amber />

      {/* Blocked Cloud Server Node outside sandbox */}
      <Node x={110} y={150} w={170} h={26} label="CLOUD SERVER / EXTERNAL API" sub="BLOCKED ✖ NO DATA LEAKS DEVICE" red />

      {/* Strike-through line */}
      <line x1={195} y1={132} x2={195} y2={144} stroke={T.red} strokeWidth={1.5} strokeDasharray="2 2" />
      <text x={195} y={138} textAnchor="middle" fill={T.red} fontSize={10} fontWeight="bold">✕</text>

      <Note x={195} y={188} text="100% client-side inference · WebGPU · zero server calls" />
    </svg>
  )
}

// ── Diagram 5: BEACON ────────────────────────────────────────────────────
//  [FLUTTER APP] ──> [FIREBASE AUTH] ──> [ SECURITY RULES ] ──> [ FIRESTORE DB ]
//        │                                     ▲
//        └─────────> [ STREAKS ENGINE ] ───────┘
//                           │
//                           ↓
//              [PUSH NOTIFICATIONS / MOTIVATION]
function BeaconDiagram({ isHovered }) {
  return (
    <svg viewBox="0 0 390 195" className="w-full h-full" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
      {/* Nodes */}
      <Node x={6}   y={40} w={76}  h={32} label="FLUTTER APP" sub="Mobile Client" />

      <Node x={104} y={22} w={84}  h={28} label="FIREBASE AUTH" sub="JWT Tokens" active />
      <Node x={104} y={76} w={84}  h={32} label="STREAKS ENGINE" sub="Milestones" active />

      <Node x={210} y={48} w={88}  h={34} label="SECURITY RULES" sub="Least-Privilege" amber />
      <Node x={320} y={48} w={64}  h={34} label="FIRESTORE" sub="Cloud DB" active />

      <Node x={104} y={142} w={194} h={26} label="MOTIVATIONAL STREAKS & NOTIFS" sub="Recovery Support Engine" />

      {/* Edges */}
      <PolyEdge points="82,48 94,36 98,36" isHovered={isHovered} delay={0} />
      <ArrowR x={104} y={36} isHovered={isHovered} delay={0} />

      <PolyEdge points="82,64 94,92 98,92" isHovered={isHovered} delay={0.1} active />
      <ArrowR x={104} y={92} isHovered={isHovered} delay={0.1} active />

      <PolyEdge points="188,36 198,36 204,56" isHovered={isHovered} delay={0.2} active />
      <ArrowR x={210} y={65} isHovered={isHovered} delay={0.2} active />

      <PolyEdge points="188,92 198,92 204,74" isHovered={isHovered} delay={0.25} active />
      <ArrowR x={210} y={65} isHovered={isHovered} delay={0.25} active />

      {/* Security Rules to Firestore (perfectly aligned at y=65) */}
      <Edge x1={298} y1={65} x2={314} y2={65} isHovered={isHovered} delay={0.35} amber />
      <ArrowR x={320} y={65} isHovered={isHovered} delay={0.35} amber />

      {/* Streaks to Notifications */}
      <Edge x1={146} y1={108} x2={146} y2={136} isHovered={isHovered} delay={0.4} />
      <ArrowD x={146} y={142} isHovered={isHovered} delay={0.4} />

      <Note x={195} y={186} text="addiction recovery support · milestone tracking · secure Firestore" />
    </svg>
  )
}

// ── Diagram: RAVEN ──────────────────────────────────────────────────────────
// [TOOL-USING AGENT] ──> [LANGGRAPH ORCHESTRATOR] ──> [RED-TEAMING ENGINE]
//                               │                              │
//                      [RAVEN-GUARD GATEWAY]          [BENIGN REGRESSION TESTS]
//                      (Fail-Closed Tool Auth)                 │
//                               │                              ▼
//               [MCP SERVER] ───┴───────────────> [SARIF 2.1.0 AUDIT GATE]
function RavenDiagram({ isHovered }) {
  return (
    <svg viewBox="0 0 390 195" className="w-full h-full" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
      {/* Row 1 Nodes */}
      <Node x={6}   y={18} w={76}  h={28} label="AI AGENT" sub="Tool-Using LLM" />
      <Node x={104} y={18} w={86}  h={28} label="LANGGRAPH" sub="Orchestrator" active />
      <Node x={212} y={18} w={86}  h={28} label="RED-TEAMING" sub="Prompt Injection" amber />
      <Node x={320} y={18} w={64}  h={28} label="SARIF 2.1" sub="OASIS Spec" active />

      {/* Row 1 Edges */}
      <Edge x1={82}  y1={32} x2={98}  y2={32} isHovered={isHovered} delay={0} />
      <ArrowR x={104} y={32} isHovered={isHovered} delay={0} />

      <Edge x1={190} y1={32} x2={206} y2={32} isHovered={isHovered} delay={0.1} active />
      <ArrowR x={212} y={32} isHovered={isHovered} delay={0.1} active />

      <Edge x1={298} y1={32} x2={314} y2={32} isHovered={isHovered} delay={0.15} amber />
      <ArrowR x={320} y={32} isHovered={isHovered} delay={0.15} amber />

      {/* Row 2: Security & Gateway Boundary */}
      <BoundaryBox x={6} y={68} w={378} h={52} label="FAIL-CLOSED VERIFICATION & GATEWAY" amber />

      <Node x={18}  y={80} w={86}  h={28} label="MCP PROTOCOL" sub="Model Context" />
      <Node x={126} y={80} w={106} h={28} label="RAVEN-GUARD" sub="Tool Authorization" active />
      <Node x={254} y={80} w={116} h={28} label="REGRESSION ENGINE" sub="Deterministic Proofs" amber />

      {/* Connect LangGraph down to Raven-Guard */}
      <Edge x1={147} y1={46} x2={147} y2={74} isHovered={isHovered} delay={0.2} active />
      <ArrowD x={147} y={80} isHovered={isHovered} delay={0.2} active />

      {/* Connect Red-Teaming down to Regression Engine */}
      <Edge x1={255} y1={46} x2={255} y2={74} isHovered={isHovered} delay={0.25} amber />
      <ArrowD x={255} y={80} isHovered={isHovered} delay={0.25} amber />

      {/* Connect MCP to Raven-Guard */}
      <Edge x1={104} y1={94} x2={120} y2={94} isHovered={isHovered} delay={0.3} />
      <ArrowR x={126} y={94} isHovered={isHovered} delay={0.3} />

      {/* Row 3 Nodes */}
      <Node x={24}  y={148} w={100} h={28} label="PARAM VALIDATION" sub="Schema Check" />
      <Node x={146} y={148} w={98}  h={28} label="AUDIT LOGS" sub="Tamper-Evident" active />
      <Node x={266} y={148} w={108} h={28} label="CI/CD GATES" sub="PyPI / 293+ Tests" active />

      {/* Raven Guard down to Param Validation and Audit */}
      <Edge x1={179} y1={108} x2={179} y2={128} isHovered={isHovered} delay={0.35} active />
      <PolyEdge points="179,128 74,128 74,142" isHovered={isHovered} delay={0.4} />
      <ArrowD x={74} y={148} isHovered={isHovered} delay={0.4} />

      <PolyEdge points="179,128 195,128 195,142" isHovered={isHovered} delay={0.42} active />
      <ArrowD x={195} y={148} isHovered={isHovered} delay={0.42} active />

      {/* Regression engine to CI/CD */}
      <Edge x1={312} y1={108} x2={312} y2={142} isHovered={isHovered} delay={0.45} active />
      <ArrowD x={312} y={148} isHovered={isHovered} delay={0.45} active />

      <Note x={195} y={188} text="AI agent guardrail & regression engine · PyPI published · 293+ tests" />
    </svg>
  )
}

// ── Diagram: SIREN ──────────────────────────────────────────────────────────
// [SENTINEL-1 SAR] ──> [SAR CALIBRATION] ──> [WATER SEGMENTATION] ──> [HAZARD FUSION]
//                                                    │
// [DEM TERRAIN] ──────> [D8 FLOW ROUTING] ───────────┴──────────────> [SHA-256 AUDIT]
//                                                                             │
//                                                                             ▼
//                              [MAPLIBRE GL + FASTAPI TACTICAL DISPATCH]
function SirenDiagram({ isHovered }) {
  return (
    <svg viewBox="0 0 390 195" className="w-full h-full" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
      {/* Row 1 Nodes (Satellite Track) */}
      <Node x={6}   y={18} w={84}  h={28} label="SENTINEL-1 SAR" sub="Radar Telemetry" active />
      <Node x={108} y={18} w={80}  h={28} label="CALIBRATION" sub="Terrain Radiometric" />
      <Node x={206} y={18} w={88}  h={28} label="WATER CHANGE" sub="Adaptive Segment" active />
      <Node x={312} y={18} w={72}  h={28} label="GLOF RISK" sub="Lake Outburst" red />

      {/* Row 1 Edges */}
      <Edge x1={90}  y1={32} x2={102} y2={32} isHovered={isHovered} delay={0} active />
      <ArrowR x={108} y={32} isHovered={isHovered} delay={0} active />

      <Edge x1={188} y1={32} x2={200} y2={32} isHovered={isHovered} delay={0.1} />
      <ArrowR x={206} y={32} isHovered={isHovered} delay={0.1} />

      <Edge x1={294} y1={32} x2={306} y2={32} isHovered={isHovered} delay={0.15} active />
      <ArrowR x={312} y={32} isHovered={isHovered} delay={0.15} active />

      {/* Row 2 Nodes (Hydrologic & Audit Track) */}
      <Node x={6}   y={80} w={84}  h={28} label="DEM TERRAIN" sub="Elevation Grid" />
      <Node x={108} y={80} w={80}  h={28} label="D8 ROUTING" sub="pysheds Solver" active />
      <Node x={206} y={80} w={88}  h={28} label="PATH FORECAST" sub="Downstream Threat" amber />
      <Node x={312} y={80} w={72}  h={28} label="AUDIT CHAIN" sub="SHA-256 Block" active />

      {/* Row 2 Edges */}
      <Edge x1={90}  y1={94} x2={102} y2={94} isHovered={isHovered} delay={0.2} />
      <ArrowR x={108} y={94} isHovered={isHovered} delay={0.2} />

      <Edge x1={188} y1={94} x2={200} y2={94} isHovered={isHovered} delay={0.25} active />
      <ArrowR x={206} y={94} isHovered={isHovered} delay={0.25} active />

      <Edge x1={294} y1={94} x2={306} y2={94} isHovered={isHovered} delay={0.3} amber />
      <ArrowR x={312} y={94} isHovered={isHovered} delay={0.3} amber />

      {/* Vertical cross-talk from GLOF Risk to Audit Chain */}
      <Edge x1={348} y1={46} x2={348} y2={74} isHovered={isHovered} delay={0.35} red />
      <ArrowD x={348} y={80} isHovered={isHovered} delay={0.35} red />

      {/* Row 3 Tactical Dispatch */}
      <Node x={50} y={144} w={290} h={28} label="MAPLIBRE GL + FASTAPI DISPATCH" sub="Human-In-The-Loop Disaster Early Warning" active />

      <Edge x1={348} y1={108} x2={348} y2={126} isHovered={isHovered} delay={0.4} active />
      <PolyEdge points="348,126 195,126 195,138" isHovered={isHovered} delay={0.45} active />
      <ArrowD x={195} y={144} isHovered={isHovered} delay={0.48} active />

      <Note x={195} y={188} text="multimodal satellite radar pipeline · Dudh Koshi / Imja basin · verified alerting" />
    </svg>
  )
}

// ── Dispatcher ─────────────────────────────────────────────────────────────
const MAP = {
  RAVEN:           RavenDiagram,
  MIRAGEPOT:       MiragepotDiagram,
  SIREN:           SirenDiagram,
  AEGISIMAGE:      AegisimageDiagram,
  VULNTRACKER:     VulntrackerDiagram,
  MED_SECURE_MIND: MedSecureMindDiagram,
  BEACON:          BeaconDiagram,
}

export function ProjectDiagram({ name, isHovered }) {
  const Diagram = MAP[name]
  if (!Diagram) return null
  return <Diagram isHovered={isHovered} />
}

