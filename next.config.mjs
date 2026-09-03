import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — no server needed. Deploys as plain files to Vercel.
  output: 'export',
  // Case studies live as .mdx alongside .tsx pages.
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    // Required for `output: export`: no server means no on-the-fly optimisation.
    // We ship pre-sized WebP, so this only skips the optimiser, not next/image.
    unoptimized: true,
  },
  // Emit /work/some-slug/index.html so static hosts serve clean URLs.
  trailingSlash: true,
  // This folder is the project root (a sibling project shares the parent dir).
  outputFileTracingRoot: import.meta.dirname,
}

const withMDX = createMDX({
  // Add remark/rehype plugins here if ever needed. Kept empty to stay minimal.
  options: {},
})

export default withMDX(nextConfig)
