import { Badge } from '@/types';

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'First Report',
    description: 'Submit your first issue report',
    icon: 'alert-triangle',
    criteria: {
      type: 'reports',
      count: 1
    },
    image: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=200&auto=format&fit=crop',
    unlocked: false
  },
  {
    id: '2',
    name: 'Active Citizen',
    description: 'Submit 5 issue reports',
    icon: 'user-check',
    criteria: {
      type: 'reports',
      count: 5
    },
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=200&auto=format&fit=crop',
    unlocked: false
  },
  {
    id: '3',
    name: 'Community Leader',
    description: 'Submit 10 issue reports',
    icon: 'users',
    criteria: {
      type: 'reports',
      count: 10
    },
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=200&auto=format&fit=crop',
    unlocked: false
  },
  {
    id: '4',
    name: 'Problem Solver',
    description: 'Have one of your reported issues resolved',
    icon: 'check-circle',
    criteria: {
      type: 'fixes',
      count: 1
    },
    image: 'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?q=80&w=200&auto=format&fit=crop',
    unlocked: false
  },
  {
    id: '5',
    name: 'City Improver',
    description: 'Have 5 of your reported issues resolved',
    icon: 'award',
    criteria: {
      type: 'fixes',
      count: 5
    },
    image: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=200&auto=format&fit=crop',
    unlocked: false
  },
  {
    id: '6',
    name: 'Popular Voice',
    description: 'Receive 10 upvotes on your reports',
    icon: 'thumbs-up',
    criteria: {
      type: 'upvotes',
      count: 10
    },
    image: 'https://images.unsplash.com/photo-1569937756447-1d44f657dc69?q=80&w=200&auto=format&fit=crop',
    unlocked: false
  },
  {
    id: '7',
    name: 'Engaged Citizen',
    description: 'Post 5 comments on issues',
    icon: 'message-circle',
    criteria: {
      type: 'comments',
      count: 5
    },
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=200&auto=format&fit=crop',
    unlocked: false
  },
  {
    id: '8',
    name: 'City Guardian',
    description: 'Special badge for exceptional contribution',
    icon: 'shield',
    criteria: {
      type: 'special',
      count: 1
    },
    image: 'https://images.unsplash.com/photo-1601301115749-c6a3e1e74c64?q=80&w=200&auto=format&fit=crop',
    unlocked: false
  }
];