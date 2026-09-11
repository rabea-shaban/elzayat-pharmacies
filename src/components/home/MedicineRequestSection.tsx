"use client";

import React, { useState } from "react";
import {
  Pill,
  Send,
  Camera,
  MessageCircle,
  Clock,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { pharmacyInfo } from "@/data/pharmacy";
import { createWhatsAppMedicineOrderLink } from "@/lib/whatsapp";
import { Badge } from "../common/Badge";

export const MedicineRequestSection: React.FC = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    medicineName: "",
    quantity: "1",
    notes: "",
    hasPrescription: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.medicineName.trim() && !formData.hasPrescription) {
      alert("برجاء إدخال اسم الدواء أو تحديد خيار إرفاق الروشتة.");
      return;
    }

    const whatsappUrl = createWhatsAppMedicineOrderLink({
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      medicineName: formData.medicineName || "مرفق صورة الروشتة",
      quantity: formData.quantity,
      notes: formData.notes,
      hasPrescriptionImage: formData.hasPrescription,
    });

    setSubmitted(true);
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="order-section" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white shadow-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Background Glow Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Text & Guidance Column */}
            <div className="lg:col-span-5 space-y-6 text-right">
              <div>
                <Badge variant="gold" size="md">
                  خدمة فورية سريعة 🔥
                </Badge>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white leading-[1.42] sm:leading-[1.45]">
                  محتاج دواء أو روشتة؟
                </h2>
                <p className="mt-2 text-brand-primaryLight text-base font-semibold">
                  اطلب الآن من صيدلية د. محمد شعبان
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                لا داعي للحضور خصيصاً للاستفسار عن توفر دواء أو علاج ناقص. املأ بيانات طلبك وسيتواصل معك الصيدلي فوراً لتأكيد التوفر والتنسيق للاستلام أو التوصيل.
              </p>

              {/* Steps Guide */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-brand-primaryLight flex items-center justify-center shrink-0 font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">اكتب اسم الدواء أو حدد الروشتة</h4>
                    <p className="text-[11px] text-slate-400">حدد الكمية وأي ملاحظات خاصة</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">إرسال مباشر إلى WhatsApp</h4>
                    <p className="text-[11px] text-slate-400">تجهيز الرسالة تلقائياً وتوجيهك للمحادثة</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">إرفاق صورة الروشتة والتأكيد</h4>
                    <p className="text-[11px] text-slate-400">إذا كان معك صورة روشتة، أرسلها في المحادثة فوراً</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  رد وتأكيد سريع
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-sky-300 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  سرية وخصوصية تامة
                </span>
              </div>
            </div>

            {/* Interactive Form Card */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-100"
              >
                <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-brand-primary flex items-center justify-center">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900">نموذج طلب دواء سريع</h3>
                      <p className="text-xs text-slate-500">مباشر إلى صيدليات الزيات</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    واتساب متاح الآن
                  </span>
                </div>

                <div className="space-y-4 text-right">
                  {/* Customer Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        اسم العميل (اختياري)
                      </label>
                      <input
                        type="text"
                        value={formData.customerName}
                        onChange={(e) =>
                          setFormData({ ...formData, customerName: e.target.value })
                        }
                        placeholder="مثال: أحمد محمود"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        رقم الهاتف للتواصل
                      </label>
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, phoneNumber: e.target.value })
                        }
                        placeholder="مثال: 01012345678"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary bg-slate-50/50 dir-ltr text-right"
                      />
                    </div>
                  </div>

                  {/* Medicine Name & Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        اسم الدواء أو المنتج المطلوب *
                      </label>
                      <input
                        type="text"
                        required={!formData.hasPrescription}
                        value={formData.medicineName}
                        onChange={(e) =>
                          setFormData({ ...formData, medicineName: e.target.value })
                        }
                        placeholder="اكتب اسم الدواء أو الصنف المطلوب بالتفصيل"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        الكمية / العلب
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({ ...formData, quantity: e.target.value })
                        }
                        placeholder="1"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary bg-slate-50/50 text-center font-bold"
                      />
                    </div>
                  </div>

                  {/* Prescription Checkbox / Upload Hint */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasPrescription}
                        onChange={(e) =>
                          setFormData({ ...formData, hasPrescription: e.target.checked })
                        }
                        className="w-4 h-4 text-brand-primary rounded border-slate-300 focus:ring-brand-primary"
                      />
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                        <Camera className="w-4 h-4 text-amber-700" />
                        <span>معي صورة روشتة طبية أو صورة علبة الدواء</span>
                      </div>
                    </label>
                    <p className="mt-1 text-[11px] text-amber-800 pr-7 leading-relaxed">
                      💡 عند الضغط على إرسال الطلب، سيتم فتح WhatsApp تلقائياً لتتمكن من إرفاق صورة الروشتة في الشات مباشرة لدكتور الصيدلية.
                    </p>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      ملاحظات أو تعليمات إضافية
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="أي تفاصيل خاصة بعنوان التوصيل أو مواعيد الاستلام أو تفاصيل الجرعة..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary bg-slate-50/50 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all flex items-center justify-center gap-2.5 active:scale-98"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>إرسال الطلب عبر WhatsApp الآن</span>
                    </button>
                  </div>

                  {submitted && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>تم فتح المحادثة على واتساب بنجاح! إذا لم تفتح اضغط على الزر مجدداً.</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
