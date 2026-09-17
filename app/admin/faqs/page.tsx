"use client";

import React from "react";
import { FaqTab } from "@/components/admin/tabs/FaqTab";
import { useAdmin } from "@/context/AdminContext";

export default function AdminFaqsPage() {
  const { formData, handleUpdateFormData, editorLang } = useAdmin();

  return (
    <FaqTab
      faqs={formData.faqs || []}
      onUpdateFaqs={(faqs) =>
        handleUpdateFormData((prev) => ({ ...prev, faqs }))
      }
      editorLang={editorLang}
    />
  );
}
