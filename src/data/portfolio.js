// SINGLE SOURCE OF TRUTH — all personal data lives here
// Never hardcode personal data in components

export const portfolio = {
  name: 'Evin Brijesh',
  tagline: 'cs engineer & systems builder — security, AI, and low-level things.',

  about: {
    // Displayed as code-comment styled manifesto in About.jsx
    quote: 'I build things that are reliable, observable, and a little bit dangerous.',
    bio: 'Final-year CSE student at Mar Athanasius College of Engineering, Kothamangalam. My degree is the foundation — but my identity is in systems and hardware. I spend my time building security tooling, flashing custom firmware onto microcontrollers, and chasing flags in CTF competitions. The intersection of security research, AI systems, and low-level engineering is where I think the most interesting problems live.',
    currently: {
      building: 'MiragePot — AI-powered SSH honeypot',
      reading: 'The Art of Exploitation — Jon Erickson',
      listening: 'Bring Me The Horizon',
    },
    // Build progress label — tied to primary project completion
    buildProgressLabel: 'MIRAGEPOT BUILD PROGRESS',
    buildProgressPercent: 62,
  },

  skills: [
    {
      category: 'Systems & Dev',
      items: ['Python', 'C / C++', 'JavaScript', 'React.js', 'Flask', 'Docker', 'Ollama / LLMs', 'PostgreSQL', 'Git', 'Linux (Arch)'],
    },
    {
      category: 'Observability & Infra',
      items: ['Prometheus', 'Grafana', 'Nginx', 'Streamlit', 'CI/CD'],
    },
    {
      category: 'Hardware & Low-Level',
      items: ['Arduino', 'QMK / Vial Firmware', 'Custom Keyboards', 'Hyprland / Wayland', 'Neovim / Vim', 'Wireshark', 'Burp Suite'],
    },
  ],

  projects: [
    {
      name: 'MIRAGEPOT',
      year: '2025',
      type: 'SECURITY / AI SYSTEMS',
      description: 'A real-time, high-interaction SSH honeypot that uses generative AI to eliminate fingerprinting. Paramiko SSH server with a three-tier command engine — filesystem handler, static cache, and an Ollama LLM fallback. Detects MITRE ATT&CK TTPs across 11 tactic stages, tarpits attackers, injects per-session honeytoken data, and ships full observability via Prometheus, Grafana, and Streamlit. 566 pytest tests, 100% pass rate.',
      tags: ['Python', 'Docker', 'Ollama', 'Paramiko', 'Prometheus', 'Grafana'],
      url: 'https://github.com/evinbrijesh/MiragePot',
    },
    {
      name: 'VULNTRACKER',
      year: '2025',
      type: 'SECURITY / WEB',
      description: 'A vulnerability and threat tracking platform with automated CVE ingestion via the NVD API, CVSS v3.1 scoring, and patch management workflows. React frontend with Flask backend and Supabase for real-time status tracking, remediation timelines, and risk prioritization across systems.',
      tags: ['React', 'Flask', 'Supabase'],
      url: 'https://github.com/evinbrijesh',
    },
    {
      name: 'BEACON',
      year: '2025',
      type: 'MOBILE / SOCIAL IMPACT',
      description: 'A challenge-based mobile app supporting addiction recovery through milestone tracking and motivational streaks. Firebase-backed with strict Security Rules isolating user PII, push notifications, and a daily challenge system designed to build healthy habits incrementally. Every data boundary was modeled around least-privilege access from day one.',
      tags: ['FlutterFlow', 'Firebase', 'JavaScript'],
      url: 'https://github.com/evinbrijesh',
    },
  ],

  experience: [
    {
      dateRange: 'MAY 2023 — SEP 2023',
      role: 'Hardware & Networking Technician',
      company: 'Cirus Computers, Kothamangalam',
      description: 'Engineered high-performance workstations for specialized workloads and implemented secure network topologies (VLANs, firewalls) for local deployments. Diagnosed hardware faults across diverse system architectures and configured small-scale LAN/Wi-Fi infrastructures with IP management and access control.',
    },
  ],

  contact: {
    email: 'evinbrijesh@gmail.com',
    github: 'https://github.com/evinbrijesh',
    linkedin: 'https://linkedin.com/in/evinbrijesh',
    // CV: currently markdown; convert to PDF and update to '/cv.pdf' when ready
    cvUrl: '/cv.md',
  },
}