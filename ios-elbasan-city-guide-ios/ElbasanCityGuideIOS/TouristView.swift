//
//  TouristView.swift
//  ElbasanCityGuideIOS
//
//  Port of app/(tabs)/tourist.tsx, app/tourist/* sub-pages and the tours
//  screens (app/tourist/tours.tsx, app/tourist/tours/[id].tsx).
//

import SwiftUI

struct TouristView: View {
    @Environment(AppState.self) private var appState
    private let featuredTours = MockData.tours.filter(\.featured).prefix(2)

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                VStack(spacing: 4) {
                    Text("Visitor's Guide to")
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.textSecondary)
                    Text("Elbasan, Albania")
                        .font(.system(size: 26, weight: .bold))
                        .foregroundStyle(Theme.primary)
                }
                .frame(maxWidth: .infinity)
                .padding(.top, 8)

                // Featured tours
                VStack(alignment: .leading, spacing: 12) {
                    SectionHeader(title: "Explore Like a Local", actionTitle: "View All") {
                        // handled by button below
                    }
                    Text("Discover Elbasan through guided tours with stories, facts, and local tips")
                        .font(.system(size: 14))
                        .foregroundStyle(Theme.textSecondary)

                    ForEach(featuredTours) { tour in
                        NavigationLink {
                            TourDetailView(tour: tour)
                        } label: {
                            TourCard(tour: tour)
                        }
                        .buttonStyle(.plain)
                    }

                    NavigationLink {
                        ToursListView()
                    } label: {
                        Label("Explore All Tours", systemImage: "map")
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundStyle(Theme.primary)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .background(Theme.primary.opacity(0.1), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                    }
                    .buttonStyle(.plain)
                }

                // About Elbasan
                VStack(alignment: .leading, spacing: 8) {
                    Text("About Elbasan")
                        .font(.system(size: 16, weight: .bold))
                        .foregroundStyle(Theme.text)
                    Text("Elbasan is a historic city in central Albania, known for its well-preserved Ottoman castle, traditional cuisine, and the famous Summer Day Festival. Located on the Shkumbin River, it has been an important cultural and economic center since ancient times.")
                        .font(.system(size: 14))
                        .foregroundStyle(Theme.textSecondary)
                        .lineSpacing(4)
                }
                .padding(14)
                .frame(maxWidth: .infinity, alignment: .leading)
                .cardStyle()

                // Info categories
                VStack(alignment: .leading, spacing: 12) {
                    Text("Traveler Information")
                        .font(.system(size: 18, weight: .bold))
                        .foregroundStyle(Theme.text)

                    ForEach(TouristCategory.allCases) { category in
                        NavigationLink {
                            TouristCategoryView(category: category)
                        } label: {
                            HStack(spacing: 14) {
                                Image(systemName: icon(for: category))
                                    .font(.system(size: 18))
                                    .foregroundStyle(Theme.primary)
                                    .frame(width: 42, height: 42)
                                    .background(Theme.primary.opacity(0.1), in: Circle())
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(category.label)
                                        .font(.system(size: 15, weight: .semibold))
                                        .foregroundStyle(Theme.text)
                                    Text("\(MockData.touristInfo.filter { $0.category == category }.count) tips")
                                        .font(.system(size: 12))
                                        .foregroundStyle(Theme.textSecondary)
                                }
                                Spacer()
                                Image(systemName: "chevron.right")
                                    .font(.system(size: 13, weight: .semibold))
                                    .foregroundStyle(Theme.textSecondary)
                            }
                            .padding(12)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .cardStyle()
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
            .padding(16)
            .padding(.bottom, 24)
        }
        .background(Theme.background)
        .navigationTitle("Tourist Information")
        .navigationBarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) { DrawerButton() }
        }
    }

    private func icon(for category: TouristCategory) -> String {
        switch category {
        case .transportation: "bus.fill"
        case .accommodation: "bed.double.fill"
        case .emergency: "cross.case.fill"
        case .wifi: "wifi"
        case .tips: "lightbulb.fill"
        }
    }
}

extension TouristCategory {
    var label: String {
        switch self {
        case .transportation: "Transportation"
        case .accommodation: "Accommodation"
        case .emergency: "Emergency"
        case .wifi: "Internet & Wi-Fi"
        case .tips: "Tips & Customs"
        }
    }
}

// MARK: - Category detail

struct TouristCategoryView: View {
    let category: TouristCategory

    private var items: [TouristInfo] {
        MockData.touristInfo.filter { $0.category == category }
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 14) {
                ForEach(items) { item in
                    VStack(alignment: .leading, spacing: 8) {
                        Label(item.title, systemImage: item.icon)
                            .font(.system(size: 16, weight: .bold))
                            .foregroundStyle(Theme.text)
                        Text(item.description)
                            .font(.system(size: 14))
                            .foregroundStyle(Theme.textSecondary)
                            .lineSpacing(4)
                    }
                    .padding(14)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .cardStyle()
                }
            }
            .padding(16)
        }
        .background(Theme.background)
        .navigationTitle(category.label)
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - Tours list & detail

struct ToursListView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                ForEach(MockData.tours) { tour in
                    NavigationLink {
                        TourDetailView(tour: tour)
                    } label: {
                        TourCard(tour: tour)
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(16)
        }
        .background(Theme.background)
        .navigationTitle("Guided Tours")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct TourDetailView: View {
    let tour: Tour

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                RemoteImage(url: tour.image)
                    .frame(height: 220)
                    .clipped()

                VStack(alignment: .leading, spacing: 14) {
                    Text(tour.title)
                        .font(.system(size: 24, weight: .bold))
                        .foregroundStyle(Theme.text)

                    HStack(spacing: 14) {
                        Label(tour.duration, systemImage: "clock")
                        Label(tour.distance, systemImage: "point.topleft.down.curvedto.point.bottomright.up")
                        Label(tour.difficulty.capitalized, systemImage: "figure.hiking")
                    }
                    .font(.system(size: 13, weight: .medium))
                    .foregroundStyle(Theme.textSecondary)

                    HStack(spacing: 6) {
                        Image(systemName: "star.fill")
                            .foregroundStyle(Theme.warning)
                        Text("\(String(format: "%.1f", tour.rating)) (\(tour.reviewCount) reviews)")
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundStyle(Theme.text)
                    }

                    Text(tour.description)
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.textSecondary)
                        .lineSpacing(4)

                    Text("Tour Stops")
                        .font(.system(size: 18, weight: .bold))
                        .foregroundStyle(Theme.text)
                        .padding(.top, 6)

                    ForEach(tour.stops) { stop in
                        TourStopCard(stop: stop)
                    }
                }
                .padding(16)
            }
        }
        .background(Theme.background)
        .navigationTitle("Tour")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct TourStopCard: View {
    let stop: TourStop
    @State private var isExpanded = false

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .top, spacing: 12) {
                Text("\(stop.order)")
                    .font(.system(size: 15, weight: .bold))
                    .foregroundStyle(.white)
                    .frame(width: 30, height: 30)
                    .background(Theme.primary, in: Circle())

                VStack(alignment: .leading, spacing: 4) {
                    Text(stop.title)
                        .font(.system(size: 16, weight: .bold))
                        .foregroundStyle(Theme.text)
                    Label(stop.duration, systemImage: "clock")
                        .font(.system(size: 12))
                        .foregroundStyle(Theme.textSecondary)
                }
                Spacer()
                Image(systemName: "chevron.down")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(Theme.textSecondary)
                    .rotationEffect(.degrees(isExpanded ? 180 : 0))
            }
            .contentShape(Rectangle())
            .onTapGesture {
                withAnimation(.snappy(duration: 0.25)) { isExpanded.toggle() }
            }

            if isExpanded {
                RemoteImage(url: stop.image)
                    .frame(height: 130)
                    .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                Text(stop.description)
                    .font(.system(size: 14))
                    .foregroundStyle(Theme.textSecondary)
                    .lineSpacing(4)

                if !stop.funFacts.isEmpty {
                    VStack(alignment: .leading, spacing: 6) {
                        Label("Fun Facts", systemImage: "sparkles")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundStyle(Theme.accent)
                        ForEach(stop.funFacts, id: \.self) { fact in
                            HStack(alignment: .top, spacing: 6) {
                                Text("•").foregroundStyle(Theme.accent)
                                Text(fact).font(.system(size: 13)).foregroundStyle(Theme.textSecondary)
                            }
                        }
                    }
                    .padding(10)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Theme.accent.opacity(0.06), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                }

                if !stop.localTips.isEmpty {
                    VStack(alignment: .leading, spacing: 6) {
                        Label("Local Tips", systemImage: "lightbulb")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundStyle(Theme.success)
                        ForEach(stop.localTips, id: \.self) { tip in
                            HStack(alignment: .top, spacing: 6) {
                                Text("•").foregroundStyle(Theme.success)
                                Text(tip).font(.system(size: 13)).foregroundStyle(Theme.textSecondary)
                            }
                        }
                    }
                    .padding(10)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Theme.success.opacity(0.08), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                }
            }
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
    }
}
