//
//  EventsView.swift
//  ElbasanCityGuideIOS
//
//  Port of app/(tabs)/events.tsx and app/events/[id].tsx.
//

import SwiftUI

struct EventsView: View {
    @State private var query = ""
    @State private var category: EventCategory = .all

    private var filtered: [CityEvent] {
        MockData.events.filter { event in
            let matchesQuery = query.isEmpty
                || event.title.localizedCaseInsensitiveContains(query)
                || event.description.localizedCaseInsensitiveContains(query)
                || event.location.localizedCaseInsensitiveContains(query)
            return matchesQuery && (category == .all || event.category == category)
        }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                SearchBarField(text: $query, placeholder: "Search events...")
                    .padding(.horizontal, 16)

                CategoryChipRow(categories: EventCategory.allCases.map(\.label), selection: Binding(
                    get: { category.label },
                    set: { newValue in
                        category = EventCategory.allCases.first { $0.label == newValue } ?? .all
                    }
                ))

                LazyVStack(spacing: 16) {
                    if filtered.isEmpty {
                        EmptyStateView(title: "No events found", message: "Try a different search or category", systemImage: "calendar.badge.exclamationmark")
                    }
                    ForEach(filtered) { event in
                        NavigationLink {
                            EventDetailView(event: event)
                        } label: {
                            EventCard(event: event)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal, 16)
            }
            .padding(.vertical, 8)
        }
        .background(Theme.background)
        .navigationTitle("Events")
        .navigationBarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) { DrawerButton() }
        }
    }
}

struct EventDetailView: View {
    let event: CityEvent
    @Environment(AppState.self) private var appState

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                RemoteImage(url: event.image)
                    .frame(height: 230)
                    .clipped()
                    .overlay(alignment: .topTrailing) {
                        FavoriteToggle(isOn: appState.isFavoriteEvent(event.id)) {
                            appState.toggleEvent(event.id)
                        }
                        .padding(12)
                    }

                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text(event.category.rawValue.capitalized)
                            .font(.system(size: 12, weight: .bold))
                            .textCase(.uppercase)
                            .foregroundStyle(Theme.primary)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 4)
                            .background(Theme.primary.opacity(0.1), in: Capsule())
                        Spacer()
                        Text(event.price ?? "Free")
                            .font(.system(size: 16, weight: .bold))
                            .foregroundStyle(Theme.success)
                    }

                    Text(event.title)
                        .font(.system(size: 24, weight: .bold))
                        .foregroundStyle(Theme.text)

                    Text(event.description)
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.textSecondary)

                    VStack(spacing: 10) {
                        DetailRow(icon: "calendar", label: "Date", value: event.date.formattedDate)
                        DetailRow(icon: "clock", label: "Time", value: event.time)
                        DetailRow(icon: "mappin.and.ellipse", label: "Location", value: event.location)
                        if let organizer = event.organizer {
                            DetailRow(icon: "person.2", label: "Organizer", value: organizer)
                        }
                    }
                    .padding(14)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .cardStyle()

                    if let coordinates = event.coordinates {
                        Map(initialPosition: .region(MKCoordinateRegion(
                            center: coordinates,
                            span: MKCoordinateSpan(latitudeDelta: 0.005, longitudeDelta: 0.005)
                        ))) {
                            Marker(event.location, coordinate: coordinates)
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
        .navigationTitle("Event")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct DetailRow: View {
    let icon: String
    let label: String
    let value: String

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 15))
                .foregroundStyle(Theme.primary)
                .frame(width: 24)
            Text(label)
                .font(.system(size: 14, weight: .semibold))
                .foregroundStyle(Theme.text)
            Spacer()
            Text(value)
                .font(.system(size: 14))
                .foregroundStyle(Theme.textSecondary)
                .multilineTextAlignment(.trailing)
        }
    }
}

import MapKit
