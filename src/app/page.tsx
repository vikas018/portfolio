import { site } from '@/lib/site'
import { caseStudies } from '@content/work'
import { Reveal } from '@/components/Reveal'
import { WorkCard } from '@/components/WorkCard'
import { Footer } from '@/components/Footer'

const stack = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind', 'Storybook'],
  },
  {
    label: 'Backend & data',
    items: ['Ruby on Rails', 'Node', 'Express', 'REST APIs', 'SQL'],
  },
  {
    label: 'Quality & delivery',
    items: ['RSpec', 'Unit testing', 'Git', 'Vite', 'Vercel', 'Jira'],
  },
]

export default function Home() {
  return (
    <>
      <main id="main">
        {/* 1 — Hero */}
        <section className="hero wrap-prose">
          <p className="eyebrow">{`${site.role} · ${site.company}`}</p>
          <h1 className="hero-name">{site.name}</h1>
          <p className="hero-tagline">{site.tagline}</p>
          <p className="hero-links">
            <a className="link" href={`mailto:${site.emails[0]}`}>
              {site.emails[0]}
            </a>
            <span className="hero-sep" aria-hidden="true">
              ·
            </span>
            <a className="link" href={site.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span className="hero-sep" aria-hidden="true">
              ·
            </span>
            <a className="link" href={site.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <span className="hero-sep" aria-hidden="true">
              ·
            </span>
            <a className="link" href={site.links.resume} target="_blank" rel="noreferrer">
              Résumé
            </a>
          </p>
        </section>

        {/* 2 — Selected work */}
        <section id="work" className="section wrap-wide" aria-labelledby="work-heading">
          <div className="wrap-prose section-intro">
            <hr />
            <Reveal as="h2" className="section-title" >
              <span id="work-heading">Selected work</span>
            </Reveal>
            <Reveal as="p" className="section-lede">
              Four projects, most to least substantial. Each page follows the same five
              questions: what it is, the constraint, the decision, how it&rsquo;s built, and what
              I&rsquo;d change.
            </Reveal>
          </div>

          <div className="work-grid">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={i * 60}>
                <WorkCard study={study} index={i} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* 3 — How I work */}
        <section className="section wrap-prose" aria-labelledby="how-heading">
          <hr />
          <Reveal as="h2" className="section-title">
            <span id="how-heading">How I work</span>
          </Reveal>
          <div className="prose-block">
            <Reveal as="p">
              I build a working proof of concept before I commit to an approach. A rough version
              that actually runs tells me more about a design in a day than a week of arguing about
              it on a whiteboard — so I get to running code early and let it correct me.
            </Reveal>
            <Reveal as="p">
              I treat components and tests as the way a long-lived product stays maintainable. I
              spent four years on one codebase; the parts that survived that long were the ones
              backed by a shared component library and a real test suite, and the parts that hurt
              were the ones that weren&rsquo;t. I write RSpec and unit tests because I&rsquo;ve
              lived with the difference.
            </Reveal>
            <Reveal as="p">
              I use AI tooling to scaffold fast, then review everything by hand. It&rsquo;s good at
              the first draft and the boilerplate; it is not accountable for what ships. I read
              every line before it goes in.
            </Reveal>
            <Reveal as="p">
              I ship small and narrow. A change I can reason about, test, and reverse beats a big
              one I&rsquo;m hoping is right. Range matters to me — frontend depth, backend in Rails,
              tests, a design system — but the habit underneath all of it is keeping each step
              small enough to be sure of.
            </Reveal>
          </div>
        </section>

        {/* 4 — Stack */}
        <section className="section wrap-prose" aria-labelledby="stack-heading">
          <hr />
          <Reveal as="h2" className="section-title">
            <span id="stack-heading">Stack</span>
          </Reveal>
          <Reveal as="p" className="section-lede">
            Grouped by what I do with it. Only things I&rsquo;ve shipped with.
          </Reveal>
          <dl className="stack-grid">
            {stack.map((group) => (
              <Reveal key={group.label} className="stack-group">
                <dt className="stack-label">{group.label}</dt>
                <dd className="stack-items">{group.items.join(', ')}</dd>
              </Reveal>
            ))}
          </dl>
        </section>
      </main>

      <Footer />
    </>
  )
}
