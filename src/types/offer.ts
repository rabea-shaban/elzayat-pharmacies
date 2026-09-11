export interface Offer {
  id: string;
  title: string;
  tagline: string;
  description: string;
  discountBadge?: string;
  badgeType?: 'hot' | 'new' | 'limited' | 'care';
  image: string;
  itemsIncluded?: string[];
  validUntil?: string;
  ctaText?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'exterior' | 'products' | 'team' | 'opening';
  categoryLabel: string;
  image: string;
  description: string;
}
