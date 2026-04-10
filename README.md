# Learn Tarot

A beginner-friendly Tarot learning site built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/), using [PrimeVue](https://primevue.org/) for UI components. Runs entirely in the browser — no backend or accounts required.

## Quick start

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
```

Output is written to `dist/`. Preview the production build with:

```bash
npm run preview
```

## Project structure

```
src/
  App.vue               Root component (header, starfield, footer)
  main.js               App entry point, PrimeVue setup, theme config
  router/
    index.js            Client-side routes (hash history)
  views/
    HomeView.vue        Home — hero, Today's Card, feature grid
    LessonsView.vue     Lesson list
    LessonDetailView.vue  Individual lesson page
    CardsView.vue       Card library grid with search/filter
    CardDetailView.vue  Card detail — meanings, imagery, per-card notes
    PracticeView.vue    Daily one-card draw + three-card spread
  components/
    AppHeader.vue       Site navigation
    ThreeCardDemo.vue   Interactive three-card spread demo
    LessonLayout.vue    Shared lesson content wrapper
    StarField.vue       Decorative animated star background
    ThemeToggle.vue     Dark/light mode toggle (persisted to localStorage)
  data/
    cards.js            Full 78-card deck (slug, title, upright, reversed, keywords)
    interpretations-major.js  Imagery & contextual interpretations for Major Arcana
    interpretations-minor.js  Imagery & contextual interpretations for Minor Arcana
    lessons.js          Lesson content and structure
    card-elements.js    Elemental correspondences per card
  api/
    tarot.js            Card image URL helper + random draw utility
  assets/
    main.css            Global CSS with design tokens, dark mode, and animations
public/
  cards/                Local card images (ar*.jpg, cu*.jpg, sw*.jpg, wa*.jpg, pe*.jpg)
scripts/
  download-cards.mjs    Utility scripts for fetching card images
```

## Features

- **Lessons** — Five structured lessons from Tarot basics through your first spread.
- **Card Library** — All 78 cards with upright/reversed meanings, imagery notes, keywords, and per-card journaling (saved to `localStorage`).
- **Daily Practice** — One-card draw and a three-card spread with card-reveal interaction.
- **Today's Card** — Deterministic daily card based on the current date, shown on the Home page.
- **Dark mode** — Respects system preference and allows manual override via theme toggle.

## Per-card notes

Notes are stored in `localStorage` under the key `card-notes:<slug>`. They persist across sessions in the same browser and are private to the user.

## Theming

The site uses CSS custom properties (design tokens) defined in `src/assets/main.css`. Dark mode is applied by setting `data-theme="dark"` on `<html>`, either automatically via `prefers-color-scheme` or manually via the ThemeToggle component. The choice is persisted in `localStorage` under the key `theme`.
