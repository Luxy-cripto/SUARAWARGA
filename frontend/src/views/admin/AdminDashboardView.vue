<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const sidebarOpen = ref(false)
const profileMenuOpen = ref(false)

const menuItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊', to: '/admin' },
  { key: 'reports', label: 'Laporan', icon: '📋', to: '/admin/reports' },
  { key: 'users', label: 'Pengguna', icon: '👥', to: '/admin/users' },
  { key: 'categories', label: 'Kategori', icon: '🏷️', to: '/admin/categories' },
  { key: 'settings', label: 'Pengaturan', icon: '⚙️', to: '/admin/settings' },
]

const stats = [
  { label: 'Total Laporan', value: 128, icon: '📋', trend: '+12%', trendUp: true, variant: '' },
  { label: 'Menunggu', value: 24, icon: '🕐', trend: '+3', trendUp: false, variant: 'waiting' },
  { label: 'Diproses', value: 31, icon: '⚙️', trend: '+8', trendUp: true, variant: 'processing' },
  { label: 'Selesai', value: 73, icon: '✓', trend: '+15%', trendUp: true, variant: 'success' },
]

const statusOptions = [
  { key: 'waiting', label: 'Menunggu' },
  { key: 'processing', label: 'Diproses' },
  { key: 'success', label: 'Selesai' },
  { key: 'rejected', label: 'Ditolak' },
]

const reports = ref([
  {
    id: 1,
    title: 'Jalan berlubang di Jalan Melati',
    reporter: 'Budi Santoso',
    location: 'Jalan Melati',
    time: '2 jam lalu',
    category: '🚧 Jalan',
    status: 'processing',
  },
  {
    id: 2,
    title: 'Sampah menumpuk di sekitar pasar',
    reporter: 'Siti Aminah',
    location: 'Pasar Warga',
    time: 'Kemarin',
    category: '🗑️ Sampah',
    status: 'waiting',
  },
  {
    id: 3,
    title: 'Lampu penerangan jalan mati',
    reporter: 'Ahmad Fauzi',
    location: 'Jalan Kenanga',
    time: '2 hari lalu',
    category: '💡 Lampu',
    status: 'success',
  },
  {
    id: 4,
    title: 'Selokan tersumbat, air meluap',
    reporter: 'Dewi Lestari',
    location: 'Jalan Anggrek',
    time: '3 hari lalu',
    category: '🌊 Selokan',
    status: 'rejected',
  },
  {
    id: 5,
    title: 'Taman bermain rusak dan berbahaya',
    reporter: 'Rudi Hartono',
    location: 'Taman RW 05',
    time: '5 hari lalu',
    category: '🏞️ Fasilitas',
    status: 'waiting',
  },
])

function statusLabel(key) {
  const found = statusOptions.find((s) => s.key === key)
  return found ? found.label : key
}

const totalReports = computed(() => reports.value.length)

// Dropdown profil — tutup otomatis kalau klik di luar area profil
function closeProfileMenu(e) {
  if (!e.target.closest('.admin-profile-wrapper')) {
    profileMenuOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', closeProfileMenu))
onUnmounted(() => document.removeEventListener('click', closeProfileMenu))
</script>

<template>
  <div class="admin-layout" :class="{ 'sidebar-open': sidebarOpen }">

    <!-- SIDEBAR -->
    <aside class="admin-sidebar">

      <div class="admin-sidebar-header">
        <RouterLink to="/" class="admin-logo">
          <div class="admin-logo-icon">📢</div>
          <span>SUARAWARGA</span>
        </RouterLink>
        <button class="sidebar-close" @click="sidebarOpen = false">✕</button>
      </div>

      <nav class="admin-nav">
        <RouterLink
          v-for="item in menuItems"
          :key="item.key"
          :to="item.to"
          class="admin-nav-link"
          :class="{ active: route.path === item.to }"
          @click="sidebarOpen = false"
        >
          <span class="admin-nav-icon">{{ item.icon }}</span>
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="admin-sidebar-footer">
        <RouterLink to="/" class="admin-nav-link">
          <span class="admin-nav-icon">🚪</span>
          Keluar
        </RouterLink>
      </div>

    </aside>

    <!-- OVERLAY (mobile) -->
    <div v-if="sidebarOpen" class="admin-overlay" @click="sidebarOpen = false"></div>

    <!-- MAIN -->
    <div class="admin-main">

      <!-- TOPBAR -->
      <header class="admin-topbar">
        <button class="sidebar-toggle" @click="sidebarOpen = true">☰</button>

        <div class="admin-topbar-title">
          <h1>Dashboard</h1>
          <p>Ringkasan aktivitas SUARAWARGA hari ini</p>
        </div>

        <div class="admin-topbar-actions">
          <button class="admin-icon-btn" aria-label="Notifikasi">
            🔔
            <span class="admin-badge">3</span>
          </button>

          <!-- PROFIL + DROPDOWN -->
          <div class="admin-profile-wrapper">
            <button
              class="admin-profile"
              @click.stop="profileMenuOpen = !profileMenuOpen"
              :aria-expanded="profileMenuOpen"
            >
              <div class="admin-avatar">A</div>
              <div class="admin-profile-info">
                <p class="admin-profile-name">Admin</p>
                <p class="admin-profile-role">Super Admin</p>
              </div>
              <span class="admin-profile-caret" :class="{ open: profileMenuOpen }">▾</span>
            </button>

            <transition name="fade-in">
              <div v-if="profileMenuOpen" class="admin-profile-menu">
                <RouterLink
                  to="/admin/profile"
                  class="admin-profile-menu-item"
                  @click="profileMenuOpen = false"
                >
                  👤 Lihat Profil
                </RouterLink>

                <RouterLink
                  to="/admin/settings"
                  class="admin-profile-menu-item"
                  @click="profileMenuOpen = false"
                >
                  ⚙️ Pengaturan Profil
                </RouterLink>

                <div class="admin-profile-menu-divider"></div>

                <RouterLink
                  to="/"
                  class="admin-profile-menu-item danger"
                  @click="profileMenuOpen = false"
                >
                  🚪 Keluar
                </RouterLink>
              </div>
            </transition>
          </div>

        </div>
      </header>

      <!-- CONTENT -->
      <main class="admin-content">

        <!-- STATS -->
        <div class="admin-stats-grid">
          <div v-for="s in stats" :key="s.label" class="stat-card">
            <div class="stat-icon" :class="s.variant">{{ s.icon }}</div>
            <div>
              <div class="stat-number">{{ s.value }}</div>
              <div class="stat-label">{{ s.label }}</div>
            </div>
            <span class="admin-trend" :class="{ down: !s.trendUp }">
              {{ s.trendUp ? '↑' : '↓' }} {{ s.trend }}
            </span>
          </div>
        </div>

        <!-- TABLE -->
        <div class="card admin-table-card">

          <div class="admin-table-header">
            <div>
              <h2>Laporan Terbaru</h2>
              <p class="text-muted">{{ totalReports }} laporan ditemukan</p>
            </div>
            <RouterLink to="/admin/reports" class="btn btn-secondary">Lihat Semua →</RouterLink>
          </div>

          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Laporan</th>
                  <th>Pelapor</th>
                  <th>Kategori</th>
                  <th>Waktu</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="report in reports" :key="report.id">
                  <td>
                    <p class="admin-table-title">{{ report.title }}</p>
                    <p class="admin-table-sub">📍 {{ report.location }}</p>
                  </td>
                  <td>{{ report.reporter }}</td>
                  <td>{{ report.category }}</td>
                  <td>{{ report.time }}</td>
                  <td>
                    <select v-model="report.status" class="admin-status-select" :class="`status-${report.status}`">
                      <option v-for="opt in statusOptions" :key="opt.key" :value="opt.key">
                        {{ opt.label }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <RouterLink to="/admin/reports" class="report-detail">Detail →</RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </main>

    </div>

  </div>
</template>