export interface NavItemCopy {
  path: string;
  label: string;
  exact?: boolean;
}

export interface SiteCopy {
  brand: { toolbarTitle: string };
  social: { githubUrl: string; githubAriaLabel: string };
  contact: { email: string };
  footer: { cvLabel: string; githubLabel: string };
  nav: NavItemCopy[];
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroBody: string;
    stackAriaLabel: string;
    stackLabel: string;
    stackItems: string;
    ctaProjects: string;
    ctaBlog: string;
  };
  projectsPage: {
    heading: string;
    lede: string;
    empty: string;
    detail: string;
    repo: string;
    demo: string;
  };
  blogPage: {
    heading: string;
    lede: string;
    empty: string;
    draftChip: string;
  };
  cvPage: {
    heading: string;
    lede: string;
    ledeLinkLabel: string;
    hint: string;
    downloadPdf: string;
    viewGithub: string;
    cvPdfHref: string;
  };
  projectDetail: {
    back: string;
    code: string;
    demo: string;
    notFound: string;
    backButton: string;
  };
  postDetail: {
    back: string;
    draftChip: string;
    notFound: string;
    backButton: string;
  };
}
