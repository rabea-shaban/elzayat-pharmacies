import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, Tag, Check, ArrowLeft } from "lucide-react";
import { offers } from "@/data/offers";
import { Badge } from "@/components/common/Badge";
import { createWhatsAppOfferInquiryLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "العروض والباقات الخاصة | صيدليات الزيات",
  description:
    "استكشف أحدث عروض وتخفيضات صيدلية الدكتور محمد شعبان على منتجات العناية بالبشرة، روتين الشعر، وباقات رعاية الأم والطفل.",
};

export default function OffersPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" size="md">
            عروض موسمية وباقات حصرية
          </Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-[1.4] sm:leading-[1.45]">
            عروض صيدليات الزيات
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600 leading-relaxed">
            باقات توفيرية ومجموعات عناية متكاملة بأسعار مميزة وجودة أصلية 100% مختارة بعناية من فريق الصيدلية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => {
            const whatsappUrl = createWhatsAppOfferInquiryLink(offer.title);

            return (
              <div
                key={offer.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-cardHover transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {offer.discountBadge && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-amber-500 text-slate-900 font-black text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        {offer.discountBadge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-4 left-4 text-white">
                    <p className="text-xs font-bold text-amber-300">{offer.tagline}</p>
                    <span className="text-[11px] text-slate-300">{offer.validUntil}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {offer.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                    {offer.description}
                  </p>

                  {offer.itemsIncluded && (
                    <div className="bg-slate-50 rounded-2xl p-4 mb-5 border border-slate-100">
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
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{offer.ctaText || "طلب العرض عبر WhatsApp"}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
