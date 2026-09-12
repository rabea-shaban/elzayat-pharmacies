"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Tag,
  Plus,
  Edit2,
  Trash2,
  X,
  Calendar,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { Offer } from "@/types/offer";

export default function AdminOffersPage() {
  const { offers, addOffer, updateOffer, deleteOffer } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    tagline: string;
    description: string;
    discountBadge: string;
    badgeType: "hot" | "new" | "limited" | "care";
    image: string;
    itemsIncluded: string;
    validUntil: string;
    ctaText: string;
  }>({
    title: "",
    tagline: "",
    description: "",
    discountBadge: "خصم 20%",
    badgeType: "hot",
    image: "/logo.png",
    itemsIncluded: "",
    validUntil: "مستمر حتى نهاية الشهر",
    ctaText: "اطلب العرض عبر واتساب",
  });

  const handleOpenAdd = () => {
    setEditingOffer(null);
    setFormData({
      title: "",
      tagline: "",
      description: "",
      discountBadge: "خصم 20%",
      badgeType: "hot",
      image: "/logo.png",
      itemsIncluded: "",
      validUntil: "مستمر حتى نهاية الشهر",
      ctaText: "اطلب العرض عبر واتساب",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      tagline: offer.tagline,
      description: offer.description,
      discountBadge: offer.discountBadge || "",
      badgeType: offer.badgeType || "hot",
      image: offer.image,
      itemsIncluded: (offer.itemsIncluded || []).join("\n"),
      validUntil: offer.validUntil || "",
      ctaText: offer.ctaText || "اطلب العرض عبر واتساب",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const items = formData.itemsIncluded
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingOffer) {
      updateOffer(editingOffer.id, {
        ...formData,
        itemsIncluded: items,
      });
    } else {
      addOffer({
        ...formData,
        itemsIncluded: items,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Tag className="w-6 h-6 text-emerald-400" />
            <span>إدارة العروض والخصومات</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            إضافة وتعديل باقات التوفير والخصومات الحصرية لصيدليات الزيات
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عرض جديد</span>
        </button>
      </div>

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col hover:border-emerald-500/40 transition-all"
          >
            <div className="relative h-44 bg-slate-800/80 p-4 flex items-center justify-center border-b border-slate-800">
              <div className="relative w-28 h-28">
                <Image
                  src={offer.image || "/logo.png"}
                  alt={offer.title}
                  fill
                  className="object-contain"
                />
              </div>

              {offer.discountBadge && (
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-rose-600 text-white font-bold text-xs shadow-md">
                  {offer.discountBadge}
                </div>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">{offer.title}</h3>
                <p className="text-xs text-emerald-400 font-semibold mt-0.5">{offer.tagline}</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{offer.description}</p>

                {offer.itemsIncluded && offer.itemsIncluded.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <p className="text-[11px] font-bold text-slate-500">محتويات العرض:</p>
                    <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                      {offer.itemsIncluded.map((item, idx) => (
                        <li key={idx} className="truncate">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{offer.validUntil || "ساري لفترة محدودة"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(offer)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="تعديل العرض"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(offer.id)}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                    title="حذف العرض"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-emerald-400" />
                <span>{editingOffer ? "تعديل بيانات العرض" : "إضافة باقة / عرض جديد"}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  عنوان العرض *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: باقة العناية الشاملة بالبشرة"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  الشعار الجانبي للعرض (Tagline) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="مثال: وفّر 25% على أشهر منتجات العناية الفرنسية"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    شارة الخصم
                  </label>
                  <input
                    type="text"
                    value={formData.discountBadge}
                    onChange={(e) => setFormData({ ...formData, discountBadge: e.target.value })}
                    placeholder="خصم 20% أو 1+1 مجاناً"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    مدة السريان
                  </label>
                  <input
                    type="text"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    placeholder="حتى نهاية الشهر"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  تفاصيل ووصف العرض *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="وصف مميزات العرض وما يقدمه للعميل..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  الأصناف المتضمنة في العرض (كل صنف بسطر)
                </label>
                <textarea
                  rows={3}
                  value={formData.itemsIncluded}
                  onChange={(e) => setFormData({ ...formData, itemsIncluded: e.target.value })}
                  placeholder="غسول وجه سيرافي 236 مل&#10;مرطب يومي مع عامل حماية&#10;هدية عينة سيروم"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40"
                >
                  حفظ العرض
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">تأكيد حذف العرض</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              هل أنت متأكد من حذف هذا العرض الترويجي؟
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  deleteOffer(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/40"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
