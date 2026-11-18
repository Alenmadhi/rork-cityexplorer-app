//
//  ShopsView.swift
//  ElbasanCityGuideIOS
//
//  Port of app/(tabs)/shops.tsx and app/tourist/shops/[id].tsx.
//

import SwiftUI

struct ShopsView: View {
    @State private var query = ""
    @State private var category: ShopCategory = .all

    private var filtered: [Shop] {
        MockData.shops
            .filter { shop in
                let matchesQuery = query.isEmpty
                    || shop.name.localizedCaseInsensitiveContains(query)
                    || shop.description.localizedCaseInsensitiveContains(query)
                return matchesQuery && (category == .all || shop.category == category)
            }
            .sorted { a, b in
                (a.featured ? 1 : 0) > (b.featured ? 1 : 0)
            }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                SearchBarField(text: $query, placeholder: "Search shops...")
                    .padding(.horizontal, 16)

                CategoryChipRow(categories: ShopCategory.allCases.map(\.label), selection: Binding(
                    get: { category.label },
                    set: { newValue in
                        category = ShopCategory.allCases.first { $0.label == newValue } ?? .all
                    }
                ))

                LazyVStack(spacing: 14) {
                    if filtered.isEmpty {
                        EmptyStateView(title: "No shops found", message: "Try a different search or category", systemImage: "bag.badge.questionmark")
                    }
                    ForEach(filtered) { shop in
                        NavigationLink {
                            ShopDetailView(shop: shop)
                        } label: {
                            ShopCard(shop: shop)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal, 16)
            }
            .padding(.vertical, 8)
        }
        .background(Theme.background)
        .navigationTitle("Local Shops")
        .navigationBarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) { DrawerButton() }
        }
    }
}

struct ShopDetailView: View {
    let shop: Shop

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                RemoteImage(url: shop.image)
                    .frame(height: 220)
                    .clipped()

                VStack(alignment: .leading, spacing: 14) {
                    HStack {
                        Text(shop.name)
                            .font(.system(size: 24, weight: .bold))
                            .foregroundStyle(Theme.text)
                        Spacer()
                        Label(String(format: "%.1f", shop.rating), systemImage: "star.fill")
                            .font(.system(size: 16, weight: .bold))
                            .foregroundStyle(Theme.warning)
                    }

                    Text(shop.category.rawValue.capitalized)
                        .font(.system(size: 12, weight: .bold))
                        .textCase(.uppercase)
                        .foregroundStyle(Theme.primary)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 4)
                        .background(Theme.primary.opacity(0.1), in: Capsule())

                    Text(shop.description)
                        .font(.system(size: 15))
                        .foregroundStyle(Theme.textSecondary)
                        .lineSpacing(4)

                    // Promotion banner
                    if let promotion = shop.promotion {
                        VStack(alignment: .leading, spacing: 6) {
                            HStack {
                                Label(promotion.title, systemImage: "tag.fill")
                                    .font(.system(size: 15, weight: .bold))
                                    .foregroundStyle(.white)
                                Spacer()
                                if let percent = promotion.discountPercent {
                                    Text("-\(percent)%")
                                        .font(.system(size: 16, weight: .heavy))
                                        .foregroundStyle(.white)
                                }
                            }
                            Text(promotion.description)
                                .font(.system(size: 13))
                                .foregroundStyle(.white.opacity(0.95))
                            Text("Valid until \(promotion.validUntil.formattedDate)")
                                .font(.system(size: 12))
                                .foregroundStyle(.white.opacity(0.85))
                        }
                        .padding(14)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(Theme.warning, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                    }

                    VStack(spacing: 10) {
                        DetailRow(icon: "mappin.and.ellipse", label: "Address", value: shop.address)
                        DetailRow(icon: "clock", label: "Hours", value: shop.hours)
                        if let phone = shop.phone {
                            Link(destination: URL(string: "tel://\(phone.replacingOccurrences(of: " ", with: ""))")!) {
                                DetailRow(icon: "phone.fill", label: "Phone", value: phone)
                            }
                            .buttonStyle(.plain)
                        }
                        if let website = shop.website {
                            DetailRow(icon: "globe", label: "Website", value: website)
                        }
                    }
                    .padding(14)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .cardStyle()
                }
                .padding(16)
            }
        }
        .background(Theme.background)
        .navigationTitle(shop.name)
        .navigationBarTitleDisplayMode(.inline)
    }
}
