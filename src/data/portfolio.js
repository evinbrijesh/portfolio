// SINGLE SOURCE OF TRUTH — all personal data lives here
// Never hardcode personal data in components

export const portfolio = {
  name: 'EVIN BRIJESH',
  tagline: 'cs engineer & systems builder — security, AI, and low-level things.',
  location: 'Kothamangalam, IN',
  degree: 'B.Tech CSE @ MACE',
  status: 'AVAILABLE FOR ROLES',

  about: {
    quote: 'Engineering at the intersection of systems programming and security research.',
    bio: 'Final-year CSE student at Mar Athanasius College of Engineering. Focused on security tooling, custom firmware, CTF competitions, and the intersection of security research, AI systems, and low-level engineering.',
    currently: {
      building:      'AegisImage — Adversarial ML for Image Protection',
      buildProject:  'AEGISIMAGE', // drives the dynamic progress-bar label
      reading:       'The Art of Exploitation — Jon Erickson',
      listening:     'Bring Me The Horizon',
      buildProgress: null, // null = hide progress bar (ongoing research); set a number to show it
    }
  },

  skills: [
    {
      category: 'Systems & Dev',
      items: ['Python', 'C/C++', 'JavaScript', 'TypeScript', 'React.js', 'Flask', 'Docker', 'Ollama/LLMs', 'PostgreSQL', 'Git', 'Linux (Arch)']
    },
    {
      category: 'Observability & Infra',
      items: ['Prometheus', 'Grafana', 'Nginx', 'Streamlit', 'CI/CD']
    },
    {
      category: 'Hardware & Low-Level',
      items: ['Arduino', 'QMK/Vial Firmware', 'Custom Keyboards', 'Hyprland/Wayland', 'Neovim/Vim', 'Wireshark', 'Burp Suite']
    },
  ],

  projects: [
    {
      name:        'MIRAGEPOT',
      year:        '2025',
      type:        'SECURITY / AI SYSTEMS',
      status:      'COMPLETE',
      description: 'A real-time, high-interaction SSH honeypot using generative AI to eliminate fingerprinting. Paramiko-based with a three-tier command engine (filesystem handler → static cache → Ollama LLM fallback). Detects 50 MITRE ATT&CK techniques across 11 tactics, tarpits attackers, and injects 10 types of per-session honeytokens across a 154-entry virtual filesystem. Resists 88 known prompt injection patterns. ~15,000 lines of Python across 18 modules. Full observability via Prometheus, Grafana, Streamlit. 566 pytest tests, 100% pass rate.',
      tags:        ['Python', 'Docker', 'Ollama', 'Paramiko', 'Prometheus', 'Grafana'],
      url:         'https://github.com/evinbrijesh/MiragePot',
    },
    {
      name:        'AEGISIMAGE',
      year:        '2026',
      type:        'AI / ADVERSARIAL ML',
      status:      'ONGOING',
      description: 'Research project at IIIT Kottayam protecting images against AI manipulation. Uses a universal adversarial perturbation (UAP) approach across an ensemble of Stable Diffusion VAEs (1.5 / 2.1 / XL), trained with LPIPS perceptual loss and an Expectation-over-Transformation (EoT) framework so the protection survives real-world image transformations.',
      tags:        ['PyTorch', 'Stable Diffusion', 'LPIPS', 'Adversarial ML'],
      url:         null, // no repo yet — row renders without link until a public repo exists
    },
    {
      name:        'VULNTRACKER',
      year:        '2025',
      type:        'SECURITY / WEB',
      status:      'COMPLETE',
      description: 'Vulnerability and threat tracking platform with automated CVE ingestion via NVD API, CVSS v3.1 scoring, RBAC, JWT auth, and patch management workflows.',
      tags:        ['React', 'Flask', 'Supabase'],
      url:         'https://github.com/evinbrijesh/VulnTracker',
    },
    {
      name:        'MED_SECURE_MIND',
      year:        '2025',
      type:        'AI / HEALTHCARE',
      status:      'COMPLETE',
      description: 'Fully client-side mental health risk assessment tool. Runs Bio_ClinicalBERT entirely in-browser via WebGPU — no backend, no data leaves the device. Outputs a 0–100 risk score.',
      tags:        ['React', 'TypeScript', 'Vite', 'WebGPU', 'Bio_ClinicalBERT'],
      url:         'https://github.com/evinbrijesh/med-secure-mind',
    },
    {
      name:        'BEACON',
      year:        '2025',
      type:        'MOBILE / SOCIAL IMPACT',
      status:      'COMPLETE',
      description: 'Challenge-based mobile app supporting addiction recovery through milestone tracking and motivational streaks. Firebase-backed with strict Security Rules and least-privilege data modeling.',
      tags:        ['FlutterFlow', 'Firebase', 'JavaScript'],
      url:         'https://github.com/evinbrijesh/BEACON',
    },
  ],

  experience: [
    {
      dateRange:   'JUL 2026 — PRESENT',
      role:        'Cybersecurity Research Intern',
      company:     'IIIT Kottayam',
      description: 'Researching image forensics and AI-manipulated image detection — building AegisImage, an adversarial ML system for protecting images against diffusion-based manipulation.',
    },
    {
      dateRange:   'MAY 2023 — SEP 2023',
      role:        'Hardware & Networking Technician',
      company:     'Cirus Computers, Kothamangalam',
      description: 'Built high-performance workstations, implemented secure VLAN/firewall topologies, diagnosed hardware faults, configured LAN/Wi-Fi infrastructure.',
    },
  ],

  contact: {
    label:   'INQUIRY PROTOCOL',
    tagline: "Open to roles in Security Research, Backend Systems, or Applied ML. Let's build something resilient.",
    email:    'evinbrijesh@gmail.com',
    github:   'https://github.com/evinbrijesh',
    linkedin: 'https://linkedin.com/in/evinbrijesh',
    cv:       '/cv.pdf',
  }
}
