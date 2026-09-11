import React, { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { pharmacyInfo } from "@/data/pharmacy";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Badge } from "@/components/common/Badge";
import { Pill, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "دليل المنتجات والأدوية | صيدليات الزيات",
  description:
    "استعرض وتصفح منتجات صيدلية الدكتور محمد شعبان: مستحضرات العناية بالبشرة، العناية بالشعر، الفيتامينات، مستلزمات الأطفال، والأجهزة الطبية مع إمكانية الطلب عبر واتساب.",
};

export default function ProductsPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="primary" size="md">
            دليل المنتجات والأقسام
          </Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-[1.4] sm:leading-[1.45]">
            منتجات صيدليات الزيات
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600 leading-relaxed">
            تصفح تشكيلتنا الواسعة من منتجات العناية الأصلية والمكملات والأجهزة الطبية، أو ابحث عن الصنف المطلوب واطلبه مباشرة عبر WhatsApp.
          </p>
        </div>

        {/* Client Side Interactive Search & Grid */}
        <Suspense fallback={<div className="text-center py-12 text-slate-400">جاري تحميل دليل المنتجات...</div>}>
          <ProductGrid initialProducts={products} categories={categories} />
        </Suspense>

        {/* Bottom Disclaimer */}
        <div className="mt-16 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center max-w-3xl mx-auto">
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            لم تجد المنتج أو الدواء الذي تبحث عنه؟
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            نوفر خدمة توفير الأدوية الناقصة والنادرة والبدائل المطابقة فوراً بمجرد إرسال الاسم أو الروشتة.
          </p>
          <a
            href={`https://wa.me/${pharmacyInfo.whatsappNumber}?text=${encodeURIComponent(
              "السلام عليكم، أبحث عن دواء أو منتج غير موجود في الدليل الإلكتروني"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <span>طلب دواء خاص عبر WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
