"use client";

import React from "react";
import NextLink from "next/link";
import {
  Calendar,
  Award,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { pharmacyInfo } from "@/data/pharmacy";
import { Badge } from "../common/Badge";

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Column / Stats Card Grid */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {/* Stat 1: 2019 */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-dark text-white shadow-card">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-amber-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-3xl sm:text-4xl font-black text-amber-400 block mb-1">
                  2019
                </span>
                <span className="text-xs font-bold text-slate-200 block">
                  بداية الرحلة
                </span>
                <p className="text-[11px] text-slate-400 mt-1">
                  تأسست لخدمة أهالي القيات والعدوة
                </p>
              </div>

              {/* Stat 2: 7+ Years */}
              <div className="p-6 rounded-2xl bg-sky-50 border border-sky-100 shadow-card">
                <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-3xl sm:text-4xl font-black text-brand-navy block mb-1">
                  +7 سنوات
                </span>
                <span className="text-xs font-bold text-slate-800 block">
                  من الخبرة والثقة
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  رعاية طبية مستمرة ومتطورة
                </p>
              </div>

              {/* Stat 3: 24/7 Hours */}
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-card">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-3xl sm:text-4xl font-black text-emerald-800 block mb-1">
                  24/7
                </span>
                <span className="text-xs font-bold text-slate-800 block">
                  متاحون لخدمتكم
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  استقبال واستشارات عبر واتساب
                </p>
              </div>

              {/* Stat 4: 100% Original */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-card">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-3xl sm:text-4xl font-black text-slate-900 block mb-1">
                  100%
                </span>
                <span className="text-xs font-bold text-slate-800 block">
                  أدوية أصلية ومعتمدة
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  تخزين دوائي وفق أشد المعايير
                </p>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-right">
            <div>
              <Badge variant="gold" size="md">
                قصة نجاحنا وثقتكم منذ 2019
              </Badge>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-navy leading-snug">
                عن صيدلية الدكتور محمد شعبان
                <span className="block text-brand-primary text-xl sm:text-2xl mt-1">
                  إحدى صيدليات الزيات (Elzayat Pharmacies)
                </span>
              </h2>
            </div>

            <p className="text-base text-slate-600 leading-relaxed">
              بدأت <strong>صيدلية الدكتور محمد شعبان</strong> رحلتها عام <strong>2019</strong> بقرية القيات – مركز العدوة، ومنذ ذلك اليوم كان هدفنا الأسمى تقديم خدمة صيدلانية احترافية تراعي صحة المريض أولاً وتهتم بأدق تفاصيل احتياجات أهالينا.
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              واليوم، يسعدنا أن نفتح معكم فصلاً جديداً من خلال <strong>صيدليات الزيات بحلتها الجديدة</strong>، لتجمع بين التطور الرقمي والسرعة في توفير الأدوية والاستشارات، مع الحفاظ على قيم الأمانة والدقة والرعاية التي بنيناها معاً على مدار أكثر من 7 سنوات.
            </p>

            {/* Commitments List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm font-medium text-slate-700">
                  فريق صيدلي متخصص مستعد لتقديم الاستشارات وشرح بروتوكولات العلاج.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm font-medium text-slate-700">
                  توفير شامل للأدوية المزمنة والنادرة وتأمين البدائل الطبية الدقيقة.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm font-medium text-slate-700">
                  خدمة توصيل سريعة واستجابة فورية لكافة الطلبات عبر واتساب والهاتف.
                </span>
              </div>
            </div>

            {/* Read More Link */}
            <div className="pt-4">
              <NextLink
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-primaryDark group"
              >
                <span>اقرأ قصة التأسيس والهوية الجديدة بالكامل</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
