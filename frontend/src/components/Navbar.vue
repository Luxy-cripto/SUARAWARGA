<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

function closeMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <nav class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
    <div class="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-4">

      <!-- Logo -->
      <RouterLink to="/" class="group flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-teal-600 text-xl shadow-md shadow-blue-900/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
          📢
        </div>
        <div>
          <h1 class="text-lg font-bold tracking-tight text-slate-900">
            SUARAWARGA
          </h1>
          <p class="hidden text-xs text-slate-500 sm:block">
            Suara masyarakat, perubahan nyata.
          </p>
        </div>
      </RouterLink>

      <!-- Menu (desktop) -->
      <div class="hidden items-center justify-center gap-8 md:flex">
        <RouterLink
          to="/"
          class="group relative py-1 text-sm font-medium transition-colors duration-300"
          :class="route.path === '/' ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'"
        >
          Beranda
          <span
            class="absolute -bottom-1 left-0 h-0.5 rounded-full bg-teal-600 transition-all duration-300"
            :class="route.path === '/' ? 'w-full' : 'w-0 group-hover:w-full'"
          ></span>
        </RouterLink>

        <RouterLink
          to="/reports"
          class="group relative py-1 text-sm font-medium transition-colors duration-300"
          :class="route.path === '/reports' ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'"
        >
          Laporan
          <span
            class="absolute -bottom-1 left-0 h-0.5 rounded-full bg-teal-600 transition-all duration-300"
            :class="route.path === '/reports' ? 'w-full' : 'w-0 group-hover:w-full'"
          ></span>
        </RouterLink>

        <RouterLink
          to="/about"
          class="group relative py-1 text-sm font-medium transition-colors duration-300"
          :class="route.path === '/about' ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'"
        >
          Tentang
          <span
            class="absolute -bottom-1 left-0 h-0.5 rounded-full bg-teal-600 transition-all duration-300"
            :class="route.path === '/about' ? 'w-full' : 'w-0 group-hover:w-full'"
          ></span>
        </RouterLink>
      </div>

      <!-- Tombol (desktop) + hamburger (mobile) -->
      <div class="flex items-center justify-end gap-3">
        <RouterLink
          to="/login"
          class="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-300 hover:bg-slate-100 sm:block"
        >
          Masuk
        </RouterLink>

        <button class="hidden rounded-lg bg-gradient-to-r from-blue-900 to-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-900/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-teal-600 hover:to-teal-500 hover:shadow-lg hover:shadow-blue-900/30 sm:block">
          Buat Laporan
        </button>

        <!-- Hamburger, cuma muncul di mobile -->
        <button
          class="mobile-menu-btn md:hidden"
          @click="mobileMenuOpen = !mobileMenuOpen"
          :aria-expanded="mobileMenuOpen"
          aria-label="Buka menu"
        >
          <span :class="{ open: mobileMenuOpen }"></span>
          <span :class="{ open: mobileMenuOpen }"></span>
          <span :class="{ open: mobileMenuOpen }"></span>
        </button>
      </div>

    </div>

    <!-- Panel menu mobile -->
    <transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="mobile-menu md:hidden">
        <RouterLink to="/" class="mobile-menu-link" @click="closeMenu">🏠 Beranda</RouterLink>
        <RouterLink to="/reports" class="mobile-menu-link" @click="closeMenu">📋 Laporan</RouterLink>
        <RouterLink to="/about" class="mobile-menu-link" @click="closeMenu">ℹ️ Tentang</RouterLink>

        <div class="mobile-menu-divider"></div>

        <RouterLink to="/login" class="mobile-menu-link" @click="closeMenu">👤 Masuk</RouterLink>
        <button class="btn btn-primary mobile-menu-cta" @click="closeMenu">
          📢 Buat Laporan
        </button>
      </div>
    </transition>
  </nav>
</template>