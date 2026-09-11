"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Camera, ArrowLeft, Eye } from "lucide-react";
import { galleryItems } from "@/data/gallery";
import { GalleryItem } from "@/types/offer";
import { GalleryModal } from "../gallery/GalleryModal";
import { SectionTitle } from "../common/SectionTitle";

export const GalleryPreviewSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <section className="py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <SectionTitle
            badge="من داخل الصيدلية"
            badgeVariant="primary"
            title="جولة مصورة في صيدلية الزيات"
            subtitle="نأخذكم في جولة سريعة داخل أقسام الصيدلية، الواجهة الحديثة، وتجهيزات التخزين الطبية المتطورة."
            align="right"
            className="mb-0"
          />

          <NextLink
            href="/gallery"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:text-brand-primaryDark group"
          >
            <span>استعراض المعرض الكامل</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </NextLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 cursor-pointer shadow-sm hover:shadow-cardHover transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-3 right-3">
                <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                  {item.categoryLabel}
                </span>
              </div>

              <div className="absolute bottom-3 right-3 left-3 text-white">
                <h3 className="text-sm font-bold leading-snug line-clamp-1 group-hover:text-brand-primaryLight transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-brand-primary/90 text-white flex items-center justify-center shadow-lg">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <GalleryModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </section>
  );
};
