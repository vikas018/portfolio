# Vikas Yadav — portfolio

A personal developer portfolio. One scrolling page (hero, selected work, how I
work, stack, footer) plus one route per case study at `/work/[slug]`.

Built to be fast, accessible, and readable with JavaScript disabled. Static
export — it deploys as plain HTML/CSS/JS files, no server.

## Stack

- **Next.js** (App Router) with TypeScript, `output: 'export'` (static site)
- **Tailwind CSS v4** — design tokens as CSS variables, no component library
- **MDX** for case-study prose
- `next/font` (Fraunces + Inter), `next/image`
- Deploys to **Vercel**

No CMS, no database, no auth. All content lives in the repo.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build the static site

```bash
npm run build
```

The exported site lands in `out/`. That folder is what gets deployed.

## Where the content lives

Everything you'd edit as prose is separated from the code:

| What | Where |
| --- | --- |
| Name, role, tagline, email, links, **site URL** | `src/lib/site.ts` |
| Case-study prose (the five sections) | `content/work/*.mdx` |
| Case-study titles, summaries, stack, links, order | `content/work/index.ts` |
| "How I work" + "Stack" copy | `src/app/page.tsx` |
| Colours, fonts, spacing (design tokens) | `src/app/globals.css` (`:root`) |

You can rewrite any case study by editing its `.mdx` file — no code involved.

## Adding a fourth case study

1. Create `content/work/your-slug.mdx`. Use the same five headings as the
   others: **What it is**, **The constraint**, **The decision**, **How it's
   built**, **What I'd change**.
2. In `content/work/index.ts`, import it and add one entry to the
   `caseStudies` array (set `slug`, `title`, `context`, `period`, `summary`,
   `stack`, and `repo`/`demo` or `comingSoon`). Array order = page order.
3. Drop a screenshot at `public/work/your-slug.webp` and set the `image` field.
   Until then the page shows a "Screenshot coming soon" placeholder.

That's it — the home-page card, the `/work/your-slug/` route, the sitemap, and
metadata all pick it up automatically.

## Assets you still need to add

- `public/resume.pdf` — currently a **placeholder**. Replace with the final CV.
- `public/work/vconstruct.webp` — screenshot/GIF of the document viewer + 2D mapper.
- `public/work/persona-reply.webp` — screenshot of persona-reply.
- (Xceedance is under NDA — no screenshot expected.)

Save screenshots as **WebP**, roughly 1100×680, then set the `image` field on
that case study in `content/work/index.ts`.

## The social-share (OG) image

`public/og.png` is generated, not hand-drawn:

```bash
npm run og
```

Edit `scripts/gen-og.mjs` to change it, then re-run. It's committed as a static
file so nothing is generated at request time.

## Custom domain

The whole site reads its URL from one place: `site.url` in `src/lib/site.ts`.
It currently points at the Vercel preview URL. When you buy a domain, change
that one value (and point the domain at Vercel in the dashboard) — OG tags,
canonical URLs, and the sitemap all update from it.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import it in Vercel. It auto-detects Next.js; no configuration needed.
3. Vercel serves the static export. Done.
