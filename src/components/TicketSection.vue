<script setup lang="ts">
/**
 * TicketSection
 * "Ticket Options" — three pricing cards. The first (Early Bird) is solid
 * blue with a white pill button; the other two are black with a thin light
 * outline and blue pill buttons. Title top, big light-weight price, then
 * the "Get your ticket ↗" pill — matching the reference exactly.
 */

interface Ticket {
  title: string
  note: string
  price: string
  featured: boolean // true = solid blue card
}

const tickets: Ticket[] = [
  {
    title: 'Early Bird Pass',
    note: 'Limited time offer!',
    price: '€299',
    featured: true,
  },
  {
    title: 'Standard Pass',
    note: '',
    price: '€399',
    featured: false,
  },
  {
    title: 'VIP Experience',
    note: 'Includes exclusive speaker meetups & front-row seating',
    price: '€699',
    featured: false,
  },
]
</script>

<template>
  <section id="tickets" class="pb-16 lg:pb-24">
    <h2
      v-reveal
      class="text-3xl font-bold leading-none tracking-tight text-ink sm:text-4xl lg:text-5xl"
    >
      Ticket Options
    </h2>

    <!-- Three pricing cards -->
    <div
      v-reveal.stagger="{ y: 70, stagger: 0.15 }"
      class="mt-10 grid gap-5 sm:grid-cols-3 lg:mt-12 lg:gap-6"
    >
      <article
        v-for="t in tickets"
        :key="t.title"
        class="flex min-h-80 flex-col rounded-3xl p-7 py-10 transition-transform duration-300 ease-out hover:-translate-y-2 sm:p-8 sm:py-12 lg:min-h-115"
        :class="t.featured ? 'bg-[#1a49ff] text-white' : 'bg-canvas text-ink ring-1 ring-white/25'"
      >
        <h3 class="text-sm font-bold uppercase tracking-[0.15em] sm:text-base">{{ t.title }}</h3>

        <!-- Small note under the title (kept as empty space when absent
             so the three prices align across cards). -->
        <p class="mt-3 min-h-10 max-w-45 text-xs leading-relaxed sm:text-sm">
          {{ t.note }}
        </p>

        <!-- Big light price, pushed toward the card bottom -->
        <p class="mt-auto text-4xl font-light tracking-tight sm:text-5xl">{{ t.price }}</p>

        <!-- Pill CTA: white on the blue card, blue on the dark cards -->
        <a
          href="#register"
          class="group mt-8 inline-flex items-center justify-center gap-2 self-start rounded-full px-7 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
          :class="t.featured ? 'bg-[#e9eaec] text-[#101113]' : 'bg-[#1a49ff] text-white'"
        >
          Get your ticket
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path d="M7 17L17 7M17 7H8M17 7v9" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </article>
    </div>
  </section>
</template>
