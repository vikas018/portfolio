// Single source of truth for site-wide facts. Editing these updates the whole
// site (metadata, footer, hero, sitemap). No values are invented — see README.

export const site = {
  name: 'Vikas Yadav',
  role: 'Senior Software Engineer',
  company: 'Xceedance',
  location: 'Noida, India',

  // TODO(vikas): swap for your custom domain (e.g. https://vikasyadav.dev) once
  // you buy one. Everything below (OG tags, sitemap) reads from this one value.
  url: 'https://vikasyadav018.vercel.app',

  // One-sentence positioning — the through-line of the whole site.
  tagline:
    'Senior frontend engineer, seven years in. Four of them building a construction-tech SaaS product end to end — React on the front, Rails underneath. Now working in insurance technology.',

  // Shorter version for meta description / OG.
  description:
    'Senior frontend engineer with seven years of experience. Four years building a construction-tech SaaS product end to end in React and Rails; now in insurance technology. Frontend depth with real backend and testing ownership.',

  emails: ['vkyadav018@gmail.com', 'vikas.yadav2@xceedance.com'],

  links: {
    github: 'https://github.com/vikas018',
    linkedin: 'https://www.linkedin.com/in/vikas-yadav018',
    // TODO(vikas): replace public/resume.pdf with your final CV (the current
    // one is a placeholder copy of Vikas_CV.pdf — see README).
    resume: '/resume.pdf',
  },
} as const

export type Site = typeof site
