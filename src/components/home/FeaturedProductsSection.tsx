"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "../products/ProductCard";
import { SectionTitle } from "../common/SectionTitle";

export const FeaturedProductsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const featured = products.filter((p) => {
    if (selectedCategory === "all") return p.isFeatured;
    return p.isFeatured && p.categorySlug === selectedCategory;
  });

  return (
    <section className="py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <SectionTitle
            badge="منتجات مختارة"
            badgeVariant="primary"
            title="أبرز المنتجات الأكثر طلباً"
            subtitle="تشكيلة مختارة من أفضل منتجات العناية بالبشرة، الفيتامينات، وأجهزة المتابعة الصحية المعتمدة."
            align="right"
            className="mb-0"
          />

          <NextLink
            href="/products"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:text-brand-primaryDark group"
          >
            <span>عرض كل المنتجات في الدليل</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </NextLink>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shadow-sm ${
              selectedCategory === "all"
                ? "bg-brand-navy text-white"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            الكل المختارة
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shadow-sm ${
                selectedCategory === cat.slug
                  ? "bg-brand-primary text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Note regarding medical regulations */}
        <div className="mt-10 p-4 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-500 max-w-2xl mx-auto shadow-sm">
          <p>
            ℹ️ <strong>تنويه دوائي:</strong> الأدوية التخصصية والروشتات تخضع للاشتراطات الطبية المحلية وتصرف تحت إشراف صيدلي مباشر وفق الوصفة الطبية.
          </p>
        </div>
      </div>
    </section>
  );
};
