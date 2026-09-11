"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { ProductCard } from "./ProductCard";
import { ProductFilter } from "./ProductFilter";
import { PackageSearch } from "lucide-react";
import { getWhatsAppBaseUrl } from "@/lib/whatsapp";

interface ProductGridProps {
  initialProducts: Product[];
  categories: Category[];
  initialCategory?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  initialProducts,
  categories,
  initialCategory = "all",
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "all" || product.categorySlug === selectedCategory;

      // Search query filter (search in name, description, category, and benefits)
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.nameEn && product.nameEn.toLowerCase().includes(query)) ||
        product.categoryName.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.benefits && product.benefits.some((b) => b.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  return (
    <div>
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalProductsCount={initialProducts.length}
        filteredCount={filteredProducts.length}
      />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 text-brand-primary flex items-center justify-center mx-auto mb-4">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            لم نجد منتجات مطابقة لبحثك
          </h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            لا تقلق، يمكنك طلب أي دواء أو منتج غير موجود مباشرة وسيقوم فريق الصيدلية بتوفيره لك فوراً.
          </p>
          <a
            href={getWhatsAppBaseUrl(`السلام عليكم، أبحث عن منتج غير موجود في الدليل: ${searchQuery || "استفسار"}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <span>استفسر عن توفر المنتج على WhatsApp</span>
          </a>
        </div>
      )}
    </div>
  );
};
