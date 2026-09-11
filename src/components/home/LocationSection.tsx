"use client";

import React from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  ExternalLink,
} from "lucide-react";
import { pharmacyInfo } from "@/data/pharmacy";
import { getWhatsAppBaseUrl } from "@/lib/whatsapp";
import { SectionTitle } from "../common/SectionTitle";

export const LocationSection: React.FC = () => {
  return (
    <section id="location-section" className="py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="زورنا في الصيدلية"
          badgeVariant="primary"
          title="الموقع وساعات العمل"
          subtitle="نسعد باستقبالكم دائماً في مقر صيدلية الدكتور محمد شعبان بقرية القيات."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-card flex flex-col justify-between">
            <div className="space-y-6 text-right">
              <div>
                <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block mb-1">
                  المقر الرئيسي
                </span>
                <h3 className="text-xl font-black text-brand-navy">
                  {pharmacyInfo.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {pharmacyInfo.brandName} (منذ {pharmacyInfo.since})
                </p>
              </div>

              {/* Address details */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">العنوان بالتفصيل:</h4>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">
                      {pharmacyInfo.address.fullAddress}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {pharmacyInfo.address.fullAddressEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">مواعيد العمل:</h4>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">
                      {pharmacyInfo.workingHours.days}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {pharmacyInfo.workingHours.hours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-brand-primary flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">رقم الهاتف المباشر:</h4>
                    <a
                      href={`tel:${pharmacyInfo.phone}`}
                      className="text-base font-black text-brand-primary hover:underline dir-ltr inline-block mt-0.5"
                    >
                      {pharmacyInfo.formattedPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-6 mt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <a
                href={pharmacyInfo.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs font-bold shadow-sm transition-all text-center"
              >
                <Navigation className="w-4 h-4" />
                <span>الاتجاهات</span>
              </a>

              <a
                href={`tel:${pharmacyInfo.phone}`}
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center"
              >
                <Phone className="w-4 h-4 text-brand-primary" />
                <span>اتصل الآن</span>
              </a>

              <a
                href={getWhatsAppBaseUrl("السلام عليكم، أود معرفة موقع صيدلية الزيات")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Map Preview Area */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200/90 shadow-card bg-slate-200 min-h-[380px] relative">
            <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-3xl bg-white shadow-md text-rose-500 flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                صيدلية الدكتور محمد شعبان – صيدليات الزيات
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mb-6">
                قرية القَيّات – مركز العدوة – محافظة المنيا – مصر
              </p>
              <a
                href={pharmacyInfo.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-dark text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>فتح الخريطة والاتجاهات في Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
