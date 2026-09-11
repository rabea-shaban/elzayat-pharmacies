"use client";

import React from "react";
import NextLink from "next/link";
import { Phone, MessageCircle, Pill, HeartHandshake } from "lucide-react";
import { pharmacyInfo } from "@/data/pharmacy";
import { getWhatsAppBaseUrl } from "@/lib/whatsapp";

export const ContactCtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-sky-600 via-brand-primary to-sky-700 text-white p-8 sm:p-12 shadow-glow text-center relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-bold text-sky-100 border border-white/20">
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>نفس الثقة والاهتمام منذ 2019</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.4] sm:leading-[1.45]">
              هل لديك استفسار أو تحتاج دواء عاجل؟
            </h2>

            <p className="text-sm sm:text-base text-sky-100 max-w-xl mx-auto leading-relaxed">
              فريق صيدليات الزيات بقيادة د. محمد شعبان جاهز لخدمتكم والإجابة عن كافة أسئلتكم الطبية والدوائية فوراً.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={getWhatsAppBaseUrl("السلام عليكم دكتور، أود التواصل معكم")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>تحدث معنا على WhatsApp</span>
              </a>

              <a
                href={`tel:${pharmacyInfo.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-brand-navy hover:bg-slate-100 font-extrabold text-sm shadow-md transition-all active:scale-95"
              >
                <Phone className="w-5 h-5 text-brand-primary" />
                <span>اتصال هاتفياً ({pharmacyInfo.formattedPhone})</span>
              </a>

              <NextLink
                href="/order"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-navy hover:bg-brand-dark text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Pill className="w-5 h-5 text-brand-primaryLight" />
                <span>طلب دواء أونلاين</span>
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
