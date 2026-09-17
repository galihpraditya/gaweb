"use client";

import React from "react";
import { SeoBackupTab } from "@/components/admin/tabs/SeoBackupTab";
import { useAdmin } from "@/context/AdminContext";

export default function AdminBackupPage() {
  const {
    formData,
    storageInfo,
    handleDownloadBackup,
    handleImportBackup,
    handleResetToDefault,
  } = useAdmin();

  return (
    <SeoBackupTab
      formData={formData}
      storageInfo={storageInfo}
      onDownloadBackup={handleDownloadBackup}
      onImportBackup={handleImportBackup}
      onResetToDefault={handleResetToDefault}
    />
  );
}
