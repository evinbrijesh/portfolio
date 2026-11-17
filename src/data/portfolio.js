// SINGLE SOURCE OF TRUTH — all personal data lives here
// Never hardcode personal data in components

export const portfolio = {
  name: 'EVIN BRIJESH',
  tagline: 'cs engineer & systems builder — AI agent security, adaptive honeypots, and resilient architectures.',
  location: 'Kothamangalam, IN',
  degree: 'B.Tech CSE @ MACE (\'27)',
  status: 'AVAILABLE FOR ROLES',


  about: {
    quote: 'Engineering closed-loop agent security, adaptive honeypots, and resilient decision systems.',
    bio: 'Final-year Computer Science student at Mar Athanasius College of Engineering and cybersecurity research intern. Focused on AI-agent security tooling, adaptive SSH honeypots, and adversarial ML pipelines, with hands-on work across Python, Linux, Docker, testing, and observability.',
    currently: {
      building:      'KelviAI — Multilingual Voice Agent Framework',
      buildProject:  'KELVIAI',
      reading:       'The Power of Habit — Charles Duhigg',
      listening:     '"I Really Want to Stay at Your House" — Rosa Walton',
      buildProgress: null,
    }
  },

  skills: [
    {
      category: 'AI & Agent Security',
      items: ['LangGraph', 'MCP Protocol', 'SARIF 2.1.0', 'OWASP LLM Top 10', 'PyTorch', 'scikit-learn', 'SHAP', 'Ollama/LLMs']
    },
    {
      category: 'Systems & Backend',
      items: ['Python', 'FastAPI', 'Flask', 'Paramiko', 'pytest', 'Docker', 'PostgreSQL', 'Neo4j', 'Linux (Arch)', 'Git', 'Bash', 'Java']
    },
    {
      category: 'Observability & Geospatial',
      items: ['Prometheus', 'Grafana', 'Sentinel-1 SAR', 'rasterio / pysheds', 'MapLibre GL', 'React.js', 'TailwindCSS', 'CI/CD']
    },
  ],

  // ── 3 PRIMARY FLAGSHIP CASES ───────────────────────────────────────────────
  projects: [
    {
      name:        'RAVEN',
      year:        '2026',
      type:        'AI AGENT SECURITY / GUARDRAILS',
      stamp:       'SECURITY TOOL · PyPI',
      status:      'COMPLETE',
      badge:       'PyPI v1.0.0 · SARIF 2.1.0',
      description: 'A closed-loop security platform for tool-using AI agents that discovers prompt-injection and tool-misuse vulnerabilities, proposes mitigations, and verifies fixes through security and benign-utility regression tests. Implemented with LangGraph orchestration, Model Context Protocol (MCP) integration, human approval, SARIF reporting, and the fail-closed raven-guard gateway for tool authorization, parameter validation, audit logging, and CI/CD security gates. 293+ tests, 2 PyPI packages published.',
      tags:        ['Python', 'LangGraph', 'FastAPI', 'MCP Protocol', 'pytest', 'Docker', 'SARIF 2.1.0'],
      url:         'https://github.com/evinbrijesh/RAVEN',
    },
    {
      name:        'MIRAGEPOT',
      year:        '2026',
      type:        'DEFENSIVE SECURITY / AI',
      stamp:       'DEFENSIVE SYSTEM',
      status:      'COMPLETE',
      badge:       '566 tests ✓ · MITRE ATT&CK',
      description: 'An intelligent, LLM-assisted SSH honeypot that simulates a realistic Linux terminal without executing attacker commands on the host. Paramiko-based with a three-tier command engine (filesystem handler → static cache → Ollama Phi-3 fallback). Features command normalization, honeytokens, tarpitting, signature-based MITRE ATT&CK mapping across 11 tactics, session forensics, and Prometheus/Grafana monitoring. Containerized with Docker Compose; 15,000+ lines of Python, 566 tests at 100% pass rate.',
      tags:        ['Python', 'Docker', 'Paramiko', 'Ollama/LLMs', 'Prometheus', 'Grafana', 'pytest'],
      url:         'https://github.com/evinbrijesh/MiragePot',
    },
    {
      name:        'SIREN',
      year:        '2026',
      type:        'GEOSPATIAL / EARLY WARNING',
      stamp:       'GEOSPATIAL PLATFORM',
      status:      'COMPLETE',
      badge:       'Sentinel-1 SAR · SHA-256 Audit',
      description: 'A human-in-the-loop satellite monitoring pipeline and early-warning decision platform for glacial lake outburst flood (GLOF) scenarios in Nepal’s Dudh Koshi/Imja basin using satellite, terrain, rainfall, and infrastructure data. Implemented SAR calibration, weather-adaptive optical/SAR processing, deterministic water-change analysis, D8 flow routing, compact alert encoding, and SHA-256 hash-chained audit logging before approved dispatch. Tactical MapLibre GL UI with FastAPI backend.',
      tags:        ['Python', 'Sentinel-1 SAR', 'rasterio / pysheds', 'FastAPI', 'MapLibre GL', 'React.js'],
      url:         'https://github.com/evinbrijesh/SIREN',
    },
  ],

  // ── SECONDARY & ARCHIVED PROJECTS ─────────────────────────────────────────
  archive: [
    {
      name:        'DRONA-LOG',
      year:        '2026',
      stamp:       'OPTIMIZATION SOLVER · SIH 2026',
      description: 'Predictive logistics and terrain-aware resupply platform for high-altitude military formations. Built for Smart India Hackathon (SIH26251). Uses Google OR-Tools (SCIP MILP solver) for optimal convoy allocation, LightGBM for consumption forecasting, and MapLibre GL tactical map.',
      tags:        ['Python', 'OR-Tools (MILP)', 'LightGBM', 'FastAPI', 'MapLibre GL', 'Docker'],
      url:         'https://github.com/evinbrijesh/DRONA-LOG',
    },
    {
      name:        'SENTRA',
      year:        '2026',
      stamp:       'GRAPH ML · BUILDATHON',
      description: 'Coordinated fraud-ring detector for signup/referral abuse using graph neural networks. Trained PyTorch GNN + classical RandomForest over 16-dimensional graph community features with SHAP explainability values and plain-language audit trails.',
      tags:        ['PyTorch (GNN)', 'RandomForest', 'SHAP', 'NetworkX', 'Python', 'FastAPI'],
      url:         'https://github.com/evinbrijesh/SENTRA',
    },
    {
      name:        'GHOSTRANGE',
      year:        '2026',
      stamp:       'SECURITY SIMULATION',
      description: 'Defensive security-control validation platform. Simulates fictional cloud identity compromises, generates synthetic security telemetry, evaluates detection rules with deterministic logic, and enforces CI security gate thresholds.',
      tags:        ['Python', 'Security Telemetry', 'CI Gates', 'Testing'],
      url:         'https://github.com/evinbrijesh/GhostRange',
    },
    {
      name:        'KELVIAI',
      year:        '2026',
      stamp:       'VOICE AI PROTOTYPE',
      description: 'Sovereign Indian-language voice agent for multilingual healthcare appointments on the Gnani Artha Stack (Prisma STT → Evon LLM → Timbre TTS). Handles code-mixed Malayalam, Manglish, and Hinglish with sub-500ms local guardrails. 361 tests passed.',
      tags:        ['Python', 'Speech AI', 'Telephony Guardrails', 'FastAPI', 'pytest'],
      url:         'https://github.com/evinbrijesh/kelviAI',
    },
    {
      name:        'VULNTRACKER',
      year:        '2025',
      stamp:       'SECURITY / WEB',
      description: 'Vulnerability and threat tracking platform with automated CVE ingestion via NVD API, CVSS v3.1 scoring, RBAC, JWT auth, and patch management workflows.',
      tags:        ['React.js', 'Flask', 'Supabase', 'PostgreSQL'],
      url:         'https://github.com/evinbrijesh/VulnTracker',
    },
    {
      name:        'MED_SECURE_MIND',
      year:        '2025',
      stamp:       'CLIENT-SIDE AI',
      description: 'Client-side mental health risk assessment tool running Bio_ClinicalBERT in-browser via WebGPU with deterministic fallback — zero backend data leakage. Presented at IEEE Yess’25.',
      tags:        ['React.js', 'TypeScript', 'WebGPU', 'Bio_ClinicalBERT'],
      url:         'https://github.com/evinbrijesh/med-secure-mind',
    },
    {
      name:        'BEACON',
      year:        '2025',
      stamp:       'MOBILE / SOCIAL IMPACT',
      description: 'Mobile companion app supporting addiction recovery through daily challenge milestones and streak mechanics with least-privilege Firestore Security Rules.',
      tags:        ['Flutter', 'Firebase', 'JavaScript'],
      url:         'https://github.com/evinbrijesh/BEACON',
    },
  ],

  // ── WORK & RESEARCH EXPERIENCE ─────────────────────────────────────────────
  experience: [
    {
      dateRange:   '2026',
      role:        'Cybersecurity Research Intern',
      company:     'IIIT Kottayam',
      description: 'Researched methods to detect and prevent image laundering in AI/diffusion-generated content, building a UAP-based adversarial perturbation pipeline. Identified and patched six critical pipeline vulnerabilities (mixed-precision loss instability, checkpoint recovery, out-of-distribution evaluation split, adaptive attacker threat modeling), improving training reliability and evaluation validity.',
    },
    {
      dateRange:   'MAY 2023 — SEP 2023',
      role:        'Hardware & Networking Technician',
      company:     'Cirus Computers, Kothamangalam',
      description: 'Diagnosed hardware bottlenecks and resolved thermal failures across custom desktop builds; configured small-scale LANs/Wi-Fi networks including IP addressing, subnetting, and firewall rules.',
    },
  ],

  // ── CLUBS & COMMUNITY LEADERSHIP ──────────────────────────────────────────
  leadership: [
    {
      dateRange:   'MAR 2025 — PRESENT',
      role:        'Vice Chair, Computer Society',
      company:     'IEEE Student Branch, MACE',
      description: 'Represented the Computer Society at IEEE Yess’25, TechXbit, NIT Calicut. Volunteered for .hack()’25 handling venue setup, technical coordination, and programme execution.',
    },
    {
      dateRange:   'SEP 2025 — PRESENT',
      role:        'Program Committee Executive Member',
      company:     'GDGoC MACE',
      description: 'Event Lead, Lumora’26 — planned and executed an 18-hour design hackathon, managing problem statements, participants, judges, and logistics end-to-end.',
    },
  ],

  contact: {
    label:   'INQUIRY PROTOCOL',
    tagline: "Open to roles in Security Engineering, AI Systems, or Backend Infrastructure. Let's build something resilient.",
    email:    'evinbrijesh@gmail.com',
    github:   'https://github.com/evinbrijesh',
    linkedin: 'https://linkedin.com/in/evinbrijesh',
    domain:   'https://evinbrijesh.is-a.dev',
    cv:       '/Evin_Brijesh_Nov.pdf',
  }
}
