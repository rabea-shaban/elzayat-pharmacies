import { Offer } from "@/types/offer";

export const offers: Offer[] = [
  {
    id: "offer-skincare-bundle",
    title: "باقة النضارة والترطيب المتكاملة للبشرة",
    tagline: "خصم خاص على مجموعة العناية اليومية",
    description: "احصلي على روتين نضارة كامل يجمع بين غسول الترطيب وسيروم الهيالورونيك مع واقي شمس بحماية فائقة.",
    discountBadge: "باقة توفيرية",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    itemsIncluded: [
      "غسول مرطب بحمض الهيالورونيك",
      "سيروم معزز للنضارة والإشراق",
      "كريم واقي شمس SPF 50+",
    ],
    validUntil: "ساري حتى نفاد الكمية",
    ctaText: "اطلب الباقة عبر WhatsApp",
  },
  {
    id: "offer-haircare-routine",
    title: "كورس مكافحة تساقط الشعر وتقوية البصيلات",
    tagline: "استعيدي كثافة ولمعان شعرك الصحي",
    description: "باقة علاجية فعالة تضم شامبو طبي لتقوية الجذور، سيروم مغذي، وأقراص فيتامينات البيوتين والزنك.",
    discountBadge: "عرض خاص",
    badgeType: "new",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
    itemsIncluded: [
      "شامبو معالج لتساقط الشعر",
      "سيروم مركز لتغذية الفروة",
      "مكمل غذائي فيتامينات للشعر والأظافر",
    ],
    validUntil: "عرض موسمي حصري",
    ctaText: "استفسر عن كورس الشعر",
  },
  {
    id: "offer-mother-baby-care",
    title: "مجموعة العناية الفائقة بالمولود الجديد",
    tagline: "أمان ونعومة فائقة لراحة طفلك والأم",
    description: "تشكيلة مختارة من مستلزمات العناية بالرضيع، تشمل كريم الحماية من التسلخات، شاور بدون دموع، وزيت المساج الطبيعي.",
    discountBadge: "الأكثر طلباً",
    badgeType: "care",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80",
    itemsIncluded: [
      "كريم علاجي لحماية منطقة الحفاض",
      "شامبو وشاور أطفال لطيف خالي من الصابون",
      "مناديل مبللة نقية 99% ماء",
    ],
    validUntil: "متاح طوال الشهر",
    ctaText: "احجز مجموعة المولود",
  },
];
