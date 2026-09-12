"use client";

import React from "react";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Tag,
  MessageSquare,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useAdminData } from "@/context/AdminDataContext";
import { OrderStatus } from "@/types/admin";

export default function AdminDashboardPage() {
  const { user } = useAdminAuth();
  const { products, orders, offers, messages, pharmacyInfo, updateOrderStatus } = useAdminData();

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const deliveringOrders = orders.filter((o) => o.status === "delivering");
  const completedOrders = orders.filter((o) => o.status === "completed");
  const unreadMessages = messages.filter((m) => !m.isRead);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">قيد الانتظار</span>;
      case "confirmed":
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">تم التأكيد</span>;
      case "preparing":
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">جاري التجهيز</span>;
      case "delivering":
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">خرج للتوصيل</span>;
      case "completed":
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">تم التسليم</span>;
      case "cancelled":
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">ملغي</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900/60 via-slate-900 to-slate-900 border border-emerald-500/30 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>لوحة الإدارة الشاملة لصيدليات الزيات</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              أهلاً بك، {user?.name || "د. محمد شعبان"} 👋
            </h1>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
              يمكنك من هنا متابعة كافة طلبات الأدوية والروشتات الواردة من عملاء صيدليات الزيات، إضافة وتعديل المنتجات والعروض، والتواصل المباشر مع العملاء عبر الواتساب.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة دواء جديد</span>
            </Link>
            <Link
              href="/admin/offers"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm transition-all"
            >
              <Tag className="w-4 h-4 text-emerald-400" />
              <span>إضافة عرض جديد</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Products KPI */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Package className="w-6 h-6" />
            </div>
            <Link
              href="/admin/products"
              className="p-1.5 text-slate-500 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs font-semibold text-slate-400">إجمالي الأدوية والمنتجات</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white">{products.length}</span>
            <span className="text-xs text-emerald-400 font-medium">منتج متاح</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>متاحة للطلب أونلاين</span>
            <span className="font-bold text-slate-300">100% محدثة</span>
          </div>
        </div>

        {/* Orders KPI */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <Link
              href="/admin/orders"
              className="p-1.5 text-slate-500 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs font-semibold text-slate-400">طلبات الأدوية والروشتات</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white">{orders.length}</span>
            {pendingOrders.length > 0 && (
              <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">
                {pendingOrders.length} قيد الانتظار
              </span>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>توصيل القيات والعدوة</span>
            <span className="font-bold text-slate-300">{deliveringOrders.length} جاري التوصيل</span>
          </div>
        </div>

        {/* Offers KPI */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-teal-500/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
              <Tag className="w-6 h-6" />
            </div>
            <Link
              href="/admin/offers"
              className="p-1.5 text-slate-500 hover:text-teal-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs font-semibold text-slate-400">العروض والخصومات النشطة</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white">{offers.length}</span>
            <span className="text-xs text-teal-400 font-medium">عرض فعال</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>خصومات حصرية</span>
            <span className="font-bold text-slate-300">سارية حتى نهاية الشهر</span>
          </div>
        </div>

        {/* Messages KPI */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <MessageSquare className="w-6 h-6" />
            </div>
            <Link
              href="/admin/messages"
              className="p-1.5 text-slate-500 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs font-semibold text-slate-400">الرسائل والاستشارات الطبية</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-white">{messages.length}</span>
            {unreadMessages.length > 0 && (
              <span className="text-xs text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-full">
                {unreadMessages.length} رسالة جديدة
              </span>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>رد واستشارة صيدلانية</span>
            <span className="font-bold text-emerald-400">متاحة فوراً</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Quick Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 Columns) */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <span>أحدث طلبات الأدوية والروشتات</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">متابعة فورية وتحديث حالة التسليم</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>عرض الكل ({orders.length})</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold text-xs">
                  <th className="pb-3 pr-2">رقم الطلب / العميل</th>
                  <th className="pb-3 px-2">الأصناف المطلوبة</th>
                  <th className="pb-3 px-2">الحالة</th>
                  <th className="pb-3 pl-2 text-left">إجراءات سريعة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 pr-2">
                      <div className="font-bold text-white">#{order.orderNumber}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <span>{order.customerName}</span>
                        <span className="text-slate-600">•</span>
                        <span>{order.customerPhone}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-2">
                      <div className="text-xs text-slate-300 font-medium max-w-xs truncate">
                        {order.items.map((i) => `${i.productName} (x${i.quantity})`).join("، ")}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate max-w-xs">
                        {order.customerAddress}
                      </div>
                    </td>

                    <td className="py-3.5 px-2 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>

                    <td className="py-3.5 pl-2 text-left whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* Status Quick Toggle */}
                        {order.status === "pending" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "confirmed")}
                            className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold transition-colors"
                          >
                            تأكيد الطلب
                          </button>
                        )}
                        {order.status === "confirmed" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "preparing")}
                            className="px-2.5 py-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 rounded-lg text-xs font-bold transition-colors"
                          >
                            تجهيز الدواء
                          </button>
                        )}
                        {order.status === "preparing" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "delivering")}
                            className="px-2.5 py-1 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-bold transition-colors"
                          >
                            إرسال مع المندوب
                          </button>
                        )}
                        {order.status === "delivering" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "completed")}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors"
                          >
                            تم التسليم ✓
                          </button>
                        )}

                        {/* Direct WhatsApp button with customer */}
                        <a
                          href={`https://wa.me/2${order.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `أهلاً بك ${order.customerName}، معك د. محمد شعبان من صيدليات الزيات بخصوص طلبك رقم ${order.orderNumber}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors"
                          title="مراسلة العميل عبر الواتساب"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Column: Recent Inquiries & Pharmacy Info Card */}
        <div className="space-y-6">
          {/* Pharmacy Live Status Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>بيانات تشغيل الصيدلية</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                <p className="text-slate-400 font-medium">الفرع والموقع</p>
                <p className="text-white font-bold mt-0.5">{pharmacyInfo.address.fullAddress}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
                <div>
                  <p className="text-slate-400 font-medium">هاتف الإدارة والتوصيل</p>
                  <p className="text-emerald-400 font-bold mt-0.5 dir-ltr text-right">{pharmacyInfo.phone}</p>
                </div>
                <a
                  href={`tel:${pharmacyInfo.phone}`}
                  className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                <p className="text-slate-400 font-medium">مواعيد العمل الرسمية</p>
                <p className="text-white font-bold mt-0.5">{pharmacyInfo.workingHours.hours}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <Link
                href="/admin/settings"
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>تعديل بيانات وإعدادات الصيدلية</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Latest Messages Quick Widget */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>أحدث الاستشارات والرسائل</span>
              </h3>
              <Link href="/admin/messages" className="text-xs font-bold text-cyan-400 hover:text-cyan-300">
                عرض الكل
              </Link>
            </div>

            <div className="space-y-2.5">
              {messages.slice(0, 3).map((msg) => (
                <div
                  key={msg.id}
                  className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/40 hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-white truncate">{msg.name}</p>
                    <span className="text-[10px] text-slate-500 font-sans">{msg.phone}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium mt-1 truncate">{msg.subject}</p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
