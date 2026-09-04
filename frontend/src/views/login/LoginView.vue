<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
// import api from '../lib/api' // nanti diaktifkan lagi kalau backend udah siap

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

function handleLogin() {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'Email dan kata sandi wajib diisi.'
    return
  }

  isLoading.value = true

  // MOCK LOGIN — sementara, biar bisa test tampilan & alur navigasi
  setTimeout(() => {
    isLoading.value = false
    localStorage.setItem('token', 'dummy-token-123')
    router.push('/')
  }, 800)
}
</script>

<template>
  <div class="auth-page">

    <!-- Dekorasi background -->
    <div class="auth-blob auth-blob-1"></div>
    <div class="auth-blob auth-blob-2"></div>

    <div class="auth-wrapper">

      <div class="auth-card card fade-in">

        <RouterLink to="/" class="auth-logo">
          <div class="auth-logo-icon">📢</div>
          <span>SUARAWARGA</span>
        </RouterLink>

        <div class="auth-header">
          <h1>Masuk ke akunmu</h1>
          <p>Yuk lanjut laporkan dan pantau masalah di sekitarmu.</p>
        </div>

        <form class="auth-form" @submit.prevent="handleLogin">

          <transition name="shake">
            <div v-if="errorMessage" class="auth-error">
              ⚠️ {{ errorMessage }}
            </div>
          </transition>

          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <div class="input-icon-field">
              <span class="input-icon">✉️</span>
              <input
                id="email"
                v-model="email"
                type="email"
                class="form-control has-icon"
                placeholder="nama@email.com"
                autocomplete="email"
              />
            </div>
          </div>

          <div class="form-group">
            <div class="form-label-row">
              <label class="form-label" for="password">Kata Sandi</label>
              <a href="#" class="auth-link-small">Lupa kata sandi?</a>
            </div>

            <div class="input-icon-field">
              <span class="input-icon">🔒</span>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                class="form-control has-icon"
                placeholder="Masukkan kata sandi"
                autocomplete="current-password"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <button type="submit" class="btn btn-primary auth-submit" :disabled="isLoading">
            <span v-if="isLoading" class="auth-spinner"></span>
            {{ isLoading ? 'Memproses...' : 'Masuk' }}
          </button>

        </form>

        <div class="auth-divider">
          <span>atau</span>
        </div>

        <button type="button" class="btn btn-secondary auth-submit auth-google">
          <span class="auth-google-icon">G</span>
          Masuk dengan Google
        </button>

        <p class="auth-footer-text">
          Belum punya akun?
          <RouterLink to="/register">Daftar sekarang</RouterLink>
        </p>

      </div>

    </div>

  </div>
</template>