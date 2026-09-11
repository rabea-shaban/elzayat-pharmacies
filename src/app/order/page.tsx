import React from "react";
import type { Metadata } from "next";
import { MedicineRequestSection } from "@/components/home/MedicineRequestSection";
import { ShieldCheck, Clock, Truck, PhoneCall, MessageCircle } from "lucide-react";
import { pharmacyInfo } from "@/data/pharmacy";
import { Badge } from "@/components/common/Badge";

export const metadata: Metadata = {
  title: "اطلب دواء أو أرسل روشتة | صيدليات الزيات",
  description:
    "أرسل طلبك أو روشتتك الطبية مباشرة لصيدلية الدكتور محمد شعبان عبر واتساب واستلم علاجك سريعاً في القيات والعدوة.",
};

export default function OrderPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="gold" size="md">
            خدمة سريعة ومريحة
          </Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-[1.4] sm:leading-[1.45]">
            طلب دواء أو إرسال روشتة
          </h1>
          <p className="mt-3 text-lg text-brand-primary font-bold">
            صيدلية الدكتور محمد شعبان (صيدليات الزيات)
          </p>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            اطلب أدويتك ومستلزماتك الصحية وأنت في بيتك بكل سهولة، وسنقوم بالتواصل معك لتأكيد التوفر والتوصيل.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">تأكيد فوري</h3>
              <p className="text-[11px] text-slate-500">رد سريع ومتابعة مباشرة</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-brand-primary flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">توصيل للباب</h3>
              <p className="text-[11px] text-slate-500">للقيات والعدوة والمحيط</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">سرية وأمان</h3>
              <p className="text-[11px] text-slate-500">حفظ خصوصية بيانات المرضى</p>
            </div>
          </div>
        </div>

        {/* The Form Section */}
        <MedicineRequestSection />
      </div>
    </div>
  );
}
