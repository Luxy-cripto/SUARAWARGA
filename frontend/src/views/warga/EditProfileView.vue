<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'

const profile = ref({
  name: 'Rina Wijaya',
  email: 'rina.wijaya@email.com',
  phone: '0812-3456-7890',
  address: 'Jalan Melati No. 12, RT 05/RW 03',
})
const profileSaving = ref(false)
const profileSaved = ref(false)

const passwordForm = ref({
  current: '',
  new: '',
  confirm: '',
})
const passwordError = ref('')
const passwordSaving = ref(false)
const passwordSaved = ref(false)

function saveProfile() {
  profileSaving.value = true
  profileSaved.value = false

  // TODO: sambungkan ke api.put('/profile', profile.value) kalau backend siap
  setTimeout(() => {
    profileSaving.value = false
    profileSaved.value = true
    setTimeout(() => (profileSaved.value = false), 2500)
  }, 600)
}

function changePassword() {
  passwordError.value = ''

  if (!passwordForm.value.current || !passwordForm.value.new || !passwordForm.value.confirm) {
    passwordError.value = 'Semua kolom wajib diisi.'
    return
  }

  if (passwordForm.value.new.length < 8) {
    passwordError.value = 'Kata sandi baru minimal 8 karakter.'
    return
  }

  if (passwordForm.value.new !== passwordForm.value.confirm) {
    passwordError.value = 'Konfirmasi kata sandi tidak cocok.'
    return
  }

  passwordSaving.value = true
  setTimeout(() => {
    passwordSaving.value = false
    passwordSaved.value = true
    passwordForm.value = { current: '', new: '', confirm: '' }
    setTimeout(() => (passwordSaved.value = false), 2500)
  }, 600)
}
</script>

<template>
  <div class="edit-profile-page">

    <Navbar />

    <section class="page-header">
      <div class="container">
        <p class="section-eyebrow">Akun Saya</p>
        <h1 class="page-title">Edit Profil</h1>
        <p class="page-description">Perbarui informasi akun dan kata sandi kamu.</p>
      </div>
    </section>

    <section class="section" style="padding-top: 32px;">
      <div class="container">

        <div class="edit-profile-grid">

          <!-- INFORMASI PRIBADI -->
          <div class="card settings-section">
            <h2>Informasi Pribadi</h2>
            <p class="text-muted settings-desc">Data ini akan tampil pada laporan yang kamu buat.</p>

            <div class="settings-avatar-row">
              <div class="admin-avatar settings-avatar">
                {{ profile.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="admin-table-title">{{ profile.name }}</p>
                <button type="button" class="auth-link-small">Ganti Foto</button>
              </div>
            </div>

            <form @submit.prevent="saveProfile">

              <div class="form-group">
                <label class="form-label">Nama Lengkap</label>
                <input v-model="profile.name" type="text" class="form-control" />
              </div>

              <div class="form-group">
                <label class="form-label">Email</label>
                <input v-model="profile.email" type="email" class="form-control" />
              </div>

              <div class="form-group">
                <label class="form-label">Nomor HP</label>
                <input v-model="profile.phone" type="tel" class="form-control" placeholder="0812-xxxx-xxxx" />
              </div>

              <div class="form-group">
                <label class="form-label">Alamat</label>
                <textarea v-model="profile.address" class="form-control" placeholder="Alamat lengkap kamu"></textarea>
              </div>

              <div class="settings-actions">
                <span v-if="profileSaved" class="settings-saved">✓ Tersimpan</span>
                <button type="submit" class="btn btn-primary" :disabled="profileSaving">
                  {{ profileSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
                </button>
              </div>

            </form>
          </div>

          <!-- UBAH KATA SANDI -->
          <div class="card settings-section">
            <h2>Ubah Kata Sandi</h2>
            <p class="text-muted settings-desc">Gunakan kata sandi yang kuat dan unik.</p>

            <form @submit.prevent="changePassword">

              <div v-if="passwordError" class="auth-error">
                ⚠️ {{ passwordError }}
              </div>

              <div class="form-group">
                <label class="form-label">Kata Sandi Saat Ini</label>
                <input v-model="passwordForm.current" type="password" class="form-control" autocomplete="current-password" />
              </div>

              <div class="form-group">
                <label class="form-label">Kata Sandi Baru</label>
                <input v-model="passwordForm.new" type="password" class="form-control" placeholder="Minimal 8 karakter" autocomplete="new-password" />
              </div>

              <div class="form-group">
                <label class="form-label">Konfirmasi Kata Sandi Baru</label>
                <input v-model="passwordForm.confirm" type="password" class="form-control" autocomplete="new-password" />
              </div>

              <div class="settings-actions">
                <span v-if="passwordSaved" class="settings-saved">✓ Kata sandi diperbarui</span>
                <button type="submit" class="btn btn-primary" :disabled="passwordSaving">
                  {{ passwordSaving ? 'Memperbarui...' : 'Ubah Kata Sandi' }}
                </button>
              </div>

            </form>
          </div>

        </div>

        <div class="edit-profile-back">
          <RouterLink to="/warga" class="auth-link-small">← Kembali ke Dashboard</RouterLink>
        </div>

      </div>
    </section>

    <Footer />

  </div>
</template>