//
//  ServicesView.swift
//  ElbasanCityGuideIOS
//
//  Port of app/(tabs)/services.tsx — city services with tap-to-call links.
//

import SwiftUI

struct ServicesView: View {
    @State private var query = ""

    private var filtered: [CityService] {
        MockData.services.filter { service in
            query.isEmpty
                || service.name.localizedCaseInsensitiveContains(query)
                || service.category.localizedCaseInsensitiveContains(query)
        }
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 14) {
                SearchBarField(text: $query, placeholder: "Search services...")
                    .padding(.horizontal, 16)

                LazyVStack(spacing: 14) {
                    ForEach(filtered) { service in
                        ServiceCard(service: service)
                    }
                }
                .padding(.horizontal, 16)
            }
            .padding(.vertical, 8)
        }
        .background(Theme.background)
        .navigationTitle("City Services")
        .navigationBarTitleDisplayMode(.large)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) { DrawerButton() }
        }
    }
}

struct ServiceCard: View {
    let service: CityService

    private var categoryColor: Color {
        switch service.category {
        case "healthcare", "emergency": Theme.error
        case "safety": Theme.primary
        case "utilities": Theme.secondary
        default: Theme.categoryOther
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 12) {
                Image(systemName: service.systemImage)
                    .font(.system(size: 19))
                    .foregroundStyle(categoryColor)
                    .frame(width: 44, height: 44)
                    .background(categoryColor.opacity(0.12), in: Circle())

                VStack(alignment: .leading, spacing: 3) {
                    Text(service.name)
                        .font(.system(size: 16, weight: .bold))
                        .foregroundStyle(Theme.text)
                    HStack(spacing: 6) {
                        Text(service.category.capitalized)
                            .font(.system(size: 12))
                            .foregroundStyle(categoryColor)
                        if service.emergency {
                            Text("24/7")
                                .font(.system(size: 11, weight: .bold))
                                .foregroundStyle(.white)
                                .padding(.horizontal, 6)
                                .padding(.vertical, 2)
                                .background(Theme.error, in: Capsule())
                        }
                    }
                }
                Spacer()
                if let phone = service.phone {
                    Link(destination: URL(string: "tel://\(phone.replacingOccurrences(of: " ", with: ""))")!) {
                        Image(systemName: "phone.fill")
                            .font(.system(size: 16))
                            .foregroundStyle(.white)
                            .frame(width: 40, height: 40)
                            .background(Theme.success, in: Circle())
                    }
                    .accessibilityLabel("Call \(service.name)")
                }
            }

            if let description = service.description {
                Text(description)
                    .font(.system(size: 13))
                    .foregroundStyle(Theme.textSecondary)
            }

            VStack(alignment: .leading, spacing: 5) {
                if let address = service.address {
                    Label(address, systemImage: "mappin.and.ellipse")
                }
                if let hours = service.hours {
                    Label(hours, systemImage: "clock")
                }
                if let email = service.email {
                    Label(email, systemImage: "envelope")
                }
                if let website = service.website {
                    Link(destination: URL(string: website)!) {
                        Label(website, systemImage: "globe")
                    }
                }
            }
            .font(.system(size: 13))
            .foregroundStyle(Theme.textSecondary)
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .cardStyle()
    }
}
