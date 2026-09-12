"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Search,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  Clock,
  ShoppingBag,
  MessageSquare,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useAdminData } from "@/context/AdminDataContext";

interface AdminHeaderProps {
  onToggleMobile: () => void;
}

export default function AdminHeader({ onToggleMobile }: AdminHeaderProps) {
  const { user } = useAdminAuth();
  const { orders, messages, pharmacyInfo } = useAdminData();
  const [showNotifications, setShowNotifications] = useState(false);

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const unreadMessages = messages.filter((m) => !m.isRead);
  const totalNotifications = pendingOrders.length + unreadMessages.length;

  const todayArabic = new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Right side: Mobile Menu + Pharmacy status */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          aria-label="فتح القائمة الجانبية"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400">النظام نشط ومباشر</span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">{todayArabic}</p>
        </div>
      </div>

      {/* Center: Search / Quick Info */}
      <div className="hidden md:flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 rounded-xl px-3.5 py-1.5 text-xs text-slate-400">
        <Clock className="w-3.5 h-3.5 text-emerald-400" />
        <span>مواعيد العمل: {pharmacyInfo.workingHours.hours}</span>
      </div>

      {/* Left side: Quick Actions & Notifications */}
      <div className="flex items-center gap-2.5">
        {/* WhatsApp Quick Launcher */}
        <a
          href={`https://wa.me/${pharmacyInfo.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-600/30 transition-colors"
          title="فتح واتساب الصيدلية"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>واتساب الصيدلية</span>
        </a>

        {/* Notifications Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            aria-label="الإشعارات والطلبات الجديدة"
          >
            <Bell className="w-5 h-5" />
            {totalNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-slate-900 animate-bounce">
                {totalNotifications}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white">التنبيهات والطلبات الجديدة</h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                    {totalNotifications} جديد
                  </span>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
                  {totalNotifications === 0 ? (
                    <div className="p-6 text-center text-slate-400">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-60" />
                      <p className="text-sm font-medium">لا توجد إشعارات جديدة حالياً</p>
                      <p className="text-xs text-slate-500 mt-1">جميع الطلبات والرسائل تمت مراجعتها</p>
                    </div>
                  ) : (
                    <>
                      {pendingOrders.map((ord) => (
                        <Link
                          key={ord.id}
                          href="/admin/orders"
                          onClick={() => setShowNotifications(false)}
                          className="p-3.5 flex items-start gap-3 hover:bg-slate-800/60 transition-colors block"
                        >
                          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                            <ShoppingBag className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-bold text-white truncate">
                                طلب جديد #{ord.orderNumber}
                              </p>
                              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                                قيد الانتظار
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 truncate mt-0.5">
                              العميل: {ord.customerName} ({ord.customerPhone})
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {ord.items.map((i) => i.productName).join("، ")}
                            </p>
                          </div>
                        </Link>
                      ))}

                      {unreadMessages.map((msg) => (
                        <Link
                          key={msg.id}
                          href="/admin/messages"
                          onClick={() => setShowNotifications(false)}
                          className="p-3.5 flex items-start gap-3 hover:bg-slate-800/60 transition-colors block"
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-bold text-white truncate">
                                استفسار: {msg.subject}
                              </p>
                              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                                جديد
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 truncate mt-0.5">
                              من: {msg.name} ({msg.phone})
                            </p>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                              {msg.message}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>

                <div className="p-2.5 bg-slate-800/40 border-t border-slate-700 text-center">
                  <Link
                    href="/admin/orders"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    عرض كل الطلبات والرسائل ←
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Live Site Link */}
        <Link
          href="/"
          target="_blank"
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          title="معاينة المتجر المباشر"
        >
          <ExternalLink className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}
