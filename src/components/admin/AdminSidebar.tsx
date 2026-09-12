"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Layers,
  HeartPulse,
  MessageSquare,
  Settings,
  ExternalLink,
  LogOut,
  X,
  Store,
  ShieldCheck,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useAdminData } from "@/context/AdminDataContext";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({ mobileOpen = false, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const { orders, messages } = useAdminData();

  const pendingOrdersCount = orders.filter((o) => o.status === "pending").length;
  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const navItems = [
    {
      label: "لوحة التحكم العامة",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "إدارة الأدوية والمنتجات",
      href: "/admin/products",
      icon: Package,
    },
    {
      label: "طلبات الأدوية والروشتات",
      href: "/admin/orders",
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
      badgeColor: "bg-amber-500",
    },
    {
      label: "العروض والخصومات",
      href: "/admin/offers",
      icon: Tag,
    },
    {
      label: "الأقسام والتصنيفات",
      href: "/admin/categories",
      icon: Layers,
    },
    {
      label: "الخدمات الطبية والصيدلانية",
      href: "/admin/services",
      icon: HeartPulse,
    },
    {
      label: "الرسائل والاستشارات",
      href: "/admin/messages",
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
      badgeColor: "bg-emerald-500",
    },
    {
      label: "إعدادات الصيدلية والحساب",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 border-l border-slate-800">
      {/* Header / Brand */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3.5 group"
          onClick={onCloseMobile}
        >
          <div className="relative w-12 h-12 rounded-xl bg-white p-1 shadow-md shadow-emerald-950/40 flex items-center justify-center overflow-hidden shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="شعار صيدليات الزيات"
              fill
              className="object-contain"
              sizes="48px"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-base font-sans tracking-wide">
                لوحة تحكم الإدارة
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">صيدليات الزيات – د. محمد شعبان</p>
          </div>
        </Link>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5 custom-scrollbar">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          القائمة الرئيسية
        </div>

        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-l from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-400"
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 text-xs font-bold rounded-full text-white ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-4 px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          روابط مباشرة
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm text-slate-400 hover:bg-slate-800/80 hover:text-emerald-300 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Store className="w-4 h-4 text-slate-400" />
            <span>عرض المتجر المباشر</span>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-500" />
        </Link>
      </div>

      {/* User Footer Card */}
      <div className="p-3.5 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-sm shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {user?.name || "د. محمد شعبان"}
              </p>
              <p className="text-[11px] text-emerald-400 truncate">
                {user?.role || "مدير الصيدلية"}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm("هل ترغب في تسجيل الخروج من لوحة التحكم؟")) {
                logout();
              }
            }}
            title="تسجيل الخروج"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 shrink-0 z-30 select-none">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] z-50 shadow-2xl animate-in slide-in-from-right duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
