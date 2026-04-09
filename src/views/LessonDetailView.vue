<template>
  <div v-if="lesson">
    <LessonLayout :backLink="'/lessons'" :hasSidebar="Boolean(lesson.toc)">
      <template #sidebar v-if="lesson.toc">
        <p class="toc-heading">Contents</p>
        <nav>
          <ul class="toc-list">
            <li v-for="item in lesson.toc" :key="item.anchor">
              <a :href="'#' + item.anchor" @click.prevent="scrollTo(item.anchor)">{{ item.label }}</a>
              <ul v-if="item.children" class="toc-sub">
                <li v-for="child in item.children" :key="child.anchor">
                  <a :href="'#' + child.anchor" @click.prevent="scrollTo(child.anchor)">{{ child.label }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </template>

      <div>
        <h1>{{ lesson.title }}</h1>
        <Divider />
        <div class="lesson-body" v-html="lesson.content" @click.prevent="handleLessonClick"></div>
        <Divider />
        <div class="lesson-nav">
          <Button
            v-if="prevLesson"
            :label="prevLesson.title"
            icon="pi pi-arrow-left"
            text
            @click="router.push(`/lessons/${prevLesson.slug}`)"
          />
          <span v-else></span>
          <Button
            v-if="nextLesson"
            :label="nextLesson.title"
            iconPos="right"
            icon="pi pi-arrow-right"
            @click="router.push(`/lessons/${nextLesson.slug}`)"
          />
        </div>
      </div>
    </LessonLayout>
  </div>

  <div class="not-found" v-else>
    <p>Lesson not found.</p>
    <RouterLink to="/lessons">← Back to Lessons</RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { lessons } from '../data/lessons.js'
import LessonLayout from '../components/LessonLayout.vue'

const route = useRoute()
const router = useRouter()

const lesson = computed(() => lessons.find(l => l.slug === route.params.slug))
const idx = computed(() => lessons.findIndex(l => l.slug === route.params.slug))
const prevLesson = computed(() => idx.value > 0 ? lessons[idx.value - 1] : null)
const nextLesson = computed(() => idx.value < lessons.length - 1 ? lessons[idx.value + 1] : null)

// Scroll to an in-page anchor by id
function scrollTo(anchor) {
  const el = document.getElementById(anchor)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Intercept all <a> clicks inside v-html lesson content.
// Hash-history routing means bare `#anchor` hrefs would navigate the router;
// instead we scroll in-page, and route card/lesson links through Vue router.
function handleLessonClick(e) {
  const anchor = e.target.closest('a')
  if (!anchor) return
  const href = anchor.getAttribute('href') || ''

  // Vue-router links: #/cards/... or #/lessons/...
  if (href.startsWith('#/')) {
    e.preventDefault()
    router.push(href.slice(1)) // strip leading # to get /cards/...
    return
  }

  // In-page anchor: #section-id (no slash after #)
  if (href.startsWith('#') && href.length > 1) {
    e.preventDefault()
    const id = href.slice(1)
    const target = document.getElementById(id)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
}
</script>


