# Learn Tarot — Local MVP

A beginner-friendly Tarot learning site built with [Eleventy](https://www.11ty.dev/) and [Alpine.js](https://alpinejs.dev/). Runs entirely locally — no backend, no accounts required.

## Quick start

```bash
npm install
npm start
```

Then open [http://localhost:8080](http://localhost:8080).

## Build for production

```bash
npm run build
```

Output is written to `_site/`.

## Project structure

```
src/
  index.md              Home page
  practice.md           Daily draw + private journal (localStorage)
  lessons/              5 short Markdown lessons
  cards/                22 Major Arcana card pages + index
  assets/
    styles.css          Minimal CSS with design tokens
    site.js             Alpine components (dailyDraw, journal)
  _includes/
    layouts/base.njk    Base HTML layout with Alpine CDN
_site/                  Built output (git-ignored)
```

## Adding content

- **New lesson:** add a `.md` file to `src/lessons/` with `layout: base.njk` frontmatter.
- **New card:** add a `.md` file to `src/cards/` with the same frontmatter, then add the card to the `deck` array in `src/assets/site.js`.

## Journaling

Entries are stored in your browser's `localStorage` under the key `tarot_journal`. Use the **Export JSON** button on the Practice page to download a backup.
