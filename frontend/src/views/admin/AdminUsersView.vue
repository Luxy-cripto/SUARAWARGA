<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '../../components/AdminLayout.vue'

const search = ref('')
const activeRole = ref('semua')
const selectedIds = ref([])

const roleOptions = [
  { key: 'semua', label: 'Semua Role' },
  { key: 'warga', label: 'Warga' },
  { key: 'admin', label: 'Admin' },
]

const stats = [
  { label: 'Total Pengguna', value: 342, icon: '👥', variant: '' },
  { label: 'Warga', value: 335, icon: '🧑', variant: 'processing' },
  { label: 'Admin', value: 7, icon: '🛡️', variant: 'success' },
  { label: 'Nonaktif', value: 4, icon: '🚫', variant: 'waiting' },
]

const users = ref([
  { id: 1, name: 'Budi Santoso', email: 'budi.santoso@email.com', role: 'warga', joined: '12 Jan 2026', status: 'active', reportCount: 5 },
  { id: 2, name: 'Siti Aminah', email: 'siti.aminah@email.com', role: 'warga', joined: '3 Feb 2026', status: 'active', reportCount: 2 },
  { id: 3, name: 'Ahmad Fauzi', email: 'ahmad.fauzi@email.com', role: 'admin', joined: '20 Nov 2025', status: 'active', reportCount: 0 },
  { id: 4, name: 'Dewi Lestari', email: 'dewi.lestari@email.com', role: 'warga', joined: '8 Mar 2026', status: 'inactive', reportCount: 1 },
  { id: 5, name: 'Rudi Hartono', email: 'rudi.hartono@email.com', role: 'warga', joined: '15 Apr 2026', status: 'active', reportCount: 8 },
  { id: 6, name: 'Maya Putri', email: 'maya.putri@email.com', role: 'admin', joined: '1 Sep 2025', status: 'active', reportCount: 0 },
])

const filteredUsers = computed(() => {
  return users.value.filter((u) => {
    const q = search.value.toLowerCase()
    const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    const matchRole = activeRole.value === 'semua' || u.role === activeRole.value
    return matchSearch && matchRole
  })
})

const allSelected = computed(() =>
  filteredUsers.value.length > 0 &&
  filteredUsers.value.every((u) => selectedIds.value.includes(u.id))
)

function toggleSelectAll() {
  if (allSelected.value) {
    selectedIds.value = selectedIds.value.filter(
      (id) => !filteredUsers.value.some((u) => u.id === id)
    )
  } else {
    const newIds = filteredUsers.value.map((u) => u.id)
    selectedIds.value = [...new Set([...selectedIds.value, ...newIds])]
  }
}

function toggleSelect(id) {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((x) => x !== id)
  } else {
    selectedIds.value.push(id)
  }
}

function toggleStatus(user) {
  user.status = user.status === 'active' ? 'inactive' : 'active'
}

function bulkDeactivate() {
  users.value = users.value.map((u) =>
    selectedIds.value.includes(u.id) ? { ...u, status: 'inactive' } : u
  )
  selectedIds.value = []
}

function deleteUser(id) {
  if (!confirm('Hapus pengguna ini? Tindakan ini tidak bisa dibatalkan.')) return
  users.value = users.value.filter((u) => u.id !== id)
  selectedIds.value = selectedIds.value.filter((x) => x !== id)
}

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
</script>

<template>
  <AdminLayout page-title="Kelola Pengguna" page-description="Kelola akun warga dan admin SUARAWARGA">

    <!-- STATS -->
    <div class="admin-stats-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <div class="stat-icon" :class="s.variant">{{ s.icon }}</div>
        <div>
          <div class="stat-number">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <!-- FILTER -->
    <div class="card admin-filter-bar">

      <div class="search-box admin-search">
        <span class="search-icon">🔎</span>
        <input v-model="search" type="text" placeholder="Cari nama atau email..." />
      </div>

      <select v-model="activeRole" class="filter-select">
        <option v-for="r in roleOptions" :key="r.key" :value="r.key">
          {{ r.label }}
        </option>
      </select>

    </div>

    <!-- BULK ACTION BAR -->
    <transition name="fade-in">
      <div v-if="selectedIds.length" class="bulk-bar">
        <span>{{ selectedIds.length }} pengguna dipilih</span>

        <div class="bulk-bar-actions">
          <button class="btn btn-secondary" @click="bulkDeactivate">🚫 Nonaktifkan</button>
        </div>
      </div>
    </transition>

    <!-- TABLE -->
    <div class="card admin-table-card">

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th class="admin-checkbox-cell">
                <input type="checkbox" :checked="allSelected" @change="toggleSelectAll" />
              </th>
              <th>Pengguna</th>
              <th>Role</th>
              <th>Laporan</th>
              <th>Bergabung</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td class="admin-checkbox-cell">
                <input
                  type="checkbox"
                  :checked="selectedIds.includes(user.id)"
                  @change="toggleSelect(user.id)"
                />
              </td>
              <td>
                <div class="admin-user-cell">
                  <div class="admin-user-avatar">{{ initials(user.name) }}</div>
                  <div>
                    <p class="admin-table-title">{{ user.name }}</p>
                    <p class="admin-table-sub">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td>
                <span class="role-badge" :class="`role-${user.role}`">
                  {{ user.role === 'admin' ? '🛡️ Admin' : '🧑 Warga' }}
                </span>
              </td>
              <td>{{ user.reportCount }}</td>
              <td>{{ user.joined }}</td>
              <td>
                <button
                  class="status-toggle"
                  :class="user.status"
                  @click="toggleStatus(user)"
                >
                  <span class="status-dot"></span>
                  {{ user.status === 'active' ? 'Aktif' : 'Nonaktif' }}
                </button>
              </td>
              <td>
                <div class="admin-row-actions">
                  <button class="report-detail">Detail</button>
                  <button class="admin-delete-btn" @click="deleteUser(user.id)">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="!filteredUsers.length" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>Pengguna tidak ditemukan</h3>
        <p>Coba ubah kata kunci atau filter role.</p>
      </div>

    </div>

  </AdminLayout>
</template>