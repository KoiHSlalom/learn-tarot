<template>
  <StarField />
  <AppHeader />
  <div class="page-wrapper">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
  <footer class="app-footer">
    <div class="footer-inner">
      <span class="footer-logo">Learn Tarot</span>
      <span class="footer-divider">·</span>
      <span class="footer-copy">A personal study companion</span>
      <span class="footer-divider">·</span>
      <span class="footer-copy">{{ year }}</span>
    </div>
  </footer>
  <ThemeToggle />
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import StarField from './components/StarField.vue'
import ThemeToggle from './components/ThemeToggle.vue'
const year = new Date().getFullYear()
</script>
