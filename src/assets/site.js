function dailyDraw(){
  return {
    card: null,
    deck: [
      {slug:'/cards/the-fool/', title:'The Fool', keywords:'beginnings, spontaneity, trust'},
      {slug:'/cards/the-magician/', title:'The Magician', keywords:'skill, resourcefulness, manifestation'},
      {slug:'/cards/the-high-priestess/', title:'The High Priestess', keywords:'intuition, inner knowing, mystery'},
      {slug:'/cards/the-empress/', title:'The Empress', keywords:'abundance, nurturing, creativity'},
      {slug:'/cards/the-emperor/', title:'The Emperor', keywords:'authority, structure, stability'},
      {slug:'/cards/the-hierophant/', title:'The Hierophant', keywords:'tradition, guidance, belief'},
      {slug:'/cards/the-lovers/', title:'The Lovers', keywords:'love, alignment, choice'},
      {slug:'/cards/the-chariot/', title:'The Chariot', keywords:'willpower, determination, victory'},
      {slug:'/cards/strength/', title:'Strength', keywords:'courage, patience, inner strength'},
      {slug:'/cards/the-hermit/', title:'The Hermit', keywords:'solitude, introspection, wisdom'},
      {slug:'/cards/wheel-of-fortune/', title:'Wheel of Fortune', keywords:'cycles, fate, turning points'},
      {slug:'/cards/justice/', title:'Justice', keywords:'fairness, truth, cause and effect'},
      {slug:'/cards/the-hanged-man/', title:'The Hanged Man', keywords:'suspension, surrender, new perspective'},
      {slug:'/cards/death/', title:'Death', keywords:'endings, transformation, release'},
      {slug:'/cards/temperance/', title:'Temperance', keywords:'balance, patience, moderation'},
      {slug:'/cards/the-devil/', title:'The Devil', keywords:'bondage, shadow, attachment'},
      {slug:'/cards/the-tower/', title:'The Tower', keywords:'upheaval, revelation, sudden change'},
      {slug:'/cards/the-star/', title:'The Star', keywords:'hope, renewal, serenity'},
      {slug:'/cards/the-moon/', title:'The Moon', keywords:'illusion, fear, the unconscious'},
      {slug:'/cards/the-sun/', title:'The Sun', keywords:'joy, vitality, clarity'},
      {slug:'/cards/judgement/', title:'Judgement', keywords:'reflection, awakening, renewal'},
      {slug:'/cards/the-world/', title:'The World', keywords:'completion, integration, wholeness'}
    ],
    draw(){
      const i = Math.floor(Math.random()*this.deck.length);
      this.card = this.deck[i];
    }
  }
}

function journal(){
  return {
    entry: '',
    entries: JSON.parse(localStorage.getItem('tarot_journal')||'[]'),
    save(){
      if(!this.entry.trim()) return;
      this.entries.unshift({date:new Date().toLocaleString(), text:this.entry});
      localStorage.setItem('tarot_journal', JSON.stringify(this.entries));
      this.entry='';
    },
    exportJSON(){
      const data = JSON.stringify(this.entries, null, 2);
      const blob = new Blob([data], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'tarot_journal.json'; document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    }
  }
}

// Expose to global for Eleventy static pages to init on load if Alpine is present
window.dailyDraw = dailyDraw;
window.journal = journal;
