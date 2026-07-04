<script setup lang="ts">
/**
 * RegisterSection
 * "REGISTER NOW" — oversized two-line heading left, blurb top-right, then a
 * dark rounded card with a LIVE early-bird countdown (days : hours : minutes)
 * and the blue starburst mark bleeding off the card's right edge.
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useGsap } from '@/composables/useGsap'
import { gsap } from '@/lib/gsap'

const section = ref<HTMLElement | null>(null)

useGsap(section, () => {
  // Starburst spins gently as the card travels through the viewport.
  // Symmetric fromTo: rotation crosses 0 when the card is mid-viewport, so
  // at reading position the star sits exactly as designed and its arms are
  // never swung further out of the card's clip than the intended bleed.
  gsap.fromTo(
    '.register-star',
    { rotation: -18 },
    {
      rotation: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: '.register-card',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  )
})

// Early-bird deadline — anchored so the counter starts at 12 : 05 : 30
// (days : hours : minutes) like the reference, then ticks down live.
const DEADLINE = new Date(Date.now() + ((12 * 24 + 5) * 60 + 30) * 60_000)

const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})
onBeforeUnmount(() => clearInterval(timer))

const pad = (n: number) => String(n).padStart(2, '0')

const countdown = computed(() => {
  const diff = Math.max(0, DEADLINE.getTime() - now.value)
  const minutes = Math.floor(diff / 60_000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  return {
    days: pad(days % 100), // two digits like the reference "12"
    hours: pad(hours % 24),
    minutes: pad(minutes % 60),
    seconds: pad(Math.floor(diff / 1000) % 60),
  }
})

const units = computed(() => [
  { value: countdown.value.days, label: 'Days' },
  { value: countdown.value.hours, label: 'Hours' },
  { value: countdown.value.minutes, label: 'Minutes' },
  { value: countdown.value.seconds, label: 'Seconds' },
])
</script>

<template>
  <section id="register" ref="section" class="pb-16 lg:pb-24">
    <!-- Heading row: two-line title left, three-line blurb right. -->
    <div v-reveal class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <h2
        class="text-5xl font-bold uppercase leading-[1.15] tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]"
      >
        <span class="block">Register</span>
        <span class="block">Now</span>
      </h2>
      <p class="max-w-55 text-xs leading-relaxed text-ink sm:text-sm">
        Secure your spot at the Next-Gen AI Summit 2052 and join the future of AI innovation.
      </p>
    </div>

    <!-- Countdown card: starburst mark bleeds off the right edge. -->
    <div
      v-reveal="{ y: 60 }"
      class="register-card relative mt-10 overflow-hidden rounded-4xl bg-surface px-6 py-12 sm:px-10 lg:mt-12 lg:px-14 lg:py-16"
    >
      <!-- Blue starburst, right side, partially clipped by the card. -->
      <img
        src="/Vector.png"
        alt=""
        aria-hidden="true"
        class="register-star pointer-events-none absolute -bottom-10 -right-10 hidden h-60 w-auto select-none will-change-transform sm:block lg:-bottom-14 lg:-right-6 lg:h-80"
      />

      <div class="relative z-10">
        <p class="text-sm text-ink sm:text-base">Early Bird Pricing Ends In:</p>

        <!-- Giant digits with colon separators, labels underneath each group. -->
        <div class="mt-6 flex items-start gap-3 sm:gap-5 lg:gap-6">
          <template v-for="(u, i) in units" :key="u.label">
            <!-- colon between groups, aligned with the digits -->
            <span
              v-if="i > 0"
              aria-hidden="true"
              class="text-6xl font-light leading-none text-ink sm:text-7xl lg:text-[7.5rem]"
            >
              :
            </span>
            <div class="flex flex-col items-center gap-4">
              <span
                class="text-6xl font-light leading-none tracking-tight text-ink sm:text-7xl lg:text-[7.5rem]"
              >
                {{ u.value }}
              </span>
              <span class="text-[10px] uppercase tracking-widest text-muted sm:text-xs">
                {{ u.label }}
              </span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
