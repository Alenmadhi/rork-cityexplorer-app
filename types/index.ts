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
    radius: number;
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
  image: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  image: string;
  isFeatured: boolean;
  organizer: string;
  contact: string;
}

export type EventCategory = 'cultural' | 'sports' | 'music' | 'food' | 'art' | 'festival' | 'educational' | 'other';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  source: string;
  url: string;
  isFeatured: boolean;
}

export interface Weather {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  forecast?: {
    date: string;
    temperature: {
      min: number;
      max: number;
    };
    condition: string;
    icon: string;
  }[];
  lastUpdated: string;
}