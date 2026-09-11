"use client";

import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowLeft, Tag, Check } from "lucide-react";
import { offers } from "@/data/offers";
import { createWhatsAppOfferInquiryLink } from "@/lib/whatsapp";
import { SectionTitle } from "../common/SectionTitle";

export const OffersSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="عروض وباقات خاصة"
          badgeVariant="gold"
          title="عروض صيدليات الزيات الحصرية"
          subtitle="باقات توفيرية ومجموعات عناية متكاملة بأسعار مميزة وجودة أصلية 100%."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => {
            const whatsappUrl = createWhatsAppOfferInquiryLink(offer.title);

            return (
              <div
                key={offer.id}
                className="rounded-3xl bg-white border border-slate-200/90 shadow-card hover:shadow-cardHover transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Image & Badge */}
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {offer.discountBadge && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-amber-500 text-slate-900 font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        {offer.discountBadge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 left-3 text-white">
                    <p className="text-xs font-semibold text-amber-300">{offer.tagline}</p>
                  </div>
                </div>

                {/* Offer Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-brand-primary transition-colors">
                    {offer.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                    {offer.description}
                  </p>

                  {/* Included Items */}
                  {offer.itemsIncluded && offer.itemsIncluded.length > 0 && (
                    <div className="bg-slate-50 rounded-2xl p-3.5 mb-5 border border-slate-100">
                      <span className="text-xs font-bold text-slate-700 block mb-2">
                        محتويات الباقة:
                      </span>
                      <ul className="space-y-1.5">
                        {offer.itemsIncluded.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{offer.ctaText || "اطلب العرض عبر WhatsApp"}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <NextLink
            href="/offers"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-primaryDark"
          >
            <span>استعراض كافة العروض والباقات</span>
            <ArrowLeft className="w-4 h-4" />
          </NextLink>
        </div>
      </div>
    </section>
  );
};
