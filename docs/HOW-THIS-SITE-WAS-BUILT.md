# How this portfolio was built — a complete, plain-English guide

**Who this is for:** you (Vikas), so you can read every decision, understand it,
and explain it confidently in an interview — and anyone else who wants to build
a portfolio or a similar site from scratch.

**Your starting point:** you know React. This guide keeps pointing back to that:
"in plain React you'd do X; here we do Y, because…". If you understand React
components, props, and state, you can follow all of this.

**The one-line summary (memorise this for interviews):**

> It's a statically-exported Next.js site — TypeScript, Tailwind for styling,
> MDX for the case-study content — deployed on Vercel. It scores 100 on all four
> Lighthouse categories, works with JavaScript disabled, and supports dark mode.

---

## Table of contents

1. [The goal and the constraints](#1-the-goal-and-the-constraints)
2. [The tech stack, and *why* each piece](#2-the-tech-stack-and-why-each-piece)
3. [How the project is organised (file tour)](#3-how-the-project-is-organised-file-tour)
4. [The key concepts, explained](#4-the-key-concepts-explained)
5. [Build your own from zero (step by step)](#5-build-your-own-from-zero-step-by-step)
6. [Deployment: from your laptop to the internet](#6-deployment-from-your-laptop-to-the-internet)
7. [How to update the site](#7-how-to-update-the-site)
8. [Interview questions you can now answer](#8-interview-questions-you-can-now-answer)
9. [Glossary](#9-glossary)

---

## 1. The goal and the constraints

We didn't just "build a website." We built to a spec, and the spec is the story
you tell. The goal: **make a hiring manager think "this person has judgment and
has shipped real things,"** not "nice animations."

Every technical decision came from a small set of hard rules:

- **Fast.** First meaningful paint under 1.5s. No loading screen or intro animation.
- **Readable without JavaScript.** The real text is in the HTML, so search engines
  and a JS-disabled browser still see everything.
- **Accessible.** Proper headings, keyboard navigable, visible focus outlines, alt
  text, good colour contrast, and it respects "reduce motion" settings.
- **Lighthouse 95+** on Performance, Accessibility, Best Practices, SEO. (We hit 100.)
- **Minimal dependencies.** Only Next.js, React, Tailwind, and MDX tooling.

> **Interview soundbite:** "I let the constraints drive the stack. 'Readable
> without JS' and 'sub-1.5s paint' are why I chose a *static* Next.js export over
> a client-only React app."

---

## 2. The tech stack, and *why* each piece

This is the most important section for interviews. For each tool: what it is, why
we used it, and what we chose *against*.

### React
The UI library you already know — components, props, state. Everything here is
still React under the hood.

### Next.js (App Router) — instead of plain React / Create React App
**What it is:** a framework built *on top of* React. It adds file-based routing,
image/font optimisation, and — the key part for us — the ability to render pages
to plain HTML ahead of time.

**Why we used it:** a plain React app (like Create React App or a bare Vite +
React setup) ships an *empty* HTML file plus a big JavaScript bundle; the browser
then runs the JS to draw the page. That's bad for our constraints: slow first
paint, and if JS fails or is disabled, you see a blank page. Next.js lets us
generate the finished HTML in advance.

**What we chose against:** plain React (fails the "readable without JS" and speed
rules); Gatsby (heavier, more complex); a hand-rolled static site (we'd re-invent
routing, image handling, meta tags).

> **Soundbite:** "Next.js gives me React's component model *plus* real HTML in the
> initial response. That's the whole reason the site is fast and works without JS."

### Static export (`output: 'export'`) — the crucial choice
**What it is:** a Next.js setting that renders every page to a plain HTML file at
*build time*. The result is a folder of `.html`, `.css`, `.js`, and images — no
running server needed.

**Why:** a portfolio's content doesn't change per visitor. So there's no reason to
compute pages on a server for each request. Pre-build them once, serve the files.
This is the fastest and cheapest possible setup, and it's why hosting is free.

**The trade-off (know this):** because there's no server, some Next.js features
that need one are off-limits — server-side data fetching per request, on-the-fly
image resizing, dynamic Open Graph image generation. We didn't need any of them.
(That's why `next/image` is set to `unoptimized` and why the OG image is generated
by a small script instead of at request time — see below.)

> **The three "rendering" words, so you can use them correctly:**
> - **CSR** (Client-Side Rendering): browser builds the page with JS. (plain React)
> - **SSR** (Server-Side Rendering): a server builds the HTML per request.
> - **SSG** (Static Site Generation): HTML built once at build time. **← this site.**

### TypeScript — instead of plain JavaScript
JavaScript with types. It catches mistakes as you type (e.g. passing the wrong
prop) instead of at runtime in the browser. Industry-standard for React work now;
you already list it on your CV.

### Tailwind CSS (v4) — instead of a component library
**What it is:** a CSS framework where you style with small utility classes
(`flex`, `gap-4`) and, in our case, a set of **design tokens** (colours, fonts)
defined once as CSS variables.

**Why:** the brief said "no component library, no shadcn." Tailwind keeps styling
fast and consistent without shipping a big pre-made UI kit that would fight our
custom editorial look. We defined our colours as CSS variables so **dark mode is
a single automatic swap** (more on that in §4).

**What we chose against:** Material UI / Chakra / shadcn (too opinionated, heavy,
generic-looking); plain hand-written CSS files (slower, easy to get inconsistent).

### MDX — for the case-study content
**What it is:** Markdown that can also contain components. Markdown is the simple
text format with `#` for headings and `**bold**`.

**Why:** the case studies are *prose*. Writing them in `.mdx` files means you can
rewrite your case studies like editing a text document — no touching React code.
The content is deliberately separated from the code (see §3).

### next/font and next/image
- **next/font** loads our fonts (Fraunces for headings, Inter for body) and
  self-hosts them, so there's no slow request to Google's servers and **no layout
  shift** (text doesn't jump when the font loads).
- **next/image** is Next's smart image component (lazy-loads, prevents layout
  shift). Because we export statically, we set it to `unoptimized` — it still
  helps, it just doesn't resize images on a server we don't have.

### sharp (a build-time tool, not part of the site)
A fast image library. We use it in *one script* to generate the social-share
image (`og.png`). It never runs when someone visits the site.

---

## 3. How the project is organised (file tour)

```
portfolio/
├─ src/
│  ├─ app/                     ← pages & routing (Next.js App Router)
│  │  ├─ layout.tsx            ← the shared HTML shell (fonts, <head>, meta tags)
│  │  ├─ page.tsx              ← the home page (all 5 sections)
│  │  ├─ globals.css           ← design tokens + all styling
│  │  ├─ icon.svg              ← the favicon (little tab icon)
│  │  ├─ sitemap.ts            ← generates sitemap.xml (for search engines)
│  │  ├─ robots.ts             ← generates robots.txt (for search engines)
│  │  └─ work/[slug]/page.tsx  ← ONE template that renders every case study
│  ├─ components/
│  │  ├─ Reveal.tsx            ← the fade-in-on-scroll wrapper
│  │  ├─ WorkCard.tsx          ← a single case-study card on the home page
│  │  └─ Footer.tsx            ← the footer
│  └─ lib/
│     └─ site.ts               ← YOUR DETAILS (name, links, URL) in one place
├─ content/
│  └─ work/
│     ├─ index.ts              ← the LIST of case studies (order, titles, stacks)
│     ├─ vconstruct.mdx        ← case-study prose
│     ├─ xceedance.mdx
│     └─ persona-reply.mdx
├─ public/                     ← files served as-is (og.png, resume.pdf, images)
├─ scripts/gen-og.mjs          ← generates the social-share image
├─ mdx-components.tsx          ← how MDX text maps to styled HTML
├─ next.config.mjs             ← Next.js settings (static export lives here)
├─ package.json                ← dependencies + commands
└─ README.md
```

**The one idea to take away:** *content is separated from code.* Your personal
details live in `src/lib/site.ts`. Your case-study writing lives in
`content/work/`. You can update the whole site's text without opening a single
React component.

---

## 4. The key concepts, explained

These are the things an interviewer might poke at. Each one is short.

### a) File-based routing
In Next.js App Router, **folders become URLs**. `app/page.tsx` is the home page
(`/`). `app/work/[slug]/page.tsx` handles `/work/anything`. The `[slug]` in square
brackets means "a variable part of the URL" — so one file renders *all three* case
studies. `slug` becomes `vconstruct`, `xceedance`, or `persona-reply`.

### b) `generateStaticParams` — telling the build which pages to make
Because there's no server, Next.js needs to know *in advance* every case-study URL
to build. `generateStaticParams` returns the list of slugs, and Next builds one
HTML file per slug. This is the static-export version of "here are all my dynamic
pages."

### c) Server Components vs Client Components (`'use client'`)
This trips people up, so know it. In the App Router, components run **on the build
machine by default** (they produce HTML and ship *zero* JavaScript). If a
component needs the browser — state, effects, event handlers, things like
`IntersectionObserver` — you put `'use client'` at the top of the file.

- Almost everything here is a **server component** (no JS shipped → fast).
- Only `Reveal.tsx` is a **client component**, because the scroll animation needs
  the browser.

> **Soundbite:** "I keep components server-rendered by default and only opt into
> client-side JS where I actually need the browser — that's why the JS bundle is
> tiny."

### d) Design tokens + dark mode (the neat trick)
In `globals.css` we define colours as **CSS variables** on `:root`:

```css
:root { --bg: #faf9f7; --fg: #1c1b19; --accent: #a5402d; }

@media (prefers-color-scheme: dark) {
  :root { --bg: #161513; --fg: #ece8e1; --accent: #e0917a; }
}
```

Every colour in the site points at a variable (`var(--bg)`), never a fixed value.
So when someone's device is in dark mode, the browser swaps the variables and the
**whole site re-themes automatically** — no JavaScript, no theme toggle, no flash
of the wrong colours. `prefers-color-scheme` is the browser telling us the user's
system setting.

> **Soundbite:** "Dark mode is pure CSS — variables plus a `prefers-color-scheme`
> media query. Zero JS, so there's no flicker on load."

### e) The fade-in animation, done *accessibly*
The gentle "fade and rise" as sections scroll into view uses **IntersectionObserver**
(a browser API that tells you when an element enters the screen). But we did it
carefully so it never breaks the page:

- **Without JavaScript:** content is fully visible (we never hide it by default).
  The hidden-then-reveal state is only added *after* JS confirms it's present (a
  tiny script adds a `js` class to the page).
- **If the user prefers reduced motion:** all animation is switched off via a
  `prefers-reduced-motion` media query. This is an accessibility requirement —
  motion can cause nausea for some people.

> **Soundbite:** "The animation is progressive enhancement — the page works
> perfectly without it, and it turns itself off for users who've asked for reduced
> motion."

### f) Accessibility (why we scored 100)
Concrete things we did: real semantic HTML (`<header>`, `<main>`, `<section>`,
`<footer>`); one `<h1>`, then `<h2>`/`<h3>` in order; a "Skip to content" link for
keyboard users; visible focus outlines; `alt` text on images; colour contrast that
passes AA in both light and dark; and the reduced-motion support above.

### g) SEO & sharing
- **Metadata** (the page `<title>`, description, and Open Graph tags) is set in
  `layout.tsx`. Open Graph tags are what make a rich preview card appear when you
  paste your link on LinkedIn/WhatsApp.
- **`og.png`** is that preview image, generated by `scripts/gen-og.mjs`.
- **`sitemap.xml`** lists every page for search engines; **`robots.txt`** tells
  crawlers they're welcome. Both are generated automatically from your list of
  case studies.

### h) Performance & the Lighthouse scores
**Lighthouse** is a free auditing tool (built into Chrome) that scores a page 0–100
on four things: **Performance, Accessibility, Best Practices, SEO.** We scored
**100 on all four**. Why we could: static HTML (nothing to compute), a tiny JS
bundle (~107 kB), self-hosted fonts (no layout shift), and the accessibility work
above. (One early miss: a missing favicon caused a console 404 that cost 4 points
on Best Practices — adding `icon.svg` fixed it. Good detail to mention: you
measure, find the specific issue, fix it.)

---

## 5. Build your own from zero (step by step)

If you (or anyone) wanted to reproduce this, here's the path. You need **Node.js**
installed (get it from nodejs.org).

1. **Create the project folder** and, inside it, a `package.json` listing Next,
   React, Tailwind, and MDX. Then run `npm install` to download them.
2. **Add config files:** `next.config.mjs` (turn on `output: 'export'` and MDX),
   `postcss.config.mjs` (turn on Tailwind), `tsconfig.json` (TypeScript settings).
3. **Set up styling first:** create `globals.css`, define your colour and font
   tokens as CSS variables, add the dark-mode media query.
4. **Create the shell:** `app/layout.tsx` — loads the fonts, sets the meta tags,
   wraps every page.
5. **Put your details in one file:** `src/lib/site.ts` (name, role, email, links).
6. **Build the home page:** `app/page.tsx` — hero, work, how-I-work, stack, footer,
   pulling text from `site.ts`.
7. **Add the content layer:** `content/work/*.mdx` for the writing, and an
   `index.ts` that lists them.
8. **Add the case-study template:** `app/work/[slug]/page.tsx` with
   `generateStaticParams`.
9. **Add the extras:** `sitemap.ts`, `robots.ts`, `icon.svg`, and the OG image script.
10. **Check it:** `npm run dev` to view it locally; `npm run build` to produce the
    static site; run Lighthouse and fix anything under 95.

The order matters: **tokens and layout first, content second, polish last.**

---

## 6. Deployment: from your laptop to the internet

Three tools, three jobs. Know what each one does:

- **Git** — version control *on your computer*. It takes snapshots ("commits") of
  your code so you have a history and can undo.
- **GitHub** — a website that stores your Git repository *in the cloud*. It's the
  shared copy.
- **Vercel** — the host. It watches your GitHub repo and, on every change,
  automatically builds the site and serves it to the world.

The flow we used:

1. `git init` — start tracking the folder.
2. `git add -A` then `git commit -m "..."` — take a snapshot.
3. Create an empty repo on GitHub.
4. `git remote add origin <url>` — link your local repo to the GitHub one. ("remote"
   = the cloud copy's address.)
5. `git push` — upload your snapshots to GitHub.
6. In Vercel: **Import** the GitHub repo → **Deploy**. Vercel auto-detects Next.js.
7. Vercel gives a live URL; we renamed it to `vikasyadav018.vercel.app` in the
   project's **Domains** settings.

**From now on:** `git add -A` → `git commit -m "message"` → `git push`, and Vercel
redeploys automatically in about a minute. That's the whole update loop.

> **Soundbite:** "It's a Git-based deploy: I push to GitHub, Vercel builds and
> ships it. Every commit to `main` becomes a deployment."

---

## 7. How to update the site

- **Change your name, email, links, or the site URL:** edit `src/lib/site.ts`.
- **Rewrite a case study:** edit its `.mdx` file in `content/work/`.
- **Add a new case study:** create a new `.mdx` file, add one entry to
  `content/work/index.ts` (title, summary, stack, links). The home-page card, the
  URL, the sitemap, and the meta tags all update automatically.
- **Change colours or fonts:** edit the variables in `src/app/globals.css`.
- **Replace the résumé:** drop your PDF into `public/` named `resume.pdf`.
- **Add a screenshot** to a case study: put a `.webp` in `public/work/` and set the
  `image` field in `content/work/index.ts`.

After any change: `git add -A` → `git commit -m "…"` → `git push`.

---

## 8. Interview questions you can now answer

Practice saying these out loud in your own words.

**"Walk me through this project."**
> It's my portfolio, built as a statically-exported Next.js site with TypeScript
> and Tailwind. The content — my case studies — lives in MDX files, separated from
> the code, so I can edit the writing without touching React. It's deployed on
> Vercel with Git-based deploys, and it scores 100 across all four Lighthouse
> categories.

**"Why Next.js and not just React?"**
> Plain React ships an empty page and builds it in the browser with JavaScript.
> My constraints were sub-1.5-second first paint and that the page must read with
> JS disabled. Next.js lets me pre-render everything to real HTML at build time,
> which satisfies both.

**"What's static export and what's the trade-off?"**
> `output: 'export'` renders every page to a plain HTML file at build time — no
> server at runtime. Perfect for content that's the same for everyone. The
> trade-off is you lose server-only features like per-request data or on-the-fly
> image optimisation, which a portfolio doesn't need.

**"How does dark mode work?"**
> All colours are CSS variables. A `prefers-color-scheme: dark` media query swaps
> the variable values, so the whole site re-themes with zero JavaScript and no
> flash of the wrong theme on load.

**"How did you make it accessible / how did you get 100 on Lighthouse?"**
> Semantic HTML with a correct heading order, a skip link, visible focus states,
> alt text, AA colour contrast in both themes, and reduced-motion support. Plus a
> tiny JS bundle and self-hosted fonts for performance. When I found a console 404
> from a missing favicon, I fixed it to get Best Practices to 100.

**"What would you do differently / add next?"**
> Add real screenshots to the case studies, wire up a custom domain, and — if I
> needed a blog — I'd add MDX pages under a `/writing` route, since the MDX
> pipeline is already there.

---

## 9. Glossary

- **React** — the UI library; components, props, state.
- **Next.js** — a framework on top of React; adds routing and pre-rendering.
- **App Router** — Next.js's current routing system where folders map to URLs.
- **SSG / static export** — building all pages to HTML files ahead of time.
- **CSR / SSR** — building in the browser / on a server per request.
- **Server component** — renders at build time, ships no JS (the default here).
- **Client component** — needs the browser; marked with `'use client'`.
- **TypeScript** — JavaScript with types that catch errors early.
- **Tailwind** — utility-class CSS framework.
- **Design tokens** — named values (colours, fonts) reused everywhere; here, CSS
  variables.
- **CSS variable** — a reusable value like `--bg`, read with `var(--bg)`.
- **`prefers-color-scheme` / `prefers-reduced-motion`** — browser media queries
  exposing the user's system preferences.
- **MDX** — Markdown that can include components; used for the case-study prose.
- **Open Graph (OG)** — meta tags that create link-preview cards on social sites.
- **OG image** — the picture in that preview card (`og.png`).
- **sitemap.xml / robots.txt** — files that help search engines index the site.
- **Lighthouse** — Chrome's page-quality auditing tool (Performance, Accessibility,
  Best Practices, SEO).
- **Git** — local version control (snapshots of your code).
- **GitHub** — cloud storage for a Git repository.
- **remote / origin** — the address of the cloud copy of your repo.
- **commit / push** — save a snapshot / upload it to GitHub.
- **Vercel** — the host that builds and serves the site on every push.
- **IntersectionObserver** — a browser API that reports when an element scrolls
  into view.
- **Progressive enhancement** — the page works without JS; JS only *improves* it.

---

*Built by Vikas Yadav. Live at https://vikasyadav018.vercel.app*
