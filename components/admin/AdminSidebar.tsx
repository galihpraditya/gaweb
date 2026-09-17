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
  HardDrive,
  Globe,
  ArrowUpRight,
  LogOut,
  X,
  UserCheck,
  ChevronRight,
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

interface NavItem {
  id: AdminNavSection;
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

interface NavGroup {
  groupLabel: string;
  items: NavItem[];
}

export function AdminSidebar({
  isOpenMobile,
  onCloseMobile,
  onLogout,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { formData } = useAdmin();

  const navGroups: NavGroup[] = [
    {
      groupLabel: "DASHBOARD",
      items: [
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
      ],
    },
    {
      groupLabel: "KONTEN WEBSITE",
      items: [
        {
          id: "pricing",
          href: "/admin/pricing",
          label: "Paket Harga",
          icon: CreditCard,
          badge: formData?.pricing?.length || 0,
        },
        {
          id: "content",
          href: "/admin/content",
          label: "Hero & Kontak",
          icon: FileText,
        },
        {
          id: "faqs",
          href: "/admin/faqs",
          label: "Tanya Jawab (FAQ)",
          icon: HelpCircle,
          badge: formData?.faqs?.length || 0,
        },
      ],
    },
    {
      groupLabel: "SISTEM & DEPLOY",
      items: [
        {
          id: "backup",
          href: "/admin/backup",
          label: "Backup & Vercel",
          icon: HardDrive,
        },
      ],
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
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white sticky top-0 z-10">
            <Link
              href="/admin/overview"
              className="flex items-center gap-2.5 group transition-transform active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#092734] to-[#004F72] flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
                g
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-lg tracking-tight leading-tight select-none">
                  <span className="text-[#092734]">ga</span>
                  <span className="text-[#004F72]">web</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  Admin Console
                </span>
              </div>
            </Link>

            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
              aria-label="Tutup navigasi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Categorized Navigation Links */}
          <nav className="p-3.5 space-y-5 flex-1">
            {navGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 select-none">
                  {group.groupLabel}
                </div>

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = getIsActive(item.href);

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={onCloseMobile}
                        className={`group w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                          isActive
                            ? "bg-[#004F72] text-white shadow-xs font-bold"
                            : "text-slate-600 hover:bg-slate-100/90 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`w-4 h-4 transition-colors ${
                              isActive
                                ? "text-white"
                                : "text-slate-400 group-hover:text-slate-600"
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {typeof item.badge === "number" && item.badge > 0 && (
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          {isActive && (
                            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer: Profile & External Actions */}
        <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50/60 shrink-0">
          {/* Profile Card */}
          <div className="px-3 py-2 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#004F72]/10 text-[#004F72] flex items-center justify-center font-bold text-xs shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-[#092734] truncate">
                  Admin gaweb
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  Administrator
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Keluar dari akun admin"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Website View Link */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-white hover:text-[#004F72] border border-transparent hover:border-slate-200 transition-all group"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#004F72] group-hover:scale-110 transition-transform" />
              <span>Buka Live Website</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#004F72] transition-colors" />
          </Link>
        </div>
      </aside>
    </>
  );
}
