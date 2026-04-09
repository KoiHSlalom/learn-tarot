<template>
  <div>
    <div class="page-header">
      <h1>Lessons</h1>
      <p class="muted">Five short lessons to take you from curious beginner to confident reader.</p>
    </div>
    <div class="lesson-list">
      <Card
        v-for="lesson in lessons"
        :key="lesson.id"
        class="lesson-card"
        @click="router.push(`/lessons/${lesson.slug}`)"
      >
        <template #title>
          <span class="lesson-num">{{ lesson.id }}.</span>{{ lesson.title }}
        </template>
        <template #content>
          <p class="muted" style="margin:0">{{ lesson.summary }}</p>
        </template>
        <template #footer>
          <Button
            label="Read Lesson"
            text
            icon="pi pi-arrow-right"
            iconPos="right"
            @click.stop="router.push(`/lessons/${lesson.slug}`)"
          />
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { lessons } from '../data/lessons.js'

const router = useRouter()
</script>
