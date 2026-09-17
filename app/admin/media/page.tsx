"use client";

import React from "react";
import { MediaTab } from "@/components/admin/tabs/MediaTab";
import { useAdmin } from "@/context/AdminContext";

export default function AdminMediaPage() {
  const {
    formData,
    handleUploadImage,
    handleDeleteMedia,
    handleSetHeroBg,
    isUploading,
  } = useAdmin();

  return (
    <MediaTab
      mediaLibrary={formData.mediaLibrary || []}
      onUploadImage={handleUploadImage}
      onDeleteMedia={handleDeleteMedia}
      onSetHeroBg={handleSetHeroBg}
      isUploading={isUploading}
    />
  );
}
