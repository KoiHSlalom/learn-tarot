<template>
  <div>
    <RouterLink v-if="backLink" :to="backLink" class="back-link">← Back</RouterLink>
    <div class="lesson-layout-wrapper">
      <aside v-if="hasSidebar" class="lesson-toc-sidebar">
        <slot name="sidebar"></slot>
      </aside>

      <main class="lesson-main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  backLink: { type: String, default: '/lessons' },
  hasSidebar: { type: Boolean, default: true }
})
</script>

<style>
/* Layout grid */
.lesson-layout-wrapper {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
  align-items: start;
}

/* Sidebar panel */
.lesson-toc-sidebar {
  position: sticky;
  top: 72px;
  align-self: start;
  background: var(--color-surface, #f9f6f2);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 8px;
  padding: 14px 16px;
  font-size: 0.88rem;
}

/* TOC heading — no top margin so it sits flush at the top of the panel */
p.toc-heading {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-size: 0.75rem;
  color: var(--color-muted);
  margin: 0 0 10px 0;
  padding: 0;
}

/* TOC list — strip browser-default 40px left padding */
ul.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

ul.toc-list li {
  margin: 0;
  padding: 0;
}

ul.toc-list a {
  color: var(--color-text);
  text-decoration: none;
  line-height: 1.4;
  display: block;
}

ul.toc-list a:hover {
  color: var(--color-indigo, #2b2d6a);
}

/* Nested sub-items */
ul.toc-sub {
  list-style: none;
  margin: 4px 0 0 0;
  padding: 0 0 0 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

ul.toc-sub li {
  margin: 0;
  padding: 0;
}

ul.toc-sub a {
  color: var(--color-muted);
  font-size: 0.85rem;
}

.lesson-main {
  min-width: 0;
}

@media (max-width: 700px) {
  .lesson-layout-wrapper {
    grid-template-columns: 1fr;
  }
  .lesson-toc-sidebar {
    position: static;
  }
}
</style>
