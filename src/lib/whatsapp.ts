const WHATSAPP_PHONE = "201102060453";

export function getWhatsAppBaseUrl(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

export interface MedicineOrderPayload {
  customerName: string;
  phoneNumber?: string;
  medicineName: string;
  quantity?: string;
  notes?: string;
  hasPrescriptionImage?: boolean;
}

export function createWhatsAppMedicineOrderLink(data: MedicineOrderPayload): string {
  const lines = [
    "مرحبًا صيدلية الدكتور محمد شعبان (صيدليات الزيات) 🏥",
    "أود تقديم طلب دواء جديد من الموقع الإلكتروني:",
    "",
    `👤 *الاسم:* ${data.customerName || "غير محدد"}`,
    data.phoneNumber ? `📞 *رقم الهاتف:* ${data.phoneNumber}` : "",
    `💊 *اسم الدواء / المنتج:* ${data.medicineName}`,
    data.quantity ? `🔢 *الكمية:* ${data.quantity}` : "",
    data.notes ? `📝 *ملاحظات إضافية:* ${data.notes}` : "",
    data.hasPrescriptionImage
      ? "📷 *ملاحظة الروشتة:* سأقوم بإرفاق صورة الروشتة / العلبة الآن في هذه المحادثة."
      : "",
    "",
    "برجاء تأكيد التوفر وإفادتي بطريقة الاستلام والتوصيل. شكراً جزيلاً! ✨",
  ].filter(Boolean);

  return getWhatsAppBaseUrl(lines.join("\n"));
}

export function createWhatsAppProductInquiryLink(productName: string, categoryName?: string): string {
  const lines = [
    "السلام عليكم ورحمة الله وبركاته 🌿",
    "أود الاستفسار عن توفر المنتج التالي لدى صيدليات الزيات:",
    "",
    `🛍️ *المنتج:* ${productName}`,
    categoryName ? `🏷️ *القسم:* ${categoryName}` : "",
    "",
    "هل المنتج متوفر حالياً بالصيدلية؟ وما هي التفاصيل؟",
  ].filter(Boolean);

  return getWhatsAppBaseUrl(lines.join("\n"));
}

export function createWhatsAppOfferInquiryLink(offerTitle: string): string {
  const lines = [
    "السلام عليكم ورحمة الله وبركاته ✨",
    "شاهدت العرض التالي على موقع صيدليات الزيات وأود الاستفادة منه:",
    "",
    `🎁 *العرض:* ${offerTitle}`,
    "",
    "برجاء إفادتي بتفاصيل العرض والطلب. شكراً لكم!",
  ];

  return getWhatsAppBaseUrl(lines.join("\n"));
}

export function createWhatsAppConsultationLink(topic?: string): string {
  const lines = [
    "السلام عليكم ورحمة الله، د. محمد شعبان 🩺",
    "أود الحصول على استشارة صيدلانية / طبية سريعة بخصوص:",
    topic ? `📌 *الموضوع:* ${topic}` : "📌 استفسار دوائي وطريقة الاستخدام",
    "",
    "شاكر وممتن لحسن تعاونكم واهتمامكم دائمًا.",
  ];

  return getWhatsAppBaseUrl(lines.join("\n"));
}
