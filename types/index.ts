export type NewsCategory = 'local' | 'business' | 'culture' | 'sports' | 'politics' | 'other';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: NewsCategory;
  image: string;
  date: string;
  author: string;
  source?: string;
  url?: string;
  featured?: boolean;
  locationName?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export type TourCategory = 'historical' | 'cultural' | 'culinary' | 'nature' | 'adventure';
export type TourDifficulty = 'easy' | 'moderate' | 'challenging';

export interface TourStop {
  id: string;
  title: string;
  description: string;
  image: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  duration: string;
  order: number;
  funFacts?: string[];
  localTips?: string[];
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  distance: string;
  difficulty: string;
  image: string;
  featured?: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  stops: TourStop[];
}