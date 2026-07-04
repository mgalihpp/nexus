<script setup lang="ts">
/**
 * ContactSection
 * One big rounded dark-gray card containing:
 *  - left: "We're Here To Connect And Assist You" heading, blurb, and a
 *    2x2 info grid (Contact us / Event location / Email / Follow us)
 *  - right: light "GET IN TOUCH" form card with underline-style inputs
 *    and a blue gradient "Send message" pill
 *  - below: a real Google Maps embed, CSS-filtered to the dark
 *    black-and-white look of the reference (invert + grayscale).
 */

const infoBlocks = [
  { label: 'Contact us', lines: ['+31 20 123 4567'] },
  { label: 'Event location', lines: ['Horizon Convention Center', 'Amsterdam, Netherlands'] },
  { label: 'Email', lines: ['info@nexus.com'] },
]

// Underline-style inputs of the form, in order.
const fields = [
  { name: 'name', placeholder: 'Name', type: 'text' },
  { name: 'email', placeholder: 'Email', type: 'email' },
  { name: 'subject', placeholder: 'Subject', type: 'text' },
]
</script>

<template>
  <section id="contact" class="pb-16 lg:pb-24">
    <!-- Whole section lives on one big rounded card, slightly lighter than the canvas. -->
    <div class="rounded-4xl bg-[#1e1f21] p-6 sm:p-10 lg:p-16">
      <div class="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <!-- LEFT: heading + blurb + info grid -->
        <div>
          <h2 class="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
            We're Here To<br />
            Connect And<br />
            Assist You
          </h2>
          <p class="mt-5 max-w-75 text-xs leading-relaxed text-muted sm:text-sm">
            Have questions about the summit? Need help with registration or travel? Our team is
            ready to assist you.
          </p>

          <!-- 2x2 info grid -->
          <div class="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
            <div v-for="b in infoBlocks" :key="b.label">
              <h3 class="text-sm font-bold uppercase tracking-[0.15em] text-ink">{{ b.label }}</h3>
              <p v-for="line in b.lines" :key="line" class="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
                {{ line }}
              </p>
            </div>

            <!-- Follow us: social icons row -->
            <div>
              <h3 class="text-sm font-bold uppercase tracking-[0.15em] text-ink">Follow us</h3>
              <div class="mt-3 flex items-center gap-4 text-ink">
                <!-- Facebook -->
                <a href="#" aria-label="Facebook" class="transition-opacity hover:opacity-70">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.5V13h2.6v8h3.4z" />
                  </svg>
                </a>
                <!-- LinkedIn -->
                <a href="#" aria-label="LinkedIn" class="transition-opacity hover:opacity-70">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9z" />
                  </svg>
                </a>
                <!-- Instagram -->
                <a href="#" aria-label="Instagram" class="transition-opacity hover:opacity-70">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <!-- YouTube -->
                <a href="#" aria-label="YouTube" class="transition-opacity hover:opacity-70">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 12s0-3.8-.5-5.5c-.3-1-1-1.7-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.5c-1 .3-1.7 1-2 2C1 8.2 1 12 1 12s0 3.8.5 5.5c.3 1 1 1.7 2 2 1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5c-1 0 1.7-1 2-2 .5-1.7.5-5.5.5-5.5zM9.8 15.5v-7l6 3.5-6 3.5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: light form card -->
        <form
          class="flex flex-col rounded-3xl bg-[#e9eaec] p-6 sm:p-9"
          @submit.prevent
        >
          <h3 class="text-lg font-bold uppercase tracking-[0.15em] text-[#101113] sm:text-xl">
            Get in touch
          </h3>
          <p class="mt-3 max-w-70 text-xs leading-relaxed text-[#5b5f66] sm:text-sm">
            Reach out with inquiries about tickets, partnerships, or event details.
          </p>

          <!-- Underline-style inputs -->
          <div class="mt-8 flex flex-col gap-7">
            <input
              v-for="f in fields"
              :key="f.name"
              :type="f.type"
              :name="f.name"
              :placeholder="f.placeholder"
              class="w-full border-b border-[#b7bac0] bg-transparent pb-2 text-sm text-[#101113] placeholder-[#8a8d93] outline-none transition-colors focus:border-[#1a49ff]"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="2"
              class="w-full resize-none border-b border-[#b7bac0] bg-transparent pb-2 text-sm text-[#101113] placeholder-[#8a8d93] outline-none transition-colors focus:border-[#1a49ff]"
            ></textarea>
          </div>

          <!-- Blue gradient pill -->
          <button
            type="submit"
            class="mt-9 inline-flex items-center justify-center self-start rounded-full bg-linear-to-r from-[#5a86f7] via-[#2d55e8] to-[#132a8f] px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Send message
          </button>
        </form>
      </div>

      <!-- MAP: real Google Maps embed (Amsterdam), CSS-filtered to the
           dark monochrome style of the reference. -->
      <div class="mt-10 overflow-hidden rounded-3xl lg:mt-14">
        <iframe
          title="Event location map — Amsterdam, Netherlands"
          src="https://maps.google.com/maps?q=Amsterdam%2C%20Netherlands&z=14&output=embed"
          class="h-70 w-full border-0 grayscale invert-[0.92] hue-rotate-180 contrast-[1.1] sm:h-90 lg:h-135"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</template>
