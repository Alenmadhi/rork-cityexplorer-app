//
//  Theme.swift
//  ElbasanCityGuideIOS
//
//  Design system ported from the Expo app's constants/colors.ts.
//

import SwiftUI

enum Theme {
    static let primary = Color(hex: 0x4361EE)
    static let secondary = Color(hex: 0x3A86FF)
    static let success = Color(hex: 0x2ECC71)
    static let warning = Color(hex: 0xF39C12)
    static let error = Color(hex: 0xE74C3C)
    static let info = Color(hex: 0x3498DB)
    static let background = Color(hex: 0xF8F9FA)
    static let card = Color.white
    static let cardDarker = Color(hex: 0xF1F3F5)
    static let text = Color(hex: 0x212529)
    static let textSecondary = Color(hex: 0x6C757D)
    static let border = Color(hex: 0xDEE2E6)
    static let accent = Color(hex: 0x7209B7)
    static let highlight = Color(hex: 0x4CC9F0)

    // Category colors
    static let categoryCulture = Color(hex: 0xF39C12)
    static let categorySports = Color(hex: 0xE74C3C)
    static let categoryPolitics = Color(hex: 0x3498DB)
    static let categoryBusiness = Color(hex: 0x2ECC71)
    static let categoryOther = Color(hex: 0x6C757D)
}

extension Color {
    init(hex: UInt32) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255,
            opacity: 1
        )
    }
}

/// Card look shared by every surface: white fill, 12pt radius, hairline border
/// and the soft shadow used across the Expo app.
struct CardStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(Theme.card)
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .strokeBorder(Theme.border, lineWidth: 1)
            )
            .shadow(color: .black.opacity(0.08), radius: 4, x: 0, y: 2)
    }
}

extension View {
    func cardStyle() -> some View {
        modifier(CardStyle())
    }
}

/// Section header row with an optional trailing "View All" action.
struct SectionHeader: View {
    let title: String
    var actionTitle: String?
    var action: (() -> Void)?

    var body: some View {
        HStack {
            Text(title)
                .font(.system(size: 18, weight: .bold))
                .foregroundStyle(Theme.text)
            Spacer()
            if let actionTitle, let action {
                Button(actionTitle, action: action)
                    .font(.system(size: 14, weight: .medium))
                    .foregroundStyle(Theme.primary)
            }
        }
        .padding(.bottom, 12)
    }
}

/// Remote image with the muted placeholder used while cards load.
struct RemoteImage: View {
    let url: String

    var body: some View {
        AsyncImage(url: URL(string: url)) { phase in
            switch phase {
            case .success(let image):
                image
                    .resizable()
                    .scaledToFill()
            case .failure:
                Image(systemName: "photo")
                    .font(.system(size: 32))
                    .foregroundStyle(Theme.textSecondary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(Theme.cardDarker)
            default:
                ZStack {
                    Theme.cardDarker
                    ProgressView()
                }
            }
        }
    }
}
