import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/lib/site'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Colophon',
  description:
    'How this site is built: a statically-exported Next.js site with Tailwind and MDX, scoring 100 across all four Lighthouse categories.',
  alternates: { canonical: '/colophon/' },
}

const GUIDE_URL = `${site.links.github}/portfolio/blob/main/docs/HOW-THIS-SITE-WAS-BUILT.md`

export default function ColophonPage() {
  return (
    <>
      <main id="main" className="wrap-prose case-study">
        <Link href="/" className="back-link">
          ← Back home
        </Link>

        <header className="case-head">
          <p className="eyebrow">Colophon</p>
          <h1 className="case-title">About this site</h1>
          <p className="case-period">Built by me, to a brief, from scratch</p>
        </header>

        <article className="case-body">
          <p className="cs-p">
            I built this site the way I&rsquo;d build any small product: let the constraints pick
            the tools. The brief was a fast, accessible page that reads even with JavaScript
            disabled, so I chose a <strong className="cs-strong">statically-exported</strong> stack
            over a client-only React app.
          </p>

          <h2 className="cs-h2">The stack</h2>
          <ul className="cs-ul">
            <li className="cs-li">
              <strong className="cs-strong">Next.js (App Router)</strong> with{' '}
              <strong className="cs-strong">TypeScript</strong>, exported to static HTML
              (<code className="cs-code">output: &apos;export&apos;</code>) — no server at runtime.
            </li>
            <li className="cs-li">
              <strong className="cs-strong">Tailwind CSS</strong> with design tokens as CSS
              variables, so dark mode is a pure <code className="cs-code">prefers-color-scheme</code>{' '}
              swap — no JavaScript, no flash.
            </li>
            <li className="cs-li">
              <strong className="cs-strong">MDX</strong> for the case-study prose, kept in a{' '}
              <code className="cs-code">content/</code> folder separate from the code, so the writing
              is editable without touching components.
            </li>
            <li className="cs-li">
              <code className="cs-code">next/font</code> (Fraunces + Inter, self-hosted) and{' '}
              <code className="cs-code">next/image</code>. Deployed on{' '}
              <strong className="cs-strong">Vercel</strong> with Git-based deploys.
            </li>
          </ul>

          <h2 className="cs-h2">Decisions that mattered</h2>
          <ul className="cs-ul">
            <li className="cs-li">
              <strong className="cs-strong">Static generation over client rendering.</strong> The
              content is the same for every visitor, so every page is pre-rendered to HTML at build
              time. Fast first paint, and it reads with JS off.
            </li>
            <li className="cs-li">
              <strong className="cs-strong">Server components by default.</strong> Only the
              scroll-reveal wrapper opts into client-side JavaScript, which keeps the bundle small.
            </li>
            <li className="cs-li">
              <strong className="cs-strong">Motion as progressive enhancement.</strong> The fade-in
              is added only when JavaScript is present and is switched off entirely under{' '}
              <code className="cs-code">prefers-reduced-motion</code>.
            </li>
            <li className="cs-li">
              <strong className="cs-strong">Accessibility as a requirement, not a pass.</strong>{' '}
              Semantic HTML, a real heading order, a skip link, visible focus states, alt text, and
              AA contrast in both themes.
            </li>
          </ul>

          <h2 className="cs-h2">Results</h2>
          <p className="cs-p">
            Lighthouse <strong className="cs-strong">100 / 100 / 100 / 100</strong> — Performance,
            Accessibility, Best Practices, SEO — with roughly 107&nbsp;kB of JavaScript on first
            load, and full content in the initial HTML.
          </p>

          <h2 className="cs-h2">Go deeper</h2>
          <p className="cs-p">
            I wrote a complete, plain-English build guide that explains every decision and how to
            reproduce the site from scratch.
          </p>
          <ul className="cs-ul">
            <li className="cs-li">
              <a className="cs-a" href={GUIDE_URL} target="_blank" rel="noreferrer">
                Read the full build guide
              </a>
            </li>
            <li className="cs-li">
              <a
                className="cs-a"
                href={`${site.links.github}/portfolio`}
                target="_blank"
                rel="noreferrer"
              >
                Source on GitHub
              </a>
            </li>
          </ul>
        </article>

        <hr className="case-end-rule" />
        <Link href="/" className="back-link">
          ← Back home
        </Link>
      </main>

      <Footer />
    </>
  )
}
