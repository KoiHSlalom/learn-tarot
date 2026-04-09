<template>
  <div class="three-card-demo">
    <h2>Interactive 3‑Card Demo</h2>
    <p class="muted">Shuffle and draw three cards for a quick practice demo. Click a card to reveal its upright meaning.</p>

    <div class="controls">
      <Button label="Shuffle & Draw" icon="pi pi-random" @click="draw" />
      <Button label="Clear" class="p-button-secondary" icon="pi pi-times" @click="clear" />
    </div>

    <div class="cards-row">
      <div v-for="(c, i) in drawn" :key="c?.slug || i" class="demo-card" @click="toggleReveal(i)">
        <div v-if="c">
          <img :src="`/cards/${c.nameShort}.jpg`" :alt="c.title" loading="lazy" />
          <div class="card-title">{{ positions[i] }}</div>
          <div class="card-reveal" v-if="revealed[i]">
            <strong>{{ c.title }}</strong>
            <p>{{ c.upright }}</p>
          </div>
        </div>
        <div v-else class="empty-slot">—</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import { cards } from '../data/cards.js'

const drawn = ref([null, null, null])
const revealed = ref([false, false, false])
const positions = ['Past', 'Present', 'Future']

function shuffleArray(a) {
  const arr = a.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function draw() {
  const pool = cards.slice()
  const shuffled = shuffleArray(pool)
  drawn.value = [shuffled[0], shuffled[1], shuffled[2]]
  revealed.value = [false, false, false]
}

function clear() {
  drawn.value = [null, null, null]
  revealed.value = [false, false, false]
}

function toggleReveal(i) {
  revealed.value[i] = !revealed.value[i]
}
</script>

<style scoped>
.three-card-demo { margin-top: 18px; }
.controls { display:flex; gap:8px; margin-bottom:12px }
.cards-row { display:flex; gap:12px; align-items:stretch }
.demo-card { flex:1; min-width:0; display:flex; flex-direction:column; gap:8px; border:1px solid rgba(0,0,0,0.06); padding:8px; border-radius:6px; text-align:center; cursor:pointer }
.demo-card img { width:100%; height:100%; object-fit:cover; display:block; flex:1; border-radius:4px }
.card-title { font-weight:700; margin-top:0; padding-top:4px }
.card-reveal { margin-top:0; text-align:left; font-size:0.9rem; flex:0 0 auto }
.empty-slot { flex:1; min-height:220px; display:flex; align-items:center; justify-content:center; color:var(--color-muted) }
.muted { color:var(--color-muted); font-size:0.95rem }
</style>
