import { mkdir, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'cards')
const WIKI = 'https://commons.wikimedia.org/wiki/Special:FilePath'
const BASE = 'https://tarotapi.dev/api/v1'
const DELAY_MS = 1200

const sleep = ms => new Promise(r => setTimeout(r, ms))

function candidatesForName(name) {
  const safe = name.replace(/\s+/g, '_').replace(/[^A-Za-z0-9_\-]/g, '')
  return [
    `RWS_Tarot_${safe}.jpg`,
    `RWS_Tarot_${safe}.png`,
    `${safe}.jpg`,
    `${safe}.png`
  ]
}

async function downloadUrl(url) {
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) return null
  const buf = Buffer.from(await res.arrayBuffer())
  return buf
}

async function main() {
  await mkdir(OUT, { recursive: true })
  console.log('Fetching card list from tarotapi...')
  const r = await fetch(`${BASE}/cards`)
  if (!r.ok) throw new Error(`Tarot API error: ${r.status}`)
  const data = await r.json()
  const cards = data.cards
  console.log(`Found ${cards.length} cards; attempting downloads to public/cards/`)

  for (const c of cards) {
    const nameShort = c.name_short
    const dest = join(OUT, `${nameShort}.jpg`)
    try {
      // attempt candidates
      const cand = candidatesForName(c.name)
      let got = null
      for (const fn of cand) {
        const url = `${WIKI}/${encodeURIComponent(fn)}?width=800`
        try {
          const buf = await downloadUrl(url)
          if (buf) { got = { buf, fn }; break }
        } catch (e) {
          // ignore
        }
        // small pause between candidate attempts
        await sleep(200)
      }

      if (got) {
        await writeFile(dest, got.buf)
        console.log(`✓ ${nameShort} <- ${got.fn}`)
      } else {
        console.warn(`✗ ${nameShort} (no candidate matched for "${c.name}")`)
      }
    } catch (e) {
      console.error(`✗ ${nameShort}: ${e.message}`)
    }
    await sleep(DELAY_MS)
  }

  console.log('Done.')
}

main().catch(e => { console.error(e); process.exit(1) })
