<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">Learn Tarot</h1>
      <p class="hero-sub">
        A gentle, practical guide for beginners and new practitioners.
        Start small, build slowly, and let the cards be your mirror.
      </p>
      <div class="hero-actions">
        <Button label="Start Learning" icon="pi pi-book" size="large" @click="router.push('/lessons')" />
        <Button label="Card Library" icon="pi pi-th-large" size="large" severity="secondary" outlined @click="router.push('/cards')" />
        <Button label="Daily Practice" icon="pi pi-star" size="large" severity="secondary" outlined @click="router.push('/practice')" />
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
            <Button :label="f.cta" text icon="pi pi-arrow-right" iconPos="right" @click.stop="router.push(f.link)" />
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Divider from 'primevue/divider'

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
    title: 'Practice',
    icon: 'pi pi-star',
    desc: 'Draw a daily card and keep a private journal stored only in your browser.',
    cta: 'Open Practice',
    link: '/practice'
  }
]
</script>
