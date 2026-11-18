//
//  FavoritesView.swift
//  ElbasanCityGuideIOS
//
//  Port of app/(tabs)/favorites.tsx — saved events, attractions and news.
//

import SwiftUI

struct FavoritesView: View {
    @Environment(AppState.self) private var appState

    private enum Section: String, CaseIterable {
        case events, attractions, news
        var label: String {
            switch self {
            case .events: "Events"
            case .attractions: "Attractions"
            case .news: "News"
            }
        }
    }

    @State private var section: Section = .events

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Picker("Section", selection: $section) {
                    ForEach(Section.allCases, id: \.self) {
                        Text($0.label).tag($0)
                    }
                }
                .pickerStyle(.segmented)
                .padding(.horizontal, 16)

                LazyVStack(spacing: 16) {
                    switch section {
                    case .events:
                        let favorites = MockData.events.filter { appState.isFavoriteEvent($0.id) }
                        if favorites.isEmpty {
                            EmptyStateView(title: "No favorite events yet", message: "Save events you're interested in to find them here", systemImage: "heart")
                        }
                        ForEach(favorites) { event in
                            NavigationLink { EventDetailView(event: event) } label: { EventCard(event: event) }
                                .buttonStyle(.plain)
                        }
                    case .attractions:
                        let favorites = MockData.attractions.filter { appState.isFavoriteAttraction($0.id) }
                        if favorites.isEmpty {
                            EmptyStateView(title: "No favorite attractions yet", message: "Save attractions you want to visit to find them here", systemImage: "heart")
                        }
                        ForEach(favorites) { attraction in
                            NavigationLink { AttractionDetailView(attraction: attraction) } label: { AttractionCard(attraction: attraction) }
                                .buttonStyle(.plain)
                        }
                    case .news:
                        let favorites = MockData.news.filter { appState.isFavoriteNews($0.id) }
                        if favorites.isEmpty {
                            EmptyStateView(title: "No favorite news yet", message: "Save articles you want to read later", systemImage: "heart")
                        }
                        ForEach(favorites) { item in
                            NavigationLink { NewsDetailView(item: item) } label: { NewsCard(item: item) }
                                .buttonStyle(.plain)
                        }
                    }
                }
                .padding(.horizontal, 16)
            }
            .padding(.vertical, 8)
        }
        .background(Theme.background)
        .navigationTitle("Favorites")
        .navigationBarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) { DrawerButton() }
        }
    }
}
