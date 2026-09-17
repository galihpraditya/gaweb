"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SiteContentSchema } from "@/lib/types/content";
import defaultData from "@/data/site-content.json";

interface SiteContentContextType {
  content: SiteContentSchema;
  isLoading: boolean;
  isSaving: boolean;
  refreshContent: () => Promise<void>;
  updateContent: (newContent: SiteContentSchema) => Promise<{ success: boolean; message: string; persistedToRepoFile?: boolean }>;
  deleteMediaItem: (mediaId: string) => Promise<{ success: boolean; message: string }>;
  resetToDefault: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "gaweb_site_content_cache";

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContentSchema>(defaultData as SiteContentSchema);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Ambil cache lokal segera saat komponen mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.hero && parsed.portfolios) {
          setContent(parsed);
        }
      }
    } catch {
      // Abaikan error localStorage di SSR
    }
  }, []);

  const refreshContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/content", { cache: "no-store" });
      const json = await res.json();
      if (json.success && json.data) {
        setContent(json.data);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.data));
        } catch {
          // Ignore
        }
      }
    } catch (err) {
      console.error("Gagal sinkronisasi data konten:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  const updateContent = async (newContent: SiteContentSchema) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContent),
      });
      const result = await res.json();

      if (result.success && result.data) {
        setContent(result.data);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result.data));
        } catch {
          // Ignore
        }
        return {
          success: true,
          message: result.message || "Konten berhasil disimpan.",
          persistedToRepoFile: result.persistedToRepoFile,
        };
      } else {
        return {
          success: false,
          message: result.error || "Gagal menyimpan konten.",
        };
      }
    } catch (err) {
      return {
        success: false,
        message: "Terjadi gangguan jaringan saat menyimpan.",
      };
    } finally {
      setIsSaving(false);
    }
  };

  const deleteMediaItem = async (mediaId: string) => {
    const updatedMedia = (content.mediaLibrary || []).filter((m) => m.id !== mediaId);
    const updatedContent = {
      ...content,
      mediaLibrary: updatedMedia,
    };
    return updateContent(updatedContent);
  };

  const resetToDefault = async () => {
    await updateContent(defaultData as SiteContentSchema);
  };

  const value = {
    content,
    isLoading,
    isSaving,
    refreshContent,
    updateContent,
    deleteMediaItem,
    resetToDefault,
  };

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return context;
}
