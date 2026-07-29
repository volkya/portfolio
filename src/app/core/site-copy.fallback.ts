import type { SiteCopy } from './site-copy.model';

/** Fallback if `assets/site.json` fails to load. Keep aligned with that file. */
export const SITE_COPY_FALLBACK: SiteCopy = {
  brand: { toolbarTitle: 'Dyma Correa' },
  social: {
    githubUrl: 'https://github.com/Volkya',
    githubAriaLabel: 'GitHub',
    linkedinUrl: 'https://www.linkedin.com/in/dymacorrea/',
    linkedinAriaLabel: 'LinkedIn',
  },
  contact: { email: 'correa.dyma@gmail.com' },
  footer: { cvLabel: 'CV', githubLabel: 'GitHub', linkedinLabel: 'LinkedIn' },
  nav: [
    { path: '/', label: 'Home', exact: true },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
  ],
  home: {
    heroTitle: "Hi! I'm Dyma Correa",
    heroSubtitle: 'Senior Software Engineer · Argentina (GMT-3)',
    heroBody:
      "I design and build distributed systems focused on concurrency, performance, and resilience.\n\nScalable architectures with Java, Kotlin, and Go: microservices, events, and observability in high-throughput environments.\n\nToday I'm interested in pushing backends toward real-time processing and AI integration.",
    stackAriaLabel: 'Core stack',
    stackLabel: 'Stack',
    stackItems: 'Java · Kotlin · Go · AWS · Kubernetes · Docker · Microservices · Observability',
    ctaProjects: 'Projects',
    ctaCv: 'Download CV',
    journalHeading: 'Recent notes',
    journalAll: 'All posts',
    journalEmpty: 'No posts published yet.',
  },
  projectsPage: {
    heading: 'Projects',
    lede: 'Selected work and side projects.',
    empty: 'No projects published yet.',
    detail: 'Details',
    repo: 'Repo',
    demo: 'Demo',
  },
  blogPage: {
    heading: 'Blog',
    lede: 'Notes on backend systems, architecture, and engineering.',
    empty: 'No posts published yet.',
    draftChip: 'Draft',
  },
  cvPage: {
    heading: 'CV',
    lede: 'PDF for applications; the up-to-date technical work lives on',
    ledeLinkLabel: 'GitHub',
    hint: 'Download a short résumé, or browse the full history on GitHub.',
    downloadPdf: 'Download PDF',
    viewGithub: 'View GitHub',
    cvPdfHref: 'assets/cv.pdf',
  },
  projectDetail: {
    back: 'Projects',
    code: 'Code',
    demo: 'Demo',
    notFound: 'No project found for that link.',
    backButton: 'Back',
  },
  postDetail: {
    back: 'Blog',
    draftChip: 'Draft (dev)',
    notFound: 'No post found for that link.',
    backButton: 'Back',
  },
};
