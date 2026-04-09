const fs = require('fs');
const path = require('path');
const jsonPath = '/Users/koi.hernandez/Downloads/tarot-images.json';
const publicCardsDir = path.join(__dirname, '..', 'public', 'cards');

try {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const imgs = data.cards.map(c => c.img).filter(Boolean);
  const files = fs.readdirSync(publicCardsDir);
  const existing = imgs.filter(i => files.includes(i));
  const missing = imgs.filter(i => !files.includes(i));

  console.log('TOTAL_JSON_IMAGES:', imgs.length);
  console.log('EXISTING_IN_PUBLIC_CARDS:', existing.length);
  if (existing.length) console.log(existing.join('\n'));
  console.log('---');
  console.log('MISSING:', missing.length);
  if (missing.length) console.log(missing.join('\n'));
} catch (err) {
  console.error('ERROR:', err.message);
  process.exit(1);
}
