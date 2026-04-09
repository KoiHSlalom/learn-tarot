import fs from 'fs/promises';
import path from 'path';

const srcJson = '/Users/koi.hernandez/Downloads/tarot-images.json';
const outFile = path.join(new URL('.', import.meta.url).pathname, '..', 'src', 'data', 'card-elements.js');

function normalizeElement(str){
  if(!str) return '';
  const s = str.toLowerCase();
  if(s.includes('air')) return 'air';
  if(s.includes('wind')) return 'air';
  if(s.includes('water')) return 'water';
  if(s.includes('sea')) return 'water';
  if(s.includes('earth')) return 'earth';
  if(s.includes('pentacle')||s.includes('earth')) return 'earth';
  if(s.includes('fire')) return 'fire';
  if(s.includes('sun') || s.includes('mars')) return 'fire';
  // fallback: look for classical words
  if(s.includes('mercury')) return 'air';
  return '';
}

async function main(){
  const raw = await fs.readFile(srcJson,'utf8');
  const data = JSON.parse(raw);
  const map = {};
  for(const c of data.cards || []){
    const title = (c.name||'').trim();
    const elemental = c.Elemental || c['Elemental'] || c.Elemental || c['Elemental'] || c['Elemental:'] || '';
    const norm = normalizeElement(elemental || c.Elemental || c['Elemental'] || c.Elemental);
    if(norm) map[title]=norm;
  }
  const out = `export default ${JSON.stringify(map,null,2)};\n`;
  await fs.mkdir(path.dirname(outFile), {recursive:true});
  await fs.writeFile(outFile, out, 'utf8');
  console.log('Wrote', outFile);
}

main().catch(err => { console.error(err); process.exit(1); });
