// Add Shop types to the existing types file
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
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export type ShopCategory = 'souvenirs' | 'food' | 'clothing' | 'books' | 'sports';

export interface ShopPromotion {
  title: string;
  description: string;
  validUntil?: string;
  discountPercent?: number;
}

export interface Weather {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  windSpeed: number;
  humidity: number;
  lastUpdated: string;
  forecast?: WeatherForecast[];
}

export interface WeatherForecast {
  day: string;
  icon: string;
  temperature: {
    min: number;
    max: number;
  };
}