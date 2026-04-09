/**
 * download-cards.mjs
 * One-time script: downloads 22 Major Arcana RWS card images (public domain,
 * Pamela Coleman Smith 1909) from Wikimedia Commons into public/cards/.
 *
 * Run once: node scripts/download-cards.mjs
 */

import { mkdir, writeFile, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'cards')

// Mapping: API name_short → Wikimedia Commons filename
const CARDS = {
  ar00: 'RWS_Tarot_00_Fool.jpg',
  ar01: 'RWS_Tarot_01_Magician.jpg',
  ar02: 'RWS_Tarot_02_High_Priestess.jpg',
  ar03: 'RWS_Tarot_03_Empress.jpg',
  ar04: 'RWS_Tarot_04_Emperor.jpg',
  ar05: 'RWS_Tarot_05_Hierophant.jpg',
  ar06: 'RWS_Tarot_06_Lovers.jpg',
  ar07: 'RWS_Tarot_07_Chariot.jpg',
  ar08: 'RWS_Tarot_08_Strength.jpg',
  ar09: 'RWS_Tarot_09_Hermit.jpg',
  ar10: 'RWS_Tarot_10_Wheel_of_Fortune.jpg',
  ar11: 'RWS_Tarot_11_Justice.jpg',
  ar12: 'RWS_Tarot_12_Hanged_Man.jpg',
  ar13: 'RWS_Tarot_13_Death.jpg',
  ar14: 'RWS_Tarot_14_Temperance.jpg',
  ar15: 'RWS_Tarot_15_Devil.jpg',
  ar16: 'RWS_Tarot_16_Tower.jpg',
  ar17: 'RWS_Tarot_17_Star.jpg',
  ar18: 'RWS_Tarot_18_Moon.jpg',
  ar19: 'RWS_Tarot_19_Sun.jpg',
  ar20: 'RWS_Tarot_20_Judgement.jpg',
  ar21: 'RWS_Tarot_21_World.jpg',
}

const WIKI = 'https://commons.wikimedia.org/wiki/Special:FilePath'
const DELAY_MS = 2500 // stay well under Wikimedia rate limits

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function alreadyDownloaded(nameShort) {
  try { await access(join(OUT, `${nameShort}.jpg`)); return true } catch { return false }
}

async function download(nameShort, wikiFile) {
  const url = `${WIKI}/${encodeURIComponent(wikiFile)}?width=300`
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const dest = join(OUT, `${nameShort}.jpg`)
  await writeFile(dest, buf)
  return `${nameShort} (${buf.length} bytes)`
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const entries = Object.entries(CARDS)
  console.log(`Downloading ${entries.length} Major Arcana images → public/cards/\n`)

  for (const [nameShort, wikiFile] of entries) {
    if (await alreadyDownloaded(nameShort)) {
      console.log(`  – ${nameShort} (already exists, skipping)`)
      continue
    }
    try {
      const info = await download(nameShort, wikiFile)
      console.log(`  ✓ ${info}`)
    } catch (e) {
      console.error(`  ✗ ${nameShort}: ${e.message}`)
    }
    await sleep(DELAY_MS)
  }
  console.log('\nDone.')
}

main().catch(e => { console.error(e); process.exit(1) })

