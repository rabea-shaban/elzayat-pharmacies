"use client";

import React from "react";
import NextLink from "next/link";
import { HeartHandshake, ArrowLeft, Pill, ShieldCheck, Star } from "lucide-react";
import { pharmacyInfo } from "@/data/pharmacy";

export const NewBeginningSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-navy via-[#0c2342] to-slate-900 text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold mb-6 shadow-sm">
          <span>هوية متجددة وتجربة أفضل منذ 2019</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.42] sm:leading-[1.45]">
          فصل جديد يبدأ معكم ❤️
        </h2>

        {/* Subtitle / Quote */}
        <p className="mt-4 text-xl sm:text-2xl font-bold text-brand-primaryLight">
          {pharmacyInfo.welcomeMessage}
        </p>

        {/* Narrative Paragraph */}
        <div className="mt-8 p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md max-w-3xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            &quot;منذ عام <strong>2019</strong> ونحن نتشرف بخدمتكم في صيدلية الدكتور محمد شعبان، واليوم ندشن معاً مرحلة تطويرية شاملة لصيدليات الزيات بهوية عصرية وخدمات رقمية أسرع تجعل طلب الدواء والاستشارة أسهل من أي وقت مضى.&quot;
          </p>
          <p className="text-xs sm:text-sm text-amber-300/90 font-medium">
            نفس المكان… نفس الصدق والأمانة… ولكن بتجربة تستحقونها أكثر.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <NextLink
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-primary hover:bg-brand-primaryDark text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-600/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>اكتشف قصة صيدلية الزيات الجديدة</span>
            <ArrowLeft className="w-4 h-4" />
          </NextLink>

          <NextLink
            href="/order"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-all active:scale-95"
          >
            <Pill className="w-4 h-4 text-brand-primaryLight" />
            <span>طلب دواء الآن</span>
          </NextLink>
        </div>
      </div>
    </section>
  );
};
