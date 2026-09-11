import React from "react";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Send,
} from "lucide-react";
import { pharmacyInfo } from "@/data/pharmacy";
import { Badge } from "@/components/common/Badge";
import { getWhatsAppBaseUrl } from "@/lib/whatsapp";
import { LocationSection } from "@/components/home/LocationSection";

export const metadata: Metadata = {
  title: "تواصل معنا والمقر | صيدليات الزيات",
  description:
    "تواصل مباشرة مع صيدلية الدكتور محمد شعبان عبر الهاتف أو واتساب، واعرف تفاصيل العنوان في القيات – مركز العدوة – المنيا.",
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" size="md">
            تواصل مباشر
          </Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-[1.4] sm:leading-[1.45]">
            تواصل مع صيدلية الدكتور محمد شعبان
          </h1>
          <p className="mt-3 text-lg text-brand-primary font-bold">
            صيدليات الزيات (Elzayat Pharmacies)
          </p>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            نسعد بتلقي كافة استفساراتكم الطبية، طلبات الأدوية، واقتراحاتكم على مدار الساعة.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Phone Card */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-brand-primary flex items-center justify-center mb-4 mx-auto">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">الاتصال الهاتفي</h3>
              <p className="text-xs text-slate-500 mb-4">للطوارئ والاستفسارات العاجلة</p>
              <span className="text-xl font-black text-brand-primary dir-ltr block mb-4">
                {pharmacyInfo.formattedPhone}
              </span>
            </div>
            <a
              href={`tel:${pharmacyInfo.phone}`}
              className="w-full py-3 px-4 rounded-xl bg-brand-navy hover:bg-brand-dark text-white font-bold text-xs sm:text-sm transition-all"
            >
              اتصل بالصيدلية الآن
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200 text-center flex flex-col items-center justify-between shadow-sm">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 mx-auto shadow-md">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-1">محادثة WhatsApp</h3>
              <p className="text-xs text-emerald-700/80 mb-4">لإرسال الروشتات والاستشارات المكتوبة</p>
              <span className="text-sm font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full inline-block mb-4">
                متوسط الرد خلال دقائق
              </span>
            </div>
            <a
              href={getWhatsAppBaseUrl("السلام عليكم د. محمد شعبان")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              ابدأ محادثة واتساب
            </a>
          </div>

          {/* Location Card */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 mx-auto">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">مقر الصيدلية</h3>
              <p className="text-xs text-slate-500 mb-2">القيات – العدوة – المنيا</p>
              <p className="text-xs text-slate-600 mb-4 font-medium">
                {pharmacyInfo.workingHours.hours}
              </p>
            </div>
            <a
              href={pharmacyInfo.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>موقعنا على الخريطة</span>
            </a>
          </div>
        </div>

        {/* Location & Map Section */}
        <LocationSection />
      </div>
    </div>
  );
}
