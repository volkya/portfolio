import type { SiteCopy } from './site-copy.model';

/** Fallback if `assets/site.json` fails to load. Keep aligned with that file. */
export const SITE_COPY_FALLBACK: SiteCopy = {
  brand: { toolbarTitle: 'DYMA CORREA' },
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
    heroTitle: 'Dylan Matias Correa',
    heroSubtitle: 'Senior Software Engineer · Cloud & Solutions Architecture · Remote (GMT-3)',
    heroBody:
      "I design end-to-end solutions for cloud-native systems: clear boundaries, trade-offs, and architectures that hold up under load.\n\nStrong on the backend (Java, Kotlin, Go) with frontend when the product needs it (Angular, React)—microservices, events, and observability on AWS and Kubernetes.\n\nI'm growing toward solutions architecture and AI-aware backends: real-time processing, resilient platforms, and practical AI integration.",
    stackAriaLabel: 'Core stack',
    stackLabel: 'Stack',
    stackItems:
      'Java · Kotlin · Go · Node.js · Python · Angular · React · AWS · Kubernetes · Docker · Terraform · ArgoCD · Prometheus · Microservices · Observability',
    ctaProjects: 'PROJECTS',
    ctaCv: 'View CV',
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
    hint: 'Open the PDF online (anyone with the link can view), or browse the full history on GitHub.',
    downloadPdf: 'View CV',
    viewGithub: 'View GitHub',
    cvPdfHref: 'https://drive.google.com/file/d/1_mhwXQLwrHxt-lxcXVvxc7zH42MWw3_R/view?usp=sharing',
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
