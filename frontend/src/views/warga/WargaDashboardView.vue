<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'

const user = {
  name: 'Rina Wijaya',
  email: 'rina.wijaya@email.com',
  joined: 'Maret 2026',
}

const myStats = [
  { label: 'Total Laporan', value: 8, icon: '📋', variant: '' },
  { label: 'Menunggu', value: 2, icon: '🕐', variant: 'waiting' },
  { label: 'Diproses', value: 3, icon: '⚙️', variant: 'processing' },
  { label: 'Selesai', value: 3, icon: '✓', variant: 'success' },
]

const myReports = ref([
  {
    id: 1,
    title: 'Jalan berlubang di depan rumah',
    location: 'Jalan Melati No. 12',
    time: 'Dilaporkan 2 jam lalu',
    icon: '🚧',
    iconClass: '',
    status: 'processing',
    statusLabel: '🔵 Diproses',
  },
  {
    id: 2,
    title: 'Lampu jalan mati di gang sebelah',
    location: 'Gang Anggrek 3',
    time: 'Dilaporkan kemarin',
    icon: '💡',
    iconClass: 'yellow',
    status: 'waiting',
    statusLabel: '🟡 Menunggu',
  },
  {
    id: 3,
    title: 'Sampah tidak terangkut seminggu',
    location: 'RT 05 / RW 03',
    time: 'Dilaporkan 4 hari lalu',
    icon: '🗑️',
    iconClass: 'green',
    status: 'success',
    statusLabel: '🟢 Selesai',
  },
])

const activeTab = ref('semua')

const tabs = [
  { key: 'semua', label: 'Semua' },
  { key: 'waiting', label: 'Menunggu' },
  { key: 'processing', label: 'Diproses' },
  { key: 'success', label: 'Selesai' },
]

const filteredReports = computed(() => {
  if (activeTab.value === 'semua') return myReports.value
  return myReports.value.filter((r) => r.status === activeTab.value)
})
</script>

<template>
  <div class="dashboard-page">

    <Navbar />

    <!-- WELCOME BANNER -->
    <section class="page-header">
      <div class="container">
        <div class="welcome-row">
          <div>
            <p class="section-eyebrow">Dashboard Saya</p>
            <h1 class="page-title">Halo, {{ user.name.split(' ')[0] }} 👋</h1>
            <p class="page-description">Pantau laporan yang sudah kamu buat di sini.</p>
          </div>

          <RouterLink to="/reports" class="btn btn-primary">
            📢 Buat Laporan Baru
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 32px;">
      <div class="container">

        <div class="dashboard-grid">

          <!-- KIRI: STATS + LAPORAN -->
          <div class="dashboard-main">

            <!-- STATS -->
            <div class="stats-grid" style="margin-bottom: 32px;">
              <div v-for="s in myStats" :key="s.label" class="stat-card">
                <div class="stat-icon" :class="s.variant">{{ s.icon }}</div>
                <div>
                  <div class="stat-number">{{ s.value }}</div>
                  <div class="stat-label">{{ s.label }}</div>
                </div>
              </div>
            </div>

            <!-- TABS + LIST LAPORAN -->
            <div class="card" style="padding: 24px;">

              <div class="dashboard-tabs">
                <button
                  v-for="tab in tabs"
                  :key="tab.key"
                  class="filter-tab"
                  :class="{ active: activeTab === tab.key }"
                  @click="activeTab = tab.key"
                >
                  {{ tab.label }}
                </button>
              </div>

              <div class="reports-list" v-if="filteredReports.length" style="margin-top: 20px;">
                <div v-for="report in filteredReports" :key="report.id" class="report-card card">
                  <div class="report-left">
                    <div class="report-icon" :class="report.iconClass">{{ report.icon }}</div>
                    <div>
                      <h3 class="report-card-title">{{ report.title }}</h3>
                      <p class="report-location">📍 {{ report.location }}</p>
                      <p class="report-time">{{ report.time }}</p>
                    </div>
                  </div>

                  <div class="report-right">
                    <span class="status" :class="`status-${report.status}`">
                      {{ report.statusLabel }}
                    </span>
                    <button class="report-detail">Lihat detail →</button>
                  </div>
                </div>
              </div>

              <div v-else class="empty-state">
                <div class="empty-icon">📭</div>
                <h3>Belum ada laporan</h3>
                <p>Kamu belum punya laporan dengan status ini.</p>
              </div>

            </div>

          </div>

          <!-- KANAN: PROFIL RINGKAS -->
          <aside class="dashboard-sidebar">

            <div class="card profile-hero" style="padding: 28px 22px;">

              <div class="profile-hero-avatar" style="width: 64px; height: 64px; font-size: 24px;">
                {{ user.name.charAt(0).toUpperCase() }}
              </div>

              <h2 style="font-size: 16px;">{{ user.name }}</h2>
              <span class="role-badge role-warga">🧑 Warga</span>

              <div class="profile-hero-meta">
                <div class="profile-meta-row">
                  <span class="profile-meta-label">✉️ Email</span>
                  <span>{{ user.email }}</span>
                </div>
                <div class="profile-meta-row">
                  <span class="profile-meta-label">📅 Bergabung</span>
                  <span>{{ user.joined }}</span>
                </div>
              </div>

              <RouterLink to="/warga/edit-profile" class="btn btn-secondary profile-edit-btn">
                Edit Profil
              </RouterLink>

            </div>

          </aside>

        </div>

      </div>
    </section>

    <Footer />

  </div>
</template>