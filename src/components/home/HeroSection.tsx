"use client";

import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import {
  Pill,
  MessageCircle,
  ShieldCheck,
  Award,
  PhoneCall,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { pharmacyInfo } from "@/data/pharmacy";
import { Badge } from "../common/Badge";
import { getWhatsAppBaseUrl } from "@/lib/whatsapp";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left / Main Text Column (RTL: Right side visually) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            {/* Launch Badge */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="gold" size="md">
                منذ 2019 | {pharmacyInfo.brandNameEn}
              </Badge>
            </div>

            {/* Main Headings */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-[1.38] sm:leading-[1.42] lg:leading-[1.45]">
                مرحبًا بكم في{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-primary to-sky-600">
                  صيدلية الزيات
                </span>{" "}
                بحلتها وتجربتها الجديدة
              </h1>
              <p className="text-lg sm:text-xl font-bold text-brand-primary">
                {pharmacyInfo.name}
              </p>
            </div>

            {/* Tagline / Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              شكل جديد، تجربة رقمية أسهل، ورعاية صحية متكاملة تضع احتياجاتكم أولاً — مع استمرار التزامنا الراسخ بنفس قيم الثقة والاهتمام التي بدأناها معكم منذ 2019 في القيات والعدوة ومحافظة المنيا.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <NextLink
                href="/order"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-brand-primary hover:bg-brand-primaryDark text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-600/25 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <Pill className="w-5 h-5" />
                <span>اطلب دواء الآن</span>
              </NextLink>

              <a
                href={getWhatsAppBaseUrl("السلام عليكم د. محمد شعبان، مرحبًا بكم في صيدلية الزيات الجديدة")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>تواصل معنا على WhatsApp</span>
              </a>

              <a
                href={`tel:${pharmacyInfo.phone}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-brand-primary" />
                <span className="dir-ltr">{pharmacyInfo.formattedPhone}</span>
              </a>
            </div>

            {/* Trust Features Strip */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-brand-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">أدوية أصلية 100%</span>
                  <span className="text-slate-500">تخزين طبي معتمد</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">+7 سنوات خبرة</span>
                  <span className="text-slate-500">ثقة ممتدة من 2019</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">خدمة واستشارات</span>
                  <span className="text-slate-500">رد وتوصيل سريع</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column / Visual Branding Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Card */}
              <div className="relative rounded-3xl bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 p-7 text-white shadow-2xl overflow-hidden border border-white/10">
                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-brand-primary/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

                {/* Top Badge */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="bg-white/95 px-3 py-1.5 rounded-xl shadow-sm">
                    <Image
                      src="/logo.png"
                      alt={pharmacyInfo.brandName}
                      width={140}
                      height={46}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold px-2.5 py-1 rounded-full">
                    منذ 2019
                  </span>
                </div>

                {/* Core Brand Message */}
                <div className="py-6 space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <p className="text-xs text-amber-300 font-semibold mb-1 flex items-center gap-1.5">
                      <HeartHandshake className="w-4 h-4" />
                      رسالتنا لكم
                    </p>
                    <p className="text-sm font-medium text-slate-100 leading-relaxed">
                      &quot;صحتكم أولويتنا، وثقتكم التي منحتونا إياها منذ 2019 هي المحرك الدائم لتطوير خدماتنا وتقديم الأفضل لكم دائمًا.&quot;
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-2xl font-black text-brand-primaryLight block">2019</span>
                      <span className="text-[11px] text-slate-300">بداية رحلة الثقة</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-2xl font-black text-emerald-400 block">+7 سنوات</span>
                      <span className="text-[11px] text-slate-300">من الخبرة الصيدلانية</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Inside Card */}
                <div className="pt-2">
                  <NextLink
                    href="/order"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-sky-500 hover:from-sky-500 hover:to-brand-primary text-white font-bold text-sm shadow-md transition-all active:scale-95"
                  >
                    <span>طلب روشتة أو دواء الآن</span>
                  </NextLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
