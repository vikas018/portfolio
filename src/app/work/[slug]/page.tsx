import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { caseStudies, getCaseStudy } from '@content/work'
import { site } from '@/lib/site'
import { Footer } from '@/components/Footer'

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}
  const title = `${study.title}`
  return {
    title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}/` },
    openGraph: {
      type: 'article',
      title: `${title} — ${site.name}`,
      description: study.summary,
      url: `${site.url}/work/${study.slug}/`,
      images: ['/og.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — ${site.name}`,
      description: study.summary,
      images: ['/og.png'],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const { Body } = study

  return (
    <>
      <main id="main" className="wrap-prose case-study">
        <Link href="/#work" className="back-link">
          ← Back to work
        </Link>

        <header className="case-head">
          <p className="eyebrow">{study.context}</p>
          <h1 className="case-title">{study.title}</h1>
          <p className="case-period">{study.period}</p>

          <p className="case-links">
            {study.comingSoon ? (
              <span className="case-link-muted">Repo &amp; live demo — coming soon</span>
            ) : (
              <>
                {study.repo && (
                  <a className="link" href={study.repo} target="_blank" rel="noreferrer">
                    Repository
                  </a>
                )}
                {study.demo && (
                  <a className="link" href={study.demo} target="_blank" rel="noreferrer">
                    Live demo
                  </a>
                )}
                {!study.repo && !study.demo && (
                  <span className="case-link-muted">
                    Built under NDA — no public repo or demo
                  </span>
                )}
              </>
            )}
          </p>
        </header>

        {study.image ? (
          <figure className="case-figure">
            <Image
              src={study.image.src}
              alt={study.image.alt}
              width={1100}
              height={680}
              className="case-image"
              priority
            />
          </figure>
        ) : (
          <div className="case-figure-placeholder" role="img" aria-label="Screenshot coming soon">
            <span>Screenshot coming soon</span>
          </div>
        )}

        <article className="case-body">
          <Body />
        </article>

        <hr className="case-end-rule" />
        <Link href="/#work" className="back-link">
          ← Back to work
        </Link>
      </main>

      <Footer />
    </>
  )
}
