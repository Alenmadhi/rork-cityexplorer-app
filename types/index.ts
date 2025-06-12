// Weather types
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

// Shop types
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

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: EventCategory;
  organizer: string;
  price?: string;
  featured?: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export type EventCategory = 'music' | 'art' | 'food' | 'sports' | 'festival' | 'other';

// News types
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  image: string;
  category: string;
  source: string;
  featured?: boolean;
  location?: {
    name: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
}

// Tourist info types
export interface TouristInfo {
  id: string;
  title: string;
  description: string;
  image: string;
  category: TouristInfoCategory;
}

export type TouristInfoCategory = 'accommodation' | 'transportation' | 'emergency' | 'wifi' | 'tips' | 'phrasebook';

// Attraction types
export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  category: AttractionCategory;
  address: string;
  openingHours?: string;
  admissionFee?: string;
  rating: number;
  featured: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export type AttractionCategory = 'historical' | 'natural' | 'cultural' | 'religious' | 'entertainment';

// City Challenge types
export interface CityChallenge {
  id: string;
  title: string;
  description: string;
  clue: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: ChallengeType;
  location: {
    name: string;
    hint?: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    radius: number; // in meters, how close user needs to be
  };
  reward: {
    points: number;
    badge?: string;
    story?: string;
    puzzlePiece?: string;
  };
  image?: string;
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
  completedBy?: number; // count of users who completed
}

export type ChallengeType = 'riddle' | 'visual' | 'historical' | 'audio' | 'puzzle';

export interface UserChallenge {
  id: string;
  challengeId: string;
  userId: string;
  status: 'active' | 'completed' | 'expired';
  progress: number;
  completedAt?: string;
  hints: {
    used: boolean;
    usedAt?: string;
  }[];
  photos?: string[]; // base64 encoded photos user took at location
  notes?: string;
  sharedAt?: string;
}

export interface PuzzlePiece {
  id: string;
  image: string;
  position: number;
  collectedAt: string;
  belongsTo: string; // puzzle id
}

export interface Puzzle {
  id: string;
  title: string;
  description: string;
  totalPieces: number;
  reward: {
    points: number;
    badge: string;
  };
  expiresAt: string;
  image?: string; // completed puzzle image
}