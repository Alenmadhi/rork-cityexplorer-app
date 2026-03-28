import { Shop } from '@/types';

export const shops: Shop[] = [
  {
    id: '1',
    name: 'Elbasan Artisans',
    description: 'Traditional handcrafted souvenirs and gifts made by local artisans. Featuring wood carvings, textiles, and ceramics that showcase Albanian craftsmanship.',
    category: 'souvenirs',
    address: '15 Qemal Stafa Street, Elbasan',
    phone: '+355 42 123 456',
    website: 'www.elbasanartisans.al',
    email: 'info@elbasanartisans.al',
    hours: 'Mon-Sat: 9:00-19:00, Sun: 10:00-16:00',
    image: 'https://images.unsplash.com/photo-1516959512470-53955cd40f40?auto=format&fit=crop&q=80&w=1170',
    promotion: {
      title: '20% Off All Ceramics',
      description: 'Special discount on all handmade ceramic items this month',
      validUntil: '2025-07-15',
      discountPercent: 20
    },
    rating: 4.8,
    featured: true,
    coordinates: {
      latitude: 41.1125,
      longitude: 20.0822
    }
  },
  {
    id: '2',
    name: 'Taste of Albania',
    description: 'Gourmet shop offering traditional Albanian food products including olive oil, honey, raki, and local wines. Perfect for culinary souvenirs.',
    category: 'food',
    address: '28 Rruga e Kavajës, Elbasan',
    phone: '+355 42 234 567',
    website: 'www.tasteofalbania.com',
    email: 'shop@tasteofalbania.com',
    hours: 'Mon-Sat: 8:00-20:00, Sun: 9:00-18:00',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1074',
    rating: 4.6,
    featured: true,
    coordinates: {
      latitude: 41.1115,
      longitude: 20.0832
    }
  },
  {
    id: '3',
    name: 'Albanian Heritage Textiles',
    description: 'Specializing in traditional Albanian textiles including handwoven rugs, embroidered tablecloths, and authentic folk costumes.',
    category: 'clothing',
    address: '5 Rruga Myslym Shyri, Elbasan',
    phone: '+355 42 345 678',
    email: 'heritage@albaniantextiles.al',
    hours: 'Mon-Fri: 10:00-18:00, Sat: 10:00-16:00, Sun: Closed',
    image: 'https://images.unsplash.com/photo-1489367874814-f5d040621dd8?auto=format&fit=crop&q=80&w=1146',
    promotion: {
      title: 'Free Embroidery Workshop',
      description: 'Join our free traditional embroidery workshop with any purchase over €50',
      validUntil: '2025-06-30'
    },
    rating: 4.7,
    featured: false,
    coordinates: {
      latitude: 41.1105,
      longitude: 20.0812
    }
  },
  {
    id: '4',
    name: 'Elbasan Bookshop',
    description: 'Independent bookstore offering a wide selection of books in Albanian and English, including local history, travel guides, and works by Albanian authors.',
    category: 'books',
    address: '42 Boulevard Zhan D\'Ark, Elbasan',
    phone: '+355 42 456 789',
    website: 'www.elbasanbooks.al',
    email: 'read@elbasanbooks.al',
    hours: 'Mon-Sat: 9:00-20:00, Sun: 11:00-17:00',
    image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&q=80&w=1171',
    rating: 4.5,
    featured: false,
    coordinates: {
      latitude: 41.1135,
      longitude: 20.0842
    }
  },
  {
    id: '5',
    name: 'Mountain Sports Elbasan',
    description: 'Outdoor and adventure sports equipment shop. Offers hiking gear, camping equipment, and sportswear suitable for exploring the Albanian mountains.',
    category: 'sports',
    address: '17 Rruga Sami Frashëri, Elbasan',
    phone: '+355 42 567 890',
    website: 'www.mountainsportselbasan.al',
    email: 'info@mountainsportselbasan.al',
    hours: 'Mon-Sat: 9:00-19:00, Sun: Closed',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1170',
    promotion: {
      title: 'Hiking Season Sale',
      description: 'Up to 30% off on selected hiking equipment',
      validUntil: '2025-08-31',
      discountPercent: 30
    },
    rating: 4.4,
    featured: true,
    coordinates: {
      latitude: 41.1145,
      longitude: 20.0852
    }
  },
  {
    id: '6',
    name: 'Silver Filigree Gallery',
    description: 'Showcasing the traditional Albanian craft of silver filigree. Offers handmade jewelry, decorative items, and custom pieces by local silversmiths.',
    category: 'souvenirs',
    address: '9 Rruga Abdyl Frashëri, Elbasan',
    phone: '+355 42 678 901',
    email: 'gallery@silverfiligree.al',
    hours: 'Tue-Sat: 10:00-18:00, Sun-Mon: Closed',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=1287',
    rating: 4.9,
    featured: false,
    coordinates: {
      latitude: 41.1155,
      longitude: 20.0862
    }
  },
  {
    id: '7',
    name: 'Elbasan Spice Market',
    description: 'Traditional market selling a variety of local and imported spices, herbs, teas, and specialty food items. Known for its authentic Albanian spice blends.',
    category: 'food',
    address: '23 Rruga e Elbasanit, Elbasan',
    phone: '+355 42 789 012',
    hours: 'Mon-Sat: 7:00-17:00, Sun: 7:00-13:00',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=1064',
    rating: 4.7,
    featured: true,
    coordinates: {
      latitude: 41.1165,
      longitude: 20.0872
    }
  },
  {
    id: '8',
    name: 'Modern Albanian Fashion',
    description: 'Contemporary clothing store featuring designs by Albanian fashion designers. Combines traditional elements with modern styles.',
    category: 'clothing',
    address: '36 Boulevard Dëshmorët e Kombit, Elbasan',
    phone: '+355 42 890 123',
    website: 'www.modernalbanian.com',
    email: 'shop@modernalbanian.com',
    hours: 'Mon-Sat: 10:00-20:00, Sun: 12:00-18:00',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1170',
    promotion: {
      title: 'Summer Collection Launch',
      description: 'Be the first to see our new summer collection with special opening day discounts',
      validUntil: '2025-06-15',
      discountPercent: 15
    },
    rating: 4.3,
    featured: false,
    coordinates: {
      latitude: 41.1175,
      longitude: 20.0882
    }
  }
];