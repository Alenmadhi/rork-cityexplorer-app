//
//  ContentView.swift
//  ElbasanCityGuideIOS
//
//  Root layout: a tab bar (Home, Events, News, Tourist, Shops) with a
//  hamburger button in every screen's header that opens the side drawer,
//  mirroring the Expo app's navigation.
//

import SwiftUI

struct ContentView: View {
    @State private var appState = AppState()

    var body: some View {
        ZStack(alignment: .leading) {
            TabView(selection: Binding(
                get: { appState.selectedTab },
                set: { appState.selectedTab = $0 }
            )) {
                Tab(AppTab.home.label, systemImage: "house.fill", value: .home) {
                    NavigationStack { HomeView() }
                }
                Tab(AppTab.events.label, systemImage: "calendar", value: .events) {
                    NavigationStack { EventsView() }
                }
                Tab(AppTab.news.label, systemImage: "newspaper.fill", value: .news) {
                    NavigationStack { NewsView() }
                }
                Tab(AppTab.tourist.label, systemImage: "info.circle.fill", value: .tourist) {
                    NavigationStack { TouristView() }
                }
                Tab(AppTab.shops.label, systemImage: "bag.fill", value: .shops) {
                    NavigationStack { ShopsView() }
                }
            }
            .tint(Theme.primary)

            SideDrawer()
                .environment(appState)
        }
        .environment(appState)
    }
}

extension AppTab {
    var label: String {
        switch self {
        case .home: "Home"
        case .events: "Events"
        case .news: "News"
        case .tourist: "Tourist"
        case .shops: "Shops"
        }
    }
}

/// Hamburger button used as the leading toolbar item on every screen,
/// matching the Expo app's HamburgerButton header component.
struct DrawerButton: View {
    @Environment(AppState.self) private var appState

    var body: some View {
        Button {
            appState.isDrawerOpen = true
        } label: {
            Image(systemName: "line.3.horizontal")
                .font(.system(size: 18, weight: .semibold))
                .foregroundStyle(Theme.text)
        }
        .accessibilityLabel("Open menu")
    }
}

#Preview {
    ContentView()
}
