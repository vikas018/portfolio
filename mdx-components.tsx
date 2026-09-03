import type { MDXComponents } from 'mdx/types'

// Maps the plain elements authors write in .mdx case studies to the site's
// styled elements. Prose lives in content/work/*.mdx; this is the only place
// its typography is defined, so writers never touch styling.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="cs-h2" {...props} />,
    h3: (props) => <h3 className="cs-h3" {...props} />,
    p: (props) => <p className="cs-p" {...props} />,
    ul: (props) => <ul className="cs-ul" {...props} />,
    ol: (props) => <ol className="cs-ol" {...props} />,
    li: (props) => <li className="cs-li" {...props} />,
    a: (props) => <a className="cs-a" {...props} />,
    strong: (props) => <strong className="cs-strong" {...props} />,
    blockquote: (props) => <blockquote className="cs-quote" {...props} />,
    pre: (props) => <pre className="cs-pre" {...props} />,
    code: (props) => <code className="cs-code" {...props} />,
    hr: () => <hr className="cs-hr" />,
    ...components,
  }
}
