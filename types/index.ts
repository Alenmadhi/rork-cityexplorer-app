export interface Weather {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  forecast: WeatherForecast[];
  lastUpdated: string;
}

export interface WeatherForecast {
  day: string;
  temperature: number;
  condition: string;
  icon: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  organizer: string;
  contact: string;
  price: string;
  isFree: boolean;
  isVirtual: boolean;
  url?: string;
  tags: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  source: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
  url?: string;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  phone: string;
  website?: string;
  email?: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  reviews: number;
  images: string[];
  tags: string[];
  promotions?: Promotion[];
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  code?: string;
  image?: string;
}

export interface CityChallenge {
  id: string;
  title: string;
  description: string;
  clue: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'riddle' | 'visual' | 'historical' | 'audio' | 'puzzle';
  location: {
    name: string;
    hint: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    radius: number; // meters
  };
  reward: {
    points: number;
    badge: string;
    story: string;
    puzzlePiece: string;
  };
  image: string;
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
  completedBy: number;
}