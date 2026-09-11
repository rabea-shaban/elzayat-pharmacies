export interface Product {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  categorySlug: string;
  categoryName: string;
  description: string;
  benefits?: string[];
  usage?: string;
  image: string;
  badge?: string;
  isFeatured?: boolean;
  isAvailable: boolean;
  requiresPrescription?: boolean;
}
