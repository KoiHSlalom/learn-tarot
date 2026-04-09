import fs from 'fs/promises';
import path from 'path';

const jsonPath = '/Users/koi.hernandez/Downloads/tarot-images.json';
const outPath = path.join(new URL('.', import.meta.url).pathname, 'prompts-all.json');

function sanitize(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function buildPrompt(card) {
  const title = sanitize(card.name);
  const keywords = (card.keywords || []).slice(0,6).join(', ');
  const fortune = (card.fortune_telling || [])[0] || '';
  const archetype = card.Archetype || card['Archetype'] || '';
  const elemental = card.Elemental || card['Elemental'] || '';

  return `${title} — original tarot card illustration. Key themes: ${keywords || 'symbolic, archetypal'}. Short fortune: ${fortune || 'symbolic meaning'}. Archetype: ${archetype}. Elemental association: ${elemental}. Composition: vertical portrait, 2:3 aspect ratio, ornate subtle border. Style: original, painterly tarot aesthetic (inspired by classic symbolism but not copying any existing deck), high-detail, textured brushwork, natural lighting, readable central figure or scene, symbolic props related to the suit/arcana. Color palette: choose tones that reflect the card's mood (e.g., calm blues for intuition, warm golds for joy). Output: original artwork suitable for a tarot deck, do not reproduce any copyrighted deck art.`;
}

async function main(){
  try{
    const raw = await fs.readFile(jsonPath, 'utf8');
    const data = JSON.parse(raw);
    const cards = data.cards || [];
    const prompts = cards.map(c=>({img: c.img || `${c.name.replace(/\s+/g,'_').toLowerCase()}.jpg`, name: c.name, prompt: buildPrompt(c)}));
    await fs.writeFile(outPath, JSON.stringify(prompts, null, 2), 'utf8');
    console.log('Wrote', outPath);
  }catch(err){
    console.error(err);
    process.exit(1);
  }
}

main();
