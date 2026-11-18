//
//  MockData.swift
//  ElbasanCityGuideIOS
//
//  Ported from expo/mocks/*.ts — same content the Expo app ships with.
//

import Foundation
import CoreLocation

enum MockData {
    // MARK: - Events

    static let events: [CityEvent] = [
        CityEvent(
            id: "1", title: "Elbasan Summer Festival",
            description: "Annual summer festival with music, food, and cultural performances celebrating the rich heritage of Elbasan.",
            date: "2025-07-15", time: "18:00 - 23:00", location: "Elbasan Castle",
            image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1074",
            category: .festival, organizer: "Elbasan Municipality", price: "Free", featured: true,
            coordinates: CLLocationCoordinate2D(latitude: 41.1125, longitude: 20.0822)),
        CityEvent(
            id: "2", title: "Traditional Albanian Cuisine Workshop",
            description: "Learn how to prepare authentic Albanian dishes with local chefs. Ingredients and recipes provided.",
            date: "2025-06-20", time: "14:00 - 17:00", location: "Elbasan Culinary Center",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1170",
            category: .food, organizer: "Albanian Culinary Association", price: "25€", featured: false,
            coordinates: CLLocationCoordinate2D(latitude: 41.1095, longitude: 20.0802)),
        CityEvent(
            id: "3", title: "Elbasan Symphony Orchestra Concert",
            description: "A night of classical music featuring works by Albanian and international composers performed by the Elbasan Symphony Orchestra.",
            date: "2025-06-25", time: "19:30 - 21:30", location: "Elbasan Theater",
            image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1170",
            category: .music, organizer: "Elbasan Cultural Center", price: "15€", featured: true,
            coordinates: CLLocationCoordinate2D(latitude: 41.1115, longitude: 20.0832)),
        CityEvent(
            id: "4", title: "Contemporary Art Exhibition",
            description: "Exhibition featuring works by emerging Albanian artists exploring themes of identity, tradition, and modernity.",
            date: "2025-06-18", time: "10:00 - 18:00", location: "Elbasan Art Gallery",
            image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=1170",
            category: .art, organizer: "Albanian Artists Association", price: "5€", featured: false,
            coordinates: CLLocationCoordinate2D(latitude: 41.1105, longitude: 20.0812)),
        CityEvent(
            id: "5", title: "Elbasan Marathon",
            description: "Annual marathon through the historic streets of Elbasan. Categories include full marathon, half marathon, and 10K run.",
            date: "2025-07-05", time: "08:00 - 14:00", location: "Elbasan City Center",
            image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=1170",
            category: .sports, organizer: "Elbasan Sports Association", price: "20€", featured: true,
            coordinates: CLLocationCoordinate2D(latitude: 41.1135, longitude: 20.0842)),
        CityEvent(
            id: "6", title: "Traditional Folk Dance Workshop",
            description: "Learn traditional Albanian folk dances with professional dancers. All skill levels welcome.",
            date: "2025-06-22", time: "16:00 - 18:00", location: "Elbasan Community Center",
            image: "https://images.unsplash.com/photo-1504609813442-a9924e2e4531?auto=format&fit=crop&q=80&w=1170",
            category: .other, organizer: "Albanian Folk Dance Ensemble", price: "10€", featured: false,
            coordinates: CLLocationCoordinate2D(latitude: 41.1145, longitude: 20.0852)),
        CityEvent(
            id: "7", title: "Wine Tasting: Albanian Varieties",
            description: "Discover the rich flavors of Albanian wines with expert sommeliers. Includes tasting of 6 premium local wines.",
            date: "2025-06-28", time: "19:00 - 21:00", location: "Elbasan Wine Cellar",
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1170",
            category: .food, organizer: "Albanian Wine Association", price: "30€", featured: true,
            coordinates: CLLocationCoordinate2D(latitude: 41.1155, longitude: 20.0862)),
        CityEvent(
            id: "8", title: "Summer Jazz Nights",
            description: "Open-air jazz concert featuring local and international jazz musicians in the beautiful setting of Elbasan Castle.",
            date: "2025-07-10", time: "20:00 - 23:00", location: "Elbasan Castle Courtyard",
            image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=80&w=1170",
            category: .music, organizer: "Elbasan Jazz Club", price: "12€", featured: false,
            coordinates: CLLocationCoordinate2D(latitude: 41.1125, longitude: 20.0822)),
    ]

    // MARK: - News

    static let news: [NewsItem] = [
        NewsItem(
            id: "1", title: "Elbasan Castle Restoration Project Completed",
            summary: "The historic Elbasan Castle has been fully restored after a two-year renovation project.",
            content: "After two years of meticulous work, the restoration of Elbasan Castle has been completed, preserving this important historical monument for future generations. The project, funded by the Ministry of Culture and the European Union, focused on strengthening the castle walls, restoring the ancient gates, and improving visitor facilities.\n\n\"This is a significant achievement for our cultural heritage,\" said the Mayor of Elbasan during the reopening ceremony. \"The castle is not just a tourist attraction but a symbol of our city's rich history.\"\n\nThe restoration work was carried out by a team of local and international experts who used traditional techniques and materials to ensure authenticity. New lighting has been installed to highlight the architectural features, and informational panels have been added to enhance the visitor experience.\n\nThe castle, which dates back to the 15th century, will now be open to visitors daily from 9 AM to 7 PM, with guided tours available in multiple languages.",
            publishedAt: ISO8601DateFormatter().date(from: "2025-06-10T09:30:00Z") ?? .now,
            author: "Artan Meti",
            image: "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?auto=format&fit=crop&q=80&w=1170",
            category: "culture", source: "Elbasan Daily", featured: true),
        NewsItem(
            id: "2", title: "New International Flight Route Connects Elbasan to European Capitals",
            summary: "A new flight service will connect Elbasan region to major European cities starting next month.",
            content: "Starting next month, residents of Elbasan will have easier access to European destinations thanks to a new flight route connecting Tirana International Airport with several European capitals. The service, operated by Albanian Airlines, will offer direct flights to Rome, Vienna, and Athens.\n\n\"This new route will significantly boost tourism and business opportunities for Elbasan,\" said the Minister of Transport at the announcement event. \"It's part of our strategy to improve connectivity between Albania and the rest of Europe.\"\n\nThe flights will operate three times a week, with promotional fares available for the first three months. Travel time from Elbasan to Tirana Airport is approximately 45 minutes by car or shuttle service.\n\nLocal businesses have welcomed the news, anticipating increased tourist numbers and new opportunities for international trade. The Elbasan Chamber of Commerce estimates that the improved connectivity could bring up to 15% more visitors to the region annually.",
            publishedAt: ISO8601DateFormatter().date(from: "2025-06-09T14:15:00Z") ?? .now,
            author: "Elira Hoxha",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1170",
            category: "business", source: "Albanian Herald", featured: false),
        NewsItem(
            id: "3", title: "Summer Day Festival Preparations Underway",
            summary: "Elbasan prepares to host the biggest Summer Day (Dita e Verës) celebration in the country.",
            content: "Preparations are in full swing for this year's Summer Day Festival, the beloved national holiday that Elbasan hosts like no other city. The municipality has announced a full program of concerts, folk performances, and the traditional ballokume baking contest along the Shkumbin river promenade.\n\n\"Dita e Verës is in Elbasan's DNA,\" said the festival director. \"We expect over one hundred thousand visitors this year.\"\n\nRoads around the city center will close on the morning of March 14, with free shuttle buses running from peripheral parking areas. Local bakeries have already begun taking pre-orders for ballokume, the festive cookie made with corn flour, butter, and eggs whose recipe is protected as a cultural heritage product.",
            publishedAt: ISO8601DateFormatter().date(from: "2025-06-08T11:00:00Z") ?? .now,
            author: "Marsela Dervishi",
            image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1170",
            category: "culture", source: "Elbasan Daily", featured: false),
        NewsItem(
            id: "4", title: "City Expands Free Public Wi-Fi to Parks and Boulevards",
            summary: "Residents and visitors can now access free internet in twelve public spaces across the city.",
            content: "The municipality has completed the second phase of its public Wi-Fi rollout, bringing free internet access to twelve parks, squares, and pedestrian streets, including the area inside the castle walls and the Qemal Stafa boulevard.\n\n\"Internet access is a public service today,\" said the deputy mayor for digital services. \"Tourists can navigate, students can study outside.\"\n\nThe network is funded in part by the EU's regional development program and is expected to expand to the main bus station next year.",
            publishedAt: ISO8601DateFormatter().date(from: "2025-06-05T08:45:00Z") ?? .now,
            author: "Elira Hoxha",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1170",
            category: "politics", source: "City Hall Press", featured: false),
    ]

    // MARK: - Weather

    static let weather = Weather(
        location: "Elbasan, Albania",
        temperature: 24,
        condition: "Partly Cloudy",
        icon: "cloud.sun",
        windSpeed: 12,
        humidity: 65,
        lastUpdated: .now,
        forecast: [
            WeatherForecast(day: "Today", icon: "cloud.sun", min: 18, max: 26),
            WeatherForecast(day: "Thu", icon: "sun.max", min: 20, max: 28),
            WeatherForecast(day: "Fri", icon: "sun.max", min: 21, max: 30),
            WeatherForecast(day: "Sat", icon: "cloud", min: 19, max: 27),
            WeatherForecast(day: "Sun", icon: "cloud.rain", min: 17, max: 24),
        ])

    // MARK: - Attractions

    static let attractions: [Attraction] = [
        Attraction(
            id: "1", name: "Elbasan Castle",
            description: "Historic Ottoman-era fortress with well-preserved walls encircling part of the old city, featuring ancient gates and towers.",
            image: "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            location: "City Center, Elbasan", rating: 4.8, category: "landmark",
            hours: "Open 24 hours", price: "Free", isFeatured: true,
            coordinates: CLLocationCoordinate2D(latitude: 41.1123, longitude: 20.0826)),
        Attraction(
            id: "2", name: "Old Bazaar",
            description: "Traditional market area with cobblestone streets, historic shops, and authentic Albanian crafts and cuisine.",
            image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            location: "Inside Castle Walls, Elbasan", rating: 4.6, category: "shopping",
            hours: "Mon-Sat: 8:00 AM - 7:00 PM, Sun: 9:00 AM - 2:00 PM", price: "Free entry", isFeatured: true,
            coordinates: CLLocationCoordinate2D(latitude: 41.1128, longitude: 20.0831)),
        Attraction(
            id: "3", name: "Ethnographic Museum",
            description: "Museum showcasing traditional Albanian lifestyle, costumes, and household items in a restored Ottoman-era house.",
            image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            location: "Rruga 11 Nëntori, Elbasan", rating: 4.5, category: "museum",
            hours: "Tue-Sun: 9:00 AM - 5:00 PM", price: "300 LEK", isFeatured: true,
            coordinates: CLLocationCoordinate2D(latitude: 41.1130, longitude: 20.0835)),
        Attraction(
            id: "4", name: "King Mosque",
            description: "Historic 15th-century mosque with beautiful architecture and cultural significance.",
            image: "https://images.unsplash.com/photo-1519828071214-3b28267a4d8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            location: "Inside Castle Walls, Elbasan", rating: 4.7, category: "landmark",
            hours: "Open for visitors outside prayer times", price: "Free", isFeatured: false,
            coordinates: CLLocationCoordinate2D(latitude: 41.1125, longitude: 20.0830)),
        Attraction(
            id: "5", name: "Shebenik-Jabllanicë National Park",
            description: "Beautiful national park with diverse flora and fauna, hiking trails, and stunning mountain landscapes.",
            image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            location: "30km east of Elbasan", rating: 4.9, category: "park",
            hours: "Daily: Sunrise to Sunset", price: "Free", isFeatured: false,
            coordinates: CLLocationCoordinate2D(latitude: 41.1800, longitude: 20.4200)),
        Attraction(
            id: "6", name: "Traditional Restaurant Taverna",
            description: "Authentic Albanian restaurant serving local specialties like tavë kosi (yogurt lamb) and fërgesë elbasan in a traditional setting.",
            image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            location: "Rruga Qemal Stafa, Elbasan", rating: 4.8, category: "restaurant",
            hours: "Daily: 11:00 AM - 11:00 PM", price: "800-1500 LEK per person", isFeatured: false,
            coordinates: CLLocationCoordinate2D(latitude: 41.1118, longitude: 20.0818)),
    ]

    // MARK: - Tourist Info

    static let touristInfo: [TouristInfo] = [
        TouristInfo(id: "1", title: "Getting Around Elbasan", description: "Elbasan is easily navigable on foot, especially the historic center. Taxis are affordable and can be hailed on the street. Local buses connect to surrounding villages and other Albanian cities.", icon: "car.fill", category: .transportation),
        TouristInfo(id: "2", title: "Intercity Transportation", description: "Regular bus services connect Elbasan to Tirana (45 min), Durrës (1.5 hours), and other major Albanian cities. Buses depart from the main bus station north of the city center.", icon: "bus.fill", category: .transportation),
        TouristInfo(id: "3", title: "Accommodation Options", description: "Elbasan offers a range of accommodations from modern hotels to traditional guesthouses. Most are concentrated near the castle area and along Bulevardi Qemal Stafa.", icon: "bed.double.fill", category: .accommodation),
        TouristInfo(id: "4", title: "Emergency Services", description: "For emergencies, dial 112. The main hospital is located at Rruga Kozma Naska. Tourist police can be contacted at +355 54 252 529.", icon: "cross.case.fill", category: .emergency),
        TouristInfo(id: "5", title: "Internet Access", description: "Free Wi-Fi is available in most cafes, restaurants, and hotels. Mobile data is affordable with local SIM cards available at the city center.", icon: "wifi", category: .wifi),
        TouristInfo(id: "6", title: "Local Customs & Tips", description: "Albanian hospitality is legendary. Tipping (10%) is appreciated in restaurants. The local currency is the Albanian Lek (ALL). Basic Albanian phrases are appreciated though many younger people speak English.", icon: "hand.wave.fill", category: .tips),
        TouristInfo(id: "7", title: "Best Time to Visit", description: "Spring (March-May) is ideal for the Summer Day Festival and pleasant weather. September-October offers mild temperatures and fewer tourists. Summers can be hot but lively with festivals.", icon: "calendar", category: .tips),
    ]

    // MARK: - Tours

    static let tours: [Tour] = [
        Tour(
            id: "1", title: "Elbasan Through Time",
            description: "Explore the rich history of Elbasan through its most iconic historical landmarks. This tour takes you through centuries of Albanian history, from ancient fortifications to Ottoman-era architecture.",
            category: "historical", duration: "3 hours", distance: "4.2 km", difficulty: "moderate",
            image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            featured: true, rating: 4.8, reviewCount: 124,
            stops: [
                TourStop(id: "1-1", title: "Elbasan Castle", description: "Built in the 15th century by Sultan Mehmet II, this impressive fortress once enclosed the entire old city. Today, you can walk along its walls and explore the historic neighborhood inside.", image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", duration: "45 minutes", order: 1, funFacts: ["The castle walls are 2 meters thick in some places", "The fortress originally had 26 towers, though only a few remain today", "Local legend says there is a network of secret tunnels beneath the castle"], localTips: ["Visit early morning to avoid crowds and get the best photos", "The south wall offers the best views of the city", "Try the traditional tea at the small café near the east entrance"]),
                TourStop(id: "1-2", title: "King Mosque", description: "One of the oldest mosques in Albania, built in 1492. Its unique architecture blends Ottoman and local Albanian styles, with beautiful interior decorations.", image: "https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", duration: "30 minutes", order: 2, funFacts: ["The mosque was converted to a church during the communist era", "It was restored to its original function in the 1990s", "The minaret was completely rebuilt using traditional techniques"], localTips: ["Dress modestly and remove your shoes before entering", "Visit outside prayer times"]),
                TourStop(id: "1-3", title: "Ethnographic Museum", description: "Housed in a traditional 18th-century home, this museum showcases the daily life, crafts, and traditions of Elbasan through the centuries.", image: "https://images.unsplash.com/photo-1552248524-10d9a7e4b84a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", duration: "1 hour", order: 3, funFacts: ["The building itself is over 250 years old", "Many of the artifacts were donated by local families", "The traditional costumes on display show influences from Ottoman, Greek, and Italian cultures"], localTips: ["Ask the curator about the wedding traditions - they have fascinating stories", "The handwoven textiles are still made by local artisans you can visit", "Photography is allowed but without flash"]),
                TourStop(id: "1-4", title: "Old Bazaar Street", description: "Walk through the historic commercial center of the old town, where artisans and traders have sold their goods for centuries.", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", duration: "45 minutes", order: 4, funFacts: ["The bazaar dates back to the 17th century", "Silversmiths here still practice the traditional filigree craft"], localTips: ["Bargaining is expected at the craft stalls", "Try fërgesë elbasan at the small taverns"]),
            ]),
        Tour(
            id: "2", title: "Flavors of Elbasan",
            description: "A culinary walk through Elbasan's markets and taverns, tasting the dishes that made the city famous across Albania.",
            category: "food", duration: "2.5 hours", distance: "2.8 km", difficulty: "easy",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1000",
            featured: true, rating: 4.9, reviewCount: 86,
            stops: [
                TourStop(id: "2-1", title: "Green Market", description: "Meet local farmers and taste fresh produce, mountain honey, and artisanal cheeses at the city's central market.", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1000", duration: "40 minutes", order: 1, funFacts: ["The market has operated on this spot since the 1930s", "September is peak season for local grapes and figs"], localTips: ["Come before 10 AM for the freshest produce", "Bring cash - most stalls don't take cards"]),
                TourStop(id: "2-2", title: "Ballokume Bakery", description: "Watch ballokume, Elbasan's famous corn-flour cookie, being baked in wood ovens and taste it warm.", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&q=80&w=1000", duration: "30 minutes", order: 2, funFacts: ["Ballokume is the signature treat of the Summer Day festival", "The traditional recipe uses only corn flour, butter, sugar, and eggs"], localTips: ["Morning batches sell out fast", "Pair it with a strong Albanian coffee"]),
            ]),
        Tour(
            id: "3", title: "Nature Escape: Shebenik Foothills",
            description: "A half-day trip to the gates of Shebenik-Jabllanicë National Park with panoramic views over the Shkumbin valley.",
            category: "nature", duration: "5 hours", distance: "9.6 km", difficulty: "hard",
            image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            featured: false, rating: 4.7, reviewCount: 42,
            stops: [
                TourStop(id: "3-1", title: "Park Gateway", description: "Start at the national park visitor center and meet your local guide from the park ranger service.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000", duration: "30 minutes", order: 1, funFacts: ["The park is home to the Balkan lynx, one of Europe's rarest cats"], localTips: ["Wear proper hiking shoes", "Carry at least 1.5 liters of water"]),
                TourStop(id: "3-2", title: "Panorama Ridge", description: "A steady climb to a ridge with sweeping views of Elbasan and the Shkumbin river valley.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000", duration: "2 hours", order: 2, funFacts: ["On clear days you can see Lake Ohrid on the horizon"], localTips: ["Best light for photos is late afternoon"]),
            ]),
    ]

    // MARK: - Shops

    static let shops: [Shop] = [
        Shop(
            id: "1", name: "Elbasan Artisans",
            description: "Traditional handcrafted souvenirs and gifts made by local artisans. Featuring wood carvings, textiles, and ceramics that showcase Albanian craftsmanship.",
            category: .souvenirs, address: "15 Qemal Stafa Street, Elbasan",
            phone: "+355 42 123 456", website: "www.elbasanartisans.al",
            image: "https://images.unsplash.com/photo-1516959512470-53955cd40f40?auto=format&fit=crop&q=80&w=1170",
            hours: "Mon-Sat: 9:00-19:00, Sun: 10:00-16:00", rating: 4.8, featured: true,
            promotion: ShopPromotion(title: "20% Off All Ceramics", description: "Special discount on all handmade ceramic items this month", validUntil: "2025-07-15", discountPercent: 20)),
        Shop(
            id: "2", name: "Taste of Albania",
            description: "Gourmet shop offering traditional Albanian food products including olive oil, honey, raki, and local wines. Perfect for culinary souvenirs.",
            category: .food, address: "28 Rruga e Kavajës, Elbasan",
            phone: "+355 42 234 567", website: "www.tasteofalbania.com",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1074",
            hours: "Mon-Sat: 8:00-20:00, Sun: 9:00-18:00", rating: 4.6, featured: true,
            promotion: nil),
        Shop(
            id: "3", name: "Albanian Heritage Textiles",
            description: "Specializing in traditional Albanian textiles including handwoven rugs, embroidered tablecloths, and authentic folk costumes.",
            category: .clothing, address: "5 Rruga Myslym Shyri, Elbasan",
            phone: "+355 42 345 678", website: nil,
            image: "https://images.unsplash.com/photo-1489367874814-f5d040621dd8?auto=format&fit=crop&q=80&w=1146",
            hours: "Mon-Fri: 10:00-18:00, Sat: 10:00-16:00, Sun: Closed", rating: 4.7, featured: false,
            promotion: ShopPromotion(title: "Free Embroidery Workshop", description: "Join our free traditional embroidery workshop with any purchase over €50", validUntil: "2025-06-30", discountPercent: nil)),
        Shop(
            id: "4", name: "Elbasan Bookshop",
            description: "Independent bookstore offering a wide selection of books in Albanian and English, including local history, travel guides, and works by Albanian authors.",
            category: .books, address: "42 Boulevard Zhan D'Ark, Elbasan",
            phone: "+355 42 456 789", website: "www.elbasanbooks.al",
            image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&q=80&w=1171",
            hours: "Mon-Sat: 9:00-20:00, Sun: 11:00-17:00", rating: 4.5, featured: false,
            promotion: nil),
        Shop(
            id: "5", name: "Mountain Sports Elbasan",
            description: "Outdoor and adventure sports equipment shop. Offers hiking gear, camping equipment, and sportswear suitable for exploring the Albanian mountains.",
            category: .sports, address: "17 Rruga Sami Frashëri, Elbasan",
            phone: "+355 42 567 890", website: "www.mountainsportselbasan.al",
            image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1170",
            hours: "Mon-Sat: 9:00-19:00, Sun: Closed", rating: 4.4, featured: true,
            promotion: ShopPromotion(title: "Hiking Season Sale", description: "Up to 30% off on selected hiking equipment", validUntil: "2025-08-31", discountPercent: 30)),
        Shop(
            id: "6", name: "Silver Filigree Gallery",
            description: "Showcasing the traditional Albanian craft of silver filigree. Offers handmade jewelry, decorative items, and custom pieces by local silversmiths.",
            category: .souvenirs, address: "9 Rruga Abdyl Frashëri, Elbasan",
            phone: "+355 42 678 901", website: nil,
            image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=1287",
            hours: "Tue-Sat: 10:00-18:00, Sun-Mon: Closed", rating: 4.9, featured: false,
            promotion: nil),
    ]

    // MARK: - Emergency Alerts

    static let emergencyAlerts: [EmergencyAlert] = [
        EmergencyAlert(id: "1", title: "Water Service Interruption", message: "Scheduled maintenance will interrupt water service in the eastern district from 10 PM to 4 AM tonight. Please store water for evening use.", type: .info, active: true, link: nil),
        EmergencyAlert(id: "2", title: "Severe Weather Warning", message: "Heavy rainfall expected in Elbasan region. Potential for flash flooding in low-lying areas. Stay indoors if possible.", type: .warning, active: true, link: nil),
        EmergencyAlert(id: "3", title: "Road Closure Alert", message: "Rruga 11 Nëntori will be closed for emergency repairs from the museum to the city center. Please use alternate routes.", type: .info, active: true, link: "https://elbasan.gov.al/roadclosures"),
    ]

    // MARK: - City Services

    static let services: [CityService] = [
        CityService(id: "1", name: "Elbasan Water Supply", category: "utilities", phone: "+355 54 123 456", email: "info@elbasanwater.al", website: "https://elbasanwater.al", address: "Rruga Qemal Stafa, Elbasan", hours: "Mon-Fri: 8:00 AM - 4:00 PM", description: "Responsible for water supply and sewage services in Elbasan.", emergency: false, systemImage: "drop.fill"),
        CityService(id: "2", name: "Elbasan Electric Company", category: "utilities", phone: "+355 54 234 567", email: "support@elbasanelectric.al", website: "https://elbasanelectric.al", address: "Bulevardi Qemal Stafa, Elbasan", hours: "Mon-Fri: 8:00 AM - 5:00 PM", description: "Electricity provider for Elbasan region.", emergency: false, systemImage: "bolt.fill"),
        CityService(id: "3", name: "Waste Management Department", category: "utilities", phone: "+355 54 345 678", email: "waste@elbasan.gov.al", website: "https://elbasan.gov.al/waste", address: "Rruga 11 Nëntori, Elbasan", hours: "Mon-Fri: 8:00 AM - 3:00 PM", description: "Responsible for waste collection and disposal in Elbasan.", emergency: false, systemImage: "trash.fill"),
        CityService(id: "4", name: "Elbasan General Hospital", category: "healthcare", phone: "+355 54 456 789", email: nil, website: "https://spitalielbasan.al", address: "Rruga Kozma Naska, Elbasan", hours: "24 hours", description: "The main public hospital serving Elbasan and the surrounding region.", emergency: true, systemImage: "cross.case.fill"),
        CityService(id: "5", name: "Tourist Police", category: "safety", phone: "+355 54 252 529", email: nil, website: nil, address: "City Center, Elbasan", hours: "24 hours", description: "Assistance for visitors in several languages, including lost property and directions.", emergency: true, systemImage: "shield.fill"),
        CityService(id: "6", name: "City Hall Citizen Service", category: "municipal", phone: "+355 54 800 100", email: "info@elbasan.gov.al", website: "https://elbasan.gov.al", address: "Bulevardi Qemal Stafa 1, Elbasan", hours: "Mon-Fri: 8:30 AM - 4:00 PM", description: "Civil documents, permits, and general municipal information.", emergency: false, systemImage: "building.2.fill"),
        CityService(id: "7", name: "Public Transport Office", category: "transport", phone: "+355 54 610 220", email: nil, website: nil, address: "Main Bus Station, Elbasan", hours: "Mon-Sat: 7:00 AM - 6:00 PM", description: "Timetables and tickets for city and intercity bus lines.", emergency: false, systemImage: "bus.fill"),
        CityService(id: "8", name: "Emergency (All Services)", category: "emergency", phone: "112", email: nil, website: nil, address: nil, hours: "24 hours", description: "Police, ambulance, and fire - the single national emergency number.", emergency: true, systemImage: "phone.circle.fill"),
    ]
}
