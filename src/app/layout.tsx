import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { site } from '@/lib/site'
import './globals.css'

// Serif for headings, clean sans for body — loaded and self-hosted by
// next/font (no external request at runtime, no layout shift).
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    siteName: site.name,
    locale: 'en_US',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.name}, ${site.role}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#161513' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        {/* Marks JS as present so the reveal animation's hidden initial state
            only applies with JS enabled — the page reads fully without JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <a href="#main" className="sr-skip">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
