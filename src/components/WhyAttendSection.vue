<script setup lang="ts">
/**
 * WhyAttendSection
 * "WHY ATTEND?" — 2x2 grid of dark rounded cards. Each card shows a huge
 * blue-gradient number (01–04) bleeding off the bottom edge. Layout mirrors
 * per row: top row has the number bottom-LEFT with copy on the right;
 * bottom row flips it (number bottom-RIGHT, copy on the left), and the
 * card titles swap alignment the same way — exactly as in the reference.
 */

interface Reason {
  num: string
  title: string
  body: string
  flip: boolean // true = number on the right, copy on the left
}

const reasons: Reason[] = [
  {
    num: '01',
    title: 'Cutting-Edge Insights',
    body: 'Gain firsthand knowledge from top AI experts and pioneers shaping the industry.',
    flip: false,
  },
  {
    num: '02',
    title: 'Hands-On Learning',
    body: 'Participate in interactive workshops, live demos, and deep-dive sessions to sharpen your skills.',
    flip: false,
  },
  {
    num: '03',
    title: 'Exclusive Networking',
    body: 'Connect with AI leaders, investors, startups, and fellow professionals at curated networking events.',
    flip: true,
  },
  {
    num: '04',
    title: 'Innovation Showcase',
    body: 'Explore groundbreaking AI solutions, from emerging startups to tech giants redefining the future.',
    flip: true,
  },
]
</script>

<template>
  <section id="why" class="pb-16 lg:pb-24">
    <!-- Heading row: oversized title left, three-line blurb right. -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <h2
        class="text-5xl font-bold uppercase leading-none tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]"
      >
        Why Attend?
      </h2>
      <p class="max-w-55 text-xs leading-relaxed text-ink sm:text-sm">
        Discover why Next-Gen AI Summit is the must-attend event for AI professionals, innovators,
        and industry leaders.
      </p>
    </div>

    <!-- 2x2 card grid -->
    <div class="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-2">
      <article
        v-for="r in reasons"
        :key="r.num"
        class="relative min-h-60 overflow-hidden rounded-3xl bg-surface p-7 sm:p-8"
      >
        <!-- Giant gradient number bleeding off the card's bottom edge.
             Side depends on the row (flip). -->
        <span
          aria-hidden="true"
          class="pointer-events-none absolute -bottom-14 select-none bg-linear-to-b from-[#5a86f7] to-[#0c1f6e] bg-clip-text text-[11rem] font-bold leading-none text-transparent sm:-bottom-16 sm:text-[13rem]"
          :class="r.flip ? 'right-4' : 'left-4'"
        >
          {{ r.num }}
        </span>

        <div class="relative z-10 flex h-full flex-col">
          <!-- Card title: uppercase, aligned toward the copy-free side -->
          <h3
            class="text-sm font-bold uppercase tracking-wide text-ink sm:text-base"
            :class="r.flip ? 'text-right pr-6' : 'text-left pl-4'"
          >
            {{ r.title }}
          </h3>

          <!-- Copy sits opposite the number, pushed toward the card middle -->
          <p
            class="mt-10 max-w-55 text-xs leading-relaxed text-ink sm:text-sm"
            :class="r.flip ? 'self-start' : 'self-end sm:mr-10'"
          >
            {{ r.body }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
