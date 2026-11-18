//
//  Components.swift
//  ElbasanCityGuideIOS
//
//  Ports of WeatherCard, EventCard, NewsCard, ShopCard, AttractionCard,
//  TourCard, EmergencyAlertCarousel, SearchBar and EmptyState.
//

import SwiftUI

// MARK: - WeatherCard

struct WeatherCard: View {
    let weather: Weather
    @State private var isRefreshing = false

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text(weather.location)
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundStyle(Theme.text)
                    Text("Updated at \(weather.lastUpdated.formatted(date: .omitted, time: .shortened))")
                        .font(.system(size: 12))
                        .foregroundStyle(Theme.textSecondary)
                }
                Spacer()
                Button {
                    isRefreshing = true
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.8) { isRefreshing = false }
                } label: {
                    Image(systemName: "arrow.clockwise")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundStyle(Theme.primary)
                        .rotationEffect(.degrees(isRefreshing ? 360 : 0))
                        .animation(isRefreshing ? .linear(duration: 0.8).repeatForever(autoreverses: false) : .default, value: isRefreshing)
                }
                .accessibilityLabel("Refresh weather")
            }

            HStack(spacing: 16) {
                Image(systemName: weather.icon)
                    .font(.system(size: 40))
                    .foregroundStyle(Theme.warning)
                Text("\(weather.temperature)°")
                    .font(.system(size: 44, weight: .bold))
                    .foregroundStyle(Theme.text)
                VStack(alignment: .leading, spacing: 6) {
                    Text(weather.condition)
                        .font(.system(size: 15, weight: .medium))
                        .foregroundStyle(Theme.text)
                    HStack(spacing: 14) {
                        Label("\(weather.windSpeed) km/h", systemImage: "wind")
                        Label("\(weather.humidity)%", systemImage: "humidity.fill")
                    }
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.textSecondary)
                }
            }

            if !weather.forecast.isEmpty {
                HStack(spacing: 0) {
                    ForEach(Array(weather.forecast.enumerated()), id: \.offset) { index, day in
                        VStack(spacing: 6) {
                            Text(day.day)
                                .font(.system(size: 13, weight: .medium))
                                .foregroundStyle(Theme.textSecondary)
                            Image(systemName: day.icon)
                                .font(.system(size: 20))
                                .foregroundStyle(Theme.warning)
                            Text("\(day.max)° / \(day.min)°")
                                .font(.system(size: 13, weight: .semibold))
                                .foregroundStyle(Theme.text)
                        }
                        .frame(maxWidth: .infinity)
                        .overlay(alignment: .trailing) {
                            if index < weather.forecast.count - 1 {
                                Rectangle().fill(Theme.border).frame(width: 1).frame(maxHeight: 60)
                            }
                        }
                    }
                }
                .padding(.top, 4)
            }
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
    }
}

// MARK: - EmergencyAlertCarousel

struct EmergencyAlertCarousel: View {
    let alerts: [EmergencyAlert]

    var body: some View {
        TabView {
            ForEach(alerts) { alert in
                HStack(alignment: .top, spacing: 12) {
                    Image(systemName: alert.systemImage)
                        .font(.system(size: 20))
                        .foregroundStyle(.white)
                        .frame(width: 36, height: 36)
                        .background(alert.color.opacity(0.85))
                        .clipShape(Circle())
                    VStack(alignment: .leading, spacing: 4) {
                        Text(alert.title)
                            .font(.system(size: 15, weight: .bold))
                            .foregroundStyle(.white)
                        Text(alert.message)
                            .font(.system(size: 13))
                            .foregroundStyle(.white.opacity(0.95))
                            .lineLimit(3)
                            .multilineTextAlignment(.leading)
                    }
                    Spacer(minLength: 0)
                }
                .padding(14)
                .background(alert.color)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                .padding(.horizontal, 16)
                .padding(.vertical, 4)
            }
        }
        .tabViewStyle(.page(indexDisplayMode: alerts.count > 1 ? .automatic : .never))
        .frame(height: 120)
    }
}

// MARK: - SearchBar

struct SearchBarField: View {
    @Binding var text: String
    var placeholder: String

    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: "magnifyingglass")
                .foregroundStyle(Theme.textSecondary)
            TextField(placeholder, text: $text)
                .font(.system(size: 15))
                .autocorrectionDisabled()
            if !text.isEmpty {
                Button {
                    text = ""
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundStyle(Theme.textSecondary)
                }
            }
        }
        .padding(12)
        .background(Theme.card)
        .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 10, style: .continuous)
                .strokeBorder(Theme.border, lineWidth: 1)
        )
    }
}

// MARK: - Category chips

struct CategoryChipRow: View {
    let categories: [String]
    @Binding var selection: String

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(categories, id: \.self) { category in
                    let isSelected = category == selection
                    Button {
                        withAnimation(.snappy(duration: 0.2)) { selection = category }
                    } label: {
                        Text(category.capitalized)
                            .font(.system(size: 14, weight: isSelected ? .semibold : .regular))
                            .foregroundStyle(isSelected ? Theme.background : Theme.text)
                            .padding(.horizontal, 16)
                            .padding(.vertical, 8)
                            .background(isSelected ? Theme.primary : Theme.card)
                            .clipShape(Capsule())
                            .overlay(Capsule().strokeBorder(Theme.border, lineWidth: 1).opacity(isSelected ? 0 : 1))
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.horizontal, 16)
        }
    }
}

// MARK: - Favorite toggle

struct FavoriteToggle: View {
    let isOn: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: isOn ? "heart.fill" : "heart")
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(isOn ? Theme.error : .white)
                .shadow(color: .black.opacity(0.35), radius: 3)
                .padding(8)
                .background(.black.opacity(0.25), in: Circle())
        }
        .sensoryFeedback(.impact(weight: .light), trigger: isOn)
        .accessibilityLabel(isOn ? "Remove from favorites" : "Add to favorites")
    }
}

// MARK: - EventCard

struct EventCard: View {
    let event: CityEvent
    @Environment(AppState.self) private var appState

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            RemoteImage(url: event.image)
                .frame(height: 160)
                .clipped()
                .overlay(alignment: .topLeading) {
                    HStack {
                        if event.featured {
                            Text("Featured")
                                .font(.system(size: 11, weight: .bold))
                                .textCase(.uppercase)
                                .foregroundStyle(.white)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(Theme.warning, in: Capsule())
                        }
                        Spacer()
                        FavoriteToggle(isOn: appState.isFavoriteEvent(event.id)) {
                            appState.toggleEvent(event.id)
                        }
                    }
                    .padding(10)
                }

            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text(event.category.rawValue.capitalized)
                        .font(.system(size: 11, weight: .bold))
                        .textCase(.uppercase)
                        .foregroundStyle(Theme.primary)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(Theme.primary.opacity(0.1), in: Capsule())
                    Spacer()
                    Text(event.price ?? "")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundStyle(Theme.success)
                }
                Text(event.title)
                    .font(.system(size: 17, weight: .bold))
                    .foregroundStyle(Theme.text)
                Label(event.date.formattedDate + " · " + event.time, systemImage: "clock")
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.textSecondary)
                Label(event.location, systemImage: "mappin.and.ellipse")
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.textSecondary)
            }
            .padding(14)
        }
        .cardStyle()
    }
}

// MARK: - NewsCard

struct NewsCard: View {
    let item: NewsItem
    @Environment(AppState.self) private var appState

    var categoryColor: Color {
        switch item.category {
        case "culture": Theme.categoryCulture
        case "business": Theme.categoryBusiness
        case "politics": Theme.categoryPolitics
        default: Theme.categoryOther
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            RemoteImage(url: item.image)
                .frame(height: 150)
                .clipped()
                .overlay(alignment: .topTrailing) {
                    FavoriteToggle(isOn: appState.isFavoriteNews(item.id)) {
                        appState.toggleNews(item.id)
                    }
                    .padding(10)
                }
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text(item.category.capitalized)
                        .font(.system(size: 11, weight: .bold))
                        .textCase(.uppercase)
                        .foregroundStyle(.white)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(categoryColor, in: Capsule())
                    Text(item.source)
                        .font(.system(size: 12, weight: .medium))
                        .foregroundStyle(Theme.textSecondary)
                    Spacer()
                    if item.featured {
                        Image(systemName: "star.fill")
                            .font(.system(size: 12))
                            .foregroundStyle(Theme.warning)
                    }
                }
                Text(item.title)
                    .font(.system(size: 16, weight: .bold))
                    .foregroundStyle(Theme.text)
                Text(item.summary)
                    .font(.system(size: 14))
                    .foregroundStyle(Theme.textSecondary)
                    .lineLimit(2)
                HStack(spacing: 6) {
                    Image(systemName: "person.crop.circle")
                        .font(.system(size: 13))
                    Text("\(item.author) · \(item.publishedAt.formatted(date: .abbreviated, time: .omitted))")
                }
                .font(.system(size: 12))
                .foregroundStyle(Theme.textSecondary)
            }
            .padding(14)
        }
        .cardStyle()
    }
}

// MARK: - ShopCard

struct ShopCard: View {
    let shop: Shop

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            RemoteImage(url: shop.image)
                .frame(width: 84, height: 84)
                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))

            VStack(alignment: .leading, spacing: 5) {
                HStack {
                    Text(shop.name)
                        .font(.system(size: 16, weight: .bold))
                        .foregroundStyle(Theme.text)
                    if shop.featured {
                        Image(systemName: "star.fill")
                            .font(.system(size: 11))
                            .foregroundStyle(Theme.warning)
                    }
                    Spacer()
                    Label(String(format: "%.1f", shop.rating), systemImage: "star.fill")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundStyle(Theme.warning)
                }
                Text(shop.description)
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.textSecondary)
                    .lineLimit(2)
                Label(shop.address, systemImage: "mappin.and.ellipse")
                    .font(.system(size: 12))
                    .foregroundStyle(Theme.textSecondary)
            }
        }
        .padding(12)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
    }
}

// MARK: - AttractionCard

struct AttractionCard: View {
    let attraction: Attraction
    @Environment(AppState.self) private var appState

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            RemoteImage(url: attraction.image)
                .frame(height: 150)
                .clipped()
                .overlay(alignment: .topTrailing) {
                    FavoriteToggle(isOn: appState.isFavoriteAttraction(attraction.id)) {
                        appState.toggleAttraction(attraction.id)
                    }
                    .padding(10)
                }
            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Text(attraction.name)
                        .font(.system(size: 16, weight: .bold))
                        .foregroundStyle(Theme.text)
                    Spacer()
                    Label(String(format: "%.1f", attraction.rating), systemImage: "star.fill")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundStyle(Theme.warning)
                }
                Text(attraction.description)
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.textSecondary)
                    .lineLimit(2)
                HStack(spacing: 12) {
                    Label(attraction.hours, systemImage: "clock")
                    Label(attraction.price, systemImage: "ticket")
                }
                .font(.system(size: 12))
                .foregroundStyle(Theme.textSecondary)
            }
            .padding(14)
        }
        .cardStyle()
    }
}

// MARK: - TourCard

struct TourCard: View {
    let tour: Tour

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            RemoteImage(url: tour.image)
                .frame(height: 130)
                .clipped()
                .overlay(alignment: .bottomLeading) {
                    Text(tour.category.capitalized)
                        .font(.system(size: 11, weight: .bold))
                        .textCase(.uppercase)
                        .foregroundStyle(.white)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Theme.primary, in: Capsule())
                        .padding(10)
                }
            VStack(alignment: .leading, spacing: 6) {
                Text(tour.title)
                    .font(.system(size: 16, weight: .bold))
                    .foregroundStyle(Theme.text)
                Text(tour.description)
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.textSecondary)
                    .lineLimit(2)
                HStack(spacing: 12) {
                    Label(tour.duration, systemImage: "clock")
                    Label(tour.distance, systemImage: "point.topleft.down.curvedto.point.bottomright.up")
                    Label(String(format: "%.1f", tour.rating), systemImage: "star.fill")
                }
                .font(.system(size: 12))
                .foregroundStyle(Theme.textSecondary)
            }
            .padding(14)
        }
        .cardStyle()
    }
}

// MARK: - EmptyState

struct EmptyStateView: View {
    let title: String
    let message: String
    var systemImage: String = "tray"

    var body: some View {
        VStack(spacing: 10) {
            Image(systemName: systemImage)
                .font(.system(size: 40))
                .foregroundStyle(Theme.textSecondary)
            Text(title)
                .font(.system(size: 17, weight: .bold))
                .foregroundStyle(Theme.text)
            Text(message)
                .font(.system(size: 14))
                .foregroundStyle(Theme.textSecondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 48)
        .padding(.horizontal, 24)
    }
}

extension String {
    var formattedDate: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        let date = formatter.date(from: self) ?? nil
        formatter.dateStyle = .medium
        return date.map(formatter.string(from:)) ?? self
    }
}
