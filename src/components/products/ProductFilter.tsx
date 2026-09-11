"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { Category } from "@/types/category";
import { cn } from "@/lib/utils";

interface ProductFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalProductsCount: number;
  filteredCount: number;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalProductsCount,
  filteredCount,
}) => {
  return (
    <div className="space-y-6 mb-10">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5 text-brand-primary" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث عن اسم المنتج، البراند، أو التصنيف (مثل: لاروش، بنادول، أوميجا 3)..."
          className="w-full pr-11 pl-10 py-3.5 bg-white rounded-2xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 hover:text-slate-600"
            aria-label="مسح البحث"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
        <button
          onClick={() => onSelectCategory("all")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shadow-sm",
            selectedCategory === "all"
              ? "bg-brand-navy text-white shadow-brand-navy/20"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          )}
        >
          الكل ({totalProductsCount})
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shadow-sm flex items-center gap-1.5",
                isSelected
                  ? "bg-brand-primary text-white shadow-sky-600/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              )}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Result Stats */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200/80 pb-3">
        <span>
          عرض <strong className="text-slate-900 font-bold">{filteredCount}</strong> منتج
          {selectedCategory !== "all" ? ` في هذا القسم` : ""}
          {searchQuery ? ` للبحث "${searchQuery}"` : ""}
        </span>
        {(selectedCategory !== "all" || searchQuery) && (
          <button
            onClick={() => {
              onSelectCategory("all");
              onSearchChange("");
            }}
            className="text-brand-primary hover:underline font-semibold"
          >
            إعادة تعيين الفلاتر
          </button>
        )}
      </div>
    </div>
  );
};
