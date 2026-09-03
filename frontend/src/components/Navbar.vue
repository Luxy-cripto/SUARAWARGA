<script setup>
import { RouterLink } from 'vue-router'
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
          <p class="text-xs text-slate-500">
            Suara masyarakat, perubahan nyata.
          </p>
        </div>
      </RouterLink>

      <!-- Menu -->
      <div class="hidden items-center justify-center gap-8 md:flex">
        <RouterLink
          to="/"
          class="group relative py-1 text-sm font-medium transition-colors duration-300"
          :class="$route.path === '/' ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'"
        >
          Beranda
          <span
            class="absolute -bottom-1 left-0 h-0.5 rounded-full bg-teal-600 transition-all duration-300"
            :class="$route.path === '/' ? 'w-full' : 'w-0 group-hover:w-full'"
          ></span>
        </RouterLink>

        <RouterLink
          to="/reports"
          class="group relative py-1 text-sm font-medium transition-colors duration-300"
          :class="$route.path === '/reports' ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'"
        >
          Laporan
          <span
            class="absolute -bottom-1 left-0 h-0.5 rounded-full bg-teal-600 transition-all duration-300"
            :class="$route.path === '/reports' ? 'w-full' : 'w-0 group-hover:w-full'"
          ></span>
        </RouterLink>

        <RouterLink
          to="/about"
          class="group relative py-1 text-sm font-medium transition-colors duration-300"
          :class="$route.path === '/about' ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'"
        >
          Tentang
          <span
            class="absolute -bottom-1 left-0 h-0.5 rounded-full bg-teal-600 transition-all duration-300"
            :class="$route.path === '/about' ? 'w-full' : 'w-0 group-hover:w-full'"
          ></span>
        </RouterLink>
      </div>

      <!-- Tombol -->
      <div class="flex items-center justify-end gap-3">
        <button class="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-300 hover:bg-slate-100 sm:block">
          Masuk
        </button>
        <button class="rounded-lg bg-gradient-to-r from-blue-900 to-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-900/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-teal-600 hover:to-teal-500 hover:shadow-lg hover:shadow-blue-900/30">
          Buat Laporan
        </button>
      </div>
    </div>
  </nav>
</template>