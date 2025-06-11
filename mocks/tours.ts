import { Tour, TourCategory, TourDifficulty } from '@/types';

export const tours: Tour[] = [
  {
    id: '1',
    title: 'Elbasan Through Time',
    description: 'Explore the rich history of Elbasan through its most iconic historical landmarks. This tour takes you through centuries of Albanian history, from ancient fortifications to Ottoman-era architecture.',
    category: 'historical',
    duration: '3 hours',
    distance: '4.2 km',
    difficulty: 'moderate',
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    tags: ['history', 'architecture', 'castle', 'ottoman'],
    createdAt: '2025-01-15T12:00:00Z',
    updatedAt: '2025-05-20T14:30:00Z',
    stops: [
      {
        id: '1-1',
        title: 'Elbasan Castle',
        description: 'Built in the 15th century by Sultan Mehmet II, this impressive fortress once enclosed the entire old city. Today, you can walk along its walls and explore the historic neighborhood inside.',
        image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1123,
          longitude: 20.0826
        },
        duration: '45 minutes',
        order: 1,
        funFacts: [
          'The castle walls are 2 meters thick in some places',
          'The fortress originally had 26 towers, though only a few remain today',
          'Local legend says there is a network of secret tunnels beneath the castle'
        ],
        localTips: [
          'Visit early morning to avoid crowds and get the best photos',
          'The south wall offers the best views of the city',
          'Try the traditional tea at the small café near the east entrance'
        ]
      },
      {
        id: '1-2',
        title: 'King Mosque',
        description: 'One of the oldest mosques in Albania, built in 1492. Its unique architecture blends Ottoman and local Albanian styles, with beautiful interior decorations.',
        image: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1125,
          longitude: 20.0830
        },
        duration: '30 minutes',
        order: 2,
        funFacts: [
          'The mosque was converted to a church during the communist era',
          'It was restored to its original function in the 1990s',
          'The minaret was completely rebuilt using traditional techniques'
        ]
      },
      {
        id: '1-3',
        title: 'Ethnographic Museum',
        description: 'Housed in a traditional 18th-century home, this museum showcases the daily life, crafts, and traditions of Elbasan through the centuries.',
        image: 'https://images.unsplash.com/photo-1552248524-10d9a7e4b84a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1130,
          longitude: 20.0835
        },
        duration: '1 hour',
        order: 3,
        funFacts: [
          'The building itself is over 250 years old',
          'Many of the artifacts were donated by local families',
          'The traditional costumes on display show influences from Ottoman, Greek, and Italian cultures'
        ],
        localTips: [
          'Ask the curator about the wedding traditions - they have fascinating stories',
          'The handwoven textiles are still made by local artisans you can visit',
          'Photography is allowed but without flash'
        ]
      },
      {
        id: '1-4',
        title: 'Old Bazaar Street',
        description: 'Walk through the historic commercial center of Elbasan, where merchants have traded goods for centuries. Some shops still use traditional methods to create their wares.',
        image: 'https://images.unsplash.com/photo-1555529771-7888783a18d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1135,
          longitude: 20.0840
        },
        duration: '45 minutes',
        order: 4,
        localTips: [
          'Bargaining is expected in the traditional shops',
          'Try the local specialty "bugaçe" from the bakery at the corner',
          'The silversmith at the end of the street has been using the same techniques for generations'
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Tastes of Elbasan',
    description: 'Discover the rich culinary heritage of Elbasan through this food-focused tour. Sample traditional dishes, meet local chefs, and learn about the unique flavors that define this region.',
    category: 'culinary',
    duration: '4 hours',
    distance: '3.5 km',
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    rating: 4.9,
    reviewCount: 87,
    tags: ['food', 'culinary', 'traditional', 'local'],
    createdAt: '2025-02-10T10:00:00Z',
    updatedAt: '2025-05-15T09:45:00Z',
    stops: [
      {
        id: '2-1',
        title: 'Traditional Bakery',
        description: 'Start your culinary journey with freshly baked Albanian pastries. Try the famous Elbasan bugaçe, a special type of bread unique to this region.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1120,
          longitude: 20.0815
        },
        duration: '30 minutes',
        order: 1,
        funFacts: [
          'This bakery has been operated by the same family for over 80 years',
          'Their oven is still heated with wood for authentic flavor',
          'The recipe for their signature bread is a closely guarded family secret'
        ]
      },
      {
        id: '2-2',
        title: 'Spice Market',
        description: 'Explore the vibrant spice market where local vendors sell fresh herbs, spices, and produce. Learn about the essential ingredients in Albanian cuisine.',
        image: 'https://images.unsplash.com/photo-1519624213695-6819a985fb0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1125,
          longitude: 20.0820
        },
        duration: '45 minutes',
        order: 2,
        localTips: [
          'The best saffron can be found at the stall with the blue awning',
          'Ask vendors for cooking tips - they are usually happy to share',
          'Morning is the best time to visit for the freshest produce'
        ]
      },
      {
        id: '2-3',
        title: 'Tavë Kosi Workshop',
        description: 'Participate in a cooking demonstration of Tavë Kosi, the famous Elbasan dish made with lamb, rice, and yogurt sauce. Learn the techniques and then enjoy tasting this local specialty.',
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1130,
          longitude: 20.0825
        },
        duration: '1.5 hours',
        order: 3,
        funFacts: [
          'Tavë Kosi is sometimes called "the national dish of Albania"',
          'The dish dates back to the Ottoman period',
          'Every family in Elbasan has their own slight variation of the recipe'
        ],
        localTips: [
          'The key to authentic flavor is using lamb from the surrounding mountains',
          'Local yogurt makes a big difference in the taste',
          'Take notes during the demonstration - the chef shares secret tips not found in cookbooks'
        ]
      },
      {
        id: '2-4',
        title: 'Traditional Restaurant',
        description: 'Complete your culinary tour with a full meal at a family-run restaurant serving authentic Albanian cuisine in a charming setting.',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1135,
          longitude: 20.0830
        },
        duration: '1 hour',
        order: 4,
        localTips: [
          'Try the house wine made from local grapes',
          'Save room for the traditional desserts, especially the revani',
          'Ask for the "family menu" for the most authentic experience'
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Green Escape Tour',
    description: 'Discover the natural beauty of Elbasan through its parks, gardens, and riverside walks. This refreshing tour offers a peaceful escape from the urban bustle.',
    category: 'nature',
    duration: '2.5 hours',
    distance: '5 km',
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.6,
    reviewCount: 52,
    tags: ['nature', 'parks', 'walking', 'relaxation'],
    createdAt: '2025-03-05T15:30:00Z',
    updatedAt: '2025-05-10T11:20:00Z',
    stops: [
      {
        id: '3-1',
        title: 'Central Park',
        description: "Begin your green journey at Elbasan's main park, with its majestic old trees, flower gardens, and peaceful walking paths.",
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1115,
          longitude: 20.0810
        },
        duration: '45 minutes',
        order: 1,
        funFacts: [
          'Some of the oak trees in this park are over 100 years old',
          'The park was redesigned in the 1970s by a famous landscape architect',
          'It hosts the annual Summer Day Festival every March'
        ]
      },
      {
        id: '3-2',
        title: 'Shkumbin Riverside Walk',
        description: 'Follow the scenic path along the Shkumbin River, enjoying views of the water and surrounding landscape.',
        image: 'https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1110,
          longitude: 20.0805
        },
        duration: '1 hour',
        order: 2,
        localTips: [
          'The best sunset views are from the small wooden bridge',
          'Bring binoculars if you enjoy birdwatching',
          'The riverside café at the halfway point serves excellent mountain tea'
        ]
      },
      {
        id: '3-3',
        title: 'Botanical Garden',
        description: 'Explore this hidden gem featuring native Albanian plants and flowers, with special sections dedicated to medicinal herbs and rare species.',
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1105,
          longitude: 20.0800
        },
        duration: '45 minutes',
        order: 3,
        funFacts: [
          'The garden contains over 300 species of plants native to Albania',
          'It plays an important role in conserving endangered local plant species',
          'Many of the medicinal herbs have been used in traditional Albanian medicine for centuries'
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Art & Street Culture Tour',
    description: "Discover Elbasan's vibrant contemporary art scene, from colorful street murals to hidden galleries and artisan workshops.",
    category: 'cultural',
    duration: '3 hours',
    distance: '3.8 km',
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1551913902-c92207136625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    reviewCount: 38,
    tags: ['art', 'culture', 'street art', 'contemporary'],
    createdAt: '2025-01-20T09:15:00Z',
    updatedAt: '2025-04-25T16:40:00Z',
    stops: [
      {
        id: '4-1',
        title: 'Street Art Alley',
        description: 'Explore this colorful alleyway where local and international artists have created stunning murals that reflect Albanian culture and history.',
        image: 'https://images.unsplash.com/photo-1551913902-c92207136625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1140,
          longitude: 20.0845
        },
        duration: '45 minutes',
        order: 1,
        funFacts: [
          'This project began as a grassroots initiative by local youth in 2018',
          'New murals are added every summer during the street art festival',
          'Some artworks contain hidden symbols of Albanian folklore'
        ]
      },
      {
        id: '4-2',
        title: 'Contemporary Art Gallery',
        description: 'Visit this innovative gallery showcasing works by emerging Albanian artists, with exhibitions that change monthly.',
        image: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1145,
          longitude: 20.0850
        },
        duration: '1 hour',
        order: 2,
        localTips: [
          'Check their website before visiting as opening hours can vary',
          'The gallery café is a popular meeting spot for local artists',
          'Ask about their evening events which often include music performances'
        ]
      },
      {
        id: '4-3',
        title: 'Artisan Workshop',
        description: 'Watch skilled craftspeople create traditional Albanian handicrafts with a modern twist, from textiles to ceramics.',
        image: 'https://images.unsplash.com/photo-1621600411688-4be93c2c1208?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1150,
          longitude: 20.0855
        },
        duration: '45 minutes',
        order: 3,
        funFacts: [
          'Many of the patterns used date back to Illyrian times',
          'The workshop runs apprenticeship programs to preserve traditional techniques',
          'Their pieces have been exhibited in museums across Europe'
        ]
      },
      {
        id: '4-4',
        title: 'Cultural Center',
        description: 'End your tour at this hub of contemporary culture, which hosts performances, film screenings, and community events.',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1155,
          longitude: 20.0860
        },
        duration: '30 minutes',
        order: 4,
        localTips: [
          'Check their bulletin board for upcoming events',
          'The bookshop inside has excellent works by Albanian authors translated to English',
          'On Fridays, they often have free music performances in the courtyard'
        ]
      }
    ]
  },
  {
    id: '5',
    title: 'Dark History Tour',
    description: "Explore the mysterious and lesser-known aspects of Elbasan's past, from ancient legends to more recent historical events that shaped the city.",
    category: 'historical',
    duration: '2.5 hours',
    distance: '4 km',
    difficulty: 'moderate',
    image: 'https://images.unsplash.com/photo-1508921108053-9f757ead871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.5,
    reviewCount: 29,
    tags: ['history', 'mystery', 'legends', 'dark tourism'],
    createdAt: '2025-02-28T14:20:00Z',
    updatedAt: '2025-04-18T10:15:00Z',
    stops: [
      {
        id: '5-1',
        title: 'Ancient Crypt',
        description: "Begin your journey into Elbasan's darker past with a visit to this mysterious underground structure dating back to Roman times.",
        image: 'https://images.unsplash.com/photo-1508921108053-9f757ead871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1160,
          longitude: 20.0865
        },
        duration: '30 minutes',
        order: 1,
        funFacts: [
          'Archaeologists are still debating the original purpose of this structure',
          'Local legends claim it was used for secret rituals',
          'Strange acoustic properties allow whispers to be heard clearly across the chamber'
        ]
      },
      {
        id: '5-2',
        title: 'Abandoned Factory',
        description: "Explore the remains of a once-thriving industrial complex from the communist era, now a haunting reminder of Albania's recent past.",
        image: 'https://images.unsplash.com/photo-1518656306295-aa28b28b2504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1165,
          longitude: 20.0870
        },
        duration: '45 minutes',
        order: 2,
        funFacts: [
          'This factory once employed over 5,000 workers',
          'It was one of the largest metallurgical plants in the Balkans',
          'The sudden closure in 1991 had a devastating impact on the local economy'
        ],
        localTips: [
          'Wear sturdy shoes as the ground can be uneven',
          'The best photographs can be taken from the northern entrance',
          'Visit in late afternoon for dramatic lighting'
        ]
      },
      {
        id: '5-3',
        title: 'Haunted Mansion',
        description: 'Visit this 19th-century villa with a reputation for strange occurrences and learn about the mysterious family that once lived here.',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1170,
          longitude: 20.0875
        },
        duration: '1 hour',
        order: 3,
        funFacts: [
          'The last family member disappeared under mysterious circumstances in 1925',
          'Renovation workers have reported strange sounds and moving objects',
          'The building combines Ottoman and Venetian architectural elements'
        ]
      },
      {
        id: '5-4',
        title: 'Memorial Site',
        description: "End your tour at this solemn monument commemorating victims of political persecution during Albania's communist period.",
        image: 'https://images.unsplash.com/photo-1547480053-7d174f67b557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        coordinates: {
          latitude: 41.1175,
          longitude: 20.0880
        },
        duration: '30 minutes',
        order: 4,
        funFacts: [
          'The monument was designed by a former political prisoner',
          'The names of over 500 local victims are inscribed here',
          'It was only permitted to be built after the fall of communism in 1991'
        ]
      }
    ]
  }
];