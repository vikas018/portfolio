import Link from 'next/link'
import type { CaseStudy } from '@content/work'

export function WorkCard({ study, index }: { study: CaseStudy; index: number }) {
  const n = String(index + 1).padStart(2, '0')
  return (
    <Link href={`/work/${study.slug}/`} className="work-card" aria-label={`Read case study: ${study.title}`}>
      <div className="work-card-top">
        <span className="work-card-num" aria-hidden="true">
          {n}
        </span>
        <span className="eyebrow">{study.context}</span>
      </div>

      <h3 className="work-card-title">{study.title}</h3>
      <p className="work-card-summary">{study.summary}</p>

      <ul className="work-card-stack" aria-label="Built with">
        {study.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className="work-card-foot">
        <span className="work-card-period">{study.period}</span>
        <span className="work-card-cta" aria-hidden="true">
          Read case study →
        </span>
      </div>
    </Link>
  )
}
