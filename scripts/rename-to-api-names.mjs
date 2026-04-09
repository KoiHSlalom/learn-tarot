import fs from 'fs/promises';
import path from 'path';
import https from 'https';

const publicCards = path.join(new URL('.', import.meta.url).pathname, '..', 'public', 'cards');
const jsonPath = '/Users/koi.hernandez/Downloads/tarot-images.json';
const API = 'https://tarotapi.dev/api/v1/cards';

async function fetchJSON(url){
  return new Promise((resolve,reject)=>{
    https.get(url,res=>{
      let raw=''; res.on('data',c=>raw+=c); res.on('end',()=>{try{resolve(JSON.parse(raw))}catch(e){reject(e)}});
    }).on('error',reject);
  });
}

async function main(){
  try{
    const data = await fetchJSON(API);
    const apiCards = data.cards; // array with name and name_short
    const local = JSON.parse(await fs.readFile(jsonPath,'utf8'));
    const mapping = new Map(local.cards.map(c=>[c.name.trim(), c.img]));

    const files = new Set(await fs.readdir(publicCards));
    const ops = [];
    const missing = [];

    for(const c of apiCards){
      const name = c.name.trim();
      const apiShort = c.name_short;
      const localImg = mapping.get(name);
      if(!localImg){
        missing.push({name, apiShort, reason:'no-local-json-entry'});
        continue;
      }
      const srcPath = path.join(publicCards, localImg);
      const dstName = `${apiShort}.jpg`;
      const dstPath = path.join(publicCards, dstName);
      if(!files.has(localImg)){
        missing.push({name, apiShort, localImg, reason:'file-not-found'});
        continue;
      }
      if(localImg === dstName){
        // already correct name
        ops.push({name, from:localImg, to:dstName, status:'skipped-same'});
      } else {
        // If destination exists, remove it first
        try{
          await fs.unlink(dstPath).catch(()=>{});
        }catch(e){}
        await fs.rename(srcPath, dstPath);
        ops.push({name, from:localImg, to:dstName, status:'renamed'});
        files.delete(localImg);
        files.add(dstName);
      }
    }

    await fs.writeFile(path.join(new URL('.', import.meta.url).pathname, 'rename-log.json'), JSON.stringify({ops,missing}, null, 2));
    console.log('Done. Wrote rename-log.json. Renamed:', ops.length, 'missing:', missing.length);
  }catch(err){
    console.error('ERROR', err);
    process.exit(1);
  }
}

main();
