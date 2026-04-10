<template>
  <div>
    <div class="page-header">
      <h1>Card Library</h1>
      <p class="muted" style="margin-bottom:24px">The tarot deck contains 78 cards split into the Major and Minor Arcana: 22 Major Arcana cards and 56 Minor Arcana cards (four suits of 14 cards each). Click any card to read its full meaning and a journal prompt.</p>
      <div style="margin-top:12px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;justify-content:space-between;width:100%">
        <div style="display:flex;gap:8px;align-items:center;flex:1;flex-wrap:wrap">
          <button class="tab-button" :class="{'active-tab': selectedTab==='all'}" @click="selectedTab='all'">All</button>
          <button class="tab-button" :class="{'active-tab': selectedTab==='major'}" @click="selectedTab='major'">Major</button>
          <button class="tab-button" :class="{'active-tab': selectedTab==='cups'}" @click="selectedTab='cups'">Cups</button>
          <button class="tab-button" :class="{'active-tab': selectedTab==='wands'}" @click="selectedTab='wands'">Wands</button>
          <button class="tab-button" :class="{'active-tab': selectedTab==='swords'}" @click="selectedTab='swords'">Swords</button>
          <button class="tab-button" :class="{'active-tab': selectedTab==='pentacles'}" @click="selectedTab='pentacles'">Pentacles</button>
        </div>
        <!-- Reset button removed per request -->
        <div style="color:var(--color-muted);font-size:0.85rem;text-align:right;min-width:120px">Showing {{ filteredCards.length }} cards</div>
      </div>
      <Transition name="fade" mode="out-in">
        <p v-if="tabDescriptor" :key="selectedTab" class="tab-descriptor">{{ tabDescriptor }}</p>
      </Transition>
    </div>
    <TransitionGroup name="card-list" tag="div" class="card-grid">
      <Card
        v-for="card in filteredCards"
        :key="card.slug"
        class="card-tile"
        @click="router.push(`/cards/${card.slug}`)"
      >
        <template #title>
          <div style="display:flex;align-items:center;gap:8px;font-weight:600;font-size:1rem">
            <span class="numeral-chip">{{ toRoman(card.numeral) }}</span>
            <span class="title-sep">|</span>
            <span>{{ card.title }}</span>
          </div>
        </template>
        <template #content>
          <div class="card-img-wrap is-loading">
            <img
              :src="imageUrl(card.nameShort)"
              :alt="card.title"
              class="card-image-tile"
              loading="lazy"
              @load="e => e.target.closest('.card-img-wrap').classList.remove('is-loading')"
              @error="e => e.target.style.display='none'"
            />
          </div>
        </template>
      </Card>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import Card from 'primevue/card'
import { cards } from '../data/cards.js'
import { cardImageUrl } from '../api/tarot.js'
const router = useRouter()

function toRoman(n) {
  const wordMap = {
    ace: 'A', two: 'II', three: 'III', four: 'IV', five: 'V',
    six: 'VI', seven: 'VII', eight: 'VIII', nine: 'IX', ten: 'X',
    page: 'Pg', knight: 'Kn', queen: 'Q', king: 'K'
  }
  const lower = String(n).toLowerCase()
  if (wordMap[lower]) return wordMap[lower]
  const num = parseInt(n, 10)
  if (isNaN(num) || num === 0) return '0'
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
  const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I']
  let result = '', v = num
  for (let i = 0; i < vals.length; i++) {
    while (v >= vals[i]) { result += syms[i]; v -= vals[i] }
  }
  return result
}

function imageUrl(nameShort) {
  return cardImageUrl(nameShort)
}

// Tabs filter
const selectedTab = ref('all')

function suitFor(card){
  const ns = (card.nameShort||'').toLowerCase()
  if(ns.startsWith('cu')) return 'cups'
  if(ns.startsWith('wa')) return 'wands'
  if(ns.startsWith('pe')) return 'pentacles'
  if(ns.startsWith('sw')) return 'swords'
  if(ns.startsWith('ar')) return 'major'
  return ''
}

const filteredCards = computed(()=>{
  return cards.filter(c=>{
    const tab = selectedTab.value
    if(tab === 'all') return true
    if(tab === 'major') return !!(c.nameShort && c.nameShort.startsWith('ar'))
    const suit = suitFor(c)
    return tab === suit
  })
})

const TAB_DESCRIPTORS = {
  all: '',
  major: 'The Major Arcana are 22 cards that represent the major forces and universal themes shaping our lives — from The Fool\'s first steps into the unknown to The World\'s sense of completion and wholeness. These cards speak to big-picture energy, karmic lessons, and spiritual milestones.',
  cups: 'The Cups suit governs the realm of emotion, intuition, and relationships. Associated with the element of Water, these 14 cards explore love, grief, dreams, compassion, and the inner life — the tides of feeling that move beneath the surface of everyday experience.',
  wands: 'The Wands suit channels the energy of Fire — creativity, ambition, passion, and will. These 14 cards explore inspiration, growth, courage, and the drive to bring ideas into the world. Wands often signal action, movement, and the spark that sets things in motion.',
  swords: 'The Swords suit is aligned with Air — the element of thought, communication, and conflict. These 14 cards illuminate the power of the mind: clarity and confusion, truth and illusion, difficult decisions, and the tension between what we think and what we know.',
  pentacles: 'The Pentacles suit (also called Coins or Discs) is rooted in Earth — the domain of the physical world. These 14 cards deal with material matters: work, finances, health, home, and the tangible results of sustained effort. They remind us that the spiritual and the practical are deeply intertwined.',
}

const tabDescriptor = computed(() => TAB_DESCRIPTORS[selectedTab.value] ?? '')
</script>

<style scoped>
/* Tabs: match global design tokens */
.numeral-chip {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-gold);
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  display: inline-block;
  line-height: 1;
}

.tab-button{
  background: transparent;
  border: 1px solid transparent;
  color: var(--color-muted);
  padding: 6px 10px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.12s ease, color 0.12s ease, box-shadow 0.12s ease;
}
.tab-button:hover{
  color: var(--color-indigo);
  background: rgba(43,45,106,0.04);
}
.tab-button.active-tab{
  background: var(--color-indigo);
  color: #fff;
  box-shadow: 0 6px 18px rgba(43,45,106,0.12);
  border-color: rgba(43,45,106,0.12);
}

/* Small spacing for tab group when wrapping */
.page-header > div > div { align-items: center; }

.tab-descriptor {
  margin: 12px 0 0;
  font-size: 0.9rem;
  color: var(--color-muted);
  max-width: 680px;
  line-height: 1.65;
  border-left: 3px solid var(--color-gold);
  padding-left: 14px;
}

/* Transitions for card list (enter/leave) and FLIP move for grid reflow */
.card-list-enter-active, .card-list-leave-active {
  transition: opacity 240ms ease, transform 240ms ease;
}
.card-list-enter-from, .card-list-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.995);
}
.card-list-enter-to, .card-list-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.card-list-move {
  transition: transform 260ms cubic-bezier(.2,.8,.2,1);
}

/* Fade for the tab descriptor text */
.fade-enter-active, .fade-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.card-tile {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Pierce scoping to reach PrimeVue Card internals */
.card-tile :deep(.p-card) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-tile :deep(.p-card-body) {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.card-tile :deep(.p-card-content) {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 10px;
}

/* Make the image fill remaining card body space */
.card-tile :deep(.card-img-wrap) {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
}

.card-tile :deep(.card-img-wrap.is-loading) {
  background: linear-gradient(90deg, #f0ece6 25%, #e8e2da 50%, #f0ece6 75%);
  background-size: 200% 100%;
  animation: card-img-shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
  min-height: 160px;
}

@keyframes card-img-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.card-tile :deep(.card-image-tile) {
  flex: 1 1 auto;
  width: 100%;
  object-fit: contain;
  min-height: 0;
}

.title-sep{
  color: rgba(107,112,128,0.5);
  font-size: 0.92rem;
  display: inline-block;
  margin: 0 8px;
  line-height: 1;
  vertical-align: middle;
  transform: translateY(-1px);
}

</style>
