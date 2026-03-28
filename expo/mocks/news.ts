import { NewsItem } from '@/types';

export const news: NewsItem[] = [
  {
    id: '1',
    title: 'Elbasan Castle Restoration Project Completed',
    summary: 'The historic Elbasan Castle has been fully restored after a two-year renovation project.',
    content: `After two years of meticulous work, the restoration of Elbasan Castle has been completed, preserving this important historical monument for future generations. The project, funded by the Ministry of Culture and the European Union, focused on strengthening the castle walls, restoring the ancient gates, and improving visitor facilities.

    "This is a significant achievement for our cultural heritage," said the Mayor of Elbasan during the reopening ceremony. "The castle is not just a tourist attraction but a symbol of our city's rich history."

    The restoration work was carried out by a team of local and international experts who used traditional techniques and materials to ensure authenticity. New lighting has been installed to highlight the architectural features, and informational panels have been added to enhance the visitor experience.

    The castle, which dates back to the 15th century, will now be open to visitors daily from 9 AM to 7 PM, with guided tours available in multiple languages.`,
    author: 'Artan Meti',
    publishedAt: '2025-06-10T09:30:00Z',
    image: 'https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?auto=format&fit=crop&q=80&w=1170',
    category: 'culture',
    source: 'Elbasan Daily',
    featured: true,
    location: {
      name: 'Elbasan Castle',
      coordinates: {
        latitude: 41.1125,
        longitude: 20.0822
      }
    }
  },
  {
    id: '2',
    title: 'New International Flight Route Connects Elbasan to European Capitals',
    summary: 'A new flight service will connect Elbasan region to major European cities starting next month.',
    content: `Starting next month, residents of Elbasan will have easier access to European destinations thanks to a new flight route connecting Tirana International Airport with several European capitals. The service, operated by Albanian Airlines, will offer direct flights to Rome, Vienna, and Athens.

    "This new route will significantly boost tourism and business opportunities for Elbasan," said the Minister of Transport at the announcement event. "It's part of our strategy to improve connectivity between Albania and the rest of Europe."

    The flights will operate three times a week, with promotional fares available for the first three months. Travel time from Elbasan to Tirana Airport is approximately 45 minutes by car or shuttle service.

    Local businesses have welcomed the news, anticipating increased tourist numbers and new opportunities for international trade. The Elbasan Chamber of Commerce estimates that the improved connectivity could bring up to 15% more visitors to the region annually.`,
    author: 'Elira Hoxha',
    publishedAt: '2025-06-09T14:15:00Z',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1174',
    category: 'business',
    source: 'Albania Business Review',
    featured: false
  },
  {
    id: '3',
    title: 'Elbasan Hosts International Cultural Festival',
    summary: 'The week-long festival will showcase music, dance, and cuisine from around the world.',
    content: `Elbasan is set to become a global cultural hub next week as it hosts the International Cultural Festival, bringing together artists and performers from over 20 countries. The festival, now in its fifth year, will feature daily performances, workshops, and food stalls in various locations around the city.

    "This festival celebrates diversity and promotes cultural exchange," explained the festival director. "It's a wonderful opportunity for locals and visitors to experience traditions from around the world without leaving Elbasan."

    Highlights include performances by a Japanese taiko drum ensemble, a Spanish flamenco group, and traditional Albanian folk dancers. The main stage will be set up in the central square, with additional venues at the Cultural Center and Elbasan Castle.

    Food stalls will offer a taste of international cuisines, from Italian pasta to Indian curry, alongside traditional Albanian specialties. Workshops on traditional crafts, dance, and music will be available for all ages, with advance registration recommended for popular sessions.

    The festival runs from June 15-21, with most events free to the public. A detailed program is available on the festival website and at tourist information points throughout the city.`,
    author: 'Besnik Kraja',
    publishedAt: '2025-06-08T11:45:00Z',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?auto=format&fit=crop&q=80&w=1170',
    category: 'culture',
    source: 'Elbasan Times',
    featured: true,
    location: {
      name: 'Elbasan City Center',
      coordinates: {
        latitude: 41.1115,
        longitude: 20.0832
      }
    }
  },
  {
    id: '4',
    title: 'Local Olive Oil Producer Wins International Award',
    summary: 'Elbasan-based olive oil company receives gold medal at prestigious competition in Italy.',
    content: `Elbasan's own "Green Gold" olive oil producer has brought international recognition to the region by winning a gold medal at the prestigious Olive Oil Competition in Milan, Italy. The family-run business, which has been producing olive oil for three generations, was recognized for its premium extra virgin olive oil in the "intense fruity" category.

    "This award validates our commitment to quality and traditional methods," said the company's owner. "We're proud to represent Elbasan and Albanian olive oil on the international stage."

    The winning oil is produced from a blend of local olive varieties grown in the hills surrounding Elbasan, where the Mediterranean climate and soil conditions are ideal for olive cultivation. The olives are hand-picked and cold-pressed within 24 hours of harvesting to preserve their flavor and nutritional properties.

    The competition featured over 500 entries from 25 countries, with judges evaluating each oil for aroma, flavor, and overall quality. This is the first time an Albanian producer has received a gold medal in this competition.

    "Green Gold" olive oil is available at local markets in Elbasan and select gourmet shops throughout Albania. Following the award, the company plans to expand distribution to international markets.`,
    author: 'Mirela Tafa',
    publishedAt: '2025-06-07T16:20:00Z',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=1170',
    category: 'business',
    source: 'Food & Agriculture Today',
    featured: false,
    location: {
      name: 'Green Gold Olive Farm',
      coordinates: {
        latitude: 41.0925,
        longitude: 20.0722
      }
    }
  },
  {
    id: '5',
    title: 'Elbasan University Launches New Technology Center',
    summary: 'State-of-the-art facility aims to boost innovation and tech education in the region.',
    content: `Elbasan University has officially opened its new Technology Innovation Center, a 2,000-square-meter facility equipped with the latest technology to support education, research, and entrepreneurship in the tech sector. The center, which represents an investment of €3.5 million, includes computer labs, a startup incubator, and research facilities.

    "This center will be a catalyst for technological innovation in our region," said the University Rector during the opening ceremony. "It will provide our students with hands-on experience with cutting-edge technology and support local entrepreneurs in developing new products and services."

    The center will offer specialized courses in artificial intelligence, cybersecurity, and software development, with industry experts serving as guest lecturers. A partnership program with local businesses will provide internship opportunities for students and research support for companies.

    The startup incubator within the center will provide workspace, mentoring, and potential funding for promising tech ventures. Five startups have already been selected for the first incubation program, which begins next month.

    Funding for the center came from a combination of government grants, EU development funds, and private sector donations. The university expects the center to serve over 500 students annually and support the creation of at least 20 new tech businesses in the next five years.`,
    author: 'Dritan Malaj',
    publishedAt: '2025-06-06T10:00:00Z',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1170',
    category: 'education',
    source: 'Tech Albania',
    featured: true,
    location: {
      name: 'Elbasan University',
      coordinates: {
        latitude: 41.1135,
        longitude: 20.0842
      }
    }
  },
  {
    id: '6',
    title: 'Archaeological Discovery Reveals Ancient Settlement Near Elbasan',
    summary: 'Excavation uncovers remains of a previously unknown Illyrian settlement dating back to 4th century BCE.',
    content: `Archaeologists working at a site 5 kilometers outside Elbasan have made a significant discovery: the remains of an Illyrian settlement estimated to be from the 4th century BCE. The excavation, which began as a routine survey before highway construction, has revealed foundations of buildings, pottery, tools, and jewelry that provide new insights into the region's ancient history.

    "This is one of the most important archaeological discoveries in the region in recent decades," said the lead archaeologist. "The settlement appears to have been a trading post, given its location and the variety of artifacts we've found."

    Among the most notable finds are several intact ceramic vessels with distinctive Illyrian decorative patterns, bronze jewelry, and coins that suggest trade connections with Greek colonies along the Adriatic coast. The layout of the settlement indicates a planned community with a central square and surrounding residential areas.

    The Ministry of Culture has temporarily halted the highway construction in the area to allow for a complete archaeological investigation. Plans are being developed to preserve the site and possibly create an on-site museum to display the findings.

    "This discovery adds an important chapter to our understanding of Illyrian civilization and the early history of the Elbasan region," said a representative from the National Institute of Archaeology. "It confirms the area's significance as a cultural crossroads even in ancient times."`,
    author: 'Teuta Brahimi',
    publishedAt: '2025-06-05T13:40:00Z',
    image: 'https://images.unsplash.com/photo-1579445710183-f9a816f5da05?auto=format&fit=crop&q=80&w=1170',
    category: 'culture',
    source: 'Heritage Albania',
    featured: false,
    location: {
      name: 'Archaeological Site',
      coordinates: {
        latitude: 41.0825,
        longitude: 20.0622
      }
    }
  }
];