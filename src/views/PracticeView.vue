<template>
  <div>
    <h1>Practice</h1>

    <div style="display:flex;align-items:center;gap:12px;margin:8px 0">
      <label class="muted" style="margin:0">Mode:</label>
      <ToggleButton v-model="isThree" onLabel="3‑Card Spread" offLabel="Daily Draw" onIcon="pi pi-columns" offIcon="pi pi-star" />
    </div>

    <Divider />

    <!-- Daily Draw -->
    <section class="draw-section" v-if="!isThree">
      <h2>Daily Draw</h2>
      <p class="muted">Draw a single card for today and reflect on what it brings up for you.</p>

      <Button
        label="Draw a Card"
        icon="pi pi-star"
        :loading="loading"
        @click="draw"
      />

      <Message v-if="apiError" severity="warn" :closable="true" style="margin-top:14px">
        Couldn't reach the Tarot API — showing a card from the local deck instead.
      </Message>

      <Transition name="fade">
        <Card v-if="drawn" class="drawn-card">
          <template #title>
            {{ drawn.title }}
            <Tag
              :value="drawn.type === 'major' ? 'Major Arcana' : drawn.suit"
              severity="secondary"
              style="margin-left:8px;font-size:.75rem;text-transform:capitalize"
            />
          </template>
          <template #content>
            <div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap">
              <img
                :src="drawn.image"
                :alt="drawn.title"
                class="card-image"
                style="max-width:140px"
                loading="lazy"
                @error="e => e.target.style.display='none'"
              />
              <div style="flex:1;min-width:200px">
                <h4 style="margin:0 0 4px;color:var(--color-gold)">Upright meaning</h4>
                <p style="margin:0 0 16px">{{ drawn.upright }}</p>

                <Divider />

                <h4 style="margin:0 0 4px;color:var(--color-indigo)">Reversed</h4>
                <p style="margin:0 0 16px">{{ drawn.reversed }}</p>

                <template v-if="drawn.desc">
                  <Divider />
                  <Panel header="Card Description" :toggleable="true" :collapsed="true">
                    <p style="margin:0;font-size:.9rem;line-height:1.7">{{ drawn.desc }}</p>
                  </Panel>
                </template>

                <template v-if="localCard">
                  <Divider />
                  <blockquote class="prompt-text">{{ localCard.journalPrompt }}</blockquote>
                  <Button
                    label="Read full meaning"
                    text
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    @click="router.push(`/cards/${localCard.slug}`)"
                  />
                </template>
              </div>
            </div>
          </template>
        </Card>
      </Transition>
    </section>

    <Divider />

    <!-- 3-Card Spread Demo -->
    <section class="spread-section" v-if="isThree">
      <ThreeCardDemo />
    </section>

    <Divider />

    <!-- Journal -->
    <section class="journal-section">
      <h2>Journal</h2>
      <p class="muted">Entries are saved privately in your browser and never sent anywhere.</p>

      <Textarea
        v-model="entry"
        :rows="4"
        placeholder="What did the card bring up for you today?"
        class="journal-input"
      />

      <div class="journal-actions">
        <Button
          label="Save Entry"
          icon="pi pi-check"
          @click="save"
          :disabled="!entry.trim()"
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
          <p>{{ e.text }}</p>
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
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Textarea from 'primevue/textarea'
import Divider from 'primevue/divider'
import Panel from 'primevue/panel'
import Message from 'primevue/message'
import { drawRandom } from '../api/tarot.js'
import { cards as localDeck } from '../data/cards.js'
import ThreeCardDemo from '../components/ThreeCardDemo.vue'

const router = useRouter()
const drawn = ref(null)
const loading = ref(false)
const apiError = ref(false)
const entry = ref('')
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
  if (!entry.value.trim()) return
  entries.value.unshift({ date: new Date().toLocaleString(), text: entry.value })
  localStorage.setItem('tarot_journal', JSON.stringify(entries.value))
  entry.value = ''
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
