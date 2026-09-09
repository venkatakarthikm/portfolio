/**
 * data/profile.js - Canonical profile data for Muchu Venkata Karthik
 * Refresh STATS after updating GitHub trophy snapshot.
 */

export const SUMMARY_FULLSTACK =
  'Full-Stack Developer with practical knowledge of developing full-fledged applications, from creating pixel perfect React based UIs to developing scalable microservices on Node.js, by integrating third party APIs on React, Node.js, PostgreSQL, MongoDB, Supabase and have fintech development experience. Can develop Ai powered automation solutions and tools.'

export const SUMMARY_BACKEND =
  'Backend-focused Software Engineer with hands-on production experience engineering scalable microservices, REST APIs, and database architectures using TypeScript, Node.js, and PostgreSQL.'

export const HERO_TAGLINE = 'I build complete products - from the UI your users love to the APIs that power them.'

export const ROLES = [
  'Full-Stack Developer',
  'Backend Engineer',
  'React Developer',
  'Node.js Engineer',
  'API Architect',
  'Microservices Builder',
]

export const CONTACT = {
  email: '2200030154cseh@gmail.com',
  linkedin: 'https://linkedin.com/in/venkatakarthikm',
  github: 'https://github.com/venkatakarthikm',
  portfolio: 'https://muchukarthik.stackinfi.in',
  // Phone intentionally NOT published on the public site
}

/** Refresh these after updating your GitHub stats / trophy snapshot */
export const STATS = {
  contributions: 700,
  repos: 55,
  commits: 598,
  cgpa: 9.2,
}

export const CANONICAL_URL = 'https://muchukarthik.stackinfi.in'

export const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX' // Replace with your real GA4 ID

export const EXPERIENCE = [
  {
    id: 'webileapps',
    type: 'work',
    company: 'Webileapps',
    role: 'Full-Stack Web Development Intern',
    period: 'Feb 2026 – Jul 2026',
    location: 'Vijayawada, India',
    bullets: [
      'Engineered backend microservices and full-stack modules using JS/TS/Node/React across 3 internal enterprise fintech platforms handling multi-role access control.',
      'Designed/optimized schemas in PostgreSQL and MongoDB with transactional integrity.',
      'Integrated Redis caching for permission schemas and session records - latency ↓.',
      'Centralized audit logging with Winston + JWT auth with strict payload validation for financial data.',
    ],
  },
  {
    id: 'klu',
    type: 'education',
    company: 'Koneru Lakshmaiah Education Foundation',
    role: 'B.Tech - Computer Science & Engineering',
    period: '2022 – 2026',
    location: 'Guntur, Andhra Pradesh',
    bullets: [
      'CGPA: 9.2 / 10.0',
      'Coursework: DBMS · DSA · OS · Computer Networks',
    ],
  },
]

export const CERTIFICATIONS = [
  {
    id: 'wipro',
    title: 'Wipro TalentNext Certified Java Developer',
    issuer: 'Wipro',
    year: 2025,
  },
  {
    id: 'redhat-ead',
    title: 'Red Hat Certified Enterprise Application Developer',
    issuer: 'Red Hat',
    year: 2024,
    date: 'Dec 23, 2024',
    credentialUrl: 'https://www.credly.com/badges/2ccddcb8-16f4-4b4e-bd94-e952453dbf72/public_url',
  },
  {
    id: 'salesforce-ai',
    title: 'Salesforce Certified AI Associate',
    issuer: 'Salesforce',
    year: 2024,
    date: 'Oct 20, 2024',
    credentialUrl: 'https://trailhead.salesforce.com/en/credentials/certification-detail-print/?searchString=GecERbEq0QRu2bG1yV1ihQTRHp/oq8BaTsbTSz0cMjrFHAfzhwLahw2/yO03Bef7',
  },
  {
    id: 'aa-rpa',
    title: 'Automation Anywhere Certified Essentials RPA Professional',
    issuer: 'Automation Anywhere',
    year: 2024,
    date: 'July 25, 2024',
    credentialUrl: 'https://certificates.automationanywhere.com/12ded5a8-2051-4f46-90b3-ce6b94cd64ce#acc.J3vEandY',
  },
]

export const SKILLS = {
  Languages: [
    { id: 'javascript', label: 'JavaScript (ES6+)', desc: 'Production JS - async/await, modules, closures.' },
    { id: 'typescript', label: 'TypeScript', desc: 'Used in production APIs at Webileapps for strict type safety.' },
    { id: 'sql', label: 'SQL', desc: 'PostgreSQL + MySQL schemas, complex joins, transactions.' },
    { id: 'java', label: 'Java', desc: 'Wipro TalentNext certified; Spring Boot projects.' },
  ],
  Frontend: [
    { id: 'react', label: 'React.js', desc: 'SPA, hooks, context, Zustand state management.' },
    { id: 'nextjs', label: 'Next.js', desc: 'App Router, SSG/SSR, image optimisation, edge functions.' },
    { id: 'html5', label: 'HTML5', desc: 'Semantic markup, accessibility, schema.org.' },
    { id: 'css3', label: 'CSS3', desc: 'Custom properties, animations, grid, clamp().' },
    { id: 'tailwindcss', label: 'Tailwind CSS', desc: 'Utility-first styling; used across all React projects.' },
  ],
  Backend: [
    { id: 'nodejs', label: 'Node.js', desc: 'Express APIs, background workers, WebSockets at Webileapps.' },
    { id: 'express', label: 'Express.js', desc: 'RESTful APIs, middleware, JWT auth, rate limiting.' },
    { id: 'microservices', label: 'Microservices', desc: 'Service isolation, shared Redis sessions, audit logging.' },
    { id: 'websockets', label: 'WebSockets', desc: 'Real-time chat (ChatVK), live cricket updates (TrackWicket).' },
    { id: 'restapi', label: 'RESTful APIs', desc: '40+ endpoints in API Coolie; 15+ integrations across projects.' },
  ],
  Databases: [
    { id: 'postgresql', label: 'PostgreSQL', desc: 'Transactional schemas, role-based access control at Webileapps.' },
    { id: 'mongodb', label: 'MongoDB', desc: 'Document design for Fourzdeals, ChatVK, API Coolie.' },
    { id: 'redis', label: 'Redis', desc: 'Session + permission caching; latency reduction at Webileapps.' },
    { id: 'mysql', label: 'MySQL', desc: 'Relational schemas, normalisation.' },
    { id: 'supabase', label: 'Supabase', desc: 'Auth, real-time, Postgres-as-a-service.' },
  ],
  Infrastructure: [
    { id: 'git', label: 'Git / GitHub', desc: '55 repos; GitHub Actions CI/CD pipelines.' },
    { id: 'aws', label: 'AWS', desc: 'EC2, S3 bucket storage, cloud deployment, and IAM policies.' },
    { id: 'cloudflare', label: 'Cloudflare', desc: 'Workers, DNS management, API proxy for stackinfi / apicoolie.' },
    { id: 'render', label: 'Render', desc: 'Primary hosting - backend APIs and static sites.' },
    { id: 'vercel', label: 'Vercel', desc: 'Deployment for frontend apps (Fourzdeals, CineDisco).' },
    { id: 'kotlin', label: 'Kotlin / Android', desc: 'Native Android development in Android Studio.' },
  ],
}

export const BEYOND = [
  { id: 'bots', label: 'Automation Bots', icon: '🤖', desc: 'Scripted bots for data collection and task automation.' },
  { id: 'rpa', label: 'RPA (Automation Anywhere)', icon: '⚙️', desc: 'Certified in Automation Anywhere Essentials RPA.' },
  { id: 'android', label: 'Android (Kotlin)', icon: '📱', desc: 'Native Android apps using Kotlin and Android Studio.' },
  { id: 'webscraping', label: 'Web Scraping', icon: '🕷️', desc: 'Custom scrapers for TrackWicket cricket data aggregation.' },
  { id: 'openrouter', label: 'AI/LLM Integration', icon: '🧠', desc: 'OpenRouter-powered failure diagnosis in API Coolie.' },
  { id: 'onesignal', label: 'Push Notifications', icon: '🔔', desc: 'OneSignal webhooks for live cricket score alerts.' },
]
