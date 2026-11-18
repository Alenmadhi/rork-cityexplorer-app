//
//  AppState.swift
//  ElbasanCityGuideIOS
//

import SwiftUI

enum AppTab: String, CaseIterable, Identifiable {
    case home, events, news, tourist, shops
    var id: String { rawValue }
}

/// Shared UI + favorites state. Favorites persist to UserDefaults so the
/// Favorites tab behaves like the Expo app's favorites store.
@Observable
final class AppState {
    var selectedTab: AppTab = .home
    var isDrawerOpen = false

    @ObservationIgnored private let defaults: UserDefaults
    @ObservationIgnored private static let favoritesKey = "favorite.ids"

    var favoriteEventIDs: Set<String> = []
    var favoriteAttractionIDs: Set<String> = []
    var favoriteNewsIDs: Set<String> = []

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
        let raw = Set(defaults.stringArray(forKey: Self.favoritesKey) ?? [])
        favoriteEventIDs = Set(raw.filter { $0.hasPrefix("e:") }.map { String($0.dropFirst(2)) })
        favoriteAttractionIDs = Set(raw.filter { $0.hasPrefix("a:") }.map { String($0.dropFirst(2)) })
        favoriteNewsIDs = Set(raw.filter { $0.hasPrefix("n:") }.map { String($0.dropFirst(2)) })
    }

    private func persist() {
        let raw = favoriteEventIDs.map { "e:\($0)" }
            + favoriteAttractionIDs.map { "a:\($0)" }
            + favoriteNewsIDs.map { "n:\($0)" }
        defaults.set(Array(raw), forKey: Self.favoritesKey)
    }

    func isFavoriteEvent(_ id: String) -> Bool { favoriteEventIDs.contains(id) }
    func isFavoriteAttraction(_ id: String) -> Bool { favoriteAttractionIDs.contains(id) }
    func isFavoriteNews(_ id: String) -> Bool { favoriteNewsIDs.contains(id) }

    func toggleEvent(_ id: String) { favoriteEventIDs.formSymmetricDifference([id]); persist() }
    func toggleAttraction(_ id: String) { favoriteAttractionIDs.formSymmetricDifference([id]); persist() }
    func toggleNews(_ id: String) { favoriteNewsIDs.formSymmetricDifference([id]); persist() }
}
