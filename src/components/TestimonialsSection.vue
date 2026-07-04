<script setup lang="ts">
/**
 * TestimonialsSection
 * "What Past Attendees Say" — a working carousel. Three cards are visible
 * at a time; the CENTER card is always the highlighted blue one, slightly
 * taller than its neighbours (left = dark, right = light gray), exactly
 * like the reference. The circular arrow buttons top-right rotate the deck.
 */
import { computed, ref } from 'vue'

interface Testimonial {
  title: string
  quote: string
  name: string
  role: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    title: 'Game-Changing Insights',
    quote:
      '"This summit opened my eyes to the next wave of AI and how it will shape industries."',
    name: 'Mark Vandenberg',
    role: 'CTO, NeuralTech',
    avatar: '/att1.jpg',
  },
  {
    title: 'The Best AI Event!',
    quote:
      '"Incredible speakers, top-tier networking, and cutting-edge discussions all in one place."',
    name: 'Elena Rojas',
    role: 'AI Researcher, DeepMind',
    avatar: '/att2.jpg',
  },
  {
    title: 'Unmatched Opportunities',
    quote:
      '"From hands-on workshops to visionary talks, this summit is a must-attend for AI professionals."',
    name: 'David Laurent',
    role: 'CEO, FutureAI Labs',
    avatar: '/att3.jpg',
  },
  {
    title: 'Absolutely Worth It',
    quote:
      '"Every session delivered real, actionable value. I left with a notebook full of ideas."',
    name: 'Priya Nair',
    role: 'Head of ML, Finova',
    avatar: '/att4.jpg',
  },
  {
    title: 'Inspiring & Practical',
    quote:
      '"The perfect balance between big-picture vision and hands-on technical depth."',
    name: 'Tomas Eriksen',
    role: 'Founder, Synthetica',
    avatar: '/att5.jpg',
  },
]

// Index of the testimonial shown in the CENTER (blue) slot.
const active = ref(1)

const prev = () => {
  active.value = (active.value - 1 + testimonials.length) % testimonials.length
}
const next = () => {
  active.value = (active.value + 1) % testimonials.length
}

// The three visible slides: left, center (highlighted), right.
const visible = computed(() => {
  const n = testimonials.length
  return [-1, 0, 1].map((offset) => {
    const idx = (active.value + offset + n) % n
    return { ...testimonials[idx], offset, key: idx }
  })
})
</script>

<template>
  <section id="testimonials" class="pb-16 lg:pb-24">
    <!-- Heading row: title left, carousel controls right. -->
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-3xl font-bold leading-none tracking-tight text-ink sm:text-4xl lg:text-5xl">
        What Past Attendees Say
      </h2>

      <!-- Prev = dark outlined circle, Next = light filled circle. -->
      <div class="flex shrink-0 items-center gap-3">
        <button
          type="button"
          aria-label="Previous testimonial"
          class="flex h-11 w-11 items-center justify-center rounded-full text-ink ring-1 ring-white/30 transition-colors hover:bg-white/10"
          @click="prev"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5m0 0l6-6m-6 6l6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          class="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9eaec] text-[#101113] transition-colors hover:bg-white"
          @click="next"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Carousel: 3 slots on lg (center elevated + blue), 1 card on mobile. -->
    <div class="mt-10 grid items-center gap-5 lg:mt-14 lg:grid-cols-3">
      <article
        v-for="t in visible"
        :key="t.key"
        class="flex flex-col rounded-3xl p-7 transition-all duration-300 sm:p-9"
        :class="[
          t.offset === 0
            ? 'min-h-90 bg-[#1a49ff] text-white'
            : 'min-h-80 hidden lg:flex',
          t.offset === -1 ? 'bg-surface text-muted' : '',
          t.offset === 1 ? 'bg-[#e9eaec] text-[#101113]' : '',
        ]"
      >
        <!-- Uppercase headline -->
        <h3
          class="text-lg font-bold uppercase leading-snug tracking-wide sm:text-xl"
          :class="t.offset === -1 ? 'text-[#7a7d83]' : ''"
        >
          {{ t.title }}
        </h3>

        <!-- Quote -->
        <p
          class="mt-6 text-xs leading-relaxed sm:text-sm"
          :class="t.offset === -1 ? 'text-[#7a7d83]' : t.offset === 1 ? 'text-[#3a3d43]' : ''"
        >
          {{ t.quote }}
        </p>

        <!-- Author pinned to the card bottom -->
        <div class="mt-auto flex items-center gap-3 pt-8">
          <img
            :src="t.avatar"
            alt=""
            class="h-10 w-10 rounded-full object-cover"
            :class="t.offset === -1 ? 'opacity-70 grayscale' : ''"
          />
          <div class="text-xs leading-tight sm:text-sm">
            <p class="font-semibold" :class="t.offset === -1 ? 'text-[#7a7d83]' : ''">
              {{ t.name }}
            </p>
            <p :class="t.offset === -1 ? 'text-[#5b5f66]' : t.offset === 1 ? 'text-[#5b5f66]' : 'text-white/80'">
              {{ t.role }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
