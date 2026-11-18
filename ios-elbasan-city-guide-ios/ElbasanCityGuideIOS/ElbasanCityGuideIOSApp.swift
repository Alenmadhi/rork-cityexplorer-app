//
//  ElbasanCityGuideIOSApp.swift
//  ElbasanCityGuideIOS
//

import SwiftUI

@main
struct ElbasanCityGuideIOSApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .preferredColorScheme(.light) // matches the Expo app's forced light theme
                .tint(Theme.primary)
        }
    }
}
