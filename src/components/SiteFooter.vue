<script setup lang="ts">
/**
 * SiteFooter
 * Two overlapping rounded panels: a light gray one on the left (site title,
 * two link columns, copyright) and a solid blue one on the right that sits
 * ON TOP of the light panel's right edge (Stay updated form + socials),
 * exactly like the reference.
 */

const navLinks = ['Agenda', 'Speakers', 'Register', 'Venue', 'FAQ']
const legalLinks = ['Terms & Conditions', 'Privacy Policy', 'Cookie Policy']
</script>

<template>
  <footer class="pb-4 lg:pb-6">
    <div class="grid lg:grid-cols-[1.15fr_1fr]">
      <!-- LEFT: light panel. On lg it extends under the blue panel, so only
           its left corners are rounded there. -->
      <div
        class="flex flex-col rounded-t-4xl bg-[#e9eaec] p-8 sm:p-10 lg:rounded-l-4xl lg:rounded-tr-none lg:p-12 lg:pr-16"
      >
        <p class="text-2xl font-bold tracking-tight text-[#101113] sm:text-3xl">
          Next-Gen AI Summit 2052
        </p>

        <!-- Two link columns -->
        <div class="mt-10 grid max-w-100 grid-cols-2 gap-x-8">
          <ul class="space-y-4">
            <li v-for="link in navLinks" :key="link">
              <a
                :href="`#${link.toLowerCase()}`"
                class="text-sm text-[#101113] transition-opacity hover:opacity-60"
              >
                {{ link }}
              </a>
            </li>
          </ul>
          <ul class="space-y-4">
            <li v-for="link in legalLinks" :key="link">
              <a href="#" class="text-sm text-[#101113] transition-opacity hover:opacity-60">
                {{ link }}
              </a>
            </li>
          </ul>
        </div>

        <p class="mt-12 text-sm text-[#8a8d93] lg:mt-auto lg:pt-16">
          © 2052 Next-Gen AI Summit. All rights reserved.
        </p>
      </div>

      <!-- RIGHT: blue panel, fully rounded, overlapping the light one on lg. -->
      <div class="rounded-b-4xl bg-[#1a49ff] p-8 text-white sm:p-10 lg:-ml-10 lg:rounded-4xl lg:p-12">
        <h2 class="text-lg font-bold uppercase tracking-[0.15em] sm:text-xl">Stay updated</h2>
        <p class="mt-3 text-xs leading-relaxed text-white/90 sm:text-sm">
          Subscribe for event updates &amp; exclusive content.
        </p>

        <!-- Underline email input + white pill button -->
        <form class="mt-10" @submit.prevent>
          <input
            type="email"
            name="email"
            placeholder="Email"
            class="w-full border-b border-white/70 bg-transparent pb-2 text-sm text-white placeholder-white/90 outline-none transition-colors focus:border-white"
          />
          <button
            type="submit"
            class="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-medium text-[#101113] transition-opacity hover:opacity-90"
          >
            Stay updated
          </button>
        </form>

        <h3 class="mt-12 text-lg font-bold uppercase tracking-[0.15em] sm:text-xl">Follow us</h3>
        <div class="mt-4 flex items-center gap-5">
          <!-- Facebook -->
          <a href="#" aria-label="Facebook" class="transition-opacity hover:opacity-70">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.5V13h2.6v8h3.4z" />
            </svg>
          </a>
          <!-- LinkedIn -->
          <a href="#" aria-label="LinkedIn" class="transition-opacity hover:opacity-70">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9z" />
            </svg>
          </a>
          <!-- Instagram -->
          <a href="#" aria-label="Instagram" class="transition-opacity hover:opacity-70">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <!-- YouTube -->
          <a href="#" aria-label="YouTube" class="transition-opacity hover:opacity-70">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 12s0-3.8-.5-5.5c-.3-1-1-1.7-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.5c-1 .3-1.7 1-2 2C1 8.2 1 12 1 12s0 3.8.5 5.5c.3 1 1 1.7 2 2 1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5c1-.3 1.7-1 2-2 .5-1.7.5-5.5.5-5.5zM9.8 15.5v-7l6 3.5-6 3.5z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
