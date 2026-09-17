"use client";

import React from "react";
import { PricingTab } from "@/components/admin/tabs/PricingTab";
import { useAdmin } from "@/context/AdminContext";

export default function AdminPricingPage() {
  const { formData, handleUpdateFormData, editorLang, setEditorLang } = useAdmin();

  return (
    <PricingTab
      pricing={formData.pricing || []}
      editorLang={editorLang}
      onSetEditorLang={setEditorLang}
      onUpdatePricing={(plans) =>
        handleUpdateFormData((prev) => ({ ...prev, pricing: plans }))
      }
    />
  );
}
