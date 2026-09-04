<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '../../components/AdminLayout.vue'

const colorOptions = [
  { key: 'blue', label: 'Biru' },
  { key: 'green', label: 'Hijau' },
  { key: 'yellow', label: 'Kuning' },
  { key: 'orange', label: 'Oranye' },
  { key: 'purple', label: 'Ungu' },
]

const categories = ref([
  { id: 1, icon: '🚧', name: 'Jalan Rusak', description: 'Jalan berlubang atau mengalami kerusakan', color: 'orange', reportCount: 42 },
  { id: 2, icon: '🗑️', name: 'Sampah', description: 'Sampah menumpuk atau belum terangkut', color: 'green', reportCount: 31 },
  { id: 3, icon: '💡', name: 'Lampu Jalan', description: 'Lampu penerangan mati atau rusak', color: 'yellow', reportCount: 18 },
  { id: 4, icon: '🌊', name: 'Selokan', description: 'Saluran air tersumbat atau bermasalah', color: 'blue', reportCount: 24 },
  { id: 5, icon: '🏞️', name: 'Fasilitas Umum', description: 'Fasilitas publik rusak atau tidak layak', color: 'purple', reportCount: 13 },
])

const search = ref('')
const showForm = ref(false)
const editingId = ref(null)

const form = ref({
  icon: '',
  name: '',
  description: '',
  color: 'blue',
})

const filteredCategories = computed(() =>
  categories.value.filter((c) =>
    c.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

function openAddForm() {
  editingId.value = null
  form.value = { icon: '', name: '', description: '', color: 'blue' }
  showForm.value = true
}

function openEditForm(cat) {
  editingId.value = cat.id
  form.value = { icon: cat.icon, name: cat.name, description: cat.description, color: cat.color }
  showForm.value = true
}

function cancelForm() {
  showForm.value = false
  editingId.value = null
}

function saveCategory() {
  if (!form.value.icon || !form.value.name) return

  if (editingId.value) {
    categories.value = categories.value.map((c) =>
      c.id === editingId.value ? { ...c, ...form.value } : c
    )
  } else {
    categories.value.push({
      id: Date.now(),
      ...form.value,
      reportCount: 0,
    })
  }

  cancelForm()
}

function deleteCategory(id) {
  if (!confirm('Hapus kategori ini? Laporan dengan kategori ini tidak akan terhapus.')) return
  categories.value = categories.value.filter((c) => c.id !== id)
}
</script>

<template>
  <AdminLayout page-title="Kelola Kategori" page-description="Atur kategori jenis laporan yang tersedia">

    <!-- ACTION BAR -->
    <div class="card admin-filter-bar">

      <div class="search-box admin-search">
        <span class="search-icon">🔎</span>
        <input v-model="search" type="text" placeholder="Cari kategori..." />
      </div>

      <button class="btn btn-primary" @click="openAddForm">
        + Tambah Kategori
      </button>

    </div>

    <!-- FORM TAMBAH/EDIT -->
    <transition name="fade-in">
      <div v-if="showForm" class="card admin-category-form">

        <h3>{{ editingId ? 'Edit Kategori' : 'Tambah Kategori Baru' }}</h3>

        <form @submit.prevent="saveCategory">

          <div class="admin-form-row">

            <div class="form-group admin-icon-group">
              <label class="form-label">Ikon (emoji)</label>
              <input v-model="form.icon" type="text" class="form-control" placeholder="🚧" maxlength="4" />
            </div>

            <div class="form-group admin-name-group">
              <label class="form-label">Nama Kategori</label>
              <input v-model="form.name" type="text" class="form-control" placeholder="Misal: Jalan Rusak" />
            </div>

          </div>

          <div class="form-group">
            <label class="form-label">Deskripsi</label>
            <input v-model="form.description" type="text" class="form-control" placeholder="Deskripsi singkat kategori" />
          </div>

          <div class="form-group">
            <label class="form-label">Warna</label>
            <div class="color-picker">
              <button
                v-for="c in colorOptions"
                :key="c.key"
                type="button"
                class="color-swatch"
                :class="[`swatch-${c.key}`, { active: form.color === c.key }]"
                @click="form.color = c.key"
                :aria-label="c.label"
              ></button>
            </div>
          </div>

          <div class="admin-form-actions">
            <button type="button" class="btn btn-secondary" @click="cancelForm">Batal</button>
            <button type="submit" class="btn btn-primary">
              {{ editingId ? 'Simpan Perubahan' : 'Tambah Kategori' }}
            </button>
          </div>

        </form>

      </div>
    </transition>

    <!-- GRID KATEGORI -->
    <div class="admin-category-grid">

      <div v-for="cat in filteredCategories" :key="cat.id" class="card admin-category-card">

        <div class="admin-category-icon" :class="`category-${cat.color}`">
          {{ cat.icon }}
        </div>

        <h3>{{ cat.name }}</h3>
        <p class="admin-category-desc">{{ cat.description }}</p>

        <div class="admin-category-footer">
          <span class="admin-category-count">{{ cat.reportCount }} laporan</span>

          <div class="admin-row-actions">
            <button class="report-detail" @click="openEditForm(cat)">Edit</button>
            <button class="admin-delete-btn" @click="deleteCategory(cat.id)">🗑️</button>
          </div>
        </div>

      </div>

    </div>

    <div v-if="!filteredCategories.length" class="empty-state">
      <div class="empty-icon">🏷️</div>
      <h3>Kategori tidak ditemukan</h3>
      <p>Coba kata kunci lain atau tambah kategori baru.</p>
    </div>

  </AdminLayout>
</template>