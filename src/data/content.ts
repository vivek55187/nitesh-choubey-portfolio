/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 *  Everything here is taken from the supplied LinkedIn screenshots and
 *  certificate files. Items marked `VERIFY` must be confirmed by Nitesh
 *  before the site goes public. Nothing on the site is hard-coded elsewhere.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: 'Nitesh Kumar Choubey',
  firstName: 'Nitesh',
  initials: 'NC',
  roles: ['MBA', 'Business Analytics & Operations', 'Aspiring Business Analyst', 'Entrepreneur'],
  headline: ['Turning Data Into Strategy.', 'Ideas Into Impact.'],
  intro:
    'An aspiring business analyst and entrepreneur passionate about transforming insights into meaningful business decisions, building strategic partnerships, and creating impactful digital experiences.',
  location: 'Jalandhar, Punjab, India',
  current: 'Founder, JEEVAN',
  portrait: './images/portrait.webp',
  portraitAlt: 'Nitesh Kumar Choubey speaking and gesturing while presenting',
}

/**
 * CONTACT
 * VERIFY: the email below is the one printed on the LinkedIn banner
 * ("Proanshu4@gmail.com"). It does not match the profile name — confirm it
 * with Nitesh before publishing. Set to '' to hide every email element.
 *
 * LinkedIn: official profile URL supplied by the client. Every "Connect"
 * button opens it in a new tab. Set to '' to hide all LinkedIn elements.
 */
export const contact = {
  email: 'proanshu4@gmail.com',
  emailVerified: false,
  linkedinUrl: 'https://www.linkedin.com/in/nitesh-choubey-bb7397170/',
}

export const about = {
  lead: 'I work where analysis meets execution — reading what the numbers are quietly saying, then turning it into decisions people can act on.',
  paragraphs: [
    'I am pursuing an MBA in Business Analytics & Operations at Lovely Professional University, building on an undergraduate foundation in History from the University of Delhi — a discipline that trained me to look for context, evidence and cause before drawing conclusions.',
    'My professional path has been hands-on. Supporting Gen Digital’s Norton products for an international customer base showed me how real problems surface — one conversation at a time. Freelance content strategy taught me to plan, research and communicate with intent. And founding JEEVAN in Jalandhar is where these threads meet: product, brand, content and customer, owned end to end.',
    'I believe the most useful business thinking combines analytical rigour, creative communication and disciplined execution. That is the standard I hold my work to.',
  ],
  focus: [
    'Business Analytics',
    'Business Strategy',
    'Entrepreneurship',
    'Content Strategy',
    'Business Development',
    'Strategic Partnerships',
    'Technical Customer Support',
    'Digital Communication',
  ],
}

export type Experience = {
  featured?: boolean
  logo?: string
  website?: string
  anchor?: string
  role: string
  org: string
  orgDetail?: string
  type?: string
  period: string
  current?: boolean
  location: string
  description: string[]
  skills: string[]
}

export const experience: Experience[] = [
  {
    featured: true,
    logo: './jeevan/jeevan-logo.webp',
    website: 'https://jeevan-lpu.vercel.app/',
    anchor: '#jeevan',
    role: 'Founder',
    org: 'JEEVAN',
    type: 'Self-employed',
    period: 'Aug 2026 — Present',
    current: true,
    location: 'Jalandhar, Punjab, India · On-site',
    description: [
      'Leading the creative and marketing journey of Jeevan, from product conceptualization and design to branding, content creation, and customer engagement.',
    ],
    skills: ['Business Ownership', 'Start-up Leadership'],
  },
  {
    role: 'Content Strategist',
    org: 'Freelancer.com',
    type: 'Freelance',
    period: 'Apr 2026 — Present',
    current: true,
    location: 'Remote',
    description: [
      'Developing and executing content strategies, planning content calendars, researching and developing content ideas, writing scripts, and managing social media content.',
    ],
    skills: ['Content Design', 'Media Strategy', 'Content Creation'],
  },
  {
    role: 'Technical Customer Support Representative',
    org: 'TP',
    type: 'Full-time',
    period: 'Oct 2025 — Aug 2026',
    location: 'Jaipur, Rajasthan, India · On-site',
    // VERIFY: LinkedIn mentions "maintaining a 95%…" — the metric is truncated
    // in the screenshot, so it is intentionally NOT published. Add it here
    // once Nitesh confirms the full wording.
    description: [
      'Delivered technical support for Gen Digital (Norton) products in an international chat support environment.',
    ],
    skills: ['Technical Support', 'Product Support'],
  },
  {
    role: 'Member',
    org: 'Polienz',
    orgDetail: 'The Political Science Society of Deshbandhu College',
    period: 'Aug 2021 — Aug 2022',
    location: 'Kalkaji, Delhi, India · On-site',
    description: [
      'Managed social media content by creating informative and engaging posts and reels.',
      'Collaborated with the team to promote college events, campaigns, and activities.',
    ],
    skills: ['Graphic Design', 'Computer Graphics Design'],
  },
  {
    role: 'Cadet',
    org: 'National Cadet Corps',
    orgDetail: 'NCC — India',
    period: 'Jul 2016',
    location: 'Patna, Bihar, India',
    description: [
      'Represented Army Public School, Danapur Cantt at Bihar and Jharkhand level.',
      'Participated in the Republic Day Parade at Gandhi Maidan in front of Governor Ram Nath Kovind (2016).',
    ],
    skills: [], // no skills listed on LinkedIn for this entry
  },
]

export type Education = {
  institution: string
  short: string
  credential: string
  period?: string
  grade?: string
  note?: string
  status?: string
}

export const education: Education[] = [
  {
    institution: 'Lovely Professional University',
    short: 'LPU',
    credential: 'Master of Business Administration (MBA)',
    note: 'Business Analytics & Operations',
    status: 'Pursuing',
  },
  {
    institution: 'Jamia Millia Islamia',
    short: 'JMI',
    credential: "Master's Degree, History",
    // VERIFY: LinkedIn shows a single date "Oct 2026" for this degree.
    period: 'Oct 2026',
  },
  {
    institution: 'University of Delhi',
    short: 'DU',
    credential: 'Bachelor of Arts — History (Honours)',
    period: 'Aug 2020 — Jul 2023',
    grade: 'Grade A',
    note: 'Activities: Polienz, Photography',
  },
  {
    institution: 'Army Public School',
    short: 'APS',
    credential: 'Schooling',
    period: 'Apr 2004 — Jul 2020',
    grade: 'Grade A',
  },
]

export type Certificate = {
  id: string
  title: string
  issuer: string
  date: string
  detail?: string
  skills?: string[]
  credential?: string // exactly as printed on the certificate
  image: string | null
  thumb: string | null
  orientation: 'landscape'
}

export const certificates: Certificate[] = [
  {
    id: 'ai-literacy',
    title: 'AI Literacy Essentials',
    issuer: 'Ernst & Young Associates LLP',
    date: 'September 10, 2026',
    detail: 'eLearning program · 2 hours',
    credential: 'Certificate No: LTJC4NHO4TTWX',
    image: './certificates/ai-literacy.webp',
    thumb: './certificates/ai-literacy-thumb.webp',
    orientation: 'landscape',
  },
  {
    id: 'bizdev',
    title: 'Business Development Foundations: Alliances & Partnerships',
    issuer: 'LinkedIn Learning',
    date: 'September 10, 2026',
    skills: ['Business Alliances', 'Business Development', 'Building Business Partnerships'],
    credential: 'Certificate ID: dbb5cab8…f2f3ad55',
    image: './certificates/bizdev.webp',
    thumb: './certificates/bizdev-thumb.webp',
    orientation: 'landscape',
  },
  {
    id: 'ba-excel',
    title: 'Business Analytics with Excel',
    issuer: 'Simplilearn SkillUp · Microsoft-powered course',
    date: 'September 20, 2026',
    detail: 'Online course · Declaration of Completion',
    credential: 'Certificate code: 10760184',
    image: './certificates/ba-excel.webp',
    thumb: './certificates/ba-excel-thumb.webp',
    orientation: 'landscape',
  },
  {
    id: 'vbyld',
    title: 'Viksit Bharat Young Leaders Dialogue (VBYLD) 2027',
    issuer: 'Ministry of Youth Affairs & Sports · MY Bharat',
    date: 'September 11, 2026',
    detail: 'Online Quiz · Certificate of Participation',
    image: './certificates/vbyld.webp',
    thumb: './certificates/vbyld-thumb.webp',
    orientation: 'landscape',
  },
  {
    id: 'sebi',
    title: 'SEBI Investor Awareness Test',
    issuer: 'SEBI · National Institute of Securities Markets',
    date: 'September 2, 2026',
    detail: 'Certificate of Participation',
    image: './certificates/sebi.webp',
    thumb: './certificates/sebi-thumb.webp',
    orientation: 'landscape',
  },
  // VERIFY / MISSING FILE: the brief lists "Microsoft Excel – Excel from
  // Beginner to Advanced 2026 (Sep 12, 2026 · 22.5 hours)" but the certificate
  // file was not supplied. Cards with `image: null` are not rendered. Add the
  // file to /public/certificates and fill in image/thumb to show it.
  {
    id: 'excel-b2a',
    title: 'Microsoft Excel — Excel from Beginner to Advanced 2026',
    issuer: 'Issuer to be confirmed',
    date: 'September 12, 2026',
    detail: '22.5 hours',
    image: null,
    thumb: null,
    orientation: 'landscape',
  },
]

export const skills = [
  {
    group: 'Business & Strategy',
    index: '01',
    items: [
      'Business Analytics',
      'Business Development',
      'Business Alliances',
      'Strategic Partnerships',
      'Start-up Leadership',
      'Business Ownership',
    ],
  },
  {
    group: 'Digital & Creative',
    index: '02',
    items: ['Content Strategy', 'Content Design', 'Social Media Management', 'Graphic Design', 'Computer Graphics Design'],
  },
  {
    group: 'Technical & Analytical',
    index: '03',
    items: ['Microsoft Excel', 'Technical Support', 'Product Support', 'AI Literacy'],
  },
]

export const philosophy = {
  quote: ['Data doesn’t lie,', 'but it does whisper.', 'The real skill is learning how to listen.'],
  pillars: [
    { title: 'Data', text: 'Start with evidence. Let the numbers frame the question before opinions answer it.' },
    { title: 'Creativity', text: 'Insight only matters if it is understood — so communicate it with clarity and craft.' },
    { title: 'Strategy', text: 'Connect every finding to a decision: what changes, for whom, and why now.' },
    { title: 'Execution', text: 'Ideas earn their value in delivery. Own the details and follow through.' },
  ],
}

/**
 * JEEVAN — flagship venture.
 * Brand facts below are taken only from the official website
 * (https://jeevan-lpu.vercel.app/) and Nitesh's LinkedIn Founder entry.
 * No products, revenue, customers or traction figures are claimed.
 */
export const jeevan = {
  website: 'https://jeevan-lpu.vercel.app/',
  displayUrl: 'jeevan-lpu.vercel.app',
  logo: './jeevan/jeevan-logo.webp',
  previewDesktop: './jeevan/jeevan-site-desktop.webp',
  previewMobile: './jeevan/jeevan-site-mobile.webp',
  eyebrow: 'Building JEEVAN',
  headline: ['From an Idea to an', 'Entrepreneurial Journey.'],
  description:
    'JEEVAN represents an entrepreneurial journey led by Nitesh Kumar Choubey, focused on product conceptualization, branding, creative direction, marketing, content creation, and customer engagement.',
  role: 'Founder',
  period: 'August 2026 — Present',
  location: 'Jalandhar, Punjab',
  // From the official website
  tagline: 'Small pots. Big difference.',
  brandSummary:
    'Hand-painted, locally sourced terracotta pots paired with air-purifying, Vastu-compliant indoor plants — a student-led initiative from LPU.',
  brandTraits: ['Hand-painted terracotta', 'Locally sourced', 'Air-purifying, Vastu-compliant plants', 'Student-led initiative'],
  // "What We Do" — official website
  process: [
    { title: 'Source Locally', text: 'Quality terracotta pots from local vendors.' },
    { title: 'Hand-Paint', text: 'Each pot painted with care, creativity and personalization.' },
    { title: 'Pot & Nourish', text: 'Suitable indoor plants with premium soil and nutrients.' },
    { title: 'Deliver Life', text: 'A living product, ready to brighten a space.' },
    { title: 'Return to Nature', text: 'Nurture it, then plant it back to create new life.' },
  ],
  // From the LinkedIn Founder entry
  remit: ['Product Conceptualization', 'Design', 'Branding', 'Creative Direction', 'Marketing', 'Content Creation', 'Customer Engagement'],
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'jeevan', label: 'JEEVAN' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]
