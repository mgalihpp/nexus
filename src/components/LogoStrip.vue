<script setup lang="ts">
/**
 * LogoStrip
 * Row of partner / sponsor wordmarks sitting just below the hero.
 * Logos live in /public and are white PNGs, so they render directly on
 * the black canvas. The list wraps and re-spaces on smaller screens.
 */
interface Logo {
  name: string
  src: string
}

const logos: Logo[] = [
  { name: 'Amazon', src: '/amazon.png' },
  { name: 'Dribbble', src: '/dribble.png' },
  { name: 'HubSpot', src: '/hubspot.png' },
  { name: 'Notion', src: '/notion.png' },
  { name: 'Gumroad', src: '/gumroad.png' },
]
</script>

<template>
  <!-- Evenly distributed across the frame; wraps to a centred cluster on mobile. -->
  <div
    class="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 py-10 sm:justify-between sm:gap-x-8 lg:py-14"
  >
    <img
      v-for="logo in logos"
      :key="logo.name"
      :src="logo.src"
      :alt="logo.name"
      class="h-6 w-auto object-contain opacity-90 sm:h-7"
    />
  </div>
</template>
