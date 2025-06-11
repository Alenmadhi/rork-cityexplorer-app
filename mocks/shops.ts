import { Shop, ShopCategory } from '@/types';

export const shops: Shop[] = [
  {
    id: '1',
    name: 'Elbasan Traditional Crafts',
    description: 'Authentic handmade Albanian crafts including traditional textiles, woodwork, and ceramics. Each piece tells a story of Albanian heritage and craftsmanship.',
    category: 'souvenirs',
    address: 'Rruga Qemal Stafa 24, Inside Castle Walls',
    phone: '+355 54 123 456',
    website: 'www.elbasancrafts.al',
    email: 'info@elbasancrafts.al',
    hours: 'Mon-Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 4:00 PM',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    promotion: {
      title: 'Summer Special',
      description: '20% off all handwoven textiles when you mention "Elbasan Guide App"',
      validUntil: '2025-08-31T23:59:59Z',
      discountPercent: 20
    },
    rating: 4.8,
    featured: true,
    coordinates: {
      latitude: 41.1123,
      longitude: 20.0828
    }
  },
  {
    id: '2',
    name: 'Olive & Vine Market',
    description: 'Premium local olive oils, wines, and gourmet foods from the Elbasan region. Taste and purchase the finest Albanian culinary products.',
    category: 'food',
    address: 'Bulevardi Qemal Stafa 45',
    phone: '+355 54 234 567',
    website: 'www.oliveandvine.al',
    email: 'shop@oliveandvine.al',
    hours: 'Mon-Sat: 8:00 AM - 8:00 PM, Sun: 9:00 AM - 3:00 PM',
    image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    promotion: {
      title: 'Tasting Experience',
      description: 'Free olive oil and wine tasting session every Friday from 4-6 PM',
      validUntil: '2025-12-31T23:59:59Z'
    },
    rating: 4.9,
    featured: true,
    coordinates: {
      latitude: 41.1130,
      longitude: 20.0835
    }
  },
  {
    id: '3',
    name: 'Moda Elbasan',
    description: 'Contemporary fashion with Albanian influences. Find unique clothing, accessories, and jewelry designed by local artisans.',
    category: 'clothing',
    address: 'Rruga 11 Nëntori 78',
    phone: '+355 54 345 678',
    website: 'www.modaelbasan.com',
    email: 'hello@modaelbasan.com',
    hours: 'Mon-Sat: 10:00 AM - 9:00 PM, Sun: 11:00 AM - 6:00 PM',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    promotion: {
      title: 'New Collection Discount',
      description: '15% off the new summer collection for tourists with passport',
      validUntil: '2025-09-15T23:59:59Z',
      discountPercent: 15
    },
    rating: 4.6,
    featured: false,
    coordinates: {
      latitude: 41.1140,
      longitude: 20.0845
    }
  },
  {
    id: '4',
    name: "Buka's Bakery",
    description: "Traditional Albanian bakery specializing in burek, byrek, and other local pastries. Everything is made fresh daily using local ingredients.",
    category: 'food',
    address: 'Rruga 28 Nëntori 12',
    phone: '+355 54 456 789',
    hours: 'Daily: 6:00 AM - 8:00 PM',
    image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    promotion: {
      title: 'Morning Special',
      description: 'Buy 3 pastries, get 1 free before 10 AM',
      validUntil: '2025-12-31T23:59:59Z'
    },
    rating: 4.7,
    featured: true,
    coordinates: {
      latitude: 41.1125,
      longitude: 20.0815
    }
  },
  {
    id: '5',
    name: 'Elbasan Antiques',
    description: 'Curated collection of antiques, vintage items, and collectibles from Albania and the Balkans. Each piece has been carefully selected for its historical significance.',
    category: 'souvenirs',
    address: 'Inside Castle Walls, Near King Mosque',
    phone: '+355 54 567 890',
    email: 'antiques@elbasan.al',
    hours: 'Tue-Sun: 11:00 AM - 6:00 PM, Closed Mondays',
    image: 'https://images.unsplash.com/photo-1584920515066-d04be0329cd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    promotion: {
      title: 'Authentication Service',
      description: 'Free authentication and history report with purchases over 5000 LEK',
      validUntil: '2025-10-31T23:59:59Z'
    },
    rating: 4.5,
    featured: false,
    coordinates: {
      latitude: 41.1127,
      longitude: 20.0832
    }
  },
  {
    id: '6',
    name: 'Mountain Gear Elbasan',
    description: 'Outdoor and hiking equipment for exploring the beautiful mountains around Elbasan. Rental services available for short-term visitors.',
    category: 'sports',
    address: 'Bulevardi Qemal Stafa 112',
    phone: '+355 54 678 901',
    website: 'www.mountaingear.al',
    email: 'info@mountaingear.al',
    hours: 'Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 5:00 PM',
    image: 'https://images.unsplash.com/photo-1605973029521-8154da591bd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    promotion: {
      title: 'Hiking Package',
      description: '25% off hiking equipment rental packages for weekend trips',
      validUntil: '2025-11-30T23:59:59Z',
      discountPercent: 25
    },
    rating: 4.4,
    featured: false,
    coordinates: {
      latitude: 41.1145,
      longitude: 20.0850
    }
  },
  {
    id: '7',
    name: 'Sweet Albania',
    description: 'Authentic Albanian sweets and desserts including baklava, kadaif, and revani. Perfect gifts to take home or enjoy during your stay.',
    category: 'food',
    address: 'Rruga 11 Nëntori 34',
    phone: '+355 54 789 012',
    hours: 'Daily: 8:00 AM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1587244141530-6b6aceef93db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    promotion: {
      title: 'Sweet Box Special',
      description: 'Assorted box of 12 traditional sweets for only 800 LEK',
      validUntil: '2025-12-31T23:59:59Z'
    },
    rating: 4.8,
    featured: true,
    coordinates: {
      latitude: 41.1135,
      longitude: 20.0825
    }
  },
  {
    id: '8',
    name: 'Elbasan Bookshop',
    description: 'Books about Albanian history, culture, and literature in multiple languages. Also features works by local authors and poets.',
    category: 'books',
    address: 'Rruga Qemal Stafa 56',
    phone: '+355 54 890 123',
    website: 'www.elbasanbooks.al',
    email: 'books@elbasan.al',
    hours: 'Mon-Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 2:00 PM',
    image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    promotion: {
      title: 'Cultural Package',
      description: 'Buy an Albanian history book and get a free city map',
      validUntil: '2025-12-31T23:59:59Z'
    },
    rating: 4.6,
    featured: false,
    coordinates: {
      latitude: 41.1120,
      longitude: 20.0820
    }
  }
];