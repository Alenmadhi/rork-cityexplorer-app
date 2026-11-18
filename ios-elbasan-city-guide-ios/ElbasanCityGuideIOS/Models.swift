//
//  Models.swift
//  ElbasanCityGuideIOS
//
//  Ported from expo/types/index.ts and the mock data shapes.
//

import Foundation
import CoreLocation
import SwiftUI

struct CityEvent: Identifiable, Hashable {
    let id: String
    let title: String
    let description: String
    let date: String
    let time: String
    let location: String
    let image: String
    let category: EventCategory
    let organizer: String?
    let price: String?
    let featured: Bool
    let coordinates: CLLocationCoordinate2D?

    func hash(into hasher: inout Hasher) { hasher.combine(id) }
    static func == (lhs: CityEvent, rhs: CityEvent) -> Bool { lhs.id == rhs.id }
}

enum EventCategory: String, CaseIterable, Identifiable {
    case all, music, art, food, sports, festival, other
    var id: String { rawValue }

    var label: String { self == .all ? "All" : rawValue.capitalized }
}

struct NewsItem: Identifiable, Hashable {
    let id: String
    let title: String
    let summary: String
    let content: String
    let publishedAt: Date
    let author: String
    let image: String
    let category: String
    let source: String
    let featured: Bool
}

struct Weather: Hashable {
    let location: String
    let temperature: Int
    let condition: String
    let icon: String
    let windSpeed: Int
    let humidity: Int
    let lastUpdated: Date
    let forecast: [WeatherForecast]
}

struct WeatherForecast: Hashable {
    let day: String
    let icon: String
    let min: Int
    let max: Int
}

struct Attraction: Identifiable, Hashable {
    let id: String
    let name: String
    let description: String
    let image: String
    let location: String
    let rating: Double
    let category: String
    let hours: String
    let price: String
    let isFeatured: Bool
    let coordinates: CLLocationCoordinate2D?

    func hash(into hasher: inout Hasher) { hasher.combine(id) }
    static func == (lhs: Attraction, rhs: Attraction) -> Bool { lhs.id == rhs.id }
}

struct TouristInfo: Identifiable, Hashable {
    let id: String
    let title: String
    let description: String
    let icon: String
    let category: TouristCategory
}

enum TouristCategory: String, CaseIterable, Identifiable {
    case transportation, accommodation, emergency, wifi, tips
    var id: String { rawValue }
}

struct Tour: Identifiable, Hashable {
    let id: String
    let title: String
    let description: String
    let category: String
    let duration: String
    let distance: String
    let difficulty: String
    let image: String
    let featured: Bool
    let rating: Double
    let reviewCount: Int
    let stops: [TourStop]
}

struct TourStop: Identifiable, Hashable {
    let id: String
    let title: String
    let description: String
    let image: String
    let duration: String
    let order: Int
    let funFacts: [String]
    let localTips: [String]
}

struct Shop: Identifiable, Hashable {
    let id: String
    let name: String
    let description: String
    let category: ShopCategory
    let address: String
    let phone: String?
    let website: String?
    let image: String
    let hours: String
    let rating: Double
    let featured: Bool
    let promotion: ShopPromotion?
}

enum ShopCategory: String, CaseIterable, Identifiable {
    case all, souvenirs, food, clothing, books, sports
    var id: String { rawValue }
    var label: String { self == .all ? "All" : rawValue.capitalized }
}

struct ShopPromotion: Hashable {
    let title: String
    let description: String
    let validUntil: String
    let discountPercent: Int?
}

struct EmergencyAlert: Identifiable, Hashable {
    let id: String
    let title: String
    let message: String
    let type: AlertType
    let active: Bool
    let link: String?

    var color: Color {
        switch type {
        case .info: Theme.info
        case .warning: Theme.warning
        case .danger: Theme.error
        }
    }

    var systemImage: String {
        switch type {
        case .info: "info.circle.fill"
        case .warning: "exclamationmark.triangle.fill"
        case .danger: "octagon.fill"
        }
    }
}

enum AlertType: String {
    case info, warning, danger
}

struct CityService: Identifiable, Hashable {
    let id: String
    let name: String
    let category: String
    let phone: String?
    let email: String?
    let website: String?
    let address: String?
    let hours: String?
    let description: String?
    let emergency: Bool
    let systemImage: String
}
