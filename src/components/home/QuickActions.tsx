"use client";

import React from "react";
import NextLink from "next/link";
import { Pill, MessageCircle, Phone, MapPin, ArrowLeft } from "lucide-react";
import { pharmacyInfo } from "@/data/pharmacy";
import { getWhatsAppBaseUrl } from "@/lib/whatsapp";

export const QuickActions: React.FC = () => {
  const actions = [
    {
      title: "اطلب دواء",
      subtitle: "أرسل اسم الدواء أو استفسار الروشتة",
      icon: Pill,
      href: "/order",
      isExternal: false,
      color: "from-sky-500 to-brand-primary",
      bgLight: "bg-sky-50",
      textColor: "text-brand-primary",
      borderHover: "hover:border-brand-primary/60",
    },
    {
      title: "WhatsApp",
      subtitle: "تواصل معنا مباشرة وسريعاً",
      icon: MessageCircle,
      href: getWhatsAppBaseUrl("السلام عليكم د. محمد شعبان، أود التواصل مع صيدليات الزيات"),
      isExternal: true,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
      borderHover: "hover:border-emerald-500/60",
    },
    {
      title: "اتصل بنا",
      subtitle: pharmacyInfo.formattedPhone,
      icon: Phone,
      href: `tel:${pharmacyInfo.phone}`,
      isExternal: true,
      color: "from-blue-600 to-indigo-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
      borderHover: "hover:border-blue-500/60",
    },
    {
      title: "موقعنا",
      subtitle: "القيّات – مركز العدوة – المنيا",
      icon: MapPin,
      href: pharmacyInfo.address.googleMapsUrl,
      isExternal: true,
      color: "from-rose-500 to-pink-600",
      bgLight: "bg-rose-50",
      textColor: "text-rose-600",
      borderHover: "hover:border-rose-500/60",
    },
  ];

  return (
    <section className="relative -mt-8 sm:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          const CardContent = (
            <div
              className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-card hover:shadow-cardHover ${action.borderHover} transition-all duration-300 group flex flex-col justify-between h-full`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl ${action.bgLight} ${action.textColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-primary group-hover:bg-sky-50 transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-brand-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {action.subtitle}
                </p>
              </div>
            </div>
          );

          if (action.isExternal) {
            return (
              <a
                key={idx}
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block h-full"
              >
                {CardContent}
              </a>
            );
          }

          return (
            <NextLink key={idx} href={action.href} className="block h-full">
              {CardContent}
            </NextLink>
          );
        })}
      </div>
    </section>
  );
};
