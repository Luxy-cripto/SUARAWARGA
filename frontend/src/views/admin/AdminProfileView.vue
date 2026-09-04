<script setup>
import { RouterLink } from 'vue-router'
import AdminLayout from '../../components/AdminLayout.vue'

const admin = {
  name: 'Admin',
  email: 'admin@suarawarga.id',
  role: 'Super Admin',
  joined: '1 September 2025',
  lastLogin: 'Hari ini, 09:14',
}

const activityStats = [
  { label: 'Laporan Diproses', value: 87, icon: '✅' },
  { label: 'Kategori Dikelola', value: 5, icon: '🏷️' },
  { label: 'Pengguna Dikelola', value: 342, icon: '👥' },
]

const recentActivity = [
  { text: 'Mengubah status laporan "Jalan berlubang di Jalan Melati" menjadi Diproses', time: '2 jam lalu' },
  { text: 'Menonaktifkan akun pengguna Dewi Lestari', time: 'Kemarin' },
  { text: 'Menambah kategori baru "Fasilitas Umum"', time: '3 hari lalu' },
  { text: 'Mengubah pengaturan notifikasi email', time: '5 hari lalu' },
]
</script>

<template>
  <AdminLayout page-title="Profil Admin" page-description="Informasi akun dan aktivitas kamu">

    <div class="profile-grid">

      <!-- KARTU PROFIL -->
      <div class="card profile-hero">

        <div class="profile-hero-avatar">
          {{ admin.name.charAt(0).toUpperCase() }}
        </div>

        <h2>{{ admin.name }}</h2>
        <span class="role-badge role-admin">🛡️ {{ admin.role }}</span>

        <div class="profile-hero-meta">
          <div class="profile-meta-row">
            <span class="profile-meta-label">✉️ Email</span>
            <span>{{ admin.email }}</span>
          </div>
          <div class="profile-meta-row">
            <span class="profile-meta-label">📅 Bergabung</span>
            <span>{{ admin.joined }}</span>
          </div>
          <div class="profile-meta-row">
            <span class="profile-meta-label">🕐 Login terakhir</span>
            <span>{{ admin.lastLogin }}</span>
          </div>
        </div>

        <RouterLink to="/admin/settings" class="btn btn-primary profile-edit-btn">
          ⚙️ Edit Profil
        </RouterLink>

      </div>

      <!-- KANAN: STATS + AKTIVITAS -->
      <div class="profile-right">

        <!-- STATS -->
        <div class="profile-stats-grid">
          <div v-for="stat in activityStats" :key="stat.label" class="stat-card">
            <div class="stat-icon">{{ stat.icon }}</div>
            <div>
              <div class="stat-number">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- AKTIVITAS TERBARU -->
        <div class="card settings-section">
          <h2>Aktivitas Terbaru</h2>
          <p class="text-muted settings-desc">Riwayat tindakan yang kamu lakukan sebagai admin.</p>

          <ul class="activity-list">
            <li v-for="(activity, i) in recentActivity" :key="i" class="activity-item">
              <span class="activity-dot"></span>
              <div>
                <p class="activity-text">{{ activity.text }}</p>
                <p class="activity-time">{{ activity.time }}</p>
              </div>
            </li>
          </ul>
        </div>

      </div>

    </div>

  </AdminLayout>
</template>