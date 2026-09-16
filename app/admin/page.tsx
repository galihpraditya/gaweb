"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { useSiteContent } from "@/context/SiteContentContext";
import { SiteContentSchema, PortfolioItem } from "@/lib/types/content";
import {
  FolderKanban,
  Image as ImageIcon,
  FileText,
  CreditCard,
  HelpCircle,
  Settings,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Upload,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  LogOut,
  Globe,
  ArrowUpRight,
  UploadCloud,
  FileDown,
  Menu,
  X,
  Layers,
  ChevronRight,
  Sparkles,
} from "lucide-react";

type NavSection = "portfolios" | "content" | "media" | "pricing" | "faqs" | "backup";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeSection, setActiveSection] = useState<NavSection>("portfolios");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { content, updateContent, resetToDefault } = useSiteContent();

  // Local working copy of content to allow editing before saving
  const [formData, setFormData] = useState<SiteContentSchema>(content);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [isSavingLocal, setIsSavingLocal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Portfolio Modal State
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [portfolioForm, setPortfolioForm] = useState<PortfolioItem>({
    id: "",
    title: "",
    category: "landing-page",
    categoryLabel: { id: "Landing Page", en: "Landing Page" },
    clientName: "",
    description: { id: "", en: "" },
    imageUrl: "",
    demoUrl: "",
    tags: [],
    metrics: { pageSpeed: "99/100", loadTime: "0.6s", highlight: "Konversi Tinggi" },
    featured: true,
    order: 1,
  });

  // Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [mediaFilter, setMediaFilter] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonUploadRef = useRef<HTMLInputElement>(null);

  // Sync formData with content from context
  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  // Track dirty state
  const handleUpdateFormData = (updater: (prev: SiteContentSchema) => SiteContentSchema) => {
    setFormData((prev) => {
      const next = updater(prev);
      setIsDirty(true);
      return next;
    });
  };

  // Keyboard shortcut Ctrl+S / Cmd+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSaveChanges();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Check auth session
  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
    } catch {
      // Ignore
    }
  };

  const showToast = (text: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Save changes to API & Context
  const handleSaveChanges = async () => {
    setIsSavingLocal(true);
    try {
      const result = await updateContent(formData);
      if (result.success) {
        setIsDirty(false);
        showToast(result.message || "Perubahan berhasil disimpan!");
      } else {
        showToast(result.message || "Gagal menyimpan perubahan.", "error");
      }
    } catch {
      showToast("Terjadi gangguan saat menyimpan ke server.", "error");
    } finally {
      setIsSavingLocal(false);
    }
  };

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast("Path URL gambar berhasil disalin!");
  };

  // Upload Image Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const bodyData = new FormData();
    bodyData.append("file", file);
    bodyData.append("name", file.name);
    bodyData.append("category", "uploads");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: bodyData,
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showToast("Gambar berhasil diunggah!");
        if (data.item) {
          handleUpdateFormData((prev) => ({
            ...prev,
            mediaLibrary: [data.item, ...(prev.mediaLibrary || [])],
          }));
        }
      } else {
        showToast(data.error || "Gagal mengunggah gambar.", "error");
      }
    } catch {
      showToast("Gangguan saat upload gambar.", "error");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Portfolio Management
  const handleOpenAddPortfolio = () => {
    setEditingPortfolio(null);
    setPortfolioForm({
      id: `project-${Date.now()}`,
      title: "",
      category: "landing-page",
      categoryLabel: { id: "Landing Page", en: "Landing Page" },
      clientName: "",
      description: { id: "", en: "" },
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=520&fit=crop&q=80",
      demoUrl: "https://gaweb.website/#demo",
      tags: ["Next.js", "Tailwind CSS", "SEO Ready"],
      metrics: { pageSpeed: "99/100", loadTime: "0.6s", highlight: "Konversi Tinggi" },
      featured: true,
      order: (formData.portfolios?.length || 0) + 1,
    });
    setIsPortfolioModalOpen(true);
  };

  const handleOpenEditPortfolio = (item: PortfolioItem) => {
    setEditingPortfolio(item);
    setPortfolioForm({ ...item });
    setIsPortfolioModalOpen(true);
  };

  const handleDeletePortfolio = (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus proyek portofolio ini?")) return;
    handleUpdateFormData((prev) => ({
      ...prev,
      portfolios: prev.portfolios.filter((p) => p.id !== id),
    }));
    showToast("Proyek dihapus. Klik 'Simpan Perubahan' untuk menerapkan.");
  };

  const handleSavePortfolioModal = () => {
    if (!portfolioForm.title.trim()) {
      alert("Nama proyek harus diisi.");
      return;
    }

    handleUpdateFormData((prev) => {
      let updatedList: PortfolioItem[];
      if (editingPortfolio) {
        updatedList = prev.portfolios.map((p) => (p.id === editingPortfolio.id ? portfolioForm : p));
      } else {
        updatedList = [portfolioForm, ...(prev.portfolios || [])];
      }
      return { ...prev, portfolios: updatedList };
    });

    setIsPortfolioModalOpen(false);
    showToast("Portofolio diperbarui. Klik 'Simpan Perubahan' untuk menerapkan.");
  };

  // Backup & JSON export
  const handleDownloadBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `gaweb-site-content-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("File backup JSON berhasil didownload!");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as SiteContentSchema;
        if (parsed.hero && parsed.portfolios) {
          handleUpdateFormData(() => parsed);
          showToast("Data backup berhasil dimuat! Klik 'Simpan Perubahan' untuk menerapkan.");
        } else {
          showToast("Format file JSON tidak valid.", "error");
        }
      } catch {
        showToast("Gagal membaca file JSON.", "error");
      }
    };
    reader.readAsText(file);
  };

  // Filtered Media
  const filteredMedia =
    mediaFilter === "all"
      ? formData.mediaLibrary || []
      : (formData.mediaLibrary || []).filter((m) => m.category === mediaFilter);

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#004F72] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-500">Memeriksa sesi login...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <AdminLoginForm onLoginSuccess={checkAuth} />;
  }

  // Navigation Items Definition
  const navItems: { id: NavSection; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "portfolios", label: "Portofolio", icon: FolderKanban, badge: formData.portfolios?.length },
    { id: "media", label: "Pustaka Gambar", icon: ImageIcon, badge: formData.mediaLibrary?.length },
    { id: "content", label: "Hero & Kontak", icon: FileText },
    { id: "pricing", label: "Paket Harga", icon: CreditCard, badge: formData.pricing?.length },
    { id: "faqs", label: "Tanya Jawab (FAQ)", icon: HelpCircle, badge: formData.faqs?.length },
    { id: "backup", label: "Backup & Vercel", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-xl border flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-bottom-5 duration-200 ${
            toastMessage.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : toastMessage.type === "info"
              ? "bg-sky-50 border-sky-200 text-sky-800"
              : "bg-emerald-50 border-emerald-200 text-emerald-900"
          }`}
        >
          {toastMessage.type === "error" ? (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Backdrop for Mobile Drawer */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* ========================================================================= */}
      {/* 1. SIDEBAR NAVIGATION (Desktop Persistent + Mobile Drawer) */}
      {/* ========================================================================= */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-extrabold text-2xl tracking-tight leading-none select-none">
                <span className="text-[#092734]">ga</span>
                <span className="text-[#004F72]">web</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#004F72]/10 text-[#004F72]">
                Admin
              </span>
            </Link>

            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links Group */}
          <nav className="p-4 space-y-1.5 flex-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu Pengelolaan
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#004F72] text-white shadow-sm font-bold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span>{item.label}</span>
                  </div>

                  {typeof item.badge === "number" && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-white hover:text-[#004F72] border border-transparent hover:border-slate-200 transition-all"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#004F72]" />
              <span>Lihat Website</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA (Offset by sidebar on desktop) */}
      {/* ========================================================================= */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Sticky App Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-[#092734] capitalize">
                {activeSection === "portfolios" && "Kelola Portofolio Website"}
                {activeSection === "media" && "Pustaka Media & Gambar"}
                {activeSection === "content" && "Konten Hero & Kontak"}
                {activeSection === "pricing" && "Pengaturan Paket Harga"}
                {activeSection === "faqs" && "Daftar Tanya Jawab (FAQ)"}
                {activeSection === "backup" && "Backup & Sinkronisasi Vercel"}
              </h1>
            </div>
          </div>

          {/* Action Zone: Save Indicator & Button */}
          <div className="flex items-center gap-3">
            {/* Dirty Indicator */}
            {isDirty && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Perubahan belum disimpan</span>
              </span>
            )}

            <button
              onClick={handleSaveChanges}
              disabled={isSavingLocal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#004F72] hover:bg-[#003d59] shadow-sm transition-all disabled:opacity-60 cursor-pointer"
            >
              {isSavingLocal ? (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </header>

        {/* Content View Canvas */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-6 flex-1">
          {/* ========================================================================= */}
          {/* SECTION: PORTOFOLIO */}
          {/* ========================================================================= */}
          {activeSection === "portfolios" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <div>
                  <h2 className="text-base font-bold text-[#092734]">Showcase Proyek Website</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Portofolio yang tampil di halaman depan untuk meyakinkan calon klien.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddPortfolio}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Proyek Baru</span>
                </button>
              </div>

              {/* Grid of Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {formData.portfolios?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full bg-slate-100">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold text-base text-[#092734] leading-snug">{item.title}</h3>
                        <p className="text-xs text-slate-500 font-medium">{item.clientName}</p>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                          {item.description?.id}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags?.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        {item.demoUrl ? (
                          <a
                            href={item.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#004F72] font-semibold hover:underline"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Link Demo</span>
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400">Tanpa link demo</span>
                        )}

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditPortfolio(item)}
                            className="p-2 rounded-lg text-slate-600 hover:text-[#004F72] hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Edit proyek"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePortfolio(item.id)}
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Hapus proyek"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION: MEDIA GALLERY */}
          {/* ========================================================================= */}
          {activeSection === "media" && (
            <div className="space-y-5">
              {/* Upload Dropzone Card */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div>
                  <h2 className="text-base font-bold text-[#092734]">Unggah Gambar Baru</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Gambar dapat digunakan untuk foto hero, mockup portofolio, maupun aset logo.
                  </p>
                </div>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-[#004F72] rounded-2xl p-8 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-slate-50"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="max-w-xs mx-auto space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#004F72] flex items-center justify-center mx-auto shadow-2xs">
                      {isUploading ? (
                        <span className="w-5 h-5 border-2 border-[#004F72] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <UploadCloud className="w-6 h-6" />
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-700">
                      {isUploading ? "Sedang mengunggah..." : "Pilih file gambar dari komputer"}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Format PNG, JPG, WebP, SVG (Maksimal 2 MB disarankan)
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-sm font-bold text-slate-800">
                    Aset Terdaftar ({filteredMedia.length})
                  </h3>

                  {/* Filter Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {["all", "hero", "showcase", "uploads"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setMediaFilter(cat)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                          mediaFilter === cat
                            ? "bg-[#004F72] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {cat === "all" ? "Semua" : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMedia.map((media) => (
                    <div
                      key={media.id}
                      className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between"
                    >
                      <div className="relative aspect-video w-full bg-slate-200">
                        <Image
                          src={media.url}
                          alt={media.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <div className="p-2.5 space-y-2">
                        <p className="text-[11px] font-bold text-slate-700 truncate" title={media.name}>
                          {media.name}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopy(media.url, media.id)}
                            className="flex-1 py-1 px-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                            title="Salin path URL gambar"
                          >
                            {copiedId === media.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600">Tersalin</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Salin URL</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              handleUpdateFormData((prev) => ({
                                ...prev,
                                hero: { ...prev.hero, bgImageUrl: media.url },
                              }));
                              showToast("Diset sebagai Hero BG. Klik Simpan Perubahan.");
                            }}
                            className="py-1 px-2 rounded-lg bg-[#004F72]/10 hover:bg-[#004F72]/20 text-[#004F72] text-[10px] font-bold cursor-pointer transition-colors"
                            title="Gunakan sebagai background hero"
                          >
                            Set Hero
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION: HERO & KONTAK */}
          {/* ========================================================================= */}
          {activeSection === "content" && (
            <div className="space-y-5">
              {/* Hero Settings */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
                <div>
                  <h2 className="text-base font-bold text-[#092734]">Header Utama (Hero Section)</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ubah judul, subjudul, dan background yang pertama kali dilihat pengunjung.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Teks Awalan H1</label>
                    <input
                      type="text"
                      value={formData.hero?.h1Pre?.id || ""}
                      onChange={(e) =>
                        handleUpdateFormData((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, h1Pre: { ...prev.hero.h1Pre, id: e.target.value } },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#004F72]">Teks Sorotan (Warna Biru)</label>
                    <input
                      type="text"
                      value={formData.hero?.h1Highlight?.id || ""}
                      onChange={(e) =>
                        handleUpdateFormData((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, h1Highlight: { ...prev.hero.h1Highlight, id: e.target.value } },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-[#004F72] focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Teks Akhiran H1</label>
                    <input
                      type="text"
                      value={formData.hero?.h1Post?.id || ""}
                      onChange={(e) =>
                        handleUpdateFormData((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, h1Post: { ...prev.hero.h1Post, id: e.target.value } },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Subjudul Deskripsi</label>
                  <textarea
                    rows={3}
                    value={formData.hero?.subtitle?.id || ""}
                    onChange={(e) =>
                      handleUpdateFormData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, subtitle: { ...prev.hero.subtitle, id: e.target.value } },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">URL Background Hero</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={formData.hero?.bgImageUrl || ""}
                      onChange={(e) =>
                        handleUpdateFormData((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, bgImageUrl: e.target.value },
                        }))
                      }
                      placeholder="/images/hero/... atau https://..."
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
                    />
                    {formData.hero?.bgImageUrl && (
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                        <Image
                          src={formData.hero.bgImageUrl}
                          alt="Hero preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
                <div>
                  <h2 className="text-base font-bold text-[#092734]">Kontak & Integrasi WhatsApp</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Nomor tujuan konsultasi dan pemesanan website.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Nomor WhatsApp Resmi</label>
                    <input
                      type="text"
                      value={formData.contact?.whatsappNumber || ""}
                      onChange={(e) =>
                        handleUpdateFormData((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, whatsappNumber: e.target.value },
                        }))
                      }
                      placeholder="62881036657944"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Bisnis</label>
                    <input
                      type="email"
                      value={formData.contact?.email || ""}
                      onChange={(e) =>
                        handleUpdateFormData((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, email: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Username Instagram</label>
                    <input
                      type="text"
                      value={formData.contact?.instagram || ""}
                      onChange={(e) =>
                        handleUpdateFormData((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, instagram: e.target.value },
                        }))
                      }
                      placeholder="@gaweb.website"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Kota / Alamat Usaha</label>
                    <input
                      type="text"
                      value={formData.contact?.location || ""}
                      onChange={(e) =>
                        handleUpdateFormData((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, location: e.target.value },
                        }))
                      }
                      placeholder="Malang, Jawa Timur, Indonesia"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#004F72]/20 focus:border-[#004F72] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION: PAKET HARGA */}
          {/* ========================================================================= */}
          {activeSection === "pricing" && (
            <div className="space-y-5">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <h2 className="text-base font-bold text-[#092734]">Paket Layanan & Harga</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Atur harga promo, harga coret, estimasi hari pengerjaan, dan checklist fitur.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {formData.pricing?.map((plan, idx) => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {plan.badge || `Paket ${idx + 1}`}
                        </span>
                        {plan.isPopular && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                            Rekomendasi
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500">Nama Paket</label>
                        <input
                          type="text"
                          value={plan.name}
                          onChange={(e) => {
                            const updated = [...formData.pricing];
                            updated[idx].name = e.target.value;
                            handleUpdateFormData((prev) => ({ ...prev, pricing: updated }));
                          }}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#092734] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500">Harga Promo</label>
                          <input
                            type="text"
                            value={plan.priceDisplay}
                            onChange={(e) => {
                              const updated = [...formData.pricing];
                              updated[idx].priceDisplay = e.target.value;
                              handleUpdateFormData((prev) => ({ ...prev, pricing: updated }));
                            }}
                            className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-[#004F72] outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500">Harga Coret</label>
                          <input
                            type="text"
                            value={plan.originalPrice}
                            onChange={(e) => {
                              const updated = [...formData.pricing];
                              updated[idx].originalPrice = e.target.value;
                              handleUpdateFormData((prev) => ({ ...prev, pricing: updated }));
                            }}
                            className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-400 line-through outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500">Estimasi Timeline</label>
                        <input
                          type="text"
                          value={plan.timeline}
                          onChange={(e) => {
                            const updated = [...formData.pricing];
                            updated[idx].timeline = e.target.value;
                            handleUpdateFormData((prev) => ({ ...prev, pricing: updated }));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500">Checklist Fitur (1 baris per fitur)</label>
                        <textarea
                          rows={6}
                          value={plan.features?.join("\n") || ""}
                          onChange={(e) => {
                            const updated = [...formData.pricing];
                            updated[idx].features = e.target.value.split("\n").filter(Boolean);
                            handleUpdateFormData((prev) => ({ ...prev, pricing: updated }));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-[11px] font-mono leading-relaxed outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION: FAQ */}
          {/* ========================================================================= */}
          {activeSection === "faqs" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <div>
                  <h2 className="text-base font-bold text-[#092734]">Tanya Jawab (FAQ)</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kelola pertanyaan yang sering ditanyakan oleh calon pelanggan.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newFaq = {
                      id: `faq-${Date.now()}`,
                      question: { id: "Pertanyaan baru...", en: "New question..." },
                      answer: { id: "Jawaban penjelasan...", en: "New answer..." },
                    };
                    handleUpdateFormData((prev) => ({ ...prev, faqs: [...(prev.faqs || []), newFaq] }));
                    showToast("FAQ baru ditambahkan.");
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#004F72] hover:bg-[#003d59] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pertanyaan</span>
                </button>
              </div>

              <div className="space-y-3.5">
                {formData.faqs?.map((faq, idx) => (
                  <div key={faq.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-slate-400">Pertanyaan #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = formData.faqs.filter((_, i) => i !== idx);
                          handleUpdateFormData((prev) => ({ ...prev, faqs: updated }));
                          showToast("FAQ dihapus.");
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                        title="Hapus FAQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Pertanyaan</label>
                      <input
                        type="text"
                        value={faq.question?.id || ""}
                        onChange={(e) => {
                          const updated = [...formData.faqs];
                          updated[idx].question = { ...updated[idx].question, id: e.target.value };
                          handleUpdateFormData((prev) => ({ ...prev, faqs: updated }));
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Jawaban</label>
                      <textarea
                        rows={3}
                        value={faq.answer?.id || ""}
                        onChange={(e) => {
                          const updated = [...formData.faqs];
                          updated[idx].answer = { ...updated[idx].answer, id: e.target.value };
                          handleUpdateFormData((prev) => ({ ...prev, faqs: updated }));
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION: BACKUP & VERCEL */}
          {/* ========================================================================= */}
          {activeSection === "backup" && (
            <div className="space-y-5">
              {/* Vercel Guide */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#004F72]/10 text-[#004F72]">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#092734]">
                      Sinkronisasi Deployment Vercel & GitHub
                    </h2>
                    <p className="text-xs text-slate-500">
                      Simpan perubahan data konten secara permanen ke repositori Git Anda.
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Karena hosting Vercel bersifat <em>serverless read-only</em>, perubahan data yang Anda simpan di panel admin ini langsung aktif di sesi live browser Anda. Agar perubahan konten menjadi <strong>permanen selamanya</strong> pada server Vercel:
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-700">Langkah Simpan Permanen:</div>
                  <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1">
                    <li>Klik tombol <strong>Download File site-content.json</strong> di bawah.</li>
                    <li>Pindahkan file tersebut ke dalam folder project Anda: <code className="bg-slate-200 px-1 py-0.5 rounded text-[#092734] font-mono">data/site-content.json</code>.</li>
                    <li>Lakukan <strong>git commit &amp; git push</strong> ke repository GitHub Anda.</li>
                  </ol>
                </div>

                <button
                  onClick={handleDownloadBackup}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#004F72] hover:bg-[#003d59] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download File data/site-content.json</span>
                </button>
              </div>

              {/* Restore JSON Backup */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-800">Restore Data dari File Backup</h3>
                <p className="text-xs text-slate-500">
                  Unggah file backup JSON untuk mengembalikan seluruh konten website.
                </p>

                <input
                  ref={jsonUploadRef}
                  type="file"
                  accept=".json"
                  onChange={handleImportJson}
                  className="hidden"
                />

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => jsonUploadRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Pilih File Backup JSON</span>
                  </button>

                  <button
                    onClick={async () => {
                      if (confirm("Kembalikan seluruh konten ke data template awal?")) {
                        await resetToDefault();
                        showToast("Konten berhasil di-reset ke template bawaan.");
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset ke Template Bawaan</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. MODAL TAMBAH / EDIT PORTOFOLIO */}
      {/* ========================================================================= */}
      {isPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5 my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#092734]">
                {editingPortfolio ? "Edit Proyek Portofolio" : "Tambah Proyek Baru"}
              </h3>
              <button
                onClick={() => setIsPortfolioModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nama Proyek *</label>
                <input
                  type="text"
                  value={portfolioForm.title}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                  placeholder="Contoh: Bromo Highland Adventure"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-[#004F72]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Kategori</label>
                  <select
                    value={portfolioForm.category}
                    onChange={(e) => {
                      const cat = e.target.value as "landing-page" | "company-profile" | "travel" | "umkm";
                      const labels: Record<string, { id: string; en: string }> = {
                        "landing-page": { id: "Landing Page", en: "Landing Page" },
                        "company-profile": { id: "Company Profile", en: "Company Profile" },
                        travel: { id: "Tour & Wisata", en: "Tour & Travel" },
                        umkm: { id: "UMKM / Kuliner", en: "F&B / Business" },
                      };
                      setPortfolioForm({
                        ...portfolioForm,
                        category: cat,
                        categoryLabel: labels[cat] || { id: "Custom", en: "Custom" },
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none bg-white"
                  >
                    <option value="landing-page">Landing Page</option>
                    <option value="company-profile">Company Profile</option>
                    <option value="travel">Tour & Wisata</option>
                    <option value="umkm">UMKM / Kuliner</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nama Klien / Brand</label>
                  <input
                    type="text"
                    value={portfolioForm.clientName}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, clientName: e.target.value })}
                    placeholder="Contoh: PT Bromo Nusantara"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">URL Gambar Mockup Preview *</label>
                <input
                  type="text"
                  value={portfolioForm.imageUrl}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, imageUrl: e.target.value })}
                  placeholder="/images/... atau https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                />
                {portfolioForm.imageUrl && (
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 mt-2 bg-slate-100">
                    <Image src={portfolioForm.imageUrl} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Link Live Demo Website (Opsional)</label>
                <input
                  type="text"
                  value={portfolioForm.demoUrl || ""}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, demoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={portfolioForm.description?.id || ""}
                  onChange={(e) =>
                    setPortfolioForm({
                      ...portfolioForm,
                      description: { ...portfolioForm.description, id: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Fitur Kunci / Tags (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={portfolioForm.tags?.join(", ") || ""}
                  onChange={(e) =>
                    setPortfolioForm({
                      ...portfolioForm,
                      tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Next.js, Tailwind CSS, WhatsApp Checkout"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsPortfolioModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSavePortfolioModal}
                className="px-5 py-2 rounded-xl bg-[#004F72] hover:bg-[#003d59] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Simpan Proyek
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
