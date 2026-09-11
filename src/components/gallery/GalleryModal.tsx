"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { GalleryItem } from "@/types/offer";

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative aspect-[16/10] w-full bg-black">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>

        <div className="p-6 bg-slate-900 text-white">
          <span className="text-xs font-bold text-brand-primaryLight bg-sky-950 px-2.5 py-1 rounded-md border border-sky-800 inline-block mb-2">
            {item.categoryLabel}
          </span>
          <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-300">{item.description}</p>
        </div>
      </div>
    </div>
  );
};
