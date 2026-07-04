<script setup lang="ts">
/**
 * SiteHeader
 * Top navigation bar: wordmark on the left, primary nav on the right.
 * The active link renders as a pill (matching the "Home" state in the design).
 * On mobile the link list collapses into a toggleable menu.
 */
import { ref } from 'vue'

interface NavItem {
  label: string
  href: string
}

const items: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Tickets', href: '#tickets' },
  { label: 'Venue', href: '#venue' },
  { label: 'Sponsors', href: '#sponsors' },
]

// Tracks which link is "active" so we can render the pill highlight.
const active = ref('Home')
// Mobile menu open/closed state.
const menuOpen = ref(false)
</script>

<template>
  <!-- Horizontal alignment comes from the parent frame's gutter; header only
       owns its vertical rhythm. -->
  <header class="flex items-center justify-between py-5 lg:py-6">
    <!-- Wordmark -->
    <a href="#home" class="text-2xl font-bold tracking-tight text-ink lowercase">nexus</a>

    <!-- Desktop navigation -->
    <nav class="hidden items-center gap-1 md:flex">
      <a
        v-for="item in items"
        :key="item.label"
        :href="item.href"
        @click="active = item.label"
        class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
        :class="
          active === item.label
            ? 'text-ink ring-1 ring-white/30' // active pill
            : 'text-muted hover:text-ink'
        "
      >
        {{ item.label }}
      </a>
    </nav>

    <!-- Mobile hamburger -->
    <button
      class="text-ink md:hidden"
      aria-label="Toggle navigation"
      @click="menuOpen = !menuOpen"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path v-if="!menuOpen" d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" />
        <path v-else d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
      </svg>
    </button>

    <!-- Mobile dropdown menu -->
    <nav
      v-if="menuOpen"
      class="absolute inset-x-4 top-20 z-20 flex flex-col gap-1 rounded-2xl bg-surface p-3 ring-1 ring-white/10 md:hidden"
    >
      <a
        v-for="item in items"
        :key="item.label"
        :href="item.href"
        @click="((active = item.label), (menuOpen = false))"
        class="rounded-xl px-4 py-3 text-sm font-medium transition-colors"
        :class="active === item.label ? 'bg-white/10 text-ink' : 'text-muted hover:text-ink'"
      >
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>
