"use client";

import React from "react";
import { PortfolioTab } from "@/components/admin/tabs/PortfolioTab";
import { useAdmin } from "@/context/AdminContext";

export default function AdminPortfoliosPage() {
  const {
    formData,
    handleOpenAddPortfolio,
    handleOpenEditPortfolio,
    handleDeletePortfolio,
    handleMovePortfolio,
    editorLang,
  } = useAdmin();

  return (
    <PortfolioTab
      portfolios={formData.portfolios || []}
      onOpenAddModal={handleOpenAddPortfolio}
      onOpenEditModal={handleOpenEditPortfolio}
      onDeletePortfolio={handleDeletePortfolio}
      onMovePortfolio={handleMovePortfolio}
      editorLang={editorLang}
    />
  );
}
