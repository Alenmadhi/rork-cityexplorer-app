//
//  SideDrawer.swift
//  ElbasanCityGuideIOS
//
//  Port of components/SideDrawer.tsx — slides in from the left over a
//  dimmed background. Selecting a destination switches the active tab.
//

import SwiftUI

struct SideDrawer: View {
    @Environment(AppState.self) private var appState

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                if appState.isDrawerOpen {
                    Color.black.opacity(0.4)
                        .ignoresSafeArea()
                        .onTapGesture { close() }
                        .transition(.opacity)

                    VStack(alignment: .leading, spacing: 4) {
                        // Header
                        HStack(spacing: 14) {
                            Image(systemName: "building.columns.fill")
                                .font(.system(size: 26))
                                .foregroundStyle(Theme.primary)
                                .frame(width: 52, height: 52)
                                .background(Theme.primary.opacity(0.12))
                                .clipShape(Circle())
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Elbasan City Guide")
                                    .font(.system(size: 17, weight: .bold))
                                    .foregroundStyle(Theme.text)
                                Text("Explore. Discover. Enjoy.")
                                    .font(.system(size: 13))
                                    .foregroundStyle(Theme.textSecondary)
                            }
                        }
                        .padding(16)

                        Divider()

                        drawerItem("house.fill", "Home", .home)
                        drawerItem("calendar", "Events", .events)
                        drawerItem("newspaper", "News", .news)
                        drawerItem("info.circle", "Tourist Information", .tourist)
                        drawerItem("bag", "Local Shops", .shops)

                        Divider().padding(.vertical, 8)

                        // Destinations that live inside tabs
                        drawerLink("map", "Attractions") { appState.selectedTab = .tourist }
                        drawerLink("wrench.and.screwdriver.fill", "City Services") { appState.selectedTab = .home }
                        drawerLink("heart.fill", "Favorites") { appState.selectedTab = .events }
                        drawerLink("figure.hiking", "Guided Tours") { appState.selectedTab = .tourist }

                        Spacer()

                        Text("Elbasan, Albania")
                            .font(.system(size: 12))
                            .foregroundStyle(Theme.textSecondary)
                            .padding(16)
                    }
                    .frame(width: 300)
                    .frame(maxHeight: .infinity)
                    .background(Theme.background)
                    .transition(.move(edge: .leading))
                    .shadow(color: .black.opacity(0.2), radius: 12)
                }
            }
            .frame(width: geo.size.width, height: geo.size.height)
            .animation(.spring(response: 0.35, dampingFraction: 0.85), value: appState.isDrawerOpen)
        }
        .ignoresSafeArea()
        .allowsHitTesting(appState.isDrawerOpen)
    }

    private func close() {
        appState.isDrawerOpen = false
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
    }

    private func drawerItem(_ icon: String, _ title: String, _ tab: AppTab) -> some View {
        drawerLink(icon, title) {
            appState.selectedTab = tab
        }
    }

    private func drawerLink(_ icon: String, _ title: String, action: @escaping () -> Void) -> some View {
        Button {
            action()
            close()
        } label: {
            HStack(spacing: 14) {
                Image(systemName: icon)
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundStyle(Theme.primary)
                    .frame(width: 28)
                Text(title)
                    .font(.system(size: 16, weight: .medium))
                    .foregroundStyle(Theme.text)
                Spacer()
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 12)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
}
