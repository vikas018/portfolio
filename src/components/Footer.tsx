import Link from 'next/link'
import { site } from '@/lib/site'

export function Footer() {
  const year = 2026 // TODO(vikas): bump on a new year, or wire to build date if preferred.
  return (
    <footer className="site-footer">
      <div className="wrap-prose">
        <hr />
        <div className="footer-row">
          <div className="footer-links">
            <a className="link" href={`mailto:${site.emails[0]}`}>
              {site.emails[0]}
            </a>
            <a className="link" href={site.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="link" href={site.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <Link className="link" href="/colophon/">
              Colophon
            </Link>
          </div>
          <p className="footer-meta">
            {site.location} · © {year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
