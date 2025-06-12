import { Event } from '@/types';

export const events: Event[] = [
  {
    id: '1',
    title: 'Summer Day Festival',
    description: 'Annual celebration of the end of winter and beginning of summer with traditional music, dance, and food in the city center.',
    date: '2023-03-14',
    time: '10:00 AM - 10:00 PM',
    location: 'Elbasan City Center',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'festival',
    organizer: 'Elbasan Municipality',
    price: 'Free',
    featured: true,
    coordinates: {
      latitude: 41.1123,
      longitude: 20.0826
    }
  },
  {
    id: '2',
    title: 'Elbasan Castle Food Festival',
    description: "Experience the best of traditional Albanian cuisine with local chefs showcasing regional specialties inside the historic castle walls.",
    date: '2023-07-15',
    time: '5:00 PM - 11:00 PM',
    location: 'Elbasan Castle',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'food',
    organizer: 'Elbasan Culinary Association',
    price: '500 LEK',
    featured: true,
    coordinates: {
      latitude: 41.1133,
      longitude: 20.0846
    }
  },
  {
    id: '3',
    title: 'Traditional Crafts Exhibition',
    description: 'Exhibition of traditional Albanian crafts including filigree, wood carving, and textile arts by local artisans.',
    date: '2023-08-10',
    time: '11:00 AM - 7:00 PM',
    location: 'Ethnographic Museum',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'art',
    organizer: 'Elbasan Artisans Guild',
    price: '300 LEK',
    featured: false,
    coordinates: {
      latitude: 41.1103,
      longitude: 20.0816
    }
  },
  {
    id: '4',
    title: 'Elbasan Marathon',
    description: 'Annual city marathon with routes through historic districts and scenic countryside.',
    date: '2023-09-24',
    time: '7:00 AM',
    location: 'Starting at Rruga Qemal Stafa',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'sports',
    organizer: 'Elbasan Athletics Club',
    price: '1500 LEK registration',
    featured: false,
    coordinates: {
      latitude: 41.1143,
      longitude: 20.0806
    }
  },
  {
    id: '5',
    title: 'Albanian Independence Day Celebration',
    description: 'Commemoration of Albanian independence with parades, performances, and fireworks.',
    date: '2023-11-28',
    time: '12:00 PM - 10:00 PM',
    location: 'Elbasan City Square',
    image: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'festival',
    organizer: 'Elbasan Municipality',
    price: 'Free',
    featured: true,
    coordinates: {
      latitude: 41.1123,
      longitude: 20.0826
    }
  },
  {
    id: '6',
    title: 'Balkan Music Festival',
    description: 'Three-day music festival featuring traditional and contemporary artists from across the Balkans.',
    date: '2023-08-05',
    time: '6:00 PM - 1:00 AM',
    location: 'Elbasan Stadium',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'music',
    organizer: 'Balkan Cultural Foundation',
    price: '2000 LEK',
    featured: false,
    coordinates: {
      latitude: 41.1163,
      longitude: 20.0876
    }
  }
];