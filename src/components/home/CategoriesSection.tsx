"use client";

import React from "react";
import NextLink from "next/link";
import {
  Pill,
  Heart,
  Scissors,
  Baby,
  ShieldPlus,
  Stethoscope,
  ArrowLeft,
} from "lucide-react";
import { categories } from "@/data/categories";
import { SectionTitle } from "../common/SectionTitle";

const iconMap: Record<string, React.ElementType> = {
  Pill,
  Heart,
  Scissors,
  Baby,
  ShieldPlus,
  Stethoscope,
};

export const CategoriesSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="ماذا نوفر لك؟"
          badgeVariant="primary"
          title="أقسام ومنتجات صيدليات الزيات"
          subtitle="نوفر لك باقة شاملة من الأدوية، مستحضرات التجميل والعناية، ومنتجات الأطفال بأعلى درجات الجودة والموثوقية."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.iconName] || Pill;

            return (
              <NextLink
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-primary/50 shadow-sm hover:shadow-cardHover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all flex items-center justify-center shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {category.itemCount && (
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                        +{category.itemCount} صنف
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-brand-primary transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-primary group-hover:text-brand-primaryDark">
                  <span>استعراض منتجات القسم</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
              </NextLink>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <NextLink
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-navy hover:bg-brand-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <span>عرض جميع الأقسام والمنتجات</span>
            <ArrowLeft className="w-4 h-4" />
          </NextLink>
        </div>
      </div>
    </section>
  );
};
