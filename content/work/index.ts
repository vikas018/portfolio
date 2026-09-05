import type { ComponentType } from 'react'
import VConstruct from './vconstruct.mdx'
import Xceedance from './xceedance.mdx'
import MudgalTea from './mudgal-tea.mdx'
import PersonaReply from './persona-reply.mdx'

// The registry of case studies. Prose lives in the .mdx files above; the
// card/route metadata lives here. To add a fourth case study: create a new
// .mdx file, then add one entry to this array. Order here = order on the page.
export type CaseStudy = {
  slug: string
  title: string
  context: string // company / setting, shown as an eyebrow
  period: string
  /** 1–2 sentence summary for the work card on the home page. */
  summary: string
  stack: string[]
  repo?: string | null
  demo?: string | null
  /** true = links are shown as "Coming soon" instead of real URLs. */
  comingSoon?: boolean
  /** Screenshot at the top of the case study. null until the asset exists. */
  image?: { src: string; alt: string } | null
  Body: ComponentType
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'vconstruct',
    title: 'A document viewer and 2D asset mapper for construction teams',
    context: 'vConstruct / VueOps',
    period: '2021 – 2025 · 4 years',
    summary:
      'The flagship of four years: an in-browser viewer for large construction drawings, with a 2D layout mapper that pins live asset data onto the plans. Built on the Apryse (PDFtron) SDK in React, backed by Rails.',
    stack: ['React', 'TypeScript', 'Apryse (PDFtron) SDK', 'Ruby on Rails', 'Redux', 'Storybook'],
    repo: null,
    demo: null,
    comingSoon: false,
    image: null, // TODO(vikas): add public/work/vconstruct.webp (see README)
    Body: VConstruct,
  },
  {
    slug: 'xceedance',
    title: 'Form-driven internal tooling for insurance workflows',
    context: 'Xceedance',
    period: '2025 – present',
    summary:
      'Internal tools for insurance operations, built in React with Form.io so non-engineers can define and change complex forms without a deploy. Product specifics are under NDA.',
    stack: ['React', 'Form.io', 'JavaScript', 'REST APIs'],
    repo: null,
    demo: null,
    comingSoon: false,
    image: null,
    Body: Xceedance,
  },
  {
    slug: 'mudgal-tea',
    title: 'Mudgal Tea — a WhatsApp-ordering site for a tea shop',
    context: 'Personal project · Side business',
    period: 'Live · built end to end',
    summary:
      'The marketing and ordering site for my family’s tea & coffee shop in Meerut — designed, built, and shipped by me. React and TypeScript, with WhatsApp-based ordering instead of a checkout, and full local-business SEO. Live and in use.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'GitHub Pages'],
    repo: 'https://github.com/vikas018/MudgalTea',
    demo: 'https://vikas018.github.io/MudgalTea/',
    comingSoon: false,
    image: {
      src: '/work/mudgal-tea.webp',
      alt: 'The Mudgal Tea homepage: a cup of tea with the site’s navigation and “Discover the finest Indian teas” heading',
    },
    Body: MudgalTea,
  },
  {
    slug: 'persona-reply',
    title: 'persona-reply — YouTube comment replies in the creator’s own voice',
    context: 'Personal project',
    period: '2025',
    summary:
      'A tool that drafts three tone-matched replies to a creator’s YouTube comments, which they review and post by hand. React + Vite front end, a thin Express proxy holding the LLM key. Here to show I keep current with AI tooling.',
    stack: ['React', 'Vite', 'YouTube Data API v3', 'Express', 'Gemini API'],
    repo: null,
    demo: null,
    comingSoon: true,
    image: null,
    Body: PersonaReply,
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
