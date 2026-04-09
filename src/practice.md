---
layout: base.njk
title: Practice
---

# Practice

<nav class="breadcrumb"><a href="/">Home</a> &rsaquo; Practice</nav>

## Daily Draw

Draw a single card for today and reflect on what it brings up.

<div x-data="dailyDraw()" class="practice">
  <button @click="draw()" class="btn">Draw a Card</button>
  <div x-show="card" x-cloak class="card-result">
    <h3 x-text="card.title"></h3>
    <p class="text-muted" x-text="card.keywords"></p>
    <a :href="card.slug" class="card-link">Read full meaning &rarr;</a>
  </div>
</div>

<hr />

## Journal

Jot down what came to mind. Entries are saved privately in your browser.

<div x-data="journal()" class="journal">
  <textarea x-model="entry" placeholder="What did the card bring up for you today?"></textarea>
  <div class="action-row">
    <button @click="save()" class="btn">Save Entry</button>
    <button @click="exportJSON()" class="btn ghost">Export JSON</button>
  </div>
  <ul x-show="entries.length > 0" class="journal-list">
    <template x-for="(e, i) in entries" :key="i">
      <li><strong x-text="e.date"></strong> &mdash; <span x-text="e.text"></span></li>
    </template>
  </ul>
</div>
