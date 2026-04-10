<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">Learn Tarot</h1>
      <p class="hero-sub">
        A gentle, practical guide for beginners and new practitioners.
        Start small, build slowly, and let the cards be your mirror.
      </p>

      <div class="hero-row">
        <div class="today-card" v-if="todayCard">
          <div class="today-card-left">
            <img :src="imageUrl(todayCard.nameShort)" :alt="todayCard.title" class="today-card-img" loading="lazy" />
          </div>
          <div class="today-card-right">
            <div class="today-label">Today's Card</div>
            <div class="today-title">{{ todayCard.title }}</div>
            <p v-if="todayInterp?.imagery" class="today-imagery">{{ todayInterp.imagery }}</p>
            <p class="today-desc">{{ todayCard.upright }}</p>
            <div v-if="todayInterp" class="today-themes">
              <span v-if="todayInterp.relationships" class="today-theme-chip"><i class="pi pi-heart" style="font-size:0.7rem"></i> {{ todayInterp.relationships }}</span>
              <span v-if="todayInterp.growth" class="today-theme-chip"><i class="pi pi-sparkles" style="font-size:0.7rem"></i> {{ todayInterp.growth }}</span>
            </div>
            <div class="today-actions">
              <a class="details-link" @click.prevent="router.push(`/cards/${todayCard.slug}`)">View card details →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Divider />

    <section>
      <div class="feature-grid">
        <Card v-for="f in features" :key="f.title" class="feature-card" style="cursor:pointer" @click="router.push(f.link)">
          <template #content>
            <div class="feature-icon"><i :class="f.icon"></i></div>
            <h3>{{ f.title }}</h3>
            <p class="muted" style="margin:0">{{ f.desc }}</p>
          </template>
          <template #footer>
            <div style="font-size:0.9rem;color:var(--color-indigo);font-weight:600">{{ f.cta }} →</div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import { cards } from '../data/cards.js'
import { cardImageUrl } from '../api/tarot.js'
import interpretationsMajor from '../data/interpretations-major.js'
import interpretationsMinor from '../data/interpretations-minor.js'
import { computed } from 'vue'

const router = useRouter()

const features = [
  {
    title: 'Lessons',
    icon: 'pi pi-book',
    desc: 'Five short lessons from Tarot basics through your first spread.',
    cta: 'Start Lessons',
    link: '/lessons'
  },
  {
    title: 'Card Library',
    icon: 'pi pi-th-large',
    desc: 'Explore the full tarot deck: 78 cards — 22 Major Arcana and 56 Minor Arcana (four suits of 14 cards each), with meanings, keywords, and journal prompts.',
    cta: 'Browse Cards',
    link: '/cards'
  },
  {
    title: 'Daily Practice',
    icon: 'pi pi-star',
    desc: 'Draw a daily card and keep a private journal stored only in your browser.',
    cta: 'Open Practice',
    link: '/practice'
  }
]

function hashString(s){
  let h = 0
  for(let i=0;i<s.length;i++){ h = (h<<5) - h + s.charCodeAt(i); h |= 0 }
  return Math.abs(h)
}

const todayCard = computed(()=>{
  try{
    const today = new Date().toISOString().slice(0,10)
    const idx = hashString(today) % cards.length
    return cards[idx]
  }catch(e){ return null }
})

function imageUrl(nameShort){ return cardImageUrl(nameShort) }

const todayInterp = computed(() => {
  if (!todayCard.value) return null
  const slug = todayCard.value.slug
  return interpretationsMajor[slug] || interpretationsMinor[slug] || null
})
</script>

<style scoped>
.feature-card :deep(.p-card) {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.feature-card :deep(.p-card-body) {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.feature-card :deep(.p-card-content) {
  flex: 1;
}
.feature-card :deep(.p-card-footer) {
  margin-top: auto;
  padding-top: 12px;
}
</style>
