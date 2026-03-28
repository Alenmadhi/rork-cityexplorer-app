import { Event } from '@/types';

export const events: Event[] = [
  {
    id: '1',
    title: 'Elbasan Summer Festival',
    description: 'Annual summer festival with music, food, and cultural performances celebrating the rich heritage of Elbasan.',
    date: '2025-07-15',
    time: '18:00 - 23:00',
    location: 'Elbasan Castle',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1074',
    category: 'festival',
    organizer: 'Elbasan Municipality',
    price: 'Free',
    featured: true,
    coordinates: {
      latitude: 41.1125,
      longitude: 20.0822
    }
  },
  {
    id: '2',
    title: 'Traditional Albanian Cuisine Workshop',
    description: 'Learn how to prepare authentic Albanian dishes with local chefs. Ingredients and recipes provided.',
    date: '2025-06-20',
    time: '14:00 - 17:00',
    location: 'Elbasan Culinary Center',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1170',
    category: 'food',
    organizer: 'Albanian Culinary Association',
    price: '25€',
    featured: false,
    coordinates: {
      latitude: 41.1095,
      longitude: 20.0802
    }
  },
  {
    id: '3',
    title: 'Elbasan Symphony Orchestra Concert',
    description: 'A night of classical music featuring works by Albanian and international composers performed by the Elbasan Symphony Orchestra.',
    date: '2025-06-25',
    time: '19:30 - 21:30',
    location: 'Elbasan Theater',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1170',
    category: 'music',
    organizer: 'Elbasan Cultural Center',
    price: '15€',
    featured: true,
    coordinates: {
      latitude: 41.1115,
      longitude: 20.0832
    }
  },
  {
    id: '4',
    title: 'Contemporary Art Exhibition',
    description: 'Exhibition featuring works by emerging Albanian artists exploring themes of identity, tradition, and modernity.',
    date: '2025-06-18',
    time: '10:00 - 18:00',
    location: 'Elbasan Art Gallery',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=1170',
    category: 'art',
    organizer: 'Albanian Artists Association',
    price: '5€',
    featured: false,
    coordinates: {
      latitude: 41.1105,
      longitude: 20.0812
    }
  },
  {
    id: '5',
    title: 'Elbasan Marathon',
    description: 'Annual marathon through the historic streets of Elbasan. Categories include full marathon, half marathon, and 10K run.',
    date: '2025-07-05',
    time: '08:00 - 14:00',
    location: 'Elbasan City Center',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=1170',
    category: 'sports',
    organizer: 'Elbasan Sports Association',
    price: '20€',
    featured: true,
    coordinates: {
      latitude: 41.1135,
      longitude: 20.0842
    }
  },
  {
    id: '6',
    title: 'Traditional Folk Dance Workshop',
    description: 'Learn traditional Albanian folk dances with professional dancers. All skill levels welcome.',
    date: '2025-06-22',
    time: '16:00 - 18:00',
    location: 'Elbasan Community Center',
    image: 'https://images.unsplash.com/photo-1504609813442-a9924e2e4531?auto=format&fit=crop&q=80&w=1170',
    category: 'other',
    organizer: 'Albanian Folk Dance Ensemble',
    price: '10€',
    featured: false,
    coordinates: {
      latitude: 41.1145,
      longitude: 20.0852
    }
  },
  {
    id: '7',
    title: 'Wine Tasting: Albanian Varieties',
    description: 'Discover the rich flavors of Albanian wines with expert sommeliers. Includes tasting of 6 premium local wines.',
    date: '2025-06-28',
    time: '19:00 - 21:00',
    location: 'Elbasan Wine Cellar',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1170',
    category: 'food',
    organizer: 'Albanian Wine Association',
    price: '30€',
    featured: true,
    coordinates: {
      latitude: 41.1155,
      longitude: 20.0862
    }
  },
  {
    id: '8',
    title: 'Summer Jazz Nights',
    description: 'Open-air jazz concert featuring local and international jazz musicians in the beautiful setting of Elbasan Castle.',
    date: '2025-07-10',
    time: '20:00 - 23:00',
    location: 'Elbasan Castle Courtyard',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=80&w=1170',
    category: 'music',
    organizer: 'Elbasan Jazz Club',
    price: '12€',
    featured: false,
    coordinates: {
      latitude: 41.1125,
      longitude: 20.0822
    }
  }
];