export interface EmergencyAlert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'danger';
  active: boolean;
  date: string;
  link?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  address?: string;
  website?: string;
  createdAt: string;
}

export interface SuccessStory {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  location: string;
  date: string;
  featured?: boolean;
  likes?: number;
  votes?: number;
  comments?: Comment[] | number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  level?: number;
  points?: number;
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

export interface WeatherForecast {
  day: string;
  temperature: {
    min: number;
    max: number;
  };
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
  image: string;
  category: string;
  price: string;
  featured?: boolean;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  category: string;
  openingHours: string;
  price: string;
  featured?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  featured?: boolean;
}

export interface TouristInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}