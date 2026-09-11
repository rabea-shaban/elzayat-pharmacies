"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Eye } from "lucide-react";
import { galleryItems } from "@/data/gallery";
import { GalleryItem } from "@/types/offer";
import { GalleryModal } from "@/components/gallery/GalleryModal";
import { Badge } from "@/components/common/Badge";

const categories = [
  { slug: "all", label: "جميع الصور" },
  { slug: "exterior", label: "الواجهة الخارجية" },
  { slug: "interior", label: "التصميم الداخلي" },
  { slug: "products", label: "أقسام المنتجات" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="py-12 sm:py-16 bg-slate-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="primary" size="md">
            جولة بصرية
          </Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-[1.4] sm:leading-[1.45]">
            معرض صور صيدلية الزيات
          </h1>
          <p className="mt-3 text-lg text-brand-primary font-bold">
            صيدلية الدكتور محمد شعبان – بحلتها الجديدة
          </p>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            استكشف المقر المطور، أرفف المنتجات المنظمة، وتجهيزات حفظ الأدوية الدقيقة وفق المعايير الطبية العالمية.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shadow-sm ${
                activeCategory === cat.slug
                  ? "bg-brand-navy text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-200 cursor-pointer shadow-card hover:shadow-cardHover transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 right-4">
                <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1 rounded-xl shadow-sm">
                  {item.categoryLabel}
                </span>
              </div>

              <div className="absolute bottom-4 right-4 left-4 text-white">
                <h3 className="text-base font-bold leading-snug line-clamp-1 group-hover:text-brand-primaryLight transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1 mt-1">
                  {item.description}
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-brand-primary/90 text-white flex items-center justify-center shadow-xl">
                  <Eye className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <GalleryModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </div>
  );
}
