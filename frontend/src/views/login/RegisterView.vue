<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
// import api from '../lib/api' // nanti diaktifkan lagi kalau backend udah siap

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

function handleRegister() {
  errorMessage.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Semua kolom wajib diisi.'
    return
  }

  if (password.value.length < 8) {
    errorMessage.value = 'Kata sandi minimal 8 karakter.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Konfirmasi kata sandi tidak cocok.'
    return
  }

  if (!agreeTerms.value) {
    errorMessage.value = 'Kamu harus menyetujui syarat & ketentuan.'
    return
  }

  isLoading.value = true

  // MOCK REGISTER — sementara, biar bisa test tampilan & alur navigasi
  // tinggal ganti ke async + api.post('/register', ...) kalau backend siap
  setTimeout(() => {
    isLoading.value = false
    router.push('/login')
  }, 800)
}
</script>

<template>
  <div class="auth-page">

    <div class="auth-blob auth-blob-1"></div>
    <div class="auth-blob auth-blob-2"></div>

    <div class="auth-wrapper">

      <div class="auth-card card fade-in">

        <RouterLink to="/" class="auth-logo">
          <div class="auth-logo-icon">📢</div>
          <span>SUARAWARGA</span>
        </RouterLink>

        <div class="auth-header">
          <h1>Buat Akun Warga</h1>
          <p>Gabung dan mulai suarakan masalah di sekitarmu.</p>
        </div>

        <form class="auth-form" @submit.prevent="handleRegister">

          <transition name="shake">
            <div v-if="errorMessage" class="auth-error">
              ⚠️ {{ errorMessage }}
            </div>
          </transition>

          <div class="form-group">
            <label class="form-label" for="name">Nama Lengkap</label>
            <div class="input-icon-field">
              <span class="input-icon">👤</span>
              <input
                id="name"
                v-model="name"
                type="text"
                class="form-control has-icon"
                placeholder="Nama kamu"
                autocomplete="name"
              />
            </div>
          </div>

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
            <label class="form-label" for="password">Kata Sandi</label>
            <div class="input-icon-field">
              <span class="input-icon">🔒</span>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                class="form-control has-icon"
                placeholder="Minimal 8 karakter"
                autocomplete="new-password"
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

          <div class="form-group">
            <label class="form-label" for="confirm-password">Konfirmasi Kata Sandi</label>
            <div class="input-icon-field">
              <span class="input-icon">🔒</span>
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirm-password"
                v-model="confirmPassword"
                class="form-control has-icon"
                placeholder="Ulangi kata sandi"
                autocomplete="new-password"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <label class="auth-checkbox">
            <input type="checkbox" v-model="agreeTerms" />
            <span>
              Saya menyetujui
              <a href="#">Syarat & Ketentuan</a>
              dan
              <a href="#">Kebijakan Privasi</a>
            </span>
          </label>

          <button type="submit" class="btn btn-primary auth-submit" :disabled="isLoading">
            <span v-if="isLoading" class="auth-spinner"></span>
            {{ isLoading ? 'Membuat akun...' : 'Daftar Sekarang' }}
          </button>

        </form>

        <div class="auth-divider">
          <span>atau</span>
        </div>

        <button type="button" class="btn btn-secondary auth-submit auth-google">
          <span class="auth-google-icon">G</span>
          Daftar dengan Google
        </button>

        <p class="auth-footer-text">
          Sudah punya akun?
          <RouterLink to="/login">Masuk di sini</RouterLink>
        </p>

      </div>

    </div>

  </div>
</template>