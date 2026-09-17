"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { OverviewTab } from "@/components/admin/tabs/OverviewTab";
import { useAdmin } from "@/context/AdminContext";

export default function AdminOverviewPage() {
  const router = useRouter();
  const { formData, handleOpenAddPortfolio, handleDownloadBackup } = useAdmin();

  return (
    <OverviewTab
      formData={formData}
      onNavigate={(section) => router.push(`/admin/${section}`)}
      onOpenAddPortfolio={handleOpenAddPortfolio}
      onDownloadBackup={handleDownloadBackup}
    />
  );
}
