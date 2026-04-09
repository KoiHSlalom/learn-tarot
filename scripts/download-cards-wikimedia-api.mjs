import { mkdir, writeFile, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'cards')
const WIKI_FILEPATH = 'https://commons.wikimedia.org/wiki/Special:FilePath'
const WIKI_API = 'https://commons.wikimedia.org/w/api.php'
const TAROT_API = 'https://tarotapi.dev/api/v1/cards'
const DELAY_MS = 3000
const MAX_RETRIES = 3

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function exists(nameShort) {
  try { await access(join(OUT, `${nameShort}.jpg`)); return true } catch { return false }
}

async function downloadFileByNameShort(nameShort, filename) {
  const url = `${WIKI_FILEPATH}/${encodeURIComponent(filename)}?width=1200`
  let attempt = 0
  while (attempt < MAX_RETRIES) {
    attempt++
    const res = await fetch(url, { redirect: 'follow' })
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer())
      await writeFile(join(OUT, `${nameShort}.jpg`), buf)
      return buf.length
    }
    // if rate limited, wait longer and retry
    if (res.status === 429) {
      const wait = DELAY_MS * attempt
      console.warn(`  429 for ${filename}, retrying after ${wait}ms (attempt ${attempt})`)
      await sleep(wait)
      continue
    }
    throw new Error(`${res.status} ${url}`)
  }
  throw new Error(`failed after ${MAX_RETRIES} attempts: ${url}`)
}

async function findFileOnCommons(query) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    list: 'search',
    srwhat: 'text',
    srsearch: query,
    srnamespace: '6', // File namespace
    srlimit: '5'
  })
  const url = `${WIKI_API}?${params.toString()}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Wikimedia API error ${res.status}`)
  const data = await res.json()
  return (data.query && data.query.search) ? data.query.search.map(s => s.title) : []
}

async function main() {
  await mkdir(OUT, { recursive: true })
  console.log('Fetching card list from tarotapi...')
  const r = await fetch(TAROT_API)
  if (!r.ok) throw new Error(`Tarot API error: ${r.status}`)
  const data = await r.json()
  const cards = data.cards
  console.log(`Found ${cards.length} cards; attempting Wikimedia downloads to public/cards/`)

  for (const c of cards) {
    const nameShort = c.name_short
    if (await exists(nameShort)) { console.log(`- ${nameShort} (exists)`); continue }

    // Try searching with a few queries to increase chances
    const queries = [
      `${c.name} Pamela Colman Smith`,
      `${c.name} RWS Tarot`,
      `${c.name} Waite`,
      c.name
    ]

    let matched = null
    for (const q of queries) {
      try {
        const titles = await findFileOnCommons(q)
        if (titles && titles.length) { matched = titles[0]; break }
      } catch (e) {
        console.warn(`  search error for "${q}": ${e.message}`)
      }
      await sleep(300)
    }

    if (!matched) {
      console.warn(`✗ ${nameShort} (no file found for "${c.name}")`)
      await sleep(DELAY_MS)
      continue
    }

    // matched is like 'File:RWS_Tarot_00_Fool.jpg' — strip File:
    const filename = matched.replace(/^File:/i, '')
    try {
      const size = await downloadFileByNameShort(nameShort, filename)
      console.log(`✓ ${nameShort} <- ${filename} (${size} bytes)`)
    } catch (e) {
      console.error(`✗ ${nameShort}: download failed: ${e.message}`)
    }

    await sleep(DELAY_MS)
  }

  console.log('Done.')
}

main().catch(e => { console.error(e); process.exit(1) })
