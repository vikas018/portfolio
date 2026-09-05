import puppeteer from 'puppeteer-core'
import sharp from 'sharp'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const OUTDIR = process.argv[2]
const SITE = 'https://vikas018.github.io/MudgalTea/'

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })

// First visit to set the origin, then suppress the intro modal, then reload clean.
await page.goto(SITE, { waitUntil: 'domcontentloaded' })
await page.evaluate(() => localStorage.setItem('mudgal_visitor_intro', 'seen'))
await page.goto(SITE, { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 2500))

const homePng = await page.screenshot({ type: 'png' })
await sharp(homePng).resize(1200, 750, { fit: 'cover', position: 'top' }).webp({ quality: 82 }).toFile(`${OUTDIR}/mudgal-tea.webp`)

// Also grab the shop page (product grid + WhatsApp buttons) as a spare option.
await page.goto(SITE + 'shop', { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 2500))
const shopPng = await page.screenshot({ type: 'png' })
await sharp(shopPng).resize(1200, 750, { fit: 'cover', position: 'top' }).webp({ quality: 82 }).toFile(`${OUTDIR}/mudgal-tea-shop.webp`)

await browser.close()
console.log('done')
