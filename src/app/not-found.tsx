import React from "react";
import NextLink from "next/link";
import { Pill, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 bg-slate-50/70 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-sky-100 text-brand-primary flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Pill className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-brand-navy mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-800 mb-3">الصفحة غير موجودة</h2>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها. يمكنك العودة للصفحة الرئيسية أو طلب دوائك مباشرة.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <NextLink
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-sm font-bold shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>الرئيسية</span>
          </NextLink>
          <NextLink
            href="/order"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-all"
          >
            <span>اطلب دواء</span>
            <ArrowLeft className="w-4 h-4" />
          </NextLink>
        </div>
      </div>
    </div>
  );
}
