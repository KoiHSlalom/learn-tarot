<template>
  <div>
    <h1 style="margin-top:32px">Daily Practice</h1>

    <div style="display:flex;align-items:center;gap:12px;margin:8px 0">
      <label class="muted" style="margin:0">Mode:</label>
      <ToggleButton v-model="isThree" onLabel="Three-card Spread" offLabel="One-card Draw" onIcon="pi pi-columns" offIcon="pi pi-star" />
    </div>

    <Divider />

    <!-- One-card Draw -->
    <section class="draw-section" v-if="!isThree">
      <h2>One-card Draw</h2>
      <p class="muted">Draw a single card for today and reflect on what it brings up for you.</p>

      <Message v-if="apiError" severity="warn" :closable="true" style="margin-bottom:14px">
        Couldn't reach the Tarot API — showing a card from the local deck instead.
      </Message>

      <div class="one-card-slot">
        <Transition name="card-swap" mode="out-in">
          <div v-if="drawn" key="card" class="one-card-filled">
            <img
              :src="drawn.image"
              :alt="drawn.title"
              class="one-card-img"
              loading="lazy"
              @error="e => e.target.style.display='none'"
            />
            <div class="one-card-name">{{ drawn.title }}</div>
            <Button
              v-if="localCard"
              label="Read full meaning"
              text
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="router.push(`/cards/${localCard.slug}`)"
            />
          </div>
          <div v-else key="empty" class="one-card-empty">—</div>
        </Transition>
      </div>

      <div class="one-card-controls">
        <Button
          label="Draw a Card"
          icon="pi pi-star"
          :loading="loading"
          @click="draw"
        />
        <Button
          v-if="drawn"
          label="Clear"
          icon="pi pi-times"
          class="p-button-secondary"
          @click="drawn = null"
        />
      </div>
    </section>

    <!-- 3-Card Spread Demo -->
    <section class="spread-section" v-if="isThree">
      <ThreeCardDemo ref="threeCardRef" />
    </section>

    <Divider />

    <!-- Journal -->
    <section class="journal-section">
      <h2>Journal</h2>
      <p class="muted">Entries are saved privately in your browser and never sent anywhere.</p>

      <div class="journal-field">
        <label class="journal-label">What did you ask today?</label>
        <Textarea
          v-model="question"
          :rows="2"
          placeholder="e.g. What do I need to focus on this week?"
          class="journal-input"
        />
      </div>

      <div class="journal-field">
        <label class="journal-label">What was your interpretation of the cards?</label>
        <Textarea
          v-model="interpretation"
          :rows="4"
          placeholder="Reflect on the imagery, symbols, or feelings that came up…"
          class="journal-input"
        />
      </div>

      <div class="journal-actions">
        <Button
          label="Save Entry"
          icon="pi pi-check"
          @click="save"
          :disabled="!question.trim() && !interpretation.trim()"
        />
        <Button
          label="Export JSON"
          icon="pi pi-download"
          severity="secondary"
          outlined
          @click="exportJSON"
          :disabled="entries.length === 0"
        />
      </div>

      <div class="journal-entries" v-if="entries.length > 0">
        <h3>Past Entries</h3>
        <div v-for="(e, i) in entries" :key="i" class="journal-entry">
          <small class="muted">{{ e.date }}</small>
          <!-- Saved cards snapshot -->
          <div v-if="e.cards && e.cards.length" class="entry-cards">
            <span
              v-for="c in e.cards"
              :key="c.slug || c.title"
              class="entry-card-chip"
            >{{ c.title }}</span>
          </div>
          <p v-if="e.question" class="entry-question"><strong>Asked:</strong> {{ e.question }}</p>
          <p v-if="e.interpretation"><strong>Interpretation:</strong> {{ e.interpretation }}</p>
          <!-- legacy single-text entries -->
          <p v-if="e.text && !e.question && !e.interpretation">{{ e.text }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'
import Textarea from 'primevue/textarea'
import Divider from 'primevue/divider'
import Message from 'primevue/message'
import { drawRandom } from '../api/tarot.js'
import { cards as localDeck } from '../data/cards.js'
import ThreeCardDemo from '../components/ThreeCardDemo.vue'

const router = useRouter()
const drawn = ref(null)
const loading = ref(false)
const apiError = ref(false)
const threeCardRef = ref(null)
const question = ref('')
const interpretation = ref('')
const entries = ref(JSON.parse(localStorage.getItem('tarot_journal') || '[]'))

const isThree = ref(JSON.parse(localStorage.getItem('practice_mode_isThree') || 'false'))

watch(isThree, v => {
  localStorage.setItem('practice_mode_isThree', JSON.stringify(!!v))
})

// If the drawn card matches one of our local Major Arcana, surface its journal prompt
const localCard = computed(() => {
  if (!drawn.value) return null
  return localDeck.find(c => c.title.toLowerCase() === drawn.value.title.toLowerCase()) ?? null
})

async function draw() {
  loading.value = true
  apiError.value = false
  try {
    const [card] = await drawRandom(1)
    drawn.value = card
  } catch {
    apiError.value = true
    // fallback to local deck
    drawn.value = localDeck[Math.floor(Math.random() * localDeck.length)]
  } finally {
    loading.value = false
  }
}

function save() {
  if (!question.value.trim() && !interpretation.value.trim()) return

  // Snapshot drawn cards at save time
  let savedCards = []
  if (isThree.value) {
    const threeDrawn = threeCardRef.value?.drawn ?? []
    savedCards = threeDrawn.filter(Boolean).map(c => ({ title: c.title, slug: c.slug, nameShort: c.nameShort }))
  } else if (drawn.value) {
    savedCards = [{ title: drawn.value.title, slug: drawn.value.slug, nameShort: drawn.value.slug }]
  }

  entries.value.unshift({
    date: new Date().toLocaleString(),
    question: question.value,
    interpretation: interpretation.value,
    cards: savedCards
  })
  localStorage.setItem('tarot_journal', JSON.stringify(entries.value))
  question.value = ''
  interpretation.value = ''
}

function exportJSON() {
  const blob = new Blob([JSON.stringify(entries.value, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'tarot_journal.json'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
</script>
