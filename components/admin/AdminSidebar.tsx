"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  ImageIcon,
  FileText,
  CreditCard,
  HelpCircle,
  Settings,
  Globe,
  ArrowUpRight,
  LogOut,
  X,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export type AdminNavSection =
  | "overview"
  | "portfolios"
  | "media"
  | "content"
  | "pricing"
  | "faqs"
  | "backup";

interface AdminSidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
}

export function AdminSidebar({
  isOpenMobile,
  onCloseMobile,
  onLogout,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { formData } = useAdmin();

  const navItems: {
    id: AdminNavSection;
    href: string;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }[] = [
    {
      id: "overview",
      href: "/admin/overview",
      label: "Ringkasan",
      icon: LayoutDashboard,
    },
    {
      id: "portfolios",
      href: "/admin/portfolios",
      label: "Portofolio",
      icon: FolderKanban,
      badge: formData?.portfolios?.length || 0,
    },
    {
      id: "media",
      href: "/admin/media",
      label: "Pustaka Media",
      icon: ImageIcon,
      badge: formData?.mediaLibrary?.length || 0,
    },
    {
      id: "content",
      href: "/admin/content",
      label: "Hero & Kontak",
      icon: FileText,
    },
    {
      id: "pricing",
      href: "/admin/pricing",
      label: "Paket Harga",
      icon: CreditCard,
      badge: formData?.pricing?.length || 0,
    },
    {
      id: "faqs",
      href: "/admin/faqs",
      label: "Tanya Jawab (FAQ)",
      icon: HelpCircle,
      badge: formData?.faqs?.length || 0,
    },
    {
      id: "backup",
      href: "/admin/backup",
      label: "Backup & Vercel",
      icon: Settings,
    },
  ];

  const getIsActive = (href: string) => {
    if (href === "/admin/overview") {
      return pathname === "/admin" || pathname === "/admin/overview";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Backdrop for Mobile */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
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
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 lg:hidden cursor-pointer"
              aria-label="Tutup navigasi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 flex-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu Pengelolaan
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = getIsActive(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#004F72] text-white shadow-sm font-bold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-white" : "text-slate-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {typeof item.badge === "number" && item.badge > 0 && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
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
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>
    </>
  );
}
