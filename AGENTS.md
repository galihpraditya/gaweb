# AGENTS.md — Landing Page Jasa Pembuatan Website Custom (Non-WordPress)

> Panduan untuk AI Agent / Developer yang akan membangun landing page jasa ini. Sumber kebenaran: `PRD.md:1-187` v1.1. Jangan gunakan WordPress.

---

## 1. Konteks Proyek

**Tujuan Landing Page:** Satu-satunya funnel untuk konversi outreach nasional online → chat WhatsApp. Harus menjawab 3 keraguan UMKM/Travel dalam 5 detik: (1) Bisa dipercaya? (2) Mudah dikelola sendiri? (3) Harga terima beres berapa?

**Target KPI:** 15 outreach/hari → 5 discovery call/bulan → closing 20% → Rp 3-5jt/bulan (`PRD.md:24-29`). Landing page harus load <2s, PageSpeed >85 (`PRD.md:171`), dan CTA WA selalu terlihat.

**Positioning:** `PRD.md:44-54` — "Website Custom Tanpa WordPress yang Mudah Dikelola Sendiri". Nilai jual vs WordPress (`PRD.md:47-51`): Lebih Cepat (90+), Lebih Aman, Lebih Fleksibel, Tanpa biaya plugin tahunan.

---

## 2. Tech Stack Wajib (Tanpa WordPress)

Sesuai `PRD.md:159-167`:
- **Framework:** Next.js 14+ App Router (TypeScript)
- **Styling:** Tailwind CSS + Framer Motion (animasi subtle)
- **Hosting:** Vercel (Free) — optimasi image via `next/image`
- **CMS Landing Ini:** Hardcode dulu (nanti bisa hubung ke Supabase/Sanity jika butuh edit tanpa deploy)
- **Integrasi:** WhatsApp Deep Link `https://wa.me/62xxx?text=...`, Google Maps Embed (jika ada alamat), Form → langsung WA (tanpa backend email dulu)
- **Aset:** Loom video untuk demo dashboard (placeholder dulu)

**Dilarang:** WordPress, Elementor, PHP, jQuery, template berat.

**Structure:**
```
/app
  /page.tsx (landing utama)
  /layout.tsx
  /globals.css
/components
  /ui (Button, Card, Badge)
  /sections (Hero, Problem, Solution, Pricing, Process, FAQ, CTA, Footer)
  /Navbar.tsx
/lib
  /constants.ts (copy & harga dari PRD)
/public
  /images
```

---

## 3. Struktur Landing Page (Urutan Wajib)

Bangun section berurutan, mobile-first (320px → 1440px):

1.  **Navbar (Sticky):** Logo [Nama Brand] + Menu (Layanan, Harga, Proses, FAQ) + CTA `Konsultasi Gratis` (WA)
2.  **Hero:** H1 = Value Prop `PRD.md:44`, Sub = "Custom code, bukan WordPress. Cepat, aman, terima beres + dashboard edit sendiri + training 15 menit." + 2 CTA: `Chat WA Sekarang` (primary) & `Lihat Paket Harga` (secondary) + Visual: Mockup website + dashboard admin di HP/Laptop
3.  **Social Proof / Trust Bar:** "Tanpa WordPress • PageSpeed 90+ • Terima Beres Domain+Hosting • Garansi 7 Hari" + (nanti) logo klien nyata
4.  **Problem → Solution:** 3 problem UMKM (website WordPress lemot/jebol, susah update harus panggil dev, harga murah tapi jelek) → 3 solusi kita (Custom Cepat, Dashboard Mudah, Harga Jelas)
5.  **Kenapa Tanpa WordPress (Differentiator):** 4 kartu dari `PRD.md:47-51` (Cepat, Aman, Fleksibel, Hemat) dengan icon. Ini section kunci untuk justify harga.
6.  **Paket Layanan & Harga (Pricing):** 3 kartu dari `PRD.md:84-88`:
    - Starter Rp 1,25–1,5jt (3–5 hari) — 1 halaman
    - Bisnis Rp 2,5–3,5jt (5–7 hari) — 3–5 halaman ⭐ Recommended
    - Travel Plus Rp 3,8–5jt (6–8 hari) — paket wisata
    Tampilkan: Fitur checklist, estimasi waktu, badge "Terima Beres", CTA per kartu `Pilih Paket → WA`
7.  **Demo Dashboard (Cara Kelola Sendiri):** Screenshot/mockup `/admin` + 3 langkah: Login → Edit Teks/Foto → Publish. + caption "Training 15 menit via Loom, tanpa coding"
8.  **Proses Kerja (4 Langkah):** Chat WA → DP 50% → Pengerjaan (update progres) → Pelunasan & Serah Terima (domain + dashboard + video) — dari `PRD.md:111-114`
9.  **FAQ:** Ambil dari `PRD.md:100-109`: DP, revisi (1 mayor + max 10 minor/3 hari), timeline, domain atas nama klien, garansi bug 7 hari, tanpa WordPress kenapa lebih baik?
10. **CTA Akhir (Closing):** H2 "Siap Punya Website yang Bisa Kamu Kelola Sendiri?" + Form singkat (Nama, Usaha, Paket) → redirect WA prefilled text
11. **Footer:** Brand, tagline, link paket, kontak WA, Instagram, alamat (opsional), © + "Bukan WordPress, 100% Custom Code"

**Copy Tone:** `PRD.md:54` — ramah, praktis, tidak formal. Hindari jargon dev. Gunakan "kamu", "gampang", "terima beres".

---

## 4. Design System (FINAL — Sesuai Jawaban Owner 30 Agt 2026)

> Jawaban Owner: Ramah & Playful UMKM + Biru-Teal Trust + Inspirasi Niagahoster/Dewaweb + Sans Modern (Inter) + Kombinasi Foto+Mockup + Lega & Minimalis

**Palet Warna (Biru-Teal Trust + Playful):**
- Primary: `teal-600 #0d9488` / `cyan-600 #0891b2` untuk CTA (trust, konversi tinggi)
- Accent: `amber-400` untuk highlight harga/badge "Terima Beres"
- Netral: `slate-50` background, `slate-900` text, `white` card
- Status: `emerald-500` untuk checklist fitur, `red-500` untuk pembanding WordPress
- Implementasi: `globals.css` → CSS vars + `tailwind.config.ts` extend colors

**Typography (Sans Modern — Inter):**
- Font: `Inter` (Google Fonts) — 400, 500, 600, 700. Fallback: `system-ui, sans-serif`
- H1: 36-48px / 700, H2: 28-32px / 700, Body: 16px / 400, Small: 14px
- Letter-spacing: -0.02em untuk heading (kesan modern, seperti Vercel tapi lebih ramah)

**Gaya Visual (Ramah & Playful UMKM + Lega Minimalis):**
- Radius: `16px` (card), `9999px` (pill CTA) — kesan ramah, tidak kaku
- Shadow: `soft` (`0 8px 30px rgba(0,0,0,0.06)`) + `border slate-200`
- Whitespace: Lega (section padding `py-20 lg:py-28`), max-width `max-w-6xl`, tidak padat seperti Niagahoster
- Inspirasi layout dari Niagahoster (pricing jelas, fitur checklist) tapi dieksekusi minimalis/playful, bukan ramai

**Aset Visual (Kombinasi):**
- Hero: Foto real UMKM/Travel (human) + mockup dashboard admin di laptop/HP (produk) — side-by-side
- Section Dashboard: Screenshot `/admin` real + 3 langkah icon
- Icon: Lucide React (rounded, playful), bukan outline tajam
- Image: Optimasi `next/image`, placeholder blur

**CTA Style:** Primary solid teal (`bg-teal-600 hover:bg-teal-700 text-white`), Secondary outline (`border-teal-600 text-teal-700`). Floating WA button bulat kanan bawah (mobile).

---

## 5. Aturan Pengembangan

**Wajib:**
- Mobile-first, responsive, aksesibel (contrast AAA, focus ring).
- CTA WhatsApp sticky di mobile (floating button kanan bawah).
- Semua harga, fitur, revisi HARUS sinkron dengan `PRD.md:80-109`. Jangan karang harga.
- Optimasi: `next/image`, lazy load, no large JS. Target Lighthouse >85.
- Copy Indonesia.

**Dilarang:**
- Membuat portofolio dummy tanpa izin (`PRD.md:118-126` — dummy dihapus, pakai showcase landing jasa sendiri saja).
- Menambahkan integrasi AI, booking, payment gateway (out of scope `PRD.md:72-76`).
- Menggunakan WordPress atau menyebut WordPress sebagai solusi (hanya sebagai pembanding negatif).
- Hardcode nomor WA — pakai `NEXT_PUBLIC_WA_NUMBER`.

**Definition of Done (`PRD.md:171`):**
PageSpeed >85 mobile, semua CTA WA tested, pricing sesuai PRD, dashboard demo terlihat, video Loom placeholder ada, tidak ada dummy portfolio, deploy Vercel berhasil.

---

## 6. Workflow Agent

1. Baca `PRD.md` & `AGENTS.md` ini sampai paham.
2. ✅ Design System sudah terkunci (30 Agt 2026) — langsung pakai `AGENTS.md:71-98`.
3. Setup Next.js + Tailwind + Framer Motion.
4. Bangun section 1-11 berurutan, pakai `lib/constants.ts` untuk copy/harga agar single source of truth.
5. Test responsive + WA link + Lighthouse.
6. Deploy preview, minta review owner.

---

## 7. Keputusan Desain (Terkunci)

- Gaya: Ramah & Playful UMKM (bukan corporate kaku)
- Warna: Biru-Teal Trust
- Referensi: Niagahoster/Dewaweb (pricing & fitur jelas) → eksekusi lega minimalis
- Font: Sans Modern Inter
- Aset: Kombinasi Foto Real + Mockup Dashboard
- Layout: Lega & Minimalis + Sticky WA

> Agent boleh langsung build — tidak perlu tanya ulang. Jika butuh detail, lihat `AGENTS.md:71-98`.
