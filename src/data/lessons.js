export const lessons = [
  {
    id: 1,
    slug: 'lesson-1',
    title: 'Getting Started with Tarot',
    summary: 'What Tarot is, common decks, and a simple daily practice to ease you in.',
    toc: [
      { label: '1. A brief history of Tarot', anchor: 'history' },
      { label: '2. What Tarot is — and what it isn\'t', anchor: 'what-is' },
      { label: '3. The Deck Structure', anchor: 'structure', children: [
        { label: 'Major Arcana', anchor: 'major' },
        { label: 'Minor Arcana', anchor: 'minor' }
      ]},
      { label: '4. Choosing your deck', anchor: 'choose' },
      { label: '5. A simple practice plan', anchor: 'practice' }
    ],
    content: `
      <h2 id="getting-started">Getting Started with Tarot</h2>
      <p>Tarot has captivated curious minds for centuries — not as a crystal ball, but as a mirror. Each card is a richly layered image that invites you to slow down, look inward, and consider your life from a fresh angle. Whether you're drawn to the symbolism, the ritual, or simply the beautiful artwork, this lesson will give you the grounding you need to begin with confidence.</p>

      <h2 id="history">1. A brief history of Tarot</h2>
      <p>Tarot cards originated in 15th-century Europe as playing cards. Over centuries they were adapted for esoteric and divinatory uses. The modern familiar form — 22 Major Arcana and 56 Minor Arcana divided into four suits — became widespread in the 18th–20th centuries. The Rider–Waite–Smith deck (published 1909) popularized imagery and symbolic details that many contemporary decks follow or reference.</p>

      <h2 id="what-is">2. What Tarot is — and what it isn't</h2>
      <ul>
        <li>Tarot is a symbolic language: images, numbers, and suits provide metaphors for psychological states, life events, and patterns.</li>
        <li>Tarot is a tool for reflection, storytelling, and sense-making; it helps people notice possibilities and perspectives.</li>
        <li>Tarot is not a deterministic machine that predicts fixed futures, nor is it a substitute for professional advice (medical, legal, financial).</li>
      </ul>

      <h2 id="structure">3. The Deck Structure</h2>
      <h3 id="major">Major Arcana</h3>
      <p>The Major Arcana are 22 cards that describe large life themes, archetypal energies, and important turning points. They are often numbered 0–21 and include cards such as <em>The Fool</em>, <em>The Magician</em>, <em>The Tower</em>, and <em>The World</em>.</p>

      <h3 id="minor">Minor Arcana</h3>
      <p>The Minor Arcana contain 56 cards divided into four suits. These cards speak to the texture of everyday life, roles, and situations.</p>

      <h2 id="choose">4. Choosing your deck</h2>
      <p>There are many varieties and creative takes on Tarot. Decks can differ widely in art style, cultural reference, tone, and symbolic emphasis. Choose a deck that invites you to practice.</p>

      <h2 id="practice">5. Getting started — a simple practice plan</h2>
      <ol>
        <li><strong>Become familiar:</strong> Spend a week looking at the deck. Shuffle, fan, and simply view each card. Note which images draw your attention.</li>
        <li><strong>Daily card:</strong> Pull one card each morning. Write three words or a sentence about what you notice. Do this for 7–14 days.</li>
        <li><strong>Short spread:</strong> Learn a 3-card spread (Past / Present / Next steps). Ask a simple question and place three cards left-to-right. Record one-sentence meanings.</li>
        <li><strong>Journal:</strong> Keep notes on repeated symbols, emotional reactions, and connections to your life. Use the Notes feature on each card to capture ideas.</li>
      </ol>
    `
  },

  {
    id: 2,
    slug: 'lesson-2',
    title: 'Major Arcana Overview',
    summary: 'Meet the 22 archetypal cards that form the backbone of every Tarot deck.',
    toc: [
      { label: '1. What is the Major Arcana?', anchor: 'major-overview' },
      { label: "2. The Fool's Journey", anchor: 'fools-journey' },
      { label: '3. How to Study', anchor: 'study' }
    ],
    content: `
      <h2 id="major-overview">What is the Major Arcana?</h2>
      <p>The 22 Major Arcana cards represent universal archetypes — big forces, life themes, and turning points. They run from <strong>0 (The Fool)</strong> to <strong>XXI (The World)</strong>, tracing a journey of growth often called the Fool's Journey.</p>

      <h2 id="fools-journey">The Fool's Journey — a narrated map</h2>
      <p>Below is a concise, narrated passage through the Fool's Journey. Each step pairs the scene with the card most commonly associated with that stage and a short reflection you can use when studying or journaling.</p>

      <ol>
        <li id="fj-0"><strong>0 — The Fool:</strong> The beginning. Innocence, spontaneity, and a leap into the unknown. The Fool invites curiosity and trust — the seed of new journeys.</li>
        <li id="fj-1"><strong>I — The Magician:</strong> The first stirrings of skill and will. Tools appear; possibilities converge. Here the Fool learns that intention shapes outcome.</li>
        <li id="fj-2"><strong>II — The High Priestess:</strong> The turn inward. Intuition, mystery, and inner knowing show that not all answers come from action; some arrive in silence.</li>
        <li id="fj-3"><strong>III — The Empress:</strong> Creative abundance and receptivity. The Fool experiences nurture, growth, and the fertile ground of imagination.</li>
        <li id="fj-4"><strong>IV — The Emperor:</strong> Structure, authority, and boundaries. Practical systems and discipline help shape raw potential into form.</li>
        <li id="fj-5"><strong>V — The Hierophant:</strong> Tradition, teachers, and community. The Fool meets cultural rules and symbolic frameworks that guide meaning-making.</li>
        <li id="fj-6"><strong>VI — The Lovers:</strong> Choice, relationship, and values. A moral or relational fork asks the Fool to align action with heartfelt commitments.</li>
        <li id="fj-7"><strong>VII — The Chariot:</strong> Focused will and movement. The Fool practices direction, mastery of impulse, and the courage to advance.</li>
        <li id="fj-8"><strong>VIII — Strength:</strong> Gentle power — compassion, patience, and inner resilience rather than brute force.</li>
        <li id="fj-9"><strong>IX — The Hermit:</strong> Solitude and the search for deeper wisdom. The Fool withdraws to reflect and integrate lessons.</li>
        <li id="fj-10"><strong>X — Wheel of Fortune:</strong> Cycles and turning points. The Fool is shown the rhythms of fate and opportunity — adaptable response matters.</li>
        <li id="fj-11"><strong>XI — Justice:</strong> Balance, responsibility, and the consequences of choices. The Fool encounters ethical clarity.</li>
        <li id="fj-12"><strong>XII — The Hanged Man:</strong> Surrender and changed perspective. Letting go of control to see things anew.</li>
        <li id="fj-13"><strong>XIII — Death:</strong> Endings that clear space for transformation. Not literal death — symbolic release and renewal.</li>
        <li id="fj-14"><strong>XIV — Temperance:</strong> Integration and moderation. The Fool practices blending opposites into a balanced whole.</li>
        <li id="fj-15"><strong>XV — The Devil:</strong> Shadow, attachment, and limitation. The Fool confronts dependencies and the freedom that comes from awareness.</li>
        <li id="fj-16"><strong>XVI — The Tower:</strong> Sudden upheaval and revelation. Structures fall away — painful but clarifying.</li>
        <li id="fj-17"><strong>XVII — The Star:</strong> Hope, healing, and renewed inspiration after disruption.</li>
        <li id="fj-18"><strong>XVIII — The Moon:</strong> The unconscious, dreams, and the terrain of fears and illusions — a test of discernment.</li>
        <li id="fj-19"><strong>XIX — The Sun:</strong> Clarity, vitality, and simple joy — the Fool experiences authentic presence and warmth.</li>
        <li id="fj-20"><strong>XX — Judgement:</strong> The call to reckoning and rebirth. The Fool is invited to review, forgive, and move into a higher purpose.</li>
        <li id="fj-21"><strong>XXI — The World:</strong> Completion and integration. The journey's lessons cohere into a broader perspective; the Fool stands conscious and whole.</li>
      </ol>

      <h2 id="study">How to study the Major Arcana</h2>
      <ul>
        <li>Read the Journey as narrative: trace one or two cards per day and journal what the stage evokes for you.</li>
        <li>Practice small spreads that pair a current-past-future slice of the Fool's Journey to see how a present situation maps to a step.</li>
        <li>Use the Notes feature to record personal associations — repeated motifs will reveal your strongest connections.</li>
      </ul>
      <p>The Fool's Journey is a scaffold for meaning, not a rigid sequence; cards can echo multiple stages and speak differently depending on context.</p>
    `
  },

  {
    id: 3,
    slug: 'lesson-3',
    title: 'Minor Arcana & the Four Suits',
    summary: 'Understand the 56 cards of the Minor Arcana and the themes of each suit.',
    toc: [
      { label: '1. What is the Minor Arcana?', anchor: 'minor-overview' },
      { label: '2. The Four Suits', anchor: 'four-suits' },
      { label: '3. Court Cards', anchor: 'court-cards' },
      { label: '4. Number Meanings', anchor: 'numbers' }
    ],
    content: `
      <h2 id="minor-overview">What is the Minor Arcana?</h2>
      <p>The Minor Arcana consists of 56 cards divided into four suits of 14 cards each. These cards deal with everyday experiences, emotions, thoughts, and material circumstances — the texture of daily life.</p>
      <h2 id="four-suits">The Four Suits</h2>
      <ul>
        <li><strong>Wands</strong> — Fire energy. Ambition, inspiration, action, passion, and creative drive.</li>
        <li><strong>Cups</strong> — Water energy. Emotions, relationships, intuition, dreams, and the inner life.</li>
        <li><strong>Swords</strong> — Air energy. Intellect, communication, conflict, truth, and mental clarity.</li>
        <li><strong>Pentacles</strong> — Earth energy. Work, money, the body, practical matters, and long-term security.</li>
      </ul>

      <h2 id="court-cards">Court Cards — Page, Knight, Queen, King</h2>
      <p>Each suit contains four court cards that often represent people, roles, or aspects of personality. They can indicate a person in a reading, a part of the querent, or an approach to a situation.</p>
      <ul>
        <li><strong>Page:</strong> The Page often signals new messages, beginnings in the suit's area, curiosity, and the learner's energy. Think of the Page as the student or youthful spark related to the suit.</li>
        <li><strong>Knight:</strong> The Knight indicates movement, pursuit, and external action. This card can show how energy in the suit propels outward — a doer, a traveler, or someone with momentum.</li>
        <li><strong>Queen:</strong> The Queen embodies mature, receptive, and nurturant qualities of the suit. She represents inner authority, emotional intelligence, and skillful handling of the suit's themes.</li>
        <li><strong>King:</strong> The King represents mastery, leadership, and external authority in the suit's domain. He shows competence, responsibility, and decision-making at a structural level.</li>
      </ul>

      <p>When reading court cards, consider three questions: Is the card describing a person or an aspect of the querent? Is it pointing to behavior to adopt or avoid? Which suit qualities (emotion, action, thought, material) are most active?</p>

      <h2 id="numbers">Number Meanings</h2>
      <p>The number of a card carries consistent symbolic meaning across all four suits. Numbers provide a useful shorthand for how an energy is likely to behave — whether it's a seed, a challenge, a turning point, or a completion. Use these number themes as a first layer when interpreting a pip card; then combine with the suit's flavor and the surrounding cards for a richer read.</p>
      <ul>
        <li><strong>Ace</strong> — Pure potential and new beginnings. An ace signals the birth of an idea, opportunity, or impulse related to the suit; it's the seed energy that can be nurtured into something larger.</li>
        <li><strong>2</strong> — Duality, balance, and choice. Twos often present a relationship dynamic or a decision point — partnership, weighing options, or the need to find equilibrium.</li>
        <li><strong>3</strong> — Growth, collaboration, and first results. Threes show initial expansion: teamwork, the first visible outcomes of effort, or the creative stage after planting a seed.</li>
        <li><strong>4</strong> — Structure, stability, and foundation. Fours request consolidation — building reliable systems, taking stock, and creating a secure base to work from.</li>
        <li><strong>5</strong> — Challenge and change. Fives indicate disruption: conflict, reassessment, or a necessary shake-up that clears stagnant energy and prompts adaptation.</li>
        <li><strong>6</strong> — Cooperation, healing, and reciprocity. Sixes point toward repair, generosity, and supportive exchanges — a rebalancing after challenge.</li>
        <li><strong>7</strong> — Reflection, questioning, and strategy. Sevens are introspective: they invite analysis, assessment of options, and deeper learning rather than immediate action.</li>
        <li><strong>8</strong> — Movement, refinement, and skill. Eights bring momentum and often indicate increasing mastery, focused effort, or shifts that accelerate progress.</li>
        <li><strong>9</strong> — Maturity, independence, and culmination of personal development. Nines suggest nearing fulfillment and the internal readiness that precedes completion.</li>
        <li><strong>10</strong> — Completion, transition, and the beginning of a new cycle. Tens close a pattern and often point to outcomes, harvests, or the need to integrate lessons before the next phase begins.</li>
      </ul>
      <p>Study tips:</p>
      <ul>
        <li>Pick one number each week and follow it through multiple suits to see how the same numeric theme expresses differently (for example, Ace of Cups vs Ace of Swords).</li>
        <li>When reading a spread, identify whether the numbers present a narrative arc (e.g., 3 → 5 → 10 maps growth → disruption → conclusion).</li>
        <li>Use numbers as prompts for journaling — write one sentence connecting the card's number meaning to a recent experience in your life.</li>
      </ul>
    `
  },

  {
    id: 4,
    slug: 'lesson-4',
    title: 'Simple Spreads',
    summary: "Learn the 1-card and 3-card spreads — the most versatile tools in a beginner's kit.",
    toc: [
      { label: '1. What is a Spread?', anchor: 'what-is-spread' },
      { label: '2. The 1-Card Spread', anchor: 'one-card' },
      { label: '3. The 3-Card Spread', anchor: 'three-card' },
      { label: '4. What Is a Reading?', anchor: 'what-is-reading' },
      { label: '5. Tips for Better Readings', anchor: 'tips' }
    ],
    content: `
      <h2 id="what-is-spread">What is a Spread?</h2>
      <p>A spread is a layout of cards where each position has a specific meaning assigned to it. The simplest spreads are the most powerful for everyday practice.</p>
      <h2 id="one-card">The 1-Card Spread (Daily Draw)</h2>
      <p>Ask yourself a simple open question — "What do I need to focus on today?" — then draw one card. Sit with it before looking up the meaning. Your first impression matters.</p>
      <p>This is the daily practice most experienced readers still use every morning.</p>
      <h2 id="three-card">The 3-Card Spread</h2>
      <p>Lay three cards in a row. A simple position assignment:</p>
      <ol>
        <li><strong>Past</strong> — What has led to this situation</li>
        <li><strong>Present</strong> — What is most active right now</li>
        <li><strong>Future / Possibility</strong> — What may emerge if current energies continue</li>
      </ol>
      <p>Alternatives: <strong>Situation / Action / Outcome</strong> or <strong>Mind / Body / Spirit</strong>.</p>
      <h2 id="what-is-reading">What is a Reading?</h2>
      <p>A <em>reading</em> is the process of drawing and interpreting cards to answer a question, explore a situation, or reflect inwardly. A reading combines three elements: intention (the question or focus), method (the spread and how cards are drawn), and interpretation (how you translate images, numbers, suits, and card relationships into meaning).</p>

      <h3>Step-by-step: How to conduct a simple reading</h3>
      <ol>
        <li><strong>Set an intention:</strong> Take a moment to clarify your question. Open, phrased prompts work best (e.g., "What do I need to know about starting this project?").</li>
        <li><strong>Prepare the space and deck:</strong> Shuffle the cards while focusing on your question. Some people cut the deck, others fan through — choose a method that feels natural.</li>
        <li><strong>Draw into the spread:</strong> Pull the number of cards your spread requires and place them in the positions. Keep the physical arrangement deliberate — placement informs meaning.</li>
        <li><strong>Observe first impressions:</strong> Before consulting keywords or notes, record your immediate reactions: colors, figures, emotions, and which details jump out.</li>
        <li><strong>Layer meaning:</strong> Interpret each card first by its number and suit, then consider its upright/reversed orientation, and finally read cards in relation to each other and to the spread positions.</li>
        <li><strong>Weave a narrative:</strong> Look for a story or sequence among the cards. Ask how one card leads to the next, where tension appears, and where resources or resolutions are indicated.</li>
        <li><strong>Close and reflect:</strong> Summarize the reading in one or two sentences, record it in your journal, and note any actions suggested by the cards. Thank the deck or perform a short closing ritual if that supports your practice.</li>
      </ol>

      <h3>Ethics and context</h3>
      <ul>
        <li>Readings are reflective tools, not deterministic predictions. Encourage agency: focus on guidance and possibilities rather than fixed outcomes.</li>
        <li>When reading for others, obtain consent and set clear boundaries about the reading's scope.</li>
        <li>Respect privacy: keep notes confidential unless the client agrees to share them.</li>
      </ul>

      <h2 id="tips">Tips for Better Readings</h2>
      <p>Good questions and clear framing make readings far more useful. Below are examples you can copy and adapt, plus a short list of questions to avoid.</p>

      <h3>Good question examples</h3>
      <ul>
        <li><strong>Open, actionable:</strong> "What do I need to focus on this week to move my project forward?"</li>
        <li><strong>Exploratory:</strong> "What lessons is this situation asking me to learn right now?"</li>
        <li><strong>Process-oriented:</strong> "How can I best support my own well-being while navigating X?"</li>
        <li><strong>Options-focused:</strong> "What are the likely outcomes if I choose A versus B?"</li>
        <li><strong>Reflective:</strong> "What subconscious pattern is showing up for me around relationships right now?"</li>
      </ul>

      <h3>Questions to avoid ("Don't" examples)</h3>
      <ul>
        <li><strong>Yes/no fate questions:</strong> "Will I get rich?" — too absolute and not action-oriented.</li>
        <li><strong>Exact timing/speculation:</strong> "When exactly will X happen?" — Tarot is not precise on dates.</li>
        <li><strong>Invasive questions about others:</strong> "Does X person love me?" — avoids reading others' private agency; focus on the querent's experience instead.</li>
        <li><strong>Medical, legal, or financial directives:</strong> "Should I take this medical treatment?" — refer to professionals for those domains.</li>
      </ul>

      <p>Short practical tips:</p>
      <ul>
        <li>Ask open questions ("What do I need to know about X?") rather than yes/no questions.</li>
        <li>Notice your gut reaction to each card before looking anything up.</li>
        <li>Look for a story connecting all three cards.</li>
        <li>Write your interpretation down before you close the session.</li>
        <li>Practice the same simple spread for a week to see how interpretations evolve with context.</li>
      </ul>
    `
  },

  {
    id: 5,
    slug: 'lesson-5',
    title: 'Building a Practice',
    summary: 'Tips for building a consistent Tarot habit — journaling, weekly review, and staying motivated.',
    toc: [
      { label: '1. Consistency Over Intensity', anchor: 'consistency' },
      { label: '2. A Simple Rhythm', anchor: 'rhythm' },
      { label: '3. Using the Journal', anchor: 'journal' },
      { label: '4. Staying Motivated', anchor: 'motivated' }
    ],
    content: `
      <h2 id="consistency">Consistency Over Intensity</h2>
      <p>A short daily practice is far more valuable than an occasional deep session. Even five minutes each morning with a single card will build your intuition faster than an occasional hour-long session.</p>
      <h2 id="rhythm">A Simple Rhythm</h2>
      <ul>
        <li><strong>Daily:</strong> One card draw. Three words. One sentence about how you felt.</li>
        <li><strong>Weekly:</strong> Review the week's entries. Any patterns? Cards that repeated? Themes that emerged?</li>
        <li><strong>Monthly:</strong> Do a full 3-card reading to reflect on where you are.</li>
      </ul>
      <h2 id="journal">Using the Journal</h2>
      <p>The Practice page has a private journal stored only in your browser. Use it to record:</p>
      <ul>
        <li>Which card you drew and your first reaction</li>
        <li>What themes were active in your life that day</li>
        <li>Whether the card's energy showed up, and how</li>
      </ul>
      <h2 id="motivated">Staying Motivated</h2>
      <p>There is no correct meaning — only your conversation with the cards. The goal is not to predict the future but to develop the habit of honest self-reflection. Celebrate small wins: a week of daily draws, finishing one suit, doing your first reading for someone else.</p>
    `
  }
]

export function getLessonBySlug(slug) {
  return lessons.find(l => l.slug === slug) || null
}
