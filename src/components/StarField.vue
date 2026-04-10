<template>
  <div class="starfield" aria-hidden="true">
    <span
      v-for="star in stars"
      :key="star.id"
      class="star"
      :style="{
        left: star.x + '%',
        top: star.y + '%',
        width: star.size + 'px',
        height: star.size + 'px',
        '--dur': star.duration + 's',
        '--delay': star.delay + 's',
        '--peak': star.opacity,
      }"
    />
  </div>
</template>

<script setup>
const COUNT = 90

function rand(min, max) {
  return Math.random() * (max - min) + min
}

const stars = Array.from({ length: COUNT }, (_, i) => ({
  id: i,
  x: rand(0, 100),
  y: rand(0, 100),
  size: rand(1, 2.4),
  duration: rand(3, 8),
  delay: rand(0, 10),
  opacity: rand(0.12, 0.45),
}))
</script>

<style scoped>
.starfield {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.star {
  position: absolute;
  border-radius: 50%;
  background: var(--color-indigo);
  animation: twinkle var(--dur) ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes twinkle {
  0%, 100% { opacity: calc(var(--peak) * 0.25); transform: scale(1); }
  50%       { opacity: var(--peak);              transform: scale(1.3); }
}

@media (prefers-color-scheme: dark) {
  .star { background: #ffffff; }
}
</style>
