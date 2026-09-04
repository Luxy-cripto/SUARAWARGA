<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '../../components/AdminLayout.vue'

const search = ref('')
const activeStatus = ref('semua')
const selectedIds = ref([])

const statusOptions = [
  { key: 'semua', label: 'Semua Status' },
  { key: 'waiting', label: 'Menunggu' },
  { key: 'processing', label: 'Diproses' },
  { key: 'success', label: 'Selesai' },
  { key: 'rejected', label: 'Ditolak' },
]

const reports = ref([
  { id: 1, title: 'Jalan berlubang di Jalan Melati', reporter: 'Budi Santoso', location: 'Jalan Melati', time: '2 jam lalu', category: '🚧 Jalan', status: 'processing' },
  { id: 2, title: 'Sampah menumpuk di sekitar pasar', reporter: 'Siti Aminah', location: 'Pasar Warga', time: 'Kemarin', category: '🗑️ Sampah', status: 'waiting' },
  { id: 3, title: 'Lampu penerangan jalan mati', reporter: 'Ahmad Fauzi', location: 'Jalan Kenanga', time: '2 hari lalu', category: '💡 Lampu', status: 'success' },
  { id: 4, title: 'Selokan tersumbat, air meluap', reporter: 'Dewi Lestari', location: 'Jalan Anggrek', time: '3 hari lalu', category: '🌊 Selokan', status: 'rejected' },
  { id: 5, title: 'Taman bermain rusak dan berbahaya', reporter: 'Rudi Hartono', location: 'Taman RW 05', time: '5 hari lalu', category: '🏞️ Fasilitas', status: 'waiting' },
])

const filteredReports = computed(() => {
  return reports.value.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.value.toLowerCase())
    const matchStatus = activeStatus.value === 'semua' || r.status === activeStatus.value
    return matchSearch && matchStatus
  })
})

const allSelected = computed(() =>
  filteredReports.value.length > 0 &&
  filteredReports.value.every((r) => selectedIds.value.includes(r.id))
)

function toggleSelectAll() {
  if (allSelected.value) {
    selectedIds.value = selectedIds.value.filter(
      (id) => !filteredReports.value.some((r) => r.id === id)
    )
  } else {
    const newIds = filteredReports.value.map((r) => r.id)
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

function bulkUpdateStatus(status) {
  reports.value = reports.value.map((r) =>
    selectedIds.value.includes(r.id) ? { ...r, status } : r
  )
  selectedIds.value = []
}

function bulkDelete() {
  if (!confirm(`Hapus ${selectedIds.value.length} laporan terpilih?`)) return
  reports.value = reports.value.filter((r) => !selectedIds.value.includes(r.id))
  selectedIds.value = []
}

function deleteReport(id) {
  if (!confirm('Hapus laporan ini?')) return
  reports.value = reports.value.filter((r) => r.id !== id)
  selectedIds.value = selectedIds.value.filter((x) => x !== id)
}
</script>

<template>
  <AdminLayout page-title="Kelola Laporan" page-description="Tinjau, ubah status, dan kelola laporan warga">

    <!-- FILTER -->
    <div class="card admin-filter-bar">

      <div class="search-box admin-search">
        <span class="search-icon">🔎</span>
        <input v-model="search" type="text" placeholder="Cari laporan..." />
      </div>

      <select v-model="activeStatus" class="filter-select">
        <option v-for="s in statusOptions" :key="s.key" :value="s.key">
          {{ s.label }}
        </option>
      </select>

    </div>

    <!-- BULK ACTION BAR -->
    <transition name="fade-in">
      <div v-if="selectedIds.length" class="bulk-bar">
        <span>{{ selectedIds.length }} laporan dipilih</span>

        <div class="bulk-bar-actions">
          <select @change="bulkUpdateStatus($event.target.value)" class="filter-select">
            <option value="" disabled selected>Ubah status ke...</option>
            <option v-for="s in statusOptions.filter(s => s.key !== 'semua')" :key="s.key" :value="s.key">
              {{ s.label }}
            </option>
          </select>

          <button class="btn btn-danger" @click="bulkDelete">🗑️ Hapus</button>
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
              <th>Laporan</th>
              <th>Pelapor</th>
              <th>Kategori</th>
              <th>Waktu</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in filteredReports" :key="report.id">
              <td class="admin-checkbox-cell">
                <input
                  type="checkbox"
                  :checked="selectedIds.includes(report.id)"
                  @change="toggleSelect(report.id)"
                />
              </td>
              <td>
                <p class="admin-table-title">{{ report.title }}</p>
                <p class="admin-table-sub">📍 {{ report.location }}</p>
              </td>
              <td>{{ report.reporter }}</td>
              <td>{{ report.category }}</td>
              <td>{{ report.time }}</td>
              <td>
                <select v-model="report.status" class="admin-status-select" :class="`status-${report.status}`">
                  <option v-for="opt in statusOptions.filter(s => s.key !== 'semua')" :key="opt.key" :value="opt.key">
                    {{ opt.label }}
                  </option>
                </select>
              </td>
              <td>
                <div class="admin-row-actions">
                  <button class="report-detail">Detail</button>
                  <button class="admin-delete-btn" @click="deleteReport(report.id)">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="!filteredReports.length" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>Tidak ada laporan</h3>
        <p>Coba ubah kata kunci atau filter status.</p>
      </div>

    </div>

  </AdminLayout>
</template>