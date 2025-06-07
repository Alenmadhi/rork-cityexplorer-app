// Emergency Alert type
export interface EmergencyAlert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'danger';
  active: boolean;
  link?: string;
}

// Success Story type
export interface SuccessStory {
  id: string;
  title: string;
  description: string;
  before: string; // Image URL
  after: string; // Image URL
  location: string;
  date: string;
  featured: boolean;
  likes: number;
  comments: number;
}

// Badge type
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

// User Stats type
export interface UserStats {
  reportsSubmitted: number;
  reportsResolved: number;
  points: number;
  rank: string;
  joinDate: string;
}

// Weather type
export interface Weather {
  temperature: number;
  condition: string;
  icon: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  location: string;
  lastUpdated: string;
}

// Event type
export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: string;
  isFree: boolean;
  price?: string;
  isFavorite?: boolean;
}

// Attraction type
export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  category: string;
  rating: number;
  openingHours: string;
  isFavorite?: boolean;
}

// News type
export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  source: string;
  category: string;
  isFavorite?: boolean;
}

// Tourist Info type
export interface TouristInfo {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  isFavorite?: boolean;
}

// Issue type
export interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: string;
  status: 'pending' | 'in-progress' | 'resolved';
  reportedBy: string;
  reportedDate: string;
  images?: string[];
  votes: number;
  comments: number;
}