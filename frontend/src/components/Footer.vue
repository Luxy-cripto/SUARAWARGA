<template>
  <footer class="footer">
    <div class="container">

      <div class="footer-grid">

        <!-- Brand -->
        <div class="footer-brand">
          <h2 class="brand-footer">SUARAWARGA</h2>
          <p class="footer-tagline">
            Suara masyarakat, perubahan nyata. Platform pelaporan
            masalah lingkungan dan fasilitas umum untuk warga.
          </p>

          <div class="social-links">
            <a href="#" class="social-icon" aria-label="Instagram">📷</a>
            <a href="#" class="social-icon" aria-label="Twitter/X">🐦</a>
            <a href="#" class="social-icon" aria-label="Facebook">📘</a>
            <a href="#" class="social-icon" aria-label="Email">✉️</a>
          </div>
        </div>

        <!-- Navigasi -->
        <div class="footer-col">
          <h3 class="footer-heading">Navigasi</h3>
          <ul class="footer-links">
            <li><RouterLink to="/">Beranda</RouterLink></li>
            <li><RouterLink to="/reports">Laporan</RouterLink></li>
            <li><RouterLink to="/about">Tentang</RouterLink></li>
          </ul>
        </div>

        <!-- Layanan -->
        <div class="footer-col">
          <h3 class="footer-heading">Layanan</h3>
          <ul class="footer-links">
            <li><a href="#">Jalan Rusak</a></li>
            <li><a href="#">Sampah</a></li>
            <li><a href="#">Lampu Jalan</a></li>
            <li><a href="#">Fasilitas Umum</a></li>
          </ul>
        </div>

        <!-- Kontak -->
        <div class="footer-col">
          <h3 class="footer-heading">Kontak</h3>
          <ul class="footer-links">
            <li>📍 Bandung, Indonesia</li>
            <li>✉️ Suarawarga@com.id</li>
            <li>📞 (021) 123-4567</li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <p>© 2026 SUARAWARGA. Semua hak dilindungi.</p>
        <div class="footer-bottom-links">
          <a href="#">Kebijakan Privasi</a>
          <a href="#">Syarat & Ketentuan</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>