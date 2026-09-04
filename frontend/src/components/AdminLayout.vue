<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

defineProps({
  pageTitle: { type: String, default: 'Dashboard' },
  pageDescription: { type: String, default: '' },
})

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

const activeKey = computed(() =>
  menuItems.find((item) => route.path === item.to)?.key
)

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
          :class="{ active: activeKey === item.key }"
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

    <div v-if="sidebarOpen" class="admin-overlay" @click="sidebarOpen = false"></div>

    <!-- MAIN -->
    <div class="admin-main">

      <header class="admin-topbar">
        <button class="sidebar-toggle" @click="sidebarOpen = true">☰</button>

        <div class="admin-topbar-title">
          <h1>{{ pageTitle }}</h1>
          <p v-if="pageDescription">{{ pageDescription }}</p>
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

      <main class="admin-content">
        <slot />
      </main>

    </div>

  </div>
</template>