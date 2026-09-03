// Generates public/og.png (1200x630) — the social-share card.
// Run with `npm run og`. Rasterises an SVG with sharp so there is no runtime
// image generation (keeps the site a pure static export). Uses system serif/
// sans fonts so it needs no font files checked into the repo.
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, '..', 'public', 'og.png')

const W = 1200
const H = 630
const BG = '#faf9f7'
const FG = '#1c1b19'
const MUTED = '#6f6b64'
const ACCENT = '#a5402d'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect x="0" y="0" width="${W}" height="10" fill="${ACCENT}"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="80" y="150" font-size="24" letter-spacing="3" font-weight="700" fill="${ACCENT}">${esc(
      'SENIOR SOFTWARE ENGINEER · XCEEDANCE'
    )}</text>
  </g>
  <g font-family="Georgia, 'Times New Roman', serif">
    <text x="76" y="300" font-size="128" fill="${FG}">Vikas Yadav</text>
  </g>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="80" y="380" font-size="30" fill="${MUTED}">Seven years in. Frontend depth, with real backend</text>
    <text x="80" y="424" font-size="30" fill="${MUTED}">and testing ownership.</text>
    <text x="80" y="560" font-size="24" fill="${MUTED}">github.com/vikas018 · linkedin.com/in/vikas-yadav018</text>
  </g>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(out)
console.log('Wrote', out)
