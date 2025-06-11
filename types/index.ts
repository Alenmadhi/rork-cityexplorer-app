export type TourCategory = 'historical' | 'cultural' | 'culinary' | 'nature' | 'hidden-gems' | 'nightlife';
export type TourDifficulty = 'easy' | 'moderate' | 'challenging';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TourStop {
  id: string;
  title: string;
  description: string;
  image: string;
  coordinates: Coordinates;
  duration: string;
  order: number;
  audio?: string;
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
  rating?: number;
  reviewCount?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  stops: TourStop[];
}

export type AttractionCategory = 'landmark' | 'museum' | 'park' | 'entertainment' | 'shopping' | 'restaurant';

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  category: AttractionCategory;
  hours: string;
  price: string;
  isFeatured: boolean;
}

export interface WeatherForecast {
  day: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
  icon: string;
}

export interface Weather {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  location: string;
  forecast: WeatherForecast[];
  lastUpdated: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: 'local' | 'business' | 'culture' | 'sports' | 'politics' | 'other';
  featured: boolean;
  url?: string;
  coordinates?: Coordinates;
  locationName?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate?: string;
  location: string;
  category: 'festival' | 'concert' | 'sports' | 'exhibition' | 'workshop' | 'other';
  price?: string;
  organizer?: string;
  featured?: boolean;
  coordinates?: Coordinates;
}

export type ShopCategory = 'souvenirs' | 'food' | 'clothing' | 'books' | 'sports';

export interface ShopPromotion {
  title: string;
  description: string;
  validUntil: string;
  discountPercent?: number;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  category: ShopCategory;
  address: string;
  phone?: string;
  website?: string;
  email?: string;
  hours: string;
  image: string;
  promotion?: ShopPromotion;
  rating: number;
  featured: boolean;
  coordinates: Coordinates;
}