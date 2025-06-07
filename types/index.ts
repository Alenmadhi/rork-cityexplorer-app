export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: EventCategory;
  price: string;
  isFeatured: boolean;
}

export type EventCategory = 'music' | 'art' | 'food' | 'sports' | 'festival' | 'other';

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

export type AttractionCategory = 'landmark' | 'museum' | 'park' | 'entertainment' | 'shopping' | 'restaurant';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  image: string;
  source: string;
  category: NewsCategory;
  isFeatured: boolean;
}

export type NewsCategory = 'local' | 'business' | 'culture' | 'sports' | 'politics' | 'other';

export interface TouristInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: TouristInfoCategory;
}

export type TouristInfoCategory = 'transportation' | 'accommodation' | 'emergency' | 'tips' | 'wifi';

export interface Weather {
  temperature: number;
  condition: string;
  icon: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  status: IssueStatus;
  type: IssueType;
  image?: string;
  anonymous: boolean;
  userId?: string;
  userName?: string;
  upvotes: number;
  updates?: IssueUpdate[];
  comments?: IssueComment[];
}

export type IssueStatus = 'pending' | 'in_progress' | 'resolved';
export type IssueType = 'Road Damage' | 'Trash' | 'Graffiti' | 'Broken Light' | 'Water Issue' | 'Other';

export interface IssueUpdate {
  id: string;
  date: string;
  message: string;
}

export interface IssueComment {
  id: string;
  userId: string;
  userName: string;
  date: string;
  text: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: BadgeCriteria;
  image: string;
  unlocked?: boolean;
}

export type BadgeCriteria = {
  type: 'reports' | 'upvotes' | 'comments' | 'fixes' | 'special';
  count: number;
};

export interface SuccessStory {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  date: string;
  location: string;
  issueId: string;
  featured: boolean;
}

export interface EmergencyAlert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'danger';
  active: boolean;
  startDate: string;
  endDate: string;
  link?: string;
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  hours?: string;
  description?: string;
  emergency?: boolean;
}

export type ServiceCategory = 'utilities' | 'healthcare' | 'emergency' | 'government' | 'tourism';

export interface UserStats {
  reportsSubmitted: number;
  reportsResolved: number;
  upvotesReceived: number;
  commentsPosted: number;
  badgesEarned: number;
}