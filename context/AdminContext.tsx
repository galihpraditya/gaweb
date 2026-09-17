"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { SiteContentSchema, PortfolioItem } from "@/lib/types/content";
import { useSiteContent } from "@/context/SiteContentContext";
import { compressImage } from "@/lib/image-compress";

interface AdminContextType {
  formData: SiteContentSchema;
  isDirty: boolean;
  isSaving: boolean;
  storageInfo: {
    isR2Configured: boolean;
    engine: "r2" | "local" | "ephemeral";
  } | null;
  editorLang: "id" | "en";
  setEditorLang: (lang: "id" | "en") => void;
  handleUpdateFormData: (updater: (prev: SiteContentSchema) => SiteContentSchema) => void;
  handleSaveChanges: () => Promise<void>;
  toastMessage: { type: "success" | "error" | "info"; text: string } | null;
  showToast: (text: string, type?: "success" | "error" | "info") => void;
  // Portfolio actions
  isPortfolioModalOpen: boolean;
  editingPortfolio: PortfolioItem | null;
  handleOpenAddPortfolio: () => void;
  handleOpenEditPortfolio: (item: PortfolioItem) => void;
  handleClosePortfolioModal: () => void;
  handleSavePortfolioModal: (item: PortfolioItem) => void;
  handleDeletePortfolio: (id: string) => void;
  handleMovePortfolio: (id: string, direction: "up" | "down") => void;
  // Media actions
  isUploading: boolean;
  handleUploadImage: (file: File, category: string) => Promise<void>;
  handleDeleteMedia: (id: string) => Promise<void>;
  handleSetHeroBg: (url: string) => void;
  // Backup actions
  handleDownloadBackup: () => void;
  handleImportBackup: (content: SiteContentSchema) => void;
  handleResetToDefault: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { content, updateContent, deleteMediaItem, resetToDefault, storageInfo } = useSiteContent();

  const [formData, setFormData] = useState<SiteContentSchema>(content);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editorLang, setEditorLang] = useState<"id" | "en">("id");
  const [toastMessage, setToastMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // Portfolio modal
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);

  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (content) {
      if (!hasInitializedRef.current || !isDirty) {
        setFormData(content);
        hasInitializedRef.current = true;
      }
    }
  }, [content, isDirty]);

  const showToast = useCallback(
    (text: string, type: "success" | "error" | "info" = "success") => {
      setToastMessage({ text, type });
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    },
    []
  );

  const handleUpdateFormData = useCallback(
    (updater: (prev: SiteContentSchema) => SiteContentSchema) => {
      setFormData((prev) => {
        const next = updater(prev);
        setIsDirty(true);
        return next;
      });
    },
    []
  );

  const handleSaveChanges = useCallback(async () => {
    setIsSaving(true);
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
      setIsSaving(false);
    }
  }, [formData, updateContent, showToast]);

  // Keyboard shortcut Ctrl+S
  const handleSaveRef = useRef(handleSaveChanges);
  useEffect(() => {
    handleSaveRef.current = handleSaveChanges;
  }, [handleSaveChanges]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSaveRef.current();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Portfolio handlers
  const handleOpenAddPortfolio = () => {
    setEditingPortfolio(null);
    setIsPortfolioModalOpen(true);
  };

  const handleOpenEditPortfolio = (item: PortfolioItem) => {
    setEditingPortfolio(item);
    setIsPortfolioModalOpen(true);
  };

  const handleClosePortfolioModal = () => {
    setIsPortfolioModalOpen(false);
  };

  const handleSavePortfolioModal = (item: PortfolioItem) => {
    handleUpdateFormData((prev) => {
      let updatedList: PortfolioItem[];
      if (editingPortfolio) {
        updatedList = (prev.portfolios || []).map((p) =>
          p.id === editingPortfolio.id ? item : p
        );
      } else {
        updatedList = [item, ...(prev.portfolios || [])];
      }
      return { ...prev, portfolios: updatedList };
    });
    setIsPortfolioModalOpen(false);
    showToast("Portofolio diperbarui. Klik 'Simpan' untuk menerapkan.");
  };

  const handleDeletePortfolio = (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus proyek portofolio ini?")) return;
    handleUpdateFormData((prev) => ({
      ...prev,
      portfolios: (prev.portfolios || []).filter((p) => p.id !== id),
    }));
    showToast("Proyek portofolio dihapus.");
  };

  const handleMovePortfolio = (id: string, direction: "up" | "down") => {
    handleUpdateFormData((prev) => {
      const list = [...(prev.portfolios || [])];
      const index = list.findIndex((p) => p.id === id);
      if (index === -1) return prev;

      const targetIdx = direction === "up" ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= list.length) return prev;

      const temp = list[index];
      list[index] = list[targetIdx];
      list[targetIdx] = temp;

      // Update order field sequentially
      const updatedOrderList = list.map((item, idx) => ({
        ...item,
        order: idx + 1,
      }));

      return { ...prev, portfolios: updatedOrderList };
    });
  };

  // Media handlers
  const handleUploadImage = async (file: File, category: string) => {
    setIsUploading(true);

    try {
      const processedFile = await compressImage(file);
      const bodyData = new FormData();
      bodyData.append("file", processedFile);
      bodyData.append("name", processedFile.name);
      bodyData.append("category", category);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: bodyData,
      });

      if (res.status === 413) {
        showToast("Ukuran gambar terlalu besar untuk serverless Vercel (Maksimal 4.5MB).", "error");
        return;
      }

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        showToast("Server mengembalikan respon tidak valid saat mengunggah.", "error");
        return;
      }

      if (res.ok && data?.success && data?.item) {
        showToast("Gambar berhasil diunggah ke pustaka media!");
        handleUpdateFormData((prev) => ({
          ...prev,
          mediaLibrary: [data.item, ...(prev.mediaLibrary || [])],
        }));
      } else {
        showToast(data?.error || "Gagal mengunggah gambar.", "error");
      }
    } catch (err) {
      console.error("Upload error:", err);
      showToast("Terjadi gangguan saat mengunggah gambar.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (!confirm("Hapus aset gambar ini dari pustaka media?")) return;
    handleUpdateFormData((prev) => ({
      ...prev,
      mediaLibrary: (prev.mediaLibrary || []).filter((m) => m.id !== mediaId),
    }));
    try {
      await deleteMediaItem(mediaId);
      showToast("Aset gambar dihapus dari pustaka.");
    } catch {
      showToast("Aset dihapus dari daftar lokal.");
    }
  };

  const handleSetHeroBg = (url: string) => {
    handleUpdateFormData((prev) => ({
      ...prev,
      hero: { ...prev.hero, bgImageUrl: url },
    }));
    showToast("Diset sebagai Background Hero. Klik 'Simpan' untuk menerapkan.");
  };

  // Backup handlers
  const handleDownloadBackup = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "site-content.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("File backup site-content.json berhasil diunduh!");
  };

  const handleImportBackup = (imported: SiteContentSchema) => {
    handleUpdateFormData(() => imported);
    showToast("Data backup berhasil dimuat! Klik 'Simpan' untuk menerapkan.");
  };

  const handleResetToDefault = async () => {
    await resetToDefault();
    setIsDirty(false);
    showToast("Konten berhasil di-reset ke template bawaan.");
  };

  return (
    <AdminContext.Provider
      value={{
        formData,
        isDirty,
        isSaving,
        storageInfo,
        editorLang,
        setEditorLang,
        handleUpdateFormData,
        handleSaveChanges,
        toastMessage,
        showToast,
        isPortfolioModalOpen,
        editingPortfolio,
        handleOpenAddPortfolio,
        handleOpenEditPortfolio,
        handleClosePortfolioModal,
        handleSavePortfolioModal,
        handleDeletePortfolio,
        handleMovePortfolio,
        isUploading,
        handleUploadImage,
        handleDeleteMedia,
        handleSetHeroBg,
        handleDownloadBackup,
        handleImportBackup,
        handleResetToDefault,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
