import type { Metadata } from "next";
import NextLink from "next/link";
import {
  Calendar,
  Award,
  ShieldCheck,
  Clock,
  HeartHandshake,
  CheckCircle2,
  MapPin,
  Pill,
  ArrowLeft,
} from "lucide-react";
import { pharmacyInfo } from "@/data/pharmacy";
import { Badge } from "@/components/common/Badge";
import { SectionTitle } from "@/components/common/SectionTitle";

export const metadata: Metadata = {
  title: "من نحن | قصة صيدلية الدكتور محمد شعبان منذ 2019",
  description:
    "تعرف على مسيرة صيدلية الدكتور محمد شعبان إحدى صيدليات الزيات بالقيات – العدوة – المنيا، وقيم الثقة والأمانة التي نبني عليها خدماتنا منذ عام 2019.",
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" size="md">
            منذ 2019 | {pharmacyInfo.brandNameEn}
          </Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy leading-[1.4] sm:leading-[1.45]">
            قصة صيدليات الزيات
          </h1>
          <p className="mt-3 text-lg text-brand-primary font-bold">
            صيدلية الدكتور محمد شعبان
          </p>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            مسيرة ممتدة من الرعاية الصيدلانية والأمانة المهنية في خدمة أهالي قرية القيات ومركز العدوة ومحافظة المنيا.
          </p>
        </div>

        {/* Story & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6 text-right">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">
              شكل جديد… وتجربة أفضل… ونفس الثقة
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              تأسست <strong>صيدلية الدكتور محمد شعبان</strong> في عام <strong>2019</strong> برؤية واضحة تضع صحة المريض وراحته في مقدمة الأولويات. لم نكن مجرد مكان لصرف الأدوية، بل كنا وما زلنا مستشاراً صحياً أميناً لكل أسرة في المنطقة.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              ومع التطور التكنولوجي واحتياجاتكم المتجددة، نطلق اليوم <strong>صيدليات الزيات بحلتها الجديدة</strong> لنقدم لكم تجربة رقمية سهلة تمكنكم من طلب الأدوية، إرسال الروشتات، والاستفسار عن كافة المستلزمات الطبية والتجميلية دون أي عناء.
            </p>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
              <p className="text-sm font-bold text-brand-navy flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-brand-primary" />
                <span>رسالتنا الأساسية:</span>
              </p>
              <p className="mt-1 text-sm text-slate-700 italic">
                &quot;{pharmacyInfo.tagline}&quot;
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-brand-navy text-white shadow-card">
                <Calendar className="w-8 h-8 text-amber-400 mb-3" />
                <span className="text-4xl font-black text-amber-400 block mb-1">2019</span>
                <span className="text-sm font-bold text-slate-200">سنة التأسيس</span>
                <p className="text-xs text-slate-400 mt-1">بداية الثقة والعمل الدؤوب</p>
              </div>

              <div className="p-6 rounded-3xl bg-sky-500 text-white shadow-card">
                <Award className="w-8 h-8 text-white mb-3" />
                <span className="text-4xl font-black text-white block mb-1">+7 سنوات</span>
                <span className="text-sm font-bold text-sky-100">خبرة صيدلانية</span>
                <p className="text-xs text-sky-100/80 mt-1">تطوير مستمر للخدمات</p>
              </div>

              <div className="p-6 rounded-3xl bg-emerald-600 text-white shadow-card">
                <Clock className="w-8 h-8 text-white mb-3" />
                <span className="text-4xl font-black text-white block mb-1">24/7</span>
                <span className="text-sm font-bold text-emerald-100">متاحون لكم</span>
                <p className="text-xs text-emerald-100/80 mt-1">استقبال الطلبات على واتساب</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-card">
                <ShieldCheck className="w-8 h-8 text-amber-400 mb-3" />
                <span className="text-4xl font-black text-amber-400 block mb-1">100%</span>
                <span className="text-sm font-bold text-slate-200">أدوية أصلية</span>
                <p className="text-xs text-slate-400 mt-1">تخزين سليم ومضمون</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 mb-20">
          <SectionTitle
            badge="قيمنا ومبادئنا"
            badgeVariant="primary"
            title="لماذا يختار أهالينا صيدليات الزيات؟"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-brand-primary flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">الأمانة الطبية والدوائية</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                لا نتهاون أبداً في جودة مصدر الدواء وتخزينه وفق درجات الحرارة المعتمدة لضمان أقصى فاعلية علاجية.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">الاهتمام باحتياجات المريض</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                الاستماع الدقيق وتوضيح جرعات الدواء والبدائل المتاحة لتوفير أفضل خيار علاجي واقتصادي للمريض.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">سرعة الاستجابة والتوصيل</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                تلبية سريعة لكافة الطلبات والروشتات وتوصيلها بأمان حتى باب منزلك في نطاق قرية القيات ومحيطها.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Footer on About */}
        <div className="text-center">
          <NextLink
            href="/order"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-primary hover:bg-brand-primaryDark text-white font-bold text-sm shadow-md transition-all"
          >
            <Pill className="w-4 h-4" />
            <span>طلب دواء أو استشارة صيدلانية الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </NextLink>
        </div>
      </div>
    </div>
  );
}
