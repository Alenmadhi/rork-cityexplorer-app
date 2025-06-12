import { CityChallenge } from '@/types';

export const cityChallenges: CityChallenge[] = [
  {
    id: '1',
    title: 'Stone of the Past',
    description: 'Discover a hidden piece of history in the ancient castle walls of Elbasan.',
    clue: 'Where the call to prayer meets cobblestone echoes, find the wall where freedom once whispered.',
    difficulty: 'medium',
    type: 'riddle',
    location: {
      name: 'Elbasan Castle Wall',
      hint: 'Near the eastern entrance of the old fortress',
      coordinates: {
        latitude: 41.1123,
        longitude: 20.0826
      },
      radius: 30 // meters
    },
    reward: {
      points: 50,
      badge: 'history_explorer',
      story: "This wall section was built in the 15th century during Ottoman rule. In 1466, Skanderbeg's forces attempted to liberate the city and left secret messages carved into stones for local resistance fighters.",
      puzzlePiece: 'piece_1'
    },
    image: 'https://images.unsplash.com/photo-1566419808810-658178380987?q=80&w=1000&auto=format&fit=crop',
    isActive: true,
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
    createdAt: new Date().toISOString(),
    completedBy: 12
  },
  {
    id: '2',
    title: 'Color Behind the Cafe',
    description: 'Find the hidden mural that tells the story of Elbasan's artistic renaissance.',
    clue: 'Where coffee aromas blend with paint, behind the city's oldest cafe, colors tell tales that words cannot.',
    difficulty: 'easy',
    type: 'visual',
    location: {
      name: 'Old Town Cafe Alley',
      hint: 'Look for the cafe with blue shutters in the old bazaar',
      coordinates: {
        latitude: 41.1118,
        longitude: 20.0819
      },
      radius: 20 // meters
    },
    reward: {
      points: 30,
      badge: 'art_enthusiast',
      story: 'This mural was created in 2010 by local artists as part of a movement to revitalize the old town. The imagery represents the blend of cultures that have influenced Elbasan throughout its history.',
      puzzlePiece: 'piece_2'
    },
    image: 'https://images.unsplash.com/photo-1551913902-c92207136625?q=80&w=1000&auto=format&fit=crop',
    isActive: true,
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
    createdAt: new Date().toISOString(),
    completedBy: 28
  },
  {
    id: '3',
    title: 'The Book That Never Closed',
    description: 'Discover the old school that transformed into a repository of knowledge.',
    clue: 'Where children once recited lessons, now ancient wisdom rests on shelves. Find the building where education never ceased, only transformed.',
    difficulty: 'medium',
    type: 'historical',
    location: {
      name: 'Old Town Library',
      hint: 'Near the central square, look for columns at the entrance',
      coordinates: {
        latitude: 41.1130,
        longitude: 20.0835
      },
      radius: 25 // meters
    },
    reward: {
      points: 40,
      badge: 'knowledge_seeker',
      story: "This building served as Elbasan's first modern school from 1909 to 1978. When the new school was built, citizens transformed it into a community library to preserve its educational legacy. It houses rare manuscripts dating back to the 17th century.",
      puzzlePiece: 'piece_3'
    },
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop',
    isActive: true,
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
    createdAt: new Date().toISOString(),
    completedBy: 15
  },
  {
    id: '4',
    title: 'Whispers of Music',
    description: 'Find the place where Elbasan's musical traditions echo through time.',
    clue: 'Follow the stone steps where melodies once floated through evening air. Though the stage is silent, the stones remember the songs.',
    difficulty: 'hard',
    type: 'audio',
    location: {
      name: 'Old Opera Steps',
      hint: 'In the northwestern corner of the old town',
      coordinates: {
        latitude: 41.1140,
        longitude: 20.0810
      },
      radius: 15 // meters
    },
    reward: {
      points: 60,
      badge: 'music_historian',
      story: "These steps led to Elbasan's first opera house, built in 1892 and destroyed during WWII. Local musicians still gather here on summer evenings to perform traditional Albanian folk music, continuing a tradition that spans generations.",
      puzzlePiece: 'piece_4'
    },
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1000&auto=format&fit=crop',
    isActive: true,
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
    createdAt: new Date().toISOString(),
    completedBy: 8
  },
  {
    id: '5',
    title: 'The Forgotten Fountain',
    description: 'Discover the ancient fountain that once served as the city's main water source.',
    clue: 'Where water whispers tales of centuries past, beneath the shadow of three cypress trees, life-giving streams have never ceased.',
    difficulty: 'medium',
    type: 'riddle',
    location: {
      name: 'Three Cypresses Fountain',
      hint: 'In the eastern part of the old town, listen for running water',
      coordinates: {
        latitude: 41.1125,
        longitude: 20.0845
      },
      radius: 20 // meters
    },
    reward: {
      points: 45,
      badge: 'water_finder',
      story: 'This fountain has provided water to Elbasan residents since 1485. According to local legend, the water has healing properties, and the three cypress trees were planted by three brothers who returned safely from war after drinking from the fountain before their departure.',
      puzzlePiece: 'piece_5'
    },
    image: 'https://images.unsplash.com/photo-1536438213775-eb8d1a7f3509?q=80&w=1000&auto=format&fit=crop',
    isActive: true,
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
    createdAt: new Date().toISOString(),
    completedBy: 19
  },
  {
    id: '6',
    title: 'The Merchant's Secret',
    description: 'Find the hidden courtyard where merchants once traded exotic goods from distant lands.',
    clue: 'Through the narrow passage where sunlight barely reaches, seek the courtyard where silk and spice once changed hands in whispers.',
    difficulty: 'hard',
    type: 'puzzle',
    location: {
      name: 'Old Bazaar Courtyard',
      hint: 'Look for a small archway between two shops in the bazaar',
      coordinates: {
        latitude: 41.1120,
        longitude: 20.0830
      },
      radius: 15 // meters
    },
    reward: {
      points: 55,
      badge: 'trade_master',
      story: 'This hidden courtyard served as a secret trading post during the 16th-18th centuries. Merchants dealing in valuable or restricted goods would meet here to conduct business away from tax collectors and authorities. The symbols carved into the walls were a code used to indicate what goods were available.',
      puzzlePiece: 'piece_6'
    },
    image: 'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=1000&auto=format&fit=crop',
    isActive: true,
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
    createdAt: new Date().toISOString(),
    completedBy: 7
  },
  {
    id: '7',
    title: 'The Craftsman's Legacy',
    description: 'Discover the workshop where traditional crafts have been practiced for generations.',
    clue: 'Hands that shape clay have worked in this place for ten generations. Find where the wheel still turns as it did centuries ago.',
    difficulty: 'easy',
    type: 'visual',
    location: {
      name: 'Traditional Pottery Workshop',
      hint: 'In the southern part of the old town, look for clay pots displayed outside',
      coordinates: {
        latitude: 41.1110,
        longitude: 20.0825
      },
      radius: 25 // meters
    },
    reward: {
      points: 35,
      badge: 'craft_preserver',
      story: 'This workshop has been operated by the same family since 1720. They still use traditional techniques to create pottery with distinctive Elbasan patterns. The current master potter is teaching local youth to ensure these traditions continue for future generations.',
      puzzlePiece: 'piece_7'
    },
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1000&auto=format&fit=crop',
    isActive: true,
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
    createdAt: new Date().toISOString(),
    completedBy: 22
  }
];

export const puzzles = [
  {
    id: 'puzzle_1',
    title: 'Elbasan Through Time',
    description: 'Collect all 7 pieces to reveal the historical timeline of Elbasan from ancient times to the present day.',
    totalPieces: 7,
    reward: {
      points: 200,
      badge: 'master_historian'
    },
    expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
    image: 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?q=80&w=1000&auto=format&fit=crop'
  }
];