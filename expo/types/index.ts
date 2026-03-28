// Define types for the application

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  category: EventCategory;
  isFeatured?: boolean;
  price?: string;
  organizer?: string;
  contactInfo?: string;
}

export type EventCategory = 
  | 'cultural'
  | 'sports'
  | 'music'
  | 'food'
  | 'art'
  | 'festival'
  | 'other';

// News types
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishDate: string;
  author: string;
  imageUrl: string;
  category: string;
  source: string;
  isFeatured?: boolean;
  tags?: string[];
}

// Weather types
export interface Weather {
  location: string;
  currentTemp: number;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  forecast?: WeatherForecast[];
  lastUpdated: string;
  icon: string;
}

export interface WeatherForecast {
  day: string;
  condition: string;
  high: number;
  low: number;
  icon: string;
}

// Attraction types
export interface Attraction {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  category: string;
  rating: number;
  openingHours: string;
  price: string;
  isFeatured?: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Tourist info types
export interface TouristInfo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  isFeatured?: boolean;
}

// Emergency Alert types
export interface EmergencyAlert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'danger';
  active: boolean;
  date: string;
  link?: string;
}

// Success Story types
export interface SuccessStory {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  date: string;
  location: string;
  category: string;
  featured?: boolean;
  reportId?: string;
  likes?: number;
  comments?: Comment[];
}

// Shop types
export interface Shop {
  id: string;
  name: string;
  description: string;
  category: ShopCategory;
  address: string;
  phone?: string;
  website?: string;
  image: string;
  rating: number;
  reviewCount: number;
  openingHours: string;
  featured?: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  promotions?: Promotion[];
}

export type ShopCategory = 'souvenirs' | 'food' | 'clothing' | 'books' | 'sports';

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image?: string;
}

export type AttractionCategory = 'landmark' | 'museum' | 'park' | 'entertainment' | 'shopping' | 'restaurant';

// Comment type for success stories
export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}