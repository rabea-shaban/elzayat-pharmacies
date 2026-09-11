"use client";

import React from "react";
import NextLink from "next/link";
import { MessageCircle, Phone, Pill, MapPin } from "lucide-react";
import { pharmacyInfo } from "@/data/pharmacy";
import { getWhatsAppBaseUrl } from "@/lib/whatsapp";

export const MobileFloatingBar: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 py-2">
      <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
        {/* WhatsApp */}
        <a
          href={getWhatsAppBaseUrl("السلام عليكم د. محمد شعبان، أود الاستفسار من صيدليات الزيات")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-emerald-600 hover:bg-emerald-50 active:scale-95 transition-all text-center"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mb-0.5 text-emerald-600 shadow-sm">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">واتساب</span>
        </a>

        {/* Call */}
        <a
          href={`tel:${pharmacyInfo.phone}`}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all text-center"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-0.5 text-slate-700">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">اتصال</span>
        </a>

        {/* Order Medicine (Primary Highlight) */}
        <NextLink
          href="/order"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-white bg-brand-primary shadow-md shadow-sky-500/20 active:scale-95 transition-all text-center"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-0.5 text-white">
            <Pill className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">اطلب دواء</span>
        </NextLink>

        {/* Location / Directions */}
        <a
          href={pharmacyInfo.address.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all text-center"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-0.5 text-slate-700">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">الموقع</span>
        </a>
      </div>
    </div>
  );
};
