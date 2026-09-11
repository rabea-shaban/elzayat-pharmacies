"use client";

import React from "react";
import { Star, MapPin, CheckCircle, MessageSquareQuote } from "lucide-react";
import { reviews } from "@/data/reviews";
import { pharmacyInfo } from "@/data/pharmacy";
import { SectionTitle } from "../common/SectionTitle";

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="تجارب عملائنا"
          badgeVariant="gold"
          title="ماذا يقول عملاؤنا في القيات والعدوة؟"
          subtitle="ثقتكم ورضاكم هي رأس مالنا ونجاحنا الحقيقي منذ عام 2019."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:shadow-cardHover hover:border-brand-primary/30 transition-all duration-300"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-brand-primary" />
                    {rev.location}
                  </span>
                </div>

                {rev.verified && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    عميل موثوق
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <div className="mt-12 text-center">
          <a
            href={pharmacyInfo.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 font-bold text-xs sm:text-sm shadow-sm transition-all"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>شاركنا رأيك أو شاهد التقييمات على Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
};
