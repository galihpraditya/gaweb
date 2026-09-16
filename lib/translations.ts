export type Language = "id" | "en";

export interface TranslationSchema {
  navbar: {
    links: { label: string; href: string }[];
    cta: string;
    whatsappDrawer: string;
  };
  hero: {
    h1Pre: string;
    h1Highlight: string;
    h1Post: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustPoints: string[];
  };
  problem: {
    title: string;
    subtitle: string;
    problemLabel: string;
    solutionLabel: string;
    items: {
      problemTitle: string;
      problemDesc: string;
      solutionTitle: string;
      solutionDesc: string;
    }[];
  };
  differentiator: {
    title: string;
    subtitle: string;
    cardHeader: string;
    cardDesc: string;
    items: {
      icon: string;
      title: string;
      desc: string;
      metric: string;
    }[];
    footerText: string;
  };
  portfolio: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterLanding: string;
    filterCompany: string;
    filterTravel: string;
    filterUmkm: string;
    viewLiveDemo: string;
    orderSimilar: string;
    metricsTitle: string;
    emptyTitle: string;
    emptyDesc: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    timelinePrefix: string;
    featuresLabel: string;
    ctaButton: string;
    viewAll: (count: number) => string;
    viewLess: string;
    plans: {
      id: string;
      name: string;
      badge?: string;
      isPopular?: boolean;
      target: string;
      originalPrice: string;
      discountBadge: string;
      priceDisplay: string;
      timeline: string;
      description: string;
      features: string[];
      waMessage: string;
    }[];
  };
  dashboard: {
    title: string;
    subtitle: string;
    panelEdit: string;
    panelPreview: string;
    typingPrompt: string;
    autoFormat: string;
    presetsLabel: string;
    presets: { label: string; headline: string; price: string }[];
    headlineLabel: string;
    priceLabel: string;
    statusLabel: string;
    readyLabel: string;
    draftLabel: string;
    uploadLabel: string;
    uploadSub: string;
    saveButton: string;
    savingButton: string;
    toastSuccess: string;
    realTimeTag: string;
    specialPricePrefix: string;
    orderBtn: string;
    syncNote: string;
  };
  process: {
    title: string;
    subtitle: string;
    steps: {
      stepNumber: string;
      title: string;
      desc: string;
      tag: string;
    }[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: {
      question: string;
      answer: string;
    }[];
    unansweredTitle: string;
    unansweredSub: string;
    ctaWa: string;
  };
  inquiry: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    businessLabel: string;
    businessPlaceholder: string;
    packageLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitButton: string;
    guarantee: string;
    packageOptions: { value: string; label: string }[];
    waMessagePrefix: string;
  };
  footer: {
    description: string;
    navTitle: string;
    contactTitle: string;
    waText: string;
    rights: string;
    tagline: string;
    subtagline: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  id: {
    navbar: {
      links: [
        { label: "Solusi", href: "#layanan" },
        { label: "Keunggulan", href: "#keunggulan" },
        { label: "Portofolio", href: "#portofolio" },
        { label: "Demo Admin", href: "#demo" },
        { label: "Harga Paket", href: "#harga" },
        { label: "Cara Pesan", href: "#proses" },
        { label: "Tanya Jawab", href: "#faq" },
      ],
      cta: "Mulai Sekarang",
      whatsappDrawer: "Chat WhatsApp Sekarang",
    },
    hero: {
      h1Pre: "Bikin Website Modern yang",
      h1Highlight: " Gampang Dikelola",
      h1Post: " Sendiri",
      subtitle:
        "Bebas template kaku, tanpa ribet. Loading super cepat, terima beres domain + hosting, dan bisa kamu kelola sendiri dengan mudah.",
      ctaPrimary: "Chat WhatsApp Sekarang",
      ctaSecondary: "Lihat Paket Harga",
      trustPoints: [
        "Terima beres domain & cloud hosting",
        "Dashboard mudah diedit sendiri",
        "Garansi kendala teknis 7 hari",
      ],
    },
    problem: {
      title: "Pernah Kecewa Bikin Website?",
      subtitle:
        "Banyak yang kecewa karena website lambat, gampang error, dan repot diupdate. Ini bedanya kalau pakai website custom:",
      problemLabel: "Masalah Template Kaku",
      solutionLabel: "Solusi gaweb",
      items: [
        {
          problemTitle: "Website Sering Lemot & Rawan Error",
          problemDesc:
            "Plugin menumpuk bikin loading lambat (PageSpeed < 60) dan rawan rusak saat update otomatis.",
          solutionTitle: "Loading Kilat & Super Ringan",
          solutionDesc:
            "Dibangun dengan kode kustom modern yang bersih dan efisien. Website terbuka < 2 detik (PageSpeed 90+) dan aman tanpa celah plugin.",
        },
        {
          problemTitle: "Ubah Teks & Foto Harus Panggil Dev",
          problemDesc:
            "Tiap mau ganti harga, menu, atau promo harus bayar biaya tambahan dan menunggu berhari-hari.",
          solutionTitle: "Dashboard Gampang Diedit Sendiri",
          solutionDesc:
            "Tinggal buka dashboard khusus untuk ganti harga, menu, dan foto semudah update status medsos.",
        },
        {
          problemTitle: "Jasa Murah Pasaran Asal Jadi",
          problemDesc:
            "Pakai template gratisan yang kaku, lambat di HP, dan sering lepas tangan setelah dibayar.",
          solutionTitle: "Terima Beres & Garansi 7 Hari",
          solutionDesc:
            "Sudah termasuk domain, cloud hosting 1 tahun, dashboard mandiri siap pakai, dan jaminan bebas kendala teknis.",
        },
      ],
    },
    differentiator: {
      title: "Lebih Cepat, Aman, & Bebas Biaya Siluman",
      subtitle:
        "Investasi cerdas jangka panjang untuk bisnismu. Bebas repot, bebas error, dan hemat biaya.",
      cardHeader: "Website Modern & Ringan",
      cardDesc:
        "Dibangun tanpa plugin yang menumpuk. Website langsung terbuka cepat saat calon pembeli berkunjung.",
      items: [
        {
          icon: "Zap",
          title: "Loading Kilat (PageSpeed 90+)",
          desc: "Website memuat dalam hitungan detik. Calon pelanggan nyaman dan tidak kabur ke kompetitor.",
          metric: "PageSpeed 98/100",
        },
        {
          icon: "ShieldCheck",
          title: "Aman & Bebas Pusing",
          desc: "Tanpa celah plugin pihak ketiga. Website tetap stabil tanpa risiko rusak akibat update otomatis.",
          metric: "0 Celah Plugin",
        },
        {
          icon: "Sparkles",
          title: "Desain Otentik Brand Kamu",
          desc: "Tampilan profesional disesuaikan dengan bisnismu agar terlihat kredibel dan dipercaya pembeli.",
          metric: "Desain Kustom",
        },
        {
          icon: "BadgePercent",
          title: "Hemat Jangka Panjang",
          desc: "Bebas biaya lisensi plugin tahunan atau tagihan maintenance bulanan yang tidak terduga.",
          metric: "Bebas Biaya Lisensi",
        },
      ],
      footerText: "Dibangun dengan Custom Code Modern • Bebas Template Berat",
    },
    portfolio: {
      badge: "Karya & Portofolio",
      title: "Hasil Website Nyata yang Telah Kami Kerjakan",
      subtitle:
        "Contoh website yang kami bangun dengan custom code. Cepat saat dibuka, rapi di semua layar HP, dan gampang kamu kelola sendiri.",
      filterAll: "Semua Proyek",
      filterLanding: "Landing Page",
      filterCompany: "Company Profile",
      filterTravel: "Tour & Wisata",
      filterUmkm: "UMKM / Kuliner",
      viewLiveDemo: "Lihat Demo",
      orderSimilar: "Pesan Web Ini",
      metricsTitle: "Kinerja Teruji",
      emptyTitle: "Belum ada proyek di kategori ini",
      emptyDesc: "Pilih kategori lain atau tambahkan proyek baru dari panel admin.",
    },
    pricing: {
      title: "Pilihan Paket Website Terima Beres",
      subtitle:
        "Semua paket sudah termasuk domain, cloud hosting cepat 1 tahun, dan dashboard admin untuk edit mandiri.",
      timelinePrefix: "Estimasi:",
      featuresLabel: "Fitur Termasuk:",
      ctaButton: "Pilih Paket",
      viewAll: (count: number) => `Lihat semua ${count} fitur lengkap`,
      viewLess: "Tutup fitur tambahan",
      plans: [
        {
          id: "starter",
          name: "Starter (Landing Page)",
          target: "Cocok untuk personal branding, jasa, promosi 1 produk, atau portofolio",
          originalPrice: "Rp 1.250.000",
          discountBadge: "Hemat 20%",
          priceDisplay: "Rp 999.000",
          timeline: "3-5 hari kerja",
          description:
            "Solusi 1 halaman modern dan fokus konversi untuk mengenalkan profil, penawaran jasa, atau produk unggulan langsung terhubung ke WhatsApp.",
          features: [
            "1 Halaman Landing Page Profesional & Responsif",
            "Termasuk Domain .com / .id (Tahun Pertama)",
            "High-Speed Cloud Hosting 1 Tahun",
            "Dashboard Admin Custom (Edit Teks & Foto Mandiri)",
            "Direct WhatsApp Form & Click-to-Chat",
            "Integrasi Lokasi Google Maps",
            "Optimasi SEO Basic & PageSpeed 90+",
            "1x Revisi Mayor + max 10 Poin Minor (3 Hari)",
            "Garansi Bug 7 Hari Setelah Go-Live",
          ],
          waMessage:
            "Halo gaweb, saya ingin pesan Paket Promo Starter (Landing Page Rp 999.000). Boleh minta info detail alur pemesanannya?",
        },
        {
          id: "bisnis",
          name: "Bisnis (Company Profile)",
          badge: "Direkomendasikan",
          isPopular: true,
          target: "Cocok untuk profil perusahaan, agensi, kantor jasa, brand, atau institusi",
          originalPrice: "Rp 2.500.000",
          discountBadge: "Hemat 20%",
          priceDisplay: "Rp 1.999.000",
          timeline: "5-7 hari kerja",
          description:
            "Website lengkap multi-halaman (3-5 halaman) untuk membangun reputasi profesional, memamerkan katalog layanan & portofolio, dan kontak resmi.",
          features: [
            "Multi-Halaman (3-5 Halaman: Home, Tentang, Layanan, Galeri, Kontak)",
            "Termasuk Domain .com / .id (Tahun Pertama)",
            "High-Speed Cloud Hosting 1 Tahun",
            "Dashboard Admin Lengkap (Kelola Konten & Galeri Foto)",
            "Form Kontak Terhubung ke WhatsApp",
            "Integrasi Google Maps Interaktif & Media Sosial",
            "Desain Eksklusif Sesuai Karakter Brand Kamu",
            "Optimasi SEO Struktur & PageSpeed 90+",
            "1x Revisi Mayor + max 10 Poin Minor (3 Hari)",
            "Garansi Bug 7 Hari Setelah Go-Live",
          ],
          waMessage:
            "Halo gaweb, saya ingin pesan Paket Promo Bisnis (Company Profile Rp 1.999.000). Bisa kita diskusikan untuk kebutuhan saya?",
        },
        {
          id: "travel",
          name: "Custom Plus (Katalog & Fitur)",
          target: "Cocok untuk usaha dengan katalog banyak, booking, rental, properti, atau travel",
          originalPrice: "Rp 3.500.000",
          discountBadge: "Hemat 20%",
          priceDisplay: "Rp 2.800.000",
          timeline: "6-8 hari kerja",
          description:
            "Website dinamis dengan sistem listing katalog terstruktur, galeri detail per item, filter kategori, dan formulir pemesanan/reservasi kustom via WhatsApp.",
          features: [
            "Semua Fitur Paket Bisnis Termasuk",
            "Halaman Listing & Detail Katalog / Layanan Lengkap",
            "Galeri Foto Detail per Item / Kategori",
            "Formulir Pemesanan / Reservasi Kustom Terhubung ke WhatsApp",
            "Dashboard Khusus Kelola Item (Tambah, Edit Harga & Info)",
            "Termasuk Domain .com / .id + Cloud Hosting 1 Tahun",
            "Desain Visual Eksklusif & Mengutamakan Konversi",
            "Integrasi Rute Google Maps & Social Proof",
            "1x Revisi Mayor + max 10 Poin Minor (3 Hari)",
            "Garansi Bug 7 Hari Setelah Go-Live",
          ],
          waMessage:
            "Halo gaweb, saya ingin konsultasi Paket Custom Plus (Katalog & Fitur Rp 2.800.000). Boleh minta info lebih detail?",
        },
      ],
    },
    dashboard: {
      title: "Coba Sendiri: Edit Teks & Harga",
      subtitle:
        "Semudah mengetik status media sosial. Coba ganti teks atau harga di form sebelah kiri, lalu klik Simpan untuk melihat hasilnya langsung di sebelah kanan:",
      panelEdit: "1. Panel Edit Klien",
      panelPreview: "2. Hasil Live Website Klien",
      typingPrompt: "Silakan Ketik",
      autoFormat: "Auto-Format",
      presetsLabel: "Coba Contoh Instan (1-Klik):",
      presets: [
        { label: "Kopi Susu Aren", headline: "Spesial Kopi Susu Gula Aren", price: "Rp 18.000" },
        { label: "Open Trip Bromo", headline: "Paket Wisata Sunrise Bromo 2D1N", price: "Rp 350.000" },
        { label: "Promo Diskon 20%", headline: "Diskon Spesial Liburan — Hemat 20%", price: "Rp 120.000" },
      ],
      headlineLabel: "Judul Headline / Promo",
      priceLabel: "Harga Paket / Menu",
      statusLabel: "Status Live",
      readyLabel: "Siap Tayang",
      draftLabel: "Draft / Nonaktif",
      uploadLabel: "Upload Foto Produk / Galeri",
      uploadSub: "Otomatis dioptimasi menjadi format WebP berkecepatan tinggi",
      saveButton: "Klik di Sini: Simpan & Publikasikan",
      savingButton: "Menyimpan Perubahan...",
      toastSuccess: "Berhasil disimpan! Perubahan langsung terupdate di layar preview.",
      realTimeTag: "Terupdate Real-Time",
      specialPricePrefix: "Harga Spesial:",
      orderBtn: "Pesan Sekarang",
      syncNote: "⚡ Perubahan langsung tayang seketika tanpa perlu reload website.",
    },
    process: {
      title: "4 Langkah Mudah Punya Website",
      subtitle:
        "Dari obrolan santai via WhatsApp sampai websitemu resmi tayang — semua terstruktur rapi, bergaransi, dan transparan.",
      steps: [
        {
          stepNumber: "1",
          title: "Diskusi & Pilih Paket",
          desc: "Sampaikan kebutuhan usahamu via WhatsApp. Kami bantu rekomendasikan paket dan struktur yang paling pas.",
          tag: "Diskusi Kebutuhan Awal",
        },
        {
          stepNumber: "2",
          title: "Kesepakatan & DP 50%",
          desc: "Pembayaran DP 50% di muka sebagai tanda jadi pengerjaan. Domain dan hosting langsung kami siapkan atas nama kamu.",
          tag: "Domain & Hosting Aktif",
        },
        {
          stepNumber: "3",
          title: "Pengerjaan & Review Draft",
          desc: "Kami bangun website custom kamu (3-8 hari). Kami kirimkan link preview untuk sesi review dan revisi (1 mayor + 10 minor).",
          tag: "Review Link Preview",
        },
        {
          stepNumber: "4",
          title: "Pelunasan & Serah Terima",
          desc: "Setelah pelunasan 50%, website go-live resmi. Kami serahkan akses penuh dashboard admin siap pakai + garansi bug 7 hari.",
          tag: "Garansi Bug 7 Hari Aktif",
        },
      ],
    },
    faq: {
      title: "Pertanyaan yang Sering Diajukan",
      subtitle:
        "Jawaban lengkap seputar sistem pembayaran, kebijakan revisi, domain & hosting, dan garansi website.",
      items: [
        {
          question: "Bagaimana sistem pembayarannya?",
          answer:
            "DP 50% di muka untuk mulai pengerjaan, dan pelunasan 50% sisanya dilakukan setelah website selesai kamu review dan siap tayang.",
        },
        {
          question: "Bagaimana dengan kebijakan revisinya?",
          answer:
            "Tersedia 1x revisi mayor (perubahan desain) dan perbaikan minor (ganti teks, foto, warna) dalam kurun 3 hari setelah draft pertama dikirimkan.",
        },
        {
          question: "Apakah domain dan hosting menjadi milik saya?",
          answer:
            "Ya, 100%. Domain dan cloud hosting didaftarkan resmi atas nama usaha kamu dengan kepemilikan penuh.",
        },
        {
          question: "Kenapa website custom non-WordPress lebih baik untuk usaha saya?",
          answer:
            "Website custom jauh lebih cepat (PageSpeed 90+), tidak gampang error karena update plugin, dan kamu tidak perlu bayar biaya langganan plugin tahunan.",
        },
        {
          question: "Apakah saya benar-benar bisa edit website sendiri tanpa coding?",
          answer:
            "Pasti bisa! Dashboard admin kami dirancang sangat praktis dan intuitif seperti mengisi form biasa, langsung lewat browser tanpa perlu koding sama sekali.",
        },
        {
          question: "Apakah ada garansi setelah website selesai?",
          answer:
            "Ada! Garansi perbaikan teknis selama 7 hari kalender setelah website resmi tayang untuk memastikan semuanya bekerja lancar.",
        },
      ],
      unansweredTitle: "Masih punya pertanyaan lain yang belum terjawab?",
      unansweredSub: "Tanyakan langsung via WhatsApp, respon cepat dalam 2 jam.",
      ctaWa: "Tanya via WhatsApp",
    },
    inquiry: {
      title: "Siap Punya Website Sendiri?",
      subtitle: "Isi 3 info singkat ini, lalu klik kirim untuk langsung tersambung ke WhatsApp kami:",
      nameLabel: "Nama Kamu",
      namePlaceholder: "Contoh: Budi Santoso",
      businessLabel: "Nama Usaha / Brand",
      businessPlaceholder: "Contoh: Kopi Senja",
      packageLabel: "Paket yang Kamu Minati",
      notesLabel: "Catatan Tambahan (Opsional)",
      notesPlaceholder: "Contoh: Saya sudah ada logo dan mau ada menu katalog...",
      submitButton: "Kirim & Lanjut Chat WhatsApp",
      guarantee: "Langsung tersambung ke WhatsApp kami tanpa spam email",
      packageOptions: [
        { value: "starter", label: "Paket Starter — Landing Page (Promo Rp 999.000)" },
        { value: "bisnis", label: "Paket Bisnis — Company Profile (Promo Rp 1.999.000) - Paling Pas" },
        { value: "travel", label: "Paket Custom Plus — Katalog & Fitur (Promo Rp 2.800.000)" },
        { value: "custom", label: "Paket Kustom / Konsultasi Dulu" },
      ],
      waMessagePrefix: "Halo gaweb! Saya ingin tanya pembuatan website custom:",
    },
    footer: {
      description:
        "Jasa pembuatan website landing page & company profile custom modern untuk berbagai bisnis & profesional. Super cepat, aman, terima beres domain + hosting + dashboard admin mandiri.",
      navTitle: "Navigasi",
      contactTitle: "Kontak Resmi",
      waText: "WhatsApp Resmi",
      rights: "All rights reserved.",
      tagline: "100% Custom Code • Performa Tinggi",
      subtagline: "Bebas Template Berat",
    },
  },
  en: {
    navbar: {
      links: [
        { label: "Solutions", href: "#layanan" },
        { label: "Why Us", href: "#keunggulan" },
        { label: "Portfolio", href: "#portofolio" },
        { label: "Live Demo", href: "#demo" },
        { label: "Pricing", href: "#harga" },
        { label: "Process", href: "#proses" },
        { label: "FAQ", href: "#faq" },
      ],
      cta: "Get Started",
      whatsappDrawer: "Chat on WhatsApp Now",
    },
    hero: {
      h1Pre: "Build a Modern Website that's",
      h1Highlight: " Easy to Manage",
      h1Post: " Yourself",
      subtitle:
        "No rigid templates, zero hassle. Blazing-fast load times, fully turnkey with domain + hosting, and easy for you to manage anytime.",
      ctaPrimary: "Chat on WhatsApp Now",
      ctaSecondary: "View Pricing Plans",
      trustPoints: [
        "Turnkey domain & cloud hosting",
        "Easy self-managed dashboard",
        "7-day technical warranty",
      ],
    },
    problem: {
      title: "Disappointed with Websites Before?",
      subtitle:
        "Many struggle with slow speeds, frequent breakages, and tedious maintenance. Here's why custom-built makes all the difference:",
      problemLabel: "Rigid Template Issues",
      solutionLabel: "The gaweb Solution",
      items: [
        {
          problemTitle: "Sluggish Speed & Constant Vulnerabilities",
          problemDesc:
            "Bloated plugins cause slow loading (PageSpeed < 60) and frequently crash upon automatic updates.",
          solutionTitle: "Blazing Fast & Ultra Lightweight",
          solutionDesc:
            "Engineered with clean, modern custom code. Pages load in < 2 seconds (PageSpeed 90+) with zero plugin vulnerabilities.",
        },
        {
          problemTitle: "Need Developers for Simple Text & Photo Updates",
          problemDesc:
            "Every price adjustment, menu change, or promo update requires waiting days and paying extra developer fees.",
          solutionTitle: "Intuitive Self-Service Dashboard",
          solutionDesc:
            "Simply access your dedicated admin panel to update text, pricing, and images as easily as posting on social media.",
        },
        {
          problemTitle: "Cheap Cookie-Cutter Agencies Disappearing",
          problemDesc:
            "Built on generic free themes that break on mobile and offer zero support once final payment is made.",
          solutionTitle: "Turnkey Setup & 7-Day Warranty",
          solutionDesc:
            "Includes domain, 1-year fast cloud hosting, ready-to-use client dashboard, and a full 7-day technical bug warranty.",
        },
      ],
    },
    differentiator: {
      title: "Faster, Safer & Zero Hidden Costs",
      subtitle:
        "A smart long-term investment for your brand. Hassle-free, bug-free, and remarkably cost-effective.",
      cardHeader: "Modern & Lightweight",
      cardDesc:
        "Engineered without bloated third-party plugins. Your site opens instantaneously when potential clients visit.",
      items: [
        {
          icon: "Zap",
          title: "Instant Loading (PageSpeed 90+)",
          desc: "Web pages load in the blink of an eye. Keep visitors engaged without losing them to competitors.",
          metric: "PageSpeed 98/100",
        },
        {
          icon: "ShieldCheck",
          title: "Secure & Worry-Free",
          desc: "Zero plugin security vulnerabilities. Your site stays rock-solid without risk of update breakages.",
          metric: "0 Plugin Vulnerabilities",
        },
        {
          icon: "Sparkles",
          title: "Authentic Design for Your Brand",
          desc: "Professional aesthetics tailored to your business to establish trust, authority, and buyer confidence.",
          metric: "100% Custom Design",
        },
        {
          icon: "BadgePercent",
          title: "Long-Term Cost Savings",
          desc: "No annual plugin license fees or unexpected recurring monthly maintenance invoices.",
          metric: "Zero License Fees",
        },
      ],
      footerText: "Built with Modern Custom Code • Free of Bloated Templates",
    },
    portfolio: {
      badge: "Featured Work & Portfolio",
      title: "Real Client Websites We Have Built",
      subtitle:
        "Sample websites built with modern custom code. Fast-loading, fully mobile-friendly, and easy for you to manage yourself.",
      filterAll: "All Projects",
      filterLanding: "Landing Page",
      filterCompany: "Company Profile",
      filterTravel: "Tour & Travel",
      filterUmkm: "F&B / Business",
      viewLiveDemo: "Live Demo",
      orderSimilar: "Order Similar",
      metricsTitle: "Proven Metrics",
      emptyTitle: "No projects found in this category",
      emptyDesc: "Select another category or add a new project from the admin dashboard.",
    },
    pricing: {
      title: "Turnkey Website Packages",
      subtitle:
        "All packages include domain registration, 1-year high-speed cloud hosting, and an intuitive self-serve admin dashboard.",
      timelinePrefix: "Delivery:",
      featuresLabel: "Included Features:",
      ctaButton: "Choose Plan",
      viewAll: (count: number) => `View all ${count} features`,
      viewLess: "Show less",
      plans: [
        {
          id: "starter",
          name: "Starter (Landing Page)",
          target: "Ideal for personal branding, services, single-product campaigns, or portfolios",
          originalPrice: "Rp 1.250.000",
          discountBadge: "Save 20%",
          priceDisplay: "Rp 999.000",
          timeline: "3-5 business days",
          description:
            "A streamlined, high-converting single-page website to introduce your profile, service offerings, or featured product with direct WhatsApp connectivity.",
          features: [
            "1 Professional & Fully Responsive Landing Page",
            "Includes .com / .id Domain (1st Year)",
            "High-Speed Cloud Hosting (1 Year)",
            "Custom Client Admin Dashboard (Self-Edit Text & Photos)",
            "Direct WhatsApp Lead Form & Click-to-Chat",
            "Interactive Google Maps Location Integration",
            "Basic SEO Optimization & PageSpeed 90+",
            "1x Major Revision + up to 10 Minor Edits (3 Days)",
            "7-Day Technical Bug Warranty After Go-Live",
          ],
          waMessage:
            "Hello gaweb, I'm interested in the Promo Starter Package (Landing Page Rp 999.000). Could you share details on how to get started?",
        },
        {
          id: "bisnis",
          name: "Business (Company Profile)",
          badge: "Recommended",
          isPopular: true,
          target: "Ideal for company profiles, agencies, professional practices, brands, or organizations",
          originalPrice: "Rp 2.500.000",
          discountBadge: "Save 20%",
          priceDisplay: "Rp 1.999.000",
          timeline: "5-7 business days",
          description:
            "A comprehensive multi-page website (3-5 pages) to establish corporate credibility, showcase full service catalogs, portfolios, and official inquiries.",
          features: [
            "Multi-Page (3-5 Pages: Home, About, Services, Gallery, Contact)",
            "Includes .com / .id Domain (1st Year)",
            "High-Speed Cloud Hosting (1 Year)",
            "Full Client Admin Dashboard (Manage Content & Galleries)",
            "Inquiry Form Connected Directly to WhatsApp",
            "Interactive Google Maps & Social Media Links",
            "Exclusive Visual Design Tailored to Your Brand",
            "Structured SEO Architecture & PageSpeed 90+",
            "1x Major Revision + up to 10 Minor Edits (3 Days)",
            "7-Day Technical Bug Warranty After Go-Live",
          ],
          waMessage:
            "Hello gaweb, I'm interested in the Promo Business Package (Company Profile Rp 1.999.000). Can we discuss my requirements?",
        },
        {
          id: "travel",
          name: "Custom Plus (Catalogs & Features)",
          target: "Ideal for businesses with extensive catalogs, reservations, rentals, property listings, or travel",
          originalPrice: "Rp 3.500.000",
          discountBadge: "Save 20%",
          priceDisplay: "Rp 2.800.000",
          timeline: "6-8 business days",
          description:
            "A dynamic website featuring structured catalog listings, detailed item galleries, category filters, and custom WhatsApp reservation forms.",
          features: [
            "All Business Package Features Included",
            "Structured Catalog Listing & Detail Pages",
            "Detailed Photo Galleries per Item / Category",
            "Custom Order / Reservation Form Connected to WhatsApp",
            "Dedicated Dashboard to Manage Items (Add, Edit Prices & Info)",
            "Includes .com / .id Domain + 1-Year Cloud Hosting",
            "Bespoke High-Conversion Visual Design",
            "Google Maps Routes & Social Proof Integrations",
            "1x Major Revision + up to 10 Minor Edits (3 Days)",
            "7-Day Technical Bug Warranty After Go-Live",
          ],
          waMessage:
            "Hello gaweb, I'd like to consult regarding the Custom Plus Package (Catalogs & Features Rp 2.800.000). Could you provide more info?",
        },
      ],
    },
    dashboard: {
      title: "Try It Yourself: Edit Text & Pricing",
      subtitle:
        "As easy as typing a social media post. Try changing text or pricing on the left form, then click Save to see real-time updates on the right preview:",
      panelEdit: "1. Client Admin Panel",
      panelPreview: "2. Live Client Output",
      typingPrompt: "Try Typing",
      autoFormat: "Auto-Format",
      presetsLabel: "Instant Sample Presets (1-Click):",
      presets: [
        { label: "Aren Latte Special", headline: "Artisan Palm Sugar Latte Special", price: "Rp 18.000" },
        { label: "Bromo Sunrise Trip", headline: "Mount Bromo Sunrise Tour 2D1N", price: "Rp 350.000" },
        { label: "Holiday Promo 20%", headline: "Special Holiday Discount — Save 20%", price: "Rp 120.000" },
      ],
      headlineLabel: "Headline / Promo Title",
      priceLabel: "Package / Item Price",
      statusLabel: "Live Status",
      readyLabel: "Published",
      draftLabel: "Draft / Inactive",
      uploadLabel: "Upload Product / Gallery Photo",
      uploadSub: "Automatically compressed into high-speed WebP format",
      saveButton: "Click Here: Save & Publish",
      savingButton: "Saving Changes...",
      toastSuccess: "Saved successfully! Changes are instantly reflected in the live preview.",
      realTimeTag: "Real-Time Sync",
      specialPricePrefix: "Special Price:",
      orderBtn: "Order Now",
      syncNote: "⚡ Changes sync live in 0.3s without browser reload.",
    },
    process: {
      title: "4 Simple Steps to Your New Website",
      subtitle:
        "From a casual WhatsApp conversation to your official website launch — everything is transparent, structured, and guaranteed.",
      steps: [
        {
          stepNumber: "1",
          title: "Consultation & Package Selection",
          desc: "Share your business goals via WhatsApp. We will recommend the optimal structure and package.",
          tag: "Initial Consultation",
        },
        {
          stepNumber: "2",
          title: "Agreement & 50% Deposit",
          desc: "Initial 50% deposit to commence development. Domain and hosting are immediately secured in your name.",
          tag: "Domain & Hosting Secured",
        },
        {
          stepNumber: "3",
          title: "Development & Draft Review",
          desc: "We construct your custom website (3-8 days). We deliver a private staging link for your review and revisions.",
          tag: "Private Preview Link",
        },
        {
          stepNumber: "4",
          title: "Final Payment & Handover",
          desc: "Upon final 50% payment, your website goes live officially. We hand over full admin dashboard access + 7-day bug warranty.",
          tag: "7-Day Active Warranty",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle:
        "Comprehensive answers regarding payment structures, revision policies, domain ownership, and technical warranties.",
      items: [
        {
          question: "How does the payment structure work?",
          answer:
            "A 50% upfront deposit is required to begin development, with the remaining 50% balance due after you have reviewed and approved your website for official launch.",
        },
        {
          question: "What is your revision policy?",
          answer:
            "Includes 1x major layout revision and up to 10 minor edits (text, imagery, colors) within 3 calendar days of receiving your initial draft.",
        },
        {
          question: "Will the domain and hosting belong 100% to me?",
          answer:
            "Yes, 100%. The domain name and cloud hosting are officially registered under your credentials with complete ownership and transfer rights.",
        },
        {
          question: "Why is a custom non-WordPress website better for my business?",
          answer:
            "Custom-built websites load substantially faster (PageSpeed 90+), do not suffer from plugin update crashes or malware vulnerabilities, and save you from expensive annual plugin subscriptions.",
        },
        {
          question: "Can I truly manage and edit the website without coding knowledge?",
          answer:
            "Absolutely! Our client admin dashboard is designed as intuitively as filling out a simple online form, accessible right from your browser without ever touching a line of code.",
        },
        {
          question: "Is there a post-launch warranty included?",
          answer:
            "Yes! Every website includes a comprehensive 7-calendar-day technical bug warranty after go-live to guarantee everything runs flawlessly.",
        },
      ],
      unansweredTitle: "Have more questions that aren't answered here?",
      unansweredSub: "Chat directly with our team on WhatsApp, quick response within 2 hours.",
      ctaWa: "Ask via WhatsApp",
    },
    inquiry: {
      title: "Ready to Own Your Website?",
      subtitle: "Fill in these 3 quick details, then click submit to connect directly via WhatsApp:",
      nameLabel: "Your Name",
      namePlaceholder: "e.g. Alex Johnson",
      businessLabel: "Business / Brand Name",
      businessPlaceholder: "e.g. Summit Studio",
      packageLabel: "Preferred Package",
      notesLabel: "Additional Notes (Optional)",
      notesPlaceholder: "e.g. I already have branding and need a portfolio showcase...",
      submitButton: "Submit & Chat on WhatsApp",
      guarantee: "Directly connects to our WhatsApp without unwanted email spam",
      packageOptions: [
        { value: "starter", label: "Starter Package — Landing Page (Promo Rp 999.000)" },
        { value: "bisnis", label: "Business Package — Company Profile (Promo Rp 1.999.000) - Best Value" },
        { value: "travel", label: "Custom Plus Package — Catalogs & Features (Promo Rp 2.800.000)" },
        { value: "custom", label: "Custom Scope / Free Consultation" },
      ],
      waMessagePrefix: "Hello gaweb! I would like to inquire about building a custom website:",
    },
    footer: {
      description:
        "Modern custom web development for landing pages and company profiles. Ultra-fast, secure, fully turnkey with domain + cloud hosting + self-serve admin dashboard.",
      navTitle: "Navigation",
      contactTitle: "Official Contact",
      waText: "Official WhatsApp",
      rights: "All rights reserved.",
      tagline: "100% Custom Code • High Performance",
      subtagline: "Free of Bloated Templates",
    },
  },
};
