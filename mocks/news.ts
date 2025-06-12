import { NewsItem } from '@/types';

export const news: NewsItem[] = [
  {
    id: '1',
    title: 'Elbasan Castle Restoration Project Completed',
    summary: 'The historic Elbasan Castle has been fully restored after a two-year renovation project.',
    content: 'After two years of meticulous work, the restoration of Elbasan Castle has been completed. The project, funded by the Ministry of Culture and the European Union, has restored the ancient walls, towers, and interior structures to their former glory. The castle, which dates back to the 15th century, is now open to visitors with new exhibition spaces, a museum, and guided tours available daily.\n\nThe restoration team used traditional materials and techniques wherever possible, ensuring the authenticity of the historic structure while making it safe and accessible for modern visitors. Archaeological discoveries made during the restoration process, including Ottoman-era artifacts and Byzantine mosaics, are now on display in the castle museum.\n\n"This is a proud moment for Elbasan and for all of Albania," said the Mayor during the reopening ceremony. "Our castle stands once again as a testament to our rich history and as a beacon for cultural tourism in the region."',
    author: 'Elton Mara',
    publishedAt: '2023-06-15T09:30:00Z',
    image: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Culture',
    source: 'Elbasan News',
    featured: true,
    location: {
      name: 'Elbasan Castle',
      coordinates: {
        latitude: 41.1123,
        longitude: 20.0826
      }
    }
  },
  {
    id: '2',
    title: 'New Bus Terminal Opens in Elbasan',
    summary: 'A modern bus terminal has opened in the eastern part of the city, improving transportation links.',
    content: 'A state-of-the-art bus terminal has opened in eastern Elbasan, significantly improving transportation infrastructure for both residents and visitors. The new facility, which cost approximately 3.5 million euros, features 12 platforms, digital information displays, comfortable waiting areas, and retail spaces.\n\nThe terminal will serve both intercity routes and international connections to neighboring countries, centralizing bus services that were previously scattered across multiple locations in the city. Modern ticketing systems allow passengers to purchase tickets online or through a mobile app.\n\n"This new terminal represents a major step forward for our city\'s infrastructure," said the Director of Transportation. "It will make travel more convenient, more comfortable, and more efficient for everyone."\n\nThe project was completed ahead of schedule and includes environmentally friendly features such as solar panels, rainwater collection systems, and energy-efficient lighting. A dedicated bicycle parking area and electric vehicle charging stations have also been installed to promote sustainable transportation options.',
    author: 'Mirela Koci',
    publishedAt: '2023-05-28T14:15:00Z',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Infrastructure',
    source: 'Elbasan Daily',
    featured: false,
    location: {
      name: 'East Elbasan Bus Terminal',
      coordinates: {
        latitude: 41.1072,
        longitude: 20.0956
      }
    }
  },
  {
    id: '3',
    title: 'Local Olive Oil Wins International Award',
    summary: 'Elbasan-produced olive oil has won gold at the Mediterranean Olive Oil Competition.',
    content: 'An olive oil produced in the hills surrounding Elbasan has won the gold medal at the prestigious Mediterranean Olive Oil Competition held in Barcelona last week. The extra virgin olive oil, produced by the Elbasan Agricultural Cooperative, beat over 150 competitors from countries including Italy, Spain, Greece, and Turkey.\n\nThe winning oil, made from a blend of local olive varieties grown in the fertile soil of the Shkumbin Valley, was praised by judges for its "complex fruity notes, perfect balance, and exceptional purity." This is the first time an Albanian olive oil has received the top honor in the competition\'s 25-year history.\n\n"This award puts Elbasan and Albania on the map of premium olive oil producers," said Fatmir Beqiri, head of the cooperative. "It\'s a recognition of the hard work of our farmers, the quality of our land, and our commitment to traditional production methods enhanced by modern technology."\n\nThe cooperative, which represents over 200 small-scale farmers from the region, has seen increasing international demand for its products in recent years. Following this award, they plan to expand production while maintaining their commitment to quality and sustainability.',
    author: 'Arben Shehu',
    publishedAt: '2023-05-10T11:45:00Z',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Business',
    source: 'Elbasan Economic Times',
    featured: true,
    location: {
      name: 'Elbasan Agricultural Cooperative',
      coordinates: {
        latitude: 41.0923,
        longitude: 20.0726
      }
    }
  },
  {
    id: '4',
    title: 'Summer Festival Lineup Announced',
    summary: 'The annual Elbasan Summer Festival will feature international and local artists this July.',
    content: 'The organizing committee of the Elbasan Summer Festival has announced an impressive lineup for this year\'s event, scheduled to take place from July 15-18 in the city center and castle grounds. The festival, now in its 12th year, will feature performances by international artists alongside the best of Albanian music, dance, and theater.\n\nHeadlining the music program are several well-known Balkan performers, as well as artists from Italy, Greece, and beyond. The festival will also showcase traditional Albanian folk music and dance ensembles from across the country.\n\n"We\'ve worked hard to create a diverse program that celebrates both our cultural heritage and contemporary arts," said Festival Director Erjona Prifti. "This year\'s festival will be the biggest and most inclusive yet, with something for everyone to enjoy."\n\nIn addition to performances, the festival will feature artisan markets, food stalls highlighting local cuisine, workshops, and activities for children. Most events are free to attend, with special concerts in the castle requiring tickets that are already selling quickly.\n\nLocal businesses are preparing for an influx of visitors, with hotels reporting high booking rates for the festival period. The event is expected to bring significant economic benefits to the city, with last year\'s festival attracting over 30,000 visitors.',
    author: 'Teuta Hoxha',
    publishedAt: '2023-05-05T16:20:00Z',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Entertainment',
    source: 'Elbasan Culture Guide',
    featured: false,
    location: {
      name: 'Elbasan City Center',
      coordinates: {
        latitude: 41.1123,
        longitude: 20.0826
      }
    }
  },
  {
    id: '5',
    title: 'New Sports Complex to Break Ground Next Month',
    summary: 'Construction of a multi-sport complex will begin in June, providing modern facilities for local athletes.',
    content: 'Officials have announced that construction of a new sports complex will begin next month on the outskirts of Elbasan. The 15-million-euro project will include a 5,000-seat indoor arena, Olympic-sized swimming pool, tennis courts, and training facilities for various sports.\n\nThe complex, funded through a combination of national government allocations and international development grants, is expected to be completed within two years. It will serve as a training center for national teams as well as providing facilities for local clubs and the general public.\n\n"This investment will transform sports infrastructure in our region," said the Director of Sports and Youth. "It will give our talented young athletes the facilities they need to develop their potential and compete at the highest levels."\n\nThe project is expected to create approximately 200 jobs during construction and 50 permanent positions once operational. Environmental considerations have been integrated into the design, with energy-efficient systems, solar power, and water recycling features.\n\nLocal sports clubs have welcomed the announcement, particularly the swimming and basketball associations, which have achieved national success despite limited training facilities. The complex will also include a sports medicine center, the first of its kind in the region.',
    author: 'Genti Kraja',
    publishedAt: '2023-04-28T10:00:00Z',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Sports',
    source: 'Elbasan Sports News',
    featured: true,
    location: {
      name: 'North Elbasan Development Zone',
      coordinates: {
        latitude: 41.1223,
        longitude: 20.0726
      }
    }
  }
];