<script setup lang="ts">
/**
 * CtaButton
 * Rounded gradient pill call-to-action with a trailing arrow glyph.
 * Kept generic (label via slot, optional href) so it can be reused elsewhere.
 */
withDefaults(defineProps<{ href?: string }>(), { href: '#' })
</script>

<template>
  <a
    :href="href"
    class="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#5a86f7] via-[#2d55e8] to-[#132a8f] px-7 py-3.5 text-[15px] font-medium text-ink transition-transform duration-200 hover:scale-[1.03]"
  >
    <slot>Early bird tickets</slot>
    <!-- Diagonal arrow that nudges on hover -->
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M7 17L17 7M17 7H8M17 7v9" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </a>
</template>
