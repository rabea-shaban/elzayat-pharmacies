"use client";

import React from "react";
import NextLink from "next/link";
import {
  Pill,
  UserCheck,
  Truck,
  Activity,
  HeartPulse,
  Heart,
  Check,
  ArrowLeft,
} from "lucide-react";
import { services } from "@/data/services";
import { SectionTitle } from "../common/SectionTitle";

const iconMap: Record<string, React.ElementType> = {
  Pill,
  UserCheck,
  Truck,
  Activity,
  HeartPulse,
  Heart,
};

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="رعاية متكاملة"
          badgeVariant="primary"
          title="خدماتنا الطبية والصيدلانية"
          subtitle="نقدم باقة واسعة من الخدمات المصممة لتلبية كافة احتياجاتك العلاجية والصحية بكل أمان وسرعة."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.iconName] || Pill;

            return (
              <div
                key={service.id}
                className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-brand-primary/40 shadow-sm hover:shadow-cardHover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors flex items-center justify-center mb-5 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  {/* Feature Bullets */}
                  <ul className="space-y-2 border-t border-slate-100 pt-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <NextLink
                    href="/order"
                    className="text-xs font-bold text-brand-primary hover:text-brand-primaryDark flex items-center gap-1.5"
                  >
                    <span>طلب الخدمة الآن</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </NextLink>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <NextLink
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white font-bold text-sm shadow-md transition-all"
          >
            <span>تفاصيل جميع الخدمات والتوصيل</span>
            <ArrowLeft className="w-4 h-4" />
          </NextLink>
        </div>
      </div>
    </section>
  );
};
