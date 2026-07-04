<script setup lang="ts">
/**
 * AgendaSection
 * "AGENDA" heading row (huge title left, event meta right) above a large
 * rounded dark card listing the three summit days. Each row: day + time on
 * the left, session title + description on the right. The Mark.png graphic
 * bleeds out of the card's lower-left corner, and the CTA sits bottom-right.
 */
import { ref } from 'vue'
import CtaButton from './CtaButton.vue'
import { useGsap } from '@/composables/useGsap'
import { gsap } from '@/lib/gsap'

const section = ref<HTMLElement | null>(null)

useGsap(section, () => {
  // Subtle scrubbed parallax on the Mark graphic. Symmetric fromTo so the
  // drift passes through 0 when the card sits mid-viewport — at reading
  // position the graphic rests exactly where the design places it, and the
  // card-edge clipping never exceeds the intended bleed.
  gsap.fromTo(
    '.agenda-mark',
    { yPercent: 8, rotation: -6 },
    {
      yPercent: -8,
      rotation: 6,
      ease: 'none',
      scrollTrigger: {
        trigger: '.agenda-card',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  )
})

interface AgendaItem {
  day: string
  time: string
  title: string
  description: string
}

const items: AgendaItem[] = [
  {
    day: 'Day 1',
    time: '09:00 – 19:00',
    title: 'AI Innovations & Trends',
    description:
      "The summit kicks off with a keynote, expert panels, and discussions on AI's impact, ethics, and automation. Hands-on workshops and a networking event wrap up the day.",
  },
  {
    day: 'Day 2',
    time: '09:00 – 20:00',
    title: 'AI Technologies & Applications',
    description:
      "Explore the latest in generative AI, robotics, and NLP, with industry-led discussions and tech demos. A startup showcase and investor insights highlight AI's business potential.",
  },
  {
    day: 'Day 3',
    time: '09:30 – 16:00',
    title: 'Future of AI & Networking',
    description:
      "Dive into AI's long-term impact, attend expert-led workshops, and watch the startup pitch competition. The event closes with a visionary keynote and final networking sessions.",
  },
]
</script>

<template>
  <section id="schedule" ref="section" class="pb-16 lg:pb-24">
    <!-- Heading row: oversized title left, small event meta right. -->
    <div v-reveal class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <h2
        class="text-5xl font-bold uppercase leading-none tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]"
      >
        Agenda
      </h2>
      <p class="max-w-55 text-xs leading-relaxed text-ink sm:text-right sm:text-sm">
        October 15–17, 2052 | Horizon Convention Center, Amsterdam
      </p>
    </div>

    <!-- Schedule card -->
    <div
      class="agenda-card relative mt-10 overflow-hidden rounded-4xl bg-surface px-6 py-12 sm:px-10 lg:mt-12 lg:px-14 lg:py-25"
    >
      <!-- Decorative Mark graphic bleeding out of the lower-left corner. -->
      <img
        src="/Mark.png"
        alt=""
        aria-hidden="true"
        class="agenda-mark pointer-events-none absolute -bottom-8 -left-0 h-48 w-48 object-contain will-change-transform sm:h-56 sm:w-56 lg:h-70 lg:w-70"
      />

      <div class="relative z-10 flex flex-col gap-14 lg:gap-20">
        <!-- One row per day: 2-col grid on lg, stacked on mobile. -->
        <div
          v-for="item in items"
          :key="item.day"
          v-reveal="{ y: 50 }"
          class="grid gap-4 lg:grid-cols-2 lg:gap-10"
        >
          <div class="text-2xl font-bold text-ink sm:text-[1.75rem]">
            <p>{{ item.day }}</p>
            <p class="mt-1">{{ item.time }}</p>
          </div>
          <div>
            <h3 class="max-w-md text-2xl font-bold leading-snug text-ink sm:text-[1.75rem]">
              {{ item.title }}
            </h3>
            <p class="mt-4 max-w-105 text-sm leading-relaxed text-ink">
              {{ item.description }}
            </p>
          </div>
        </div>

        <!-- CTA aligned with the right column, matching the reference. -->
        <div class="grid lg:grid-cols-2 lg:gap-10">
          <div class="hidden lg:block" />
          <div>
            <CtaButton href="#schedule" class="w-full justify-center sm:max-w-105">
              View detailed schedule
            </CtaButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
