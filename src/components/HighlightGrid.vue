<script setup lang="ts">
/**
 * HighlightGrid
 * The three feature cards below the logo strip:
 *   - a tall "Speakers" card on the left (spans the full column height)
 *   - "Technologies" (top-right) and "Networking Opportunities" (bottom-right)
 *     stacked in the right column.
 *
 * Implemented as a two-column grid; the right column is itself a small grid so
 * its two cards stack and share the gutter. Collapses to a single column on
 * narrow screens.
 */

// Overlapping speaker portraits shown at the bottom of the "Speakers" card.
const avatars = ['/avatar1.jpg', '/avatar2.jpg', '/avatar3.jpg', '/avatar4.jpg']
</script>

<template>
  <section id="speakers" class="grid gap-5 pb-16 lg:grid-cols-[1fr_1.12fr] lg:pb-24">
    <!-- ── Speakers (tall left card) ─────────────────────────────── -->
    <article
      v-reveal="{ y: 60 }"
      class="transition-transform duration-300 ease-out hover:-translate-y-1.5 flex min-h-100 flex-col rounded-4xl bg-[#1a49ff] p-8 sm:p-10 lg:min-h-[26rem]"
    >
      <h3 class="text-2xl font-bold text-white sm:text-3xl">Speakers</h3>

      <!-- Icon on the left, supporting copy on the right (as in the reference). -->
      <div class="mt-6 flex items-start gap-4">
        <span
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/95 text-[#1a49ff]"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
          >
            <path d="M7 17L17 7M17 7H8M17 7v9" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <p class="max-w-xs text-sm leading-relaxed text-white/80">
          Hear from global AI leaders, researchers, and entrepreneurs who are defining the future of
          artificial intelligence.
        </p>
      </div>

      <!-- Footer: avatar cluster + "And more" pill, pinned to the bottom. -->
      <div class="mt-auto flex items-center justify-between pt-10">
        <div class="flex -space-x-3">
          <img
            v-for="(src, i) in avatars"
            :key="i"
            :src="src"
            alt=""
            aria-hidden="true"
            class="h-9 w-9 rounded-full object-cover ring-2 ring-[#1a49ff]"
          />
        </div>
        <a
          href="#speakers"
          class="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white ring-1 ring-white/40 transition-colors hover:bg-white/10"
        >
          And more
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
          >
            <path d="M7 17L17 7M17 7H8M17 7v9" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </article>

    <!-- ── Right column: two stacked cards ───────────────────────── -->
    <div class="grid gap-5 lg:grid-rows-[auto_1fr]">
      <!-- Technologies (blue) -->
      <article
        v-reveal="{ y: 60, delay: 0.12 }"
        class="transition-transform duration-300 ease-out hover:-translate-y-1.5 rounded-4xl bg-[#1a49ff] p-8 sm:p-10"
      >
        <h3 class="text-2xl font-bold text-white sm:text-3xl">Technologies</h3>
        <p class="mt-3 max-w-md text-sm leading-relaxed text-white/80">
          Explore advanced machine learning, natural language processing, AI-driven automation, and
          emerging cybersecurity applications.
        </p>
      </article>

      <!-- Networking Opportunities (light card, dark text) -->
      <article
        v-reveal="{ y: 60, delay: 0.24 }"
        class="transition-transform duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-center rounded-4xl bg-[#e9eaec] p-8 sm:p-10"
      >
        <h3 class="text-2xl font-bold text-[#101113] sm:text-3xl">Networking Opportunities</h3>
        <p class="mt-3 max-w-md text-sm leading-relaxed text-[#5b5f66]">
          Enjoy exclusive networking sessions, roundtables, and social events to foster
          collaboration and spark new partnerships.
        </p>
      </article>
    </div>
  </section>
</template>
