"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  FileText,
  AlertTriangle,
  X,
  Sparkles,
  Layers,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { Product } from "@/types/product";

export default function AdminProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct, toggleProductAvailability } = useAdminData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    nameEn: string;
    categorySlug: string;
    description: string;
    usage: string;
    image: string;
    badge: string;
    isAvailable: boolean;
    requiresPrescription: boolean;
    isFeatured: boolean;
  }>({
    name: "",
    nameEn: "",
    categorySlug: categories[0]?.slug || "medicines",
    description: "",
    usage: "",
    image: "/logo.png",
    badge: "",
    isAvailable: true,
    requiresPrescription: false,
    isFeatured: false,
  });

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.nameEn && item.nameEn.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || item.categorySlug === selectedCategory;

      const matchesAvailability =
        availabilityFilter === "all"
          ? true
          : availabilityFilter === "available"
          ? item.isAvailable
          : !item.isAvailable;

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [products, searchQuery, selectedCategory, availabilityFilter]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      nameEn: "",
      categorySlug: categories[0]?.slug || "medicines",
      description: "",
      usage: "",
      image: "/logo.png",
      badge: "",
      isAvailable: true,
      requiresPrescription: false,
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      nameEn: product.nameEn || "",
      categorySlug: product.categorySlug,
      description: product.description,
      usage: product.usage || "",
      image: product.image,
      badge: product.badge || "",
      isAvailable: product.isAvailable,
      requiresPrescription: product.requiresPrescription || false,
      isFeatured: product.isFeatured || false,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedCategory = categories.find((c) => c.slug === formData.categorySlug);
    const categoryName = matchedCategory ? matchedCategory.name : "أدوية وعلاجات";
    const slug = formData.nameEn
      ? formData.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : `prod-${Date.now()}`;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        categoryName,
        slug: editingProduct.slug || slug,
      });
    } else {
      addProduct({
        ...formData,
        categoryName,
        slug,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Add */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Package className="w-6 h-6 text-emerald-400" />
            <span>إدارة الأدوية والمنتجات</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            إضافة وتعديل الأدوية والمنتجات الطبية والتحكم في توفرها بالمخزون
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة دواء / منتج جديد</span>
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
            placeholder="البحث باسم الدواء، الاسم الإنجليزي، أو الوصف..."
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pr-10 pl-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 sm:w-60">
          <Layers className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">جميع الأقسام ({products.length})</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Filter */}
        <div className="flex items-center gap-2 sm:w-48">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">كل الحالات</option>
            <option value="available">متوفر فقط</option>
            <option value="unavailable">غير متوفر</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-800/60 border-b border-slate-700/80 text-slate-400 font-bold text-xs">
                <th className="py-4 pr-6">الدواء / المنتج</th>
                <th className="py-4 px-3">القسم</th>
                <th className="py-4 px-3">الروشتة</th>
                <th className="py-4 px-3">المخزون والتوفر</th>
                <th className="py-4 pl-6 text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <Package className="w-10 h-10 text-slate-600 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold">لم يتم العثور على أدوية مطابقة للبحث</p>
                    <p className="text-xs text-slate-500 mt-1">جرب تغيير كلمات البحث أو الفلاتر</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-800/30 transition-colors">
                    {/* Name & Image */}
                    <td className="py-4 pr-6">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-xl bg-white p-1 border border-slate-700 shrink-0 overflow-hidden flex items-center justify-center">
                          <Image
                            src={product.image || "/logo.png"}
                            alt={product.name}
                            fill
                            className="object-contain"
                            sizes="48px"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm truncate">
                              {product.name}
                            </span>
                            {product.badge && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                {product.badge}
                              </span>
                            )}
                          </div>
                          {product.nameEn && (
                            <p className="text-xs text-slate-400 font-sans mt-0.5 truncate">
                              {product.nameEn}
                            </p>
                          )}
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 max-w-sm">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium">
                        {product.categoryName}
                      </span>
                    </td>

                    {/* Prescription */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      {product.requiresPrescription ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold">
                          <FileText className="w-3.5 h-3.5" />
                          <span>روشتة طبية</span>
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500 font-medium">بدون روشتة</span>
                      )}
                    </td>

                    {/* Availability Switch */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      <button
                        onClick={() => toggleProductAvailability(product.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          product.isAvailable
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
                            : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"
                        }`}
                      >
                        {product.isAvailable ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>متوفر</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-slate-500" />
                            <span>غير متوفر</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 pl-6 text-left whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="تعديل المنتج"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="حذف المنتج"
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

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-400" />
                <span>{editingProduct ? "تعديل بيانات الدواء / المنتج" : "إضافة دواء / منتج جديد"}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    اسم الدواء بالعربية *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثال: بانادول أدفانس 500 مجم"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* English Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    الاسم بالإنجليزية (اختياري)
                  </label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    placeholder="Panadol Advance 500mg"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  القسم الصيدلاني *
                </label>
                <select
                  value={formData.categorySlug}
                  onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name} ({cat.slug})
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  الوصف والمواصفات *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="وصف استخدام الدواء والجرعة المناسبة..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Usage */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  طريقة الاستخدام والجرعات (اختياري)
                </label>
                <input
                  type="text"
                  value={formData.usage}
                  onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                  placeholder="قرص واحد بعد الأكل مرتين يومياً أو حسب إرشادات الطبيب"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Badge & Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    شارة التميز (شارة سريعة)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="الأكثر مبيعاً، خصم خاص..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    مسار الصورة
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/logo.png أو رابط صورة"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-700 border-slate-600"
                  />
                  <span className="text-xs font-bold text-white">متوفر حالياً بالصيدلية (متاح للطلب)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requiresPrescription}
                    onChange={(e) => setFormData({ ...formData, requiresPrescription: e.target.checked })}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 bg-slate-700 border-slate-600"
                  />
                  <span className="text-xs font-bold text-rose-400">يتطلب روشتة طبية معتمدة لصرفه</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 bg-slate-700 border-slate-600"
                  />
                  <span className="text-xs font-bold text-amber-400">إظهار كمنتج مميز في الصفحة الرئيسية</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40"
                >
                  {editingProduct ? "حفظ التعديلات" : "إضافة المنتج الآن"}
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
            <h3 className="text-lg font-bold text-white mb-2">تأكيد حذف الدواء</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              هل أنت متأكد من رغبتك في حذف هذا المنتج نهائياً من قاعدة بيانات الصيدلية؟ لا يمكن التراجع عن هذا الإجراء.
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
                  deleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/40"
              >
                نعم، احذف المنتج
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
