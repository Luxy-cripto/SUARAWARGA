<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <div class="home">

    <!-- NAVBAR -->
    <Navbar />

    <!-- HERO -->
    <section class="hero">
      <div class="container">

        <div class="hero-content">

          <div class="hero-badge">
            📢
            <span>Platform layanan masyarakat</span>
          </div>

          <h1 class="hero-title">
            Suarakan masalah di
            <span class="brand">sekitarmu.</span>
          </h1>

          <p class="hero-description">
            Laporkan masalah lingkungan dan fasilitas umum
            dengan mudah. Pantau prosesnya sampai selesai.
          </p>

          <div class="hero-actions">

            <button class="btn btn-primary">
              📢 Buat Laporan
            </button>

            <button class="btn btn-secondary">
              🔎 Lihat Laporan
            </button>

          </div>

        </div>

      </div>
    </section>


    <!-- SEARCH -->
    <section class="search-section">
      <div class="container">

        <div class="search-box">

          <span class="search-icon">🔎</span>

          <input
            type="text"
            placeholder="Cari laporan atau masalah..."
          />

        </div>

      </div>
    </section>


    <!-- LAYANAN -->
    <section class="section" id="layanan">

      <div class="container">

        <div class="section-header">

          <p class="section-eyebrow">
            Layanan SUARAWARGA
          </p>

          <h2 class="section-title">
            Ada masalah apa di sekitarmu?
          </h2>

          <p class="section-description">
            Pilih kategori masalah yang ingin kamu laporkan.
          </p>

        </div>


        <div class="category-grid">

          <!-- Jalan -->
          <button class="category-card">

            <div class="category-icon category-orange">
              🚧
            </div>

            <h3>Jalan Rusak</h3>

            <p>
              Jalan berlubang atau mengalami kerusakan
            </p>

          </button>


          <!-- Sampah -->
          <button class="category-card">

            <div class="category-icon category-green">
              🗑️
            </div>

            <h3>Sampah</h3>

            <p>
              Sampah menumpuk atau belum terangkut
            </p>

          </button>


          <!-- Lampu -->
          <button class="category-card">

            <div class="category-icon category-yellow">
              💡
            </div>

            <h3>Lampu Jalan</h3>

            <p>
              Lampu penerangan mati atau rusak
            </p>

          </button>


          <!-- Selokan -->
          <button class="category-card">

            <div class="category-icon category-blue">
              🌊
            </div>

            <h3>Selokan</h3>

            <p>
              Saluran air tersumbat atau bermasalah
            </p>

          </button>


          <!-- Fasilitas -->
          <button class="category-card">

            <div class="category-icon category-purple">
              🏞️
            </div>

            <h3>Fasilitas Umum</h3>

            <p>
              Fasilitas publik rusak atau tidak layak
            </p>

          </button>

        </div>

      </div>

    </section>


    <!-- STATISTIK -->
    <section class="stats-section">

      <div class="container">

        <div class="section-header">

          <p class="section-eyebrow">
            Transparansi
          </p>

          <h2 class="section-title">
            Perkembangan laporan masyarakat
          </h2>

        </div>


        <div class="stats-grid">

          <div class="stat-card">
            <div class="stat-icon">
              📋
            </div>

            <div>
              <div class="stat-number">
                128
              </div>

              <div class="stat-label">
                Total Laporan
              </div>
            </div>
          </div>


          <div class="stat-card">
            <div class="stat-icon waiting">
              🕐
            </div>

            <div>
              <div class="stat-number">
                24
              </div>

              <div class="stat-label">
                Menunggu
              </div>
            </div>
          </div>


          <div class="stat-card">
            <div class="stat-icon processing">
              ⚙️
            </div>

            <div>
              <div class="stat-number">
                31
              </div>

              <div class="stat-label">
                Diproses
              </div>
            </div>
          </div>


          <div class="stat-card">
            <div class="stat-icon success">
              ✓
            </div>

            <div>
              <div class="stat-number">
                73
              </div>

              <div class="stat-label">
                Selesai
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>


    <!-- LAPORAN TERBARU -->
    <section class="section" id="laporan">

      <div class="container">

        <div class="section-header section-header-left">

          <p class="section-eyebrow">
            Laporan Masyarakat
          </p>

          <h2 class="section-title">
            Laporan terbaru
          </h2>

          <p class="section-description">
            Lihat laporan yang sedang diproses di lingkungan sekitar.
          </p>

        </div>


        <div class="reports-list">

          <!-- Report -->
          <div class="report-card card">

            <div class="report-left">

              <div class="report-icon">
                🚧
              </div>

              <div>

                <h3 class="report-card-title">
                  Jalan berlubang di Jalan Melati
                </h3>

                <p class="report-location">
                  📍 Jalan Melati
                </p>

                <p class="report-time">
                  Dilaporkan 2 jam lalu
                </p>

              </div>

            </div>

            <div class="report-right">

              <span class="status status-processing">
                🔵 Diproses
              </span>

              <button class="report-detail">
                Lihat detail →
              </button>

            </div>

          </div>


          <!-- Report -->
          <div class="report-card card">

            <div class="report-left">

              <div class="report-icon green">
                🗑️
              </div>

              <div>

                <h3 class="report-card-title">
                  Sampah menumpuk di sekitar pasar
                </h3>

                <p class="report-location">
                  📍 Pasar Warga
                </p>

                <p class="report-time">
                  Dilaporkan kemarin
                </p>

              </div>

            </div>

            <div class="report-right">

              <span class="status status-waiting">
                🟡 Menunggu
              </span>

              <button class="report-detail">
                Lihat detail →
              </button>

            </div>

          </div>


          <!-- Report -->
          <div class="report-card card">

            <div class="report-left">

              <div class="report-icon yellow">
                💡
              </div>

              <div>

                <h3 class="report-card-title">
                  Lampu penerangan jalan mati
                </h3>

                <p class="report-location">
                  📍 Jalan Kenanga
                </p>

                <p class="report-time">
                  Dilaporkan 2 hari lalu
                </p>

              </div>

            </div>

            <div class="report-right">

              <span class="status status-success">
                🟢 Selesai
              </span>

              <button class="report-detail">
                Lihat detail →
              </button>

            </div>

          </div>

        </div>


        <div class="view-all">
          <button class="btn btn-secondary">
            Lihat Semua Laporan →
          </button>
        </div>

      </div>

    </section>


    <!-- CTA -->
    <section class="cta-section">

      <div class="container">

        <div class="cta">

          <div>

            <h2>
              Ada masalah di sekitar kamu?
            </h2>

            <p>
              Yuk, laporkan dan ikut membantu menciptakan
              lingkungan yang lebih baik.
            </p>

          </div>

          <button class="btn btn-white">
            📢 Buat Laporan
          </button>

        </div>

      </div>

    </section>


    <!-- FOOTER -->
 
   <Footer />
  </div>
</template>