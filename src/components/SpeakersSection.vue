<script setup lang="ts">
/**
 * SpeakersSection
 * "KEYNOTE SPEAKERS" — a 4-column grid of alternating cards:
 * light text cards (name top, role bottom) and black-and-white portrait
 * photos. The checkerboard alternation (text/photo/text/photo, then
 * photo/text/photo/text) matches the reference. "And more" pill below.
 */

interface Cell {
  type: 'text' | 'photo'
  name?: string
  role?: string
  src?: string
}

// Ordered exactly as the 4x2 checkerboard in the design.
const cells: Cell[] = [
  { type: 'text', name: 'Dr. Emily Carter', role: 'Chief AI Scientist, OpenAI' },
  { type: 'photo', src: '/speaker1.jpg' },
  { type: 'text', name: 'Elon Park', role: 'CTO, DeepMind' },
  { type: 'photo', src: '/speaker2.jpg' },
  { type: 'photo', src: '/speaker3.jpg' },
  { type: 'text', name: 'Laura Kim', role: 'AI Policy Advisor, EU Commission' },
  { type: 'photo', src: '/speaker4.jpg' },
  { type: 'text', name: 'Dr. Alan Foster', role: 'Stanford AI Lab' },
]
</script>

<template>
  <section id="speakers-list" class="pb-16 lg:pb-24">
    <!-- Heading row: big two-line title left, small blurb top-right. -->
    <div v-reveal class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <h2
        class="text-5xl font-bold uppercase leading-[1.15] tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]"
      >
        <span class="block">Keynote</span>
        <span class="block">Speakers</span>
      </h2>
      <p class="max-w-55 text-xs leading-relaxed text-ink sm:text-sm">
        Meet the industry leaders shaping the future of AI.
      </p>
    </div>

    <!-- Speaker grid: 2 cols on mobile, 4 on lg. Tall rounded cells. -->
    <div
      v-reveal.stagger="{ y: 50, stagger: 0.08 }"
      class="mt-10 grid grid-cols-2 gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-5"
    >
      <template v-for="(cell, i) in cells" :key="i">
        <!-- Light info card: name pinned top, role pinned bottom. -->
        <div
          v-if="cell.type === 'text'"
          class="flex aspect-10/14 flex-col justify-between rounded-3xl bg-[#e9eaec] p-5 sm:p-8"
        >
          <p class="text-lg font-semibold leading-snug text-[#1C1A1A] sm:text-3xl">
            {{ cell.name }}
          </p>
          <p class="text-xs leading-relaxed text-[#1C1A1A] sm:text-[20px]">{{ cell.role }}</p>
        </div>

        <!-- Portrait card: grayscale to match the monochrome reference. -->
        <img
          v-else
          :src="cell.src"
          alt=""
          aria-hidden="true"
          class="aspect-10/14 w-full rounded-3xl object-cover grayscale transition-[filter,transform] duration-500 hover:scale-[1.02] hover:grayscale-0"
        />
      </template>
    </div>

    <!-- "And more" outline pill, bottom-left. -->
    <a
      href="#speakers"
      class="group mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-ink ring-1 ring-white/40 transition-colors hover:bg-white/10"
    >
      And more
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <path d="M7 17L17 7M17 7H8M17 7v9" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </a>
  </section>
</template>
