//
//  NewsView.swift
//  ElbasanCityGuideIOS
//
//  Port of app/(tabs)/news.tsx and app/news/[id].tsx.
//

import SwiftUI

struct NewsView: View {
    @State private var query = ""

    private var filtered: [NewsItem] {
        MockData.news.filter { item in
            query.isEmpty
                || item.title.localizedCaseInsensitiveContains(query)
                || item.summary.localizedCaseInsensitiveContains(query)
        }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                SearchBarField(text: $query, placeholder: "Search news...")
                    .padding(.horizontal, 16)

                LazyVStack(spacing: 16) {
                    if filtered.isEmpty {
                        EmptyStateView(title: "No news found", message: "Try a different search", systemImage: "newspaper")
                    }
                    ForEach(filtered) { item in
                        NavigationLink {
                            NewsDetailView(item: item)
                        } label: {
                            NewsCard(item: item)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal, 16)
            }
            .padding(.vertical, 8)
        }
        .background(Theme.background)
        .navigationTitle("Elbasan News")
        .navigationBarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) { DrawerButton() }
        }
    }
}

struct NewsDetailView: View {
    let item: NewsItem
    @Environment(AppState.self) private var appState

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                RemoteImage(url: item.image)
                    .frame(height: 230)
                    .clipped()
                    .overlay(alignment: .topTrailing) {
                        FavoriteToggle(isOn: appState.isFavoriteNews(item.id)) {
                            appState.toggleNews(item.id)
                        }
                        .padding(12)
                    }

                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text(item.category.capitalized)
                            .font(.system(size: 12, weight: .bold))
                            .textCase(.uppercase)
                            .foregroundStyle(.white)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 4)
                            .background(Theme.primary, in: Capsule())
                        Text(item.source)
                            .font(.system(size: 13, weight: .medium))
                            .foregroundStyle(Theme.textSecondary)
                    }

                    Text(item.title)
                        .font(.system(size: 24, weight: .bold))
                        .foregroundStyle(Theme.text)

                    Text("\(item.author) · \(item.publishedAt.formatted(date: .long, time: .omitted))")
                        .font(.system(size: 13))
                        .foregroundStyle(Theme.textSecondary)

                    Rectangle().fill(Theme.border).frame(height: 1)

                    Text(item.content)
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.text)
                        .lineSpacing(5)
                }
                .padding(16)
            }
        }
        .background(Theme.background)
        .navigationTitle("Article")
        .navigationBarTitleDisplayMode(.inline)
    }
}
