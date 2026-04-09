<template>
  <div v-if="card">
    <RouterLink to="/cards" class="back-link">← Card Library</RouterLink>

    <div class="card-detail-layout">
      <div class="card-image-column">
        <div class="card-image-wrapper">
          <img
            :src="cardImageUrl(card.nameShort)"
            :alt="card.title"
            class="card-image"
            :class="{ flipped: isReversed }"
            @error="e => e.target.style.display='none'"
          />
        </div>
      </div>
      <div class="card-content-column">
        <div class="card-hero">
          <div class="numeral-badge">{{ toRoman(card.numeral) }}</div>
          <h1 style="margin:0">{{ card.title }}</h1>
        </div>

        <!-- Upright / Reversed switch -->
        <label class="orient-switch" style="margin-bottom:20px">
          <span class="orient-switch-label" :class="{ muted: isReversed }">Upright</span>
          <span class="switch-track" @click="isReversed = !isReversed">
            <span class="switch-thumb" :class="{ on: isReversed }"></span>
          </span>
          <span class="orient-switch-label" :class="{ muted: !isReversed }">Reversed</span>
        </label>

        <Panel header="Imagery & Symbolism">
          <p style="margin:0">{{ interp.imagery || 'This section describes the card art and common symbolic elements used to interpret its themes.' }}</p>
        </Panel>

        <!-- Full meaning for selected orientation -->
        <Panel :header="isReversed ? 'Reversed Reading' : 'Upright Reading'" style="margin-top:18px;margin-bottom:18px">
          <p style="margin:0">{{ isReversed ? card.reversed : card.upright }}</p>
        </Panel>

        <Divider />

        <h3>Interpretations <span class="interp-mode-badge" :class="{ reversed: isReversed }">{{ isReversed ? 'Reversed' : 'Upright' }}</span></h3>
        <div class="interpretation-grid">
          <Panel header="Relationships">
            <p style="margin:0">{{ isReversed ? (interp.relationships_reversed || reversedNote(interp.relationships)) : (interp.relationships || 'No specific relationship interpretation provided.') }}</p>
          </Panel>
          <Panel header="Career">
            <p style="margin:0">{{ isReversed ? (interp.career_reversed || reversedNote(interp.career)) : (interp.career || 'No specific career interpretation provided.') }}</p>
          </Panel>
          <Panel header="Finances">
            <p style="margin:0">{{ isReversed ? (interp.finances_reversed || reversedNote(interp.finances)) : (interp.finances || 'No specific financial interpretation provided.') }}</p>
          </Panel>
          <Panel header="Personal Growth / Spiritual">
            <p style="margin:0">{{ isReversed ? (interp.growth_reversed || reversedNote(interp.growth)) : (interp.growth || 'No specific personal-growth interpretation provided.') }}</p>
          </Panel>
        </div>

        <Divider />

        <Panel header="Notes">
          <div class="notes-editor">
            <textarea v-model="newNoteText" placeholder="Write a note about this card..." rows="4"></textarea>
            <div class="notes-actions">
              <Button label="Save" icon="pi pi-save" @click="saveNote" />
              <Button v-if="isEditing" label="Cancel" icon="pi pi-times" class="p-button-secondary" @click="cancelEdit" />
            </div>

            <div class="previous-notes">
              <div v-if="notes.length === 0" class="no-notes">No notes yet.</div>
              <div v-for="(n, idx) in notes" :key="n.id" class="note-item">
                <div class="note-main">
                  <div class="note-meta">{{ formatDate(n.createdAt) }}</div>
                  <p class="note-text">{{ n.text }}</p>
                </div>
                <div class="note-actions">
                  <Button icon="pi pi-pencil" class="p-button-text" @click="editNote(idx)" />
                  <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="deleteNote(idx)" />
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  </div>

  <div class="not-found" v-else>
    <p>Card not found.</p>
    <RouterLink to="/cards">← Back to Card Library</RouterLink>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Panel from 'primevue/panel'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import { getCardBySlug } from '../data/cards.js'
import { cardImageUrl } from '../api/tarot.js'
import interpretationsMajor from '../data/interpretations-major.js'
import interpretationsMinor from '../data/interpretations-minor.js'

const route = useRoute()
const router = useRouter()
const card = computed(() => getCardBySlug(route.params.slug))

const isReversed = ref(false)

// Notes editor state (persisted per-card in localStorage)
const notes = ref([])
const newNoteText = ref('')
const isEditing = ref(false)
const editIndex = ref(null)

function getNotesKey() {
  const c = card.value
  return c ? `card-notes:${c.slug}` : null
}

function loadNotes() {
  const key = getNotesKey()
  if (!key) { notes.value = []; return }
  try {
    const raw = localStorage.getItem(key)
    notes.value = raw ? JSON.parse(raw) : []
  } catch (e) {
    notes.value = []
  }
}

function saveNotesToStorage() {
  const key = getNotesKey()
  if (!key) return
  localStorage.setItem(key, JSON.stringify(notes.value))
}

function saveNote() {
  const text = newNoteText.value && newNoteText.value.trim()
  if (!text) return
  if (isEditing.value && editIndex.value !== null) {
    notes.value[editIndex.value].text = text
    notes.value[editIndex.value].updatedAt = new Date().toISOString()
  } else {
    notes.value.unshift({ id: Date.now(), text, createdAt: new Date().toISOString() })
  }
  newNoteText.value = ''
  isEditing.value = false
  editIndex.value = null
  saveNotesToStorage()
}

function editNote(idx) {
  newNoteText.value = notes.value[idx].text
  isEditing.value = true
  editIndex.value = idx
}

function cancelEdit() {
  newNoteText.value = ''
  isEditing.value = false
  editIndex.value = null
}

function deleteNote(idx) {
  notes.value.splice(idx, 1)
  saveNotesToStorage()
}

function formatDate(iso) {
  try { return new Date(iso).toLocaleString() } catch { return iso }
}

watch(card, () => { loadNotes() }, { immediate: true })

// Parse comma/semicolon-separated phrases from up to first 6 tokens
function parseKeywords(text) {
  if (!text) return []
  return text
    .split(/[,;]/)
    .map(s => s.trim().replace(/[.!?]+$/, ''))
    .filter(Boolean)
    .slice(0, 6)
}

const activeKeywords = computed(() => {
  const c = card.value
  if (!c) return []
  return parseKeywords(isReversed.value ? c.reversed : c.upright)
})

// For reversed mode without dedicated reversed interpretations,
// prepend a contextual inversion note to the upright text.
function reversedNote(uprightText) {
  if (!uprightText) return 'Consult the Reversed Reading above for guidance.'
  return `In reversal, this energy may be blocked, internalized, or expressed in excess — ${uprightText.charAt(0).toLowerCase()}${uprightText.slice(1)}`
}

const interp = computed(() => {
  const c = card.value
  if(!c) return {}
  return c.interpretations || interpretationsMajor[c.slug] || interpretationsMinor[c.slug] || {}
})

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
</script>

<style scoped>
.interpretation-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 18px;
}

/* Card flip */
.card-image {
  display: block;
  width: 100%;
  height: auto;
  max-height: calc(100vh - 100px);
  object-fit: contain;
  transition: transform 0.5s ease;
  transform-origin: center center;
}

.card-image.flipped {
  transform: rotate(180deg);
}

/* Compact switch */
.orient-switch {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.orient-switch-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text);
  transition: color 0.2s;
}

.orient-switch-label.muted {
  color: var(--color-muted);
}

.switch-track {
  position: relative;
  width: 36px;
  height: 20px;
  background: #d1d5db;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.25s;
  flex-shrink: 0;
}

.switch-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.25);
  transition: transform 0.25s, background 0.25s;
}

.switch-thumb.on {
  transform: translateX(16px);
}

.switch-track:has(.switch-thumb.on) {
  background: #6b21a8;
}

/* Interpretation mode badge */
.interp-mode-badge {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 20px;
  background: var(--color-indigo);
  color: #fff;
  vertical-align: middle;
  margin-left: 8px;
}

.interp-mode-badge.reversed {
  background: #6b21a8;
}

.card-detail-layout {
  display: grid;
  grid-template-columns: 224px 1fr;
  gap: 16px;
  align-items: start;
}

/* position:sticky must live on the direct grid child, not a nested element.
   align-self:start keeps the column at image height; the grid row is as tall
   as the content column, so sticky has room to travel the full scroll distance. */
.card-image-column {
  position: -webkit-sticky;
  position: sticky;
  top: 72px;
  align-self: start;
}

.card-image-wrapper {
  /* no positioning needed here */
}

/* Notes editor styles */
.notes-editor textarea {
  width: 100%;
  padding: 8px;
  font-size: 0.95rem;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.08);
  resize: vertical;
}

.notes-actions { margin-top: 8px; display:flex; gap:8px; }

.previous-notes { margin-top: 12px; }
.note-item { border: 1px solid rgba(0,0,0,0.06); padding: 10px; margin-top: 10px; border-radius: 6px; display:flex; gap:8px; justify-content: space-between; align-items: flex-start; }
.note-main { flex: 1 1 auto; }
.note-text { margin: 6px 0 0 0; white-space: pre-wrap; }
.note-meta { color: var(--color-muted); font-size: 0.8rem; }
.no-notes { color: var(--color-muted); font-style: italic; }

@media (max-width: 640px) {
  .interpretation-grid { grid-template-columns: 1fr; }
  .card-detail-layout { grid-template-columns: 1fr; }
  .card-image-column { position: static; top: auto; }
  .card-image { max-height: 360px; }
}
</style>
