"use client";

import React, { useState } from "react";
import {
  HeartPulse,
  Plus,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { Service } from "@/types/service";

export default function AdminServicesPage() {
  const { services, addService, updateService, deleteService } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    shortDesc: string;
    fullDesc: string;
    iconName: string;
    features: string;
    isFeatured: boolean;
  }>({
    title: "",
    shortDesc: "",
    fullDesc: "",
    iconName: "Stethoscope",
    features: "",
    isFeatured: true,
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: "",
      shortDesc: "",
      fullDesc: "",
      iconName: "Stethoscope",
      features: "",
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: Service) => {
    setEditingService(srv);
    setFormData({
      title: srv.title,
      shortDesc: srv.shortDesc,
      fullDesc: srv.fullDesc,
      iconName: srv.iconName || "Stethoscope",
      features: srv.features.join("\n"),
      isFeatured: srv.isFeatured || false,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const featList = formData.features.split("\n").map((f) => f.trim()).filter(Boolean);

    if (editingService) {
      updateService(editingService.id, {
        ...formData,
        features: featList,
      });
    } else {
      addService({
        ...formData,
        features: featList,
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
            <HeartPulse className="w-6 h-6 text-emerald-400" />
            <span>الخدمات الطبية والصيدلانية</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            إدارة الفحوصات والخدمات الصيدلانية المجانية والاستشارات الطبية المقدمة لأهالي القيات والعدوة
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة خدمة جديدة</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <HeartPulse className="w-6 h-6" />
                </div>
                {srv.isFeatured && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    خدمة مميزة
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{srv.title}</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">{srv.shortDesc}</p>

              {srv.features && srv.features.length > 0 && (
                <div className="space-y-1.5 pt-3 border-t border-slate-800">
                  {srv.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(srv)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="تعديل الخدمة"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`هل تريد حذف خدمة "${srv.title}"؟`)) {
                    deleteService(srv.id);
                  }
                }}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                title="حذف الخدمة"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-emerald-400" />
                <span>{editingService ? "تعديل الخدمة الطبية" : "إضافة خدمة طبية جديدة"}</span>
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
                  عنوان الخدمة *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: قياس الضغط والسكر الدوري مجاناً"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  وصف مختصر *
                </label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  placeholder="فحص دقيق بأحدث الأجهزة الطبية المعايرة"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  الوصف التفصيلي *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  placeholder="شرح كامل للخدمة وكيفية الاستفادة منها..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  مميزات ونقاط الخدمة (كل نقطة في سطر)
                </label>
                <textarea
                  rows={3}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="أجهزة دقيقة ومعايرة&#10;متابعة ملف المريض&#10;استشارة صيدلانية فورية"
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
                  حفظ الخدمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
