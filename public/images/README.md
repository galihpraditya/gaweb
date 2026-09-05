# Panduan Folder Gambar (Assets) - gaweb

Folder ini disediakan khusus agar Anda dapat meletakkan dan mengganti gambar website secara mandiri tanpa perlu bingung.

---

## 📁 Struktur Subfolder & Rekomendasi

### 1. `/images/hero/`
- **Fungsi:** Gambar latar belakang (background texture) atau foto suasana kantor/workspace di Hero Section paling atas.
- **Nama file yang disarankan:** `hero-bg.jpg` atau `hero-bg.webp`
- **Resolusi disarankan:** `1920 × 1080 px` (Landscape / 16:9)
- **Ukuran file disarankan:** < 250 KB (gunakan format `.webp` untuk kecepatan maksimal)
- **Cara pakai di komponen:**
  Buka file `components/sections/HeroSection.tsx`, pada tag `<Image ... />` ganti properti `src`:
  ```tsx
  src="/images/hero/hero-bg.jpg"
  ```

---

### 2. `/images/dashboard/`
- **Fungsi:** Screenshot asli tampilan panel admin / dashboard Anda.
- **Nama file yang disarankan:** `admin-preview.png` atau `admin-preview.webp`
- **Resolusi disarankan:** `1200 × 800 px` (Rasio 3:2 atau 16:10)
- **Ukuran file disarankan:** < 300 KB
- **Cara pakai di komponen:**
  Buka file `components/sections/DashboardDemoSection.tsx`, ganti URL gambar dummy dengan:
  ```tsx
  src="/images/dashboard/admin-preview.png"
  ```

---

### 3. `/images/showcase/`
- **Fungsi:** Foto portofolio, hasil karya website klien, atau foto produk Anda.
- **Nama file yang disarankan:** `showcase-1.jpg`, `showcase-2.jpg`, dst.
- **Resolusi disarankan:** `800 × 600 px` (Rasio 4:3)
- **Ukuran file disarankan:** < 150 KB per gambar

---

### 4. `/images/logo/`
- **Fungsi:** Logo resmi brand gaweb jika suatu saat ingin menggunakan file gambar/vektor alih-alih teks kode.
- **Nama file yang disarankan:** `logo.svg` atau `logo.png` (transparan)
- **Resolusi disarankan:** Tinggi 40–60 px, latar belakang transparan (PNG atau SVG)

---

## 💡 Tips Optimasi Gambar untuk Pemilik Usaha
1. **Gunakan Format WebP:** Gambar `.webp` 30-50% lebih ringan daripada JPG biasa namun kualitasnya tetap tajam.
2. **Kompresi Sebelum Upload:** Anda bisa menggunakan alat gratis seperti [TinyPNG](https://tinypng.com) atau [Squoosh](https://squoosh.app) untuk mengecilkan ukuran file tanpa mengurangi kejernihan gambar.
3. **Penyebutan Path di Next.js:** Semua file di dalam folder `public/` langsung dapat diakses dari root `/`, contoh: `public/images/hero/hero-bg.jpg` cukup dipanggil dengan `src="/images/hero/hero-bg.jpg"`.
