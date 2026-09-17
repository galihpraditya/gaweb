"use client";

import React from "react";
import { HeroContactTab } from "@/components/admin/tabs/HeroContactTab";
import { useAdmin } from "@/context/AdminContext";

export default function AdminContentPage() {
  const { formData, handleUpdateFormData, editorLang } = useAdmin();

  return (
    <HeroContactTab
      hero={formData.hero}
      contact={formData.contact}
      mediaLibrary={formData.mediaLibrary || []}
      onUpdateHero={(updater) =>
        handleUpdateFormData((prev) => ({ ...prev, hero: updater(prev.hero) }))
      }
      onUpdateContact={(updater) =>
        handleUpdateFormData((prev) => ({
          ...prev,
          contact: updater(prev.contact),
        }))
      }
      editorLang={editorLang}
    />
  );
}
