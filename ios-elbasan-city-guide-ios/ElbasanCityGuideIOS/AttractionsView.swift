//
//  AttractionsView.swift
//  ElbasanCityGuideIOS
//
//  Port of app/(tabs)/attractions.tsx and app/attractions/[id].tsx.
//

import SwiftUI
import MapKit

struct AttractionsView: View {
    @Environment(AppState.self) private var appState

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Map(initialPosition: .region(MKCoordinateRegion(
                    center: CLLocationCoordinate2D(latitude: 41.1125, longitude: 20.0822),
                    span: MKCoordinateSpan(latitudeDelta: 0.35, longitudeDelta: 0.35)
                ))) {
                    ForEach(MockData.attractions) { attraction in
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
                .padding(.horizontal, 16)
                .padding(.top, 8)

                LazyVStack(spacing: 16) {
                    ForEach(MockData.attractions) { attraction in
                        NavigationLink {
                            AttractionDetailView(attraction: attraction)
                        } label: {
                            AttractionCard(attraction: attraction)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal, 16)
            }
            .padding(.bottom, 24)
        }
        .background(Theme.background)
        .navigationTitle("Attractions")
        .navigationBarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) { DrawerButton() }
        }
    }
}

struct AttractionDetailView: View {
    let attraction: Attraction
    @Environment(AppState.self) private var appState

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                RemoteImage(url: attraction.image)
                    .frame(height: 230)
                    .clipped()
                    .overlay(alignment: .topTrailing) {
                        FavoriteToggle(isOn: appState.isFavoriteAttraction(attraction.id)) {
                            appState.toggleAttraction(attraction.id)
                        }
                        .padding(12)
                    }

                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text(attraction.name)
                            .font(.system(size: 24, weight: .bold))
                            .foregroundStyle(Theme.text)
                        Spacer()
                        Label(String(format: "%.1f", attraction.rating), systemImage: "star.fill")
                            .font(.system(size: 16, weight: .bold))
                            .foregroundStyle(Theme.warning)
                    }

                    Text(attraction.category.capitalized)
                        .font(.system(size: 12, weight: .bold))
                        .textCase(.uppercase)
                        .foregroundStyle(Theme.primary)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 4)
                        .background(Theme.primary.opacity(0.1), in: Capsule())

                    Text(attraction.description)
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.textSecondary)
                        .lineSpacing(4)

                    VStack(spacing: 10) {
                        DetailRow(icon: "mappin.and.ellipse", label: "Location", value: attraction.location)
                        DetailRow(icon: "clock", label: "Hours", value: attraction.hours)
                        DetailRow(icon: "ticket", label: "Price", value: attraction.price)
                    }
                    .padding(14)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .cardStyle()

                    if let coordinates = attraction.coordinates {
                        Map(initialPosition: .region(MKCoordinateRegion(
                            center: coordinates,
                            span: MKCoordinateSpan(latitudeDelta: 0.008, longitudeDelta: 0.008)
                        ))) {
                            Marker(attraction.name, coordinate: coordinates)
                                .tint(Theme.primary)
                        }
                        .frame(height: 180)
                        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                        .overlay(
                            RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .strokeBorder(Theme.border, lineWidth: 1)
                        )
                    }
                }
                .padding(16)
            }
        }
        .background(Theme.background)
        .navigationTitle("Attraction")
        .navigationBarTitleDisplayMode(.inline)
    }
}
