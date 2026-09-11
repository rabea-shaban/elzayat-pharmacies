import type { Metadata } from "next";
import NextLink from "next/link";
import {
  Pill,
  UserCheck,
  Truck,
  Activity,
  HeartPulse,
  Heart,
  Check,
  MessageCircle,
  Phone,
} from "lucide-react";
import { services } from "@/data/services";
import { pharmacyInfo } from "@/data/pharmacy";
import { Badge } from "@/components/common/Badge";
import { getWhatsAppBaseUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "خدماتنا الطبية والصيدلانية | صيدلية د. محمد شعبان",
  description:
    "تعرف على كافة الخدمات الصيدلانية: صرف الأدوية، الاستشارات الدوائية، قياس المؤشرات الحيوية، العناية والتجميل، وخدمة التوصيل السريع للمنازل.",
};

const iconMap: Record<string, React.ElementType> = {
  Pill,
  UserCheck,
  Truck,
  Activity,
  HeartPulse,
  Heart,
};

export default function ServicesPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" size="md">
            رعاية صيدلية شاملة
          </Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-[1.4] sm:leading-[1.45]">
            خدمات صيدليات الزيات
          </h1>
          <p className="mt-3 text-lg text-brand-primary font-bold">
            صيدلية الدكتور محمد شعبان – منذ 2019
          </p>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            نقدم مجموعة متكاملة من الخدمات الطبية والاستشارية لضمان سلامة وصحة عائلتكم في قرية القيات والعدوة ومحافظة المنيا.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {services.map((service, index) => {
            const Icon = iconMap[service.iconName] || Pill;
            const isEven = index % 2 === 1;

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card hover:border-brand-primary/40 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className={`lg:col-span-8 ${isEven ? "lg:order-2" : "lg:order-1"} space-y-4`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 text-brand-primary flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {service.title}
                      </h2>
                      <span className="text-xs text-brand-primary font-semibold">
                        خدمة معتمدة لدى صيدليات الزيات
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {service.fullDesc}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-800 mb-2">
                      أهم مميزات الخدمة:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-4 ${isEven ? "lg:order-1" : "lg:order-2"} flex flex-col justify-center gap-3`}>
                  <NextLink
                    href="/order"
                    className="w-full py-3 px-4 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs sm:text-sm font-bold shadow-sm transition-all text-center"
                  >
                    طلب دواء لهذه الخدمة
                  </NextLink>

                  <a
                    href={getWhatsAppBaseUrl(`السلام عليكم، أود الاستفسار بخصوص خدمة: ${service.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>استفسار على WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
