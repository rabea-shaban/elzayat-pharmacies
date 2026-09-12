"use client";

import React, { useState, useMemo } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  Phone,
  MessageCircle,
  AlertCircle,
  FileText,
  ChevronLeft,
  X,
  Plus,
  Trash2,
  MapPin,
  Calendar,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { Order, OrderStatus } from "@/types/admin";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, deleteOrder, addOrder } = useAdminData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Order Form State
  const [newOrderData, setNewOrderData] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    itemsText: "",
    notes: "",
    totalAmount: 0,
    status: "pending" as OrderStatus,
  });

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerPhone.includes(searchQuery) ||
        order.customerAddress.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" ? true : order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, selectedStatus]);

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

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const items = newOrderData.itemsText.split("\n").filter(Boolean).map((line, idx) => ({
      productId: `item-${idx}`,
      productName: line.trim(),
      quantity: 1,
    }));

    addOrder({
      customerName: newOrderData.customerName,
      customerPhone: newOrderData.customerPhone,
      customerAddress: newOrderData.customerAddress,
      items: items.length > 0 ? items : [{ productId: "custom", productName: "أدوية متنوعة", quantity: 1 }],
      notes: newOrderData.notes,
      totalAmount: Number(newOrderData.totalAmount) || undefined,
      status: newOrderData.status,
    });

    setIsAddModalOpen(false);
    setNewOrderData({
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      itemsText: "",
      notes: "",
      totalAmount: 0,
      status: "pending",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <ShoppingBag className="w-6 h-6 text-emerald-400" />
            <span>طلبات الأدوية والروشتات</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            إدارة ومتابعة طلبيات التوصيل، وصفات الأدوية، وحالات الشحن في القيات والعدوة
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>تسجيل طلب جديد يدويًا</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث برقم الطلب، اسم العميل، رقم الهاتف، أو العنوان..."
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pr-10 pl-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 sm:w-64">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">جميع الحالات ({orders.length})</option>
            <option value="pending">قيد الانتظار</option>
            <option value="confirmed">تم التأكيد</option>
            <option value="preparing">جاري التجهيز</option>
            <option value="delivering">خرج للتوصيل</option>
            <option value="completed">تم التسليم</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-800/60 border-b border-slate-700/80 text-slate-400 font-bold text-xs">
                <th className="py-4 pr-6">رقم الطلب</th>
                <th className="py-4 px-3">العميل والهاتف</th>
                <th className="py-4 px-3">العنوان / المنطقة</th>
                <th className="py-4 px-3">الأصناف المطلوبة</th>
                <th className="py-4 px-3">الحالة</th>
                <th className="py-4 pl-6 text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold">لا توجد طلبات تطابق معايير البحث</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                    {/* Order Number */}
                    <td className="py-4 pr-6 whitespace-nowrap">
                      <div className="font-mono font-bold text-emerald-400 text-sm">
                        #{order.orderNumber}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {new Date(order.createdAt).toLocaleTimeString("ar-EG", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      <div className="font-bold text-white">{order.customerName}</div>
                      <div className="text-xs text-slate-400 font-sans mt-0.5">
                        {order.customerPhone}
                      </div>
                    </td>

                    {/* Address */}
                    <td className="py-4 px-3">
                      <div className="text-xs text-slate-300 max-w-xs truncate flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{order.customerAddress}</span>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-4 px-3">
                      <div className="text-xs text-slate-300 font-medium max-w-xs truncate">
                        {order.items.map((i) => `${i.productName} (${i.quantity})`).join(" + ")}
                      </div>
                      {order.totalAmount && (
                        <div className="text-[11px] text-emerald-400 font-bold mt-0.5">
                          الإجمالي: {order.totalAmount} ج.م
                        </div>
                      )}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-200 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="confirmed">تم التأكيد</option>
                        <option value="preparing">جاري التجهيز</option>
                        <option value="delivering">خرج للتوصيل</option>
                        <option value="completed">تم التسليم</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 pl-6 text-left whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* Open Details */}
                        <button
                          onClick={() => setActiveOrder(order)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                        >
                          التفاصيل
                        </button>

                        {/* WhatsApp Customer */}
                        <a
                          href={`https://wa.me/2${order.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `أهلاً بك ${order.customerName}، معك د. محمد شعبان من صيدليات الزيات بخصوص طلبك رقم ${order.orderNumber}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors"
                          title="مراسلة العميل عبر الواتساب"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        {/* Call Customer */}
                        <a
                          href={`tel:${order.customerPhone}`}
                          className="p-2 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors"
                          title="الاتصال بالعميل"
                        >
                          <Phone className="w-4 h-4" />
                        </a>

                        {/* Delete */}
                        <button
                          onClick={() => {
                            if (confirm(`هل تريد حذف الطلب #${order.orderNumber}؟`)) {
                              deleteOrder(order.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                          title="حذف الطلب"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">
                    تفاصيل الطلب #{activeOrder.orderNumber}
                  </h3>
                  {getStatusBadge(activeOrder.status)}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  تاريخ ووقت الطلب: {new Date(activeOrder.createdAt).toLocaleString("ar-EG")}
                </p>
              </div>
              <button
                onClick={() => setActiveOrder(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Customer Info */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase">بيانات العميل والتوصيل</h4>
                <div className="text-sm font-bold text-white">{activeOrder.customerName}</div>
                <div className="text-xs text-slate-300 flex items-center gap-2 font-sans">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{activeOrder.customerPhone}</span>
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{activeOrder.customerAddress}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase">الأدوية والأصناف المطلوبة</h4>
                <div className="rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
                  {activeOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-800/30 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white">{item.productName}</span>
                        {item.requiresPrescription && (
                          <span className="mr-2 px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                            روشتة
                          </span>
                        )}
                      </div>
                      <div className="text-slate-300 font-bold">
                        الكمية: {item.quantity} {item.price ? `(${item.price * item.quantity} ج.م)` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {activeOrder.notes && (
                <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/40 text-xs">
                  <p className="font-bold text-slate-400 mb-1">ملاحظات العميل:</p>
                  <p className="text-slate-200">{activeOrder.notes}</p>
                </div>
              )}

              {/* Status Update Quick Select */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  تحديث حالة الطلب مباشرة:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["pending", "confirmed", "preparing", "delivering", "completed", "cancelled"] as OrderStatus[]).map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => {
                          updateOrderStatus(activeOrder.id, st);
                          setActiveOrder({ ...activeOrder, status: st });
                        }}
                        className={`p-2 rounded-xl text-xs font-bold border transition-colors ${
                          activeOrder.status === st
                            ? "bg-emerald-600 border-emerald-500 text-white"
                            : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                        }`}
                      >
                        {st === "pending" && "قيد الانتظار"}
                        {st === "confirmed" && "تم التأكيد"}
                        {st === "preparing" && "جاري التجهيز"}
                        {st === "delivering" && "خرج للتوصيل"}
                        {st === "completed" && "تم التسليم"}
                        {st === "cancelled" && "إلغاء الطلب"}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800/80 border-t border-slate-700 flex items-center justify-between">
              <a
                href={`https://wa.me/2${activeOrder.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `مرحباً ${activeOrder.customerName}، نفيدك بأن طلبك رقم #${activeOrder.orderNumber} في صيدليات الزيات تم تحديث حالته إلى: ${
                    activeOrder.status === "confirmed"
                      ? "تم التأكيد وجاري التحضير"
                      : activeOrder.status === "preparing"
                      ? "جاري تجهيز الأدوية"
                      : activeOrder.status === "delivering"
                      ? "خرج للتوصيل مع مندوب الصيدلية"
                      : activeOrder.status === "completed"
                      ? "تم التسليم بنجاح، نتمنى لكم دوام الصحة والعافية"
                      : "قيد المراجعة"
                  }. د. محمد شعبان.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال تحديث للعميل بالواتساب</span>
              </a>

              <button
                onClick={() => setActiveOrder(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Order Creation Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <span>تسجيل طلب دواء / روشتة جديد</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  اسم العميل *
                </label>
                <input
                  type="text"
                  required
                  value={newOrderData.customerName}
                  onChange={(e) => setNewOrderData({ ...newOrderData, customerName: e.target.value })}
                  placeholder="مثال: محمد السيد"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  رقم هاتف العميل *
                </label>
                <input
                  type="tel"
                  required
                  value={newOrderData.customerPhone}
                  onChange={(e) => setNewOrderData({ ...newOrderData, customerPhone: e.target.value })}
                  placeholder="01012345678"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  عنوان التوصيل بالتفصيل *
                </label>
                <input
                  type="text"
                  required
                  value={newOrderData.customerAddress}
                  onChange={(e) => setNewOrderData({ ...newOrderData, customerAddress: e.target.value })}
                  placeholder="القيات - بجوار المسجد الكبير"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  الأدوية المطلوبة (كل صنف في سطر) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newOrderData.itemsText}
                  onChange={(e) => setNewOrderData({ ...newOrderData, itemsText: e.target.value })}
                  placeholder="بانادول أدفانس (علبة)&#10;كونكور 5 مجم&#10;فيتامين سي فوار"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    إجمالي المبلغ (ج.م)
                  </label>
                  <input
                    type="number"
                    value={newOrderData.totalAmount || ""}
                    onChange={(e) => setNewOrderData({ ...newOrderData, totalAmount: Number(e.target.value) })}
                    placeholder="150"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    حالة الطلب الأولية
                  </label>
                  <select
                    value={newOrderData.status}
                    onChange={(e) => setNewOrderData({ ...newOrderData, status: e.target.value as OrderStatus })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="pending">قيد الانتظار</option>
                    <option value="confirmed">تم التأكيد</option>
                    <option value="preparing">جاري التجهيز</option>
                    <option value="delivering">خرج للتوصيل</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40"
                >
                  حفظ الطلب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
