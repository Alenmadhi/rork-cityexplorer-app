// Emergency Alert type
export interface EmergencyAlert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'danger';
  active: boolean;
  link?: string;
  affectedAreas?: string[];
  severity?: 'low' | 'medium' | 'high';
  expectedDuration?: string;
  contactInfo?: string;
  createdAt?: string;
  updatedAt?: string;
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
  criteria?: {
    type: 'reports' | 'upvotes' | 'comments' | 'fixes';
    count: number;
  };
}

// User Stats type
export interface UserStats {
  reportsSubmitted: number;
  reportsResolved: number;
  upvotesReceived?: number;
  commentsPosted?: number;
  badgesEarned?: number;
  points?: number;
  rank?: string;
  joinDate?: string;
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
  fullDescription?: string;
  image: string;
  gallery?: string[];
  date: string;
  time: string;
  location: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  organizer: string;
  category: string;
  isFree: boolean;
  price?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  isFavorite?: boolean;
  createdAt?: string;
  updatedAt?: string;
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
  resolvedDate?: string;
  images?: string[];
  votes: number;
  comments: number | Comment[];
  updates?: Update[];
}

// Comment type
export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

// Update type
export interface Update {
  id: string;
  status: 'pending' | 'in-progress' | 'resolved';
  text: string;
  createdAt: string;
  updatedBy: string;
  updatedByName: string;
}

// City Service type
export interface CityService {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  icon: string;
  category: string;
  schedule?: Record<string, string[]>;
  rates?: Record<string, string>;
  paymentOptions?: string[];
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
}

// Permit Application type
export interface PermitApplication {
  id: string;
  userId: string;
  serviceId: string;
  type: string;
  description: string;
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  attachments?: string[];
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  estimatedCompletionDate?: string;
  notes?: string;
  nextSteps?: string;
  assignedTo?: string;
}

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt?: string;
  lastActive?: string;
  issuesReported?: number;
  issuesResolved?: number;
  avatar?: string | null;
}

// Admin Dashboard Stats type
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalIssues: number;
  pendingIssues: number;
  inProgressIssues: number;
  resolvedIssues: number;
  totalEvents: number;
  upcomingEvents: number;
  alertsActive: number;
  permitsPending: number;
}