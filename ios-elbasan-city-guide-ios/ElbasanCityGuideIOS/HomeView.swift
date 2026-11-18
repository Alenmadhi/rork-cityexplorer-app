//
//  HomeView.swift
//  ElbasanCityGuideIOS
//
//  Port of app/(tabs)/index.tsx — alerts carousel, weather, featured tour,
//  quick actions and the attractions map preview.
//

import SwiftUI
import MapKit

struct HomeView: View {
    @Environment(AppState.self) private var appState

    private let activeAlerts = MockData.emergencyAlerts.filter(\.active)
    private let featuredTour = MockData.tours.first(where: \.featured) ?? MockData.tours[0]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                if !activeAlerts.isEmpty {
                    EmergencyAlertCarousel(alerts: activeAlerts)
                }

                WeatherCard(weather: MockData.weather)

                tourPromo
                quickActions
                attractionsMap
            }
            .padding(16)
            .padding(.bottom, 24)
        }
        .background(Theme.background)
        .navigationTitle("Elbasan City")
        .navigationBarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) { DrawerButton() }
        }
    }

    // MARK: - Featured tour promo

    private var tourPromo: some View {
        VStack(alignment: .leading, spacing: 12) {
            SectionHeader(title: "Explore Like a Local", actionTitle: "View All") {
                appState.selectedTab = .tourist
            }

            NavigationLink {
                TourDetailView(tour: featuredTour)
            } label: {
                ZStack(alignment: .bottom) {
                    RemoteImage(url: featuredTour.image)
                        .frame(height: 180)
                        .clipped()
                    VStack(alignment: .leading, spacing: 8) {
                        Text(featuredTour.title)
                            .font(.system(size: 18, weight: .bold))
                            .foregroundStyle(.white)
                        Text(featuredTour.description)
                            .font(.system(size: 14))
                            .foregroundStyle(.white.opacity(0.9))
                            .lineLimit(2)
                        Label("View Tour", systemImage: "map")
                            .font(.system(size: 14, weight: .medium))
                            .foregroundStyle(.white)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 8)
                            .background(Theme.primary, in: Capsule())
                    }
                    .padding(16)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(.black.opacity(0.6))
                }
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                .shadow(color: .black.opacity(0.1), radius: 4, y: 2)
            }
            .buttonStyle(.plain)
        }
    }

    // MARK: - Quick actions

    private var quickActions: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text("Quick Actions")
                .font(.system(size: 18, weight: .bold))
                .foregroundStyle(Theme.text)
                .padding(.bottom, 16)

            LazyVGrid(columns: [GridItem(.flexible(), spacing: 12), GridItem(.flexible())], spacing: 12) {
                NavigationLink { ServicesView() } label: { QuickActionButton(title: "City Services", icon: "exclamationmark.triangle", color: Theme.primary) }
                    .buttonStyle(.plain)
                NavigationLink { AttractionsView() } label: { QuickActionButton(title: "Attractions", icon: "map", color: Theme.secondary) }
                    .buttonStyle(.plain)
                NavigationLink { ToursListView() } label: { QuickActionButton(title: "Explore Tours", icon: "figure.hiking", color: Theme.success) }
                    .buttonStyle(.plain)
                NavigationLink { FavoritesView() } label: { QuickActionButton(title: "Favorites", icon: "heart", color: Theme.warning) }
                    .buttonStyle(.plain)
            }
        }
    }

    // MARK: - Map preview

    private var attractionsMap: some View {
        VStack(alignment: .leading, spacing: 0) {
            SectionHeader(title: "Nearby Attractions", actionTitle: "View All") {
                appState.selectedTab = .tourist
            }

            NavigationLink {
                AttractionsView()
            } label: {
                Map(initialPosition: .region(MKCoordinateRegion(
                    center: CLLocationCoordinate2D(latitude: 41.1125, longitude: 20.0822),
                    span: MKCoordinateSpan(latitudeDelta: 0.01, longitudeDelta: 0.01)
                ))) {
                    ForEach(MockData.attractions.prefix(4)) { attraction in
                        if let coordinates = attraction.coordinates {
                            Marker(attraction.name, coordinate: coordinates)
                                .tint(Theme.primary)
                        }
                    }
                }
                .frame(height: 220)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .strokeBorder(Theme.border, lineWidth: 1)
                )
                .overlay(alignment: .bottomTrailing) {
                    Label("View Full Map", systemImage: "mappin.and.ellipse")
                        .font(.system(size: 14, weight: .medium))
                        .foregroundStyle(.white)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 8)
                        .background(Theme.primary, in: Capsule())
                        .padding(12)
                }
            }
            .buttonStyle(.plain)
        }
    }
}

struct QuickActionButton: View {
    let title: String
    let icon: String
    let color: Color

    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 22))
                .foregroundStyle(color)
                .frame(width: 50, height: 50)
                .background(color.opacity(0.12), in: Circle())
            Text(title)
                .font(.system(size: 14, weight: .medium))
                .foregroundStyle(Theme.text)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 16)
        .cardStyle()
    }
}
