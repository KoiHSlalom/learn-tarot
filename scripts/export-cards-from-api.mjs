import { writeFile } from 'node:fs/promises'

const BASE = 'https://tarotapi.dev/api/v1'

function slugify(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function quote(s) {
  return JSON.stringify(s || '')
}

async function main() {
  console.log('Fetching all cards from tarotapi.dev...')
  const res = await fetch(`${BASE}/cards`)
  if (!res.ok) throw new Error(`Tarot API error: ${res.status}`)
  const data = await res.json()
  const cards = data.cards.map((c, i) => {
    return {
      id: i,
      slug: slugify(c.name),
      nameShort: c.name_short,
      title: c.name,
      numeral: c.value ?? '',
      keywords: [],
      upright: c.meaning_up ?? '',
      reversed: c.meaning_rev ?? '',
      journalPrompt: ''
    }
  })

  const lines = []
  lines.push('export const cards = [')
  for (const card of cards) {
    lines.push('  {')
    lines.push(`    id: ${card.id},`)
    lines.push(`    slug: ${quote(card.slug)},`)
    lines.push(`    nameShort: ${quote(card.nameShort)},`)
    lines.push(`    title: ${quote(card.title)},`)
    lines.push(`    numeral: ${quote(card.numeral)},`)
    lines.push(`    keywords: ${JSON.stringify(card.keywords)},`)
    lines.push(`    upright: ${quote(card.upright)},`)
    lines.push(`    reversed: ${quote(card.reversed)},`)
    lines.push(`    journalPrompt: ${quote(card.journalPrompt)}`)
    lines.push('  },')
  }
  lines.push(']')
  lines.push('')
  lines.push('export function getCardBySlug(slug) {')
  lines.push('  return cards.find(c => c.slug === slug) || null')
  lines.push('}')
  lines.push('')

  const out = lines.join('\n')
  const path = './src/data/cards.js'
  await writeFile(path, out, 'utf8')
  console.log(`Wrote ${cards.length} cards to ${path}`)
}

main().catch(e => { console.error(e); process.exit(1) })
