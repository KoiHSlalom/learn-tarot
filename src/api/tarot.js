const BASE = 'https://tarotapi.dev/api/v1'

/**
 * Return the local card image path for a given API name_short (e.g. 'ar00').
 * Images live in public/cards/ and are served as /cards/{nameShort}.jpg.
 * Falls back to a blank transparent pixel for unknown slugs.
 */
export function cardImageUrl(nameShort) {
  if (!nameShort) return ''
  return `/cards/${nameShort}.jpg`
}

/**
 * Draw n random cards from the Tarot API.
 * Returns normalized card objects ready for use in the UI.
 */
export async function drawRandom(n = 1) {
  const res = await fetch(`${BASE}/cards/random?n=${n}`)
  if (!res.ok) throw new Error(`Tarot API error: ${res.status}`)
  const data = await res.json()
  return data.cards.map(normalizeCard)
}

/**
 * Fetch all cards (78 total).
 */
export async function fetchAll() {
  const res = await fetch(`${BASE}/cards`)
  if (!res.ok) throw new Error(`Tarot API error: ${res.status}`)
  const data = await res.json()
  return data.cards.map(normalizeCard)
}

/**
 * Normalize a raw API card into the shape our UI expects.
 */
function normalizeCard(c) {
  return {
    slug:       c.name_short,
    title:      c.name,
    type:       c.type,             // "major" | "minor"
    suit:       c.suit ?? null,
    value:      c.value,
    upright:    c.meaning_up,
    reversed:   c.meaning_rev,
    desc:       c.desc,
    image:      cardImageUrl(c.name_short)
  }
}
