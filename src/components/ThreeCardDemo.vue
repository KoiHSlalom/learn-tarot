<template>
  <div class="three-card-demo">
    <h2>Three-card Spread</h2>
    <p class="muted">Take a moment to focus on a question, then shuffle and draw three cards for a short practice reading.</p>

    <div class="cards-row">
      <div v-for="(c, i) in drawn" :key="c?.slug || i" class="demo-card">
        <template v-if="c">
          <img :src="`/cards/${c.nameShort}.jpg`" :alt="c.title" loading="lazy" />
          <div class="card-title">{{ positions[i] }}</div>
        </template>
        <div v-else class="empty-slot">—</div>
      </div>
    </div>

    <div class="controls">
      <Button label="Shuffle & Draw" icon="pi pi-random" @click="draw" />
      <Button label="Clear" class="p-button-secondary" icon="pi pi-times" @click="clear" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import { cards } from '../data/cards.js'

const drawn = ref([null, null, null])
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
}

function clear() {
  drawn.value = [null, null, null]
}

defineExpose({ drawn })
</script>

<style scoped>
.three-card-demo { margin-top: 18px; }
.controls { display:flex; gap:8px; padding-top:24px; padding-bottom:24px }
.cards-row { display:flex; gap:12px; align-items:stretch }
.demo-card { flex:1; min-width:0; display:flex; flex-direction:column; gap:8px; border:1px solid rgba(0,0,0,0.06); padding:8px; border-radius:6px; text-align:center; }
.demo-card img { width:100%; height:100%; object-fit:cover; display:block; flex:1; border-radius:4px }
.card-title { font-weight:700; margin-top:0; padding-top:4px }
.empty-slot { flex:1; min-height:220px; display:flex; align-items:center; justify-content:center; color:var(--color-muted) }
.muted { color:var(--color-muted); font-size:0.95rem }
</style>
