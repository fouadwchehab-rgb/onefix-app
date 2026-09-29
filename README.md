# Onefix Customer App

A bilingual English/Arabic Expo app for Onefix property services in Lebanon.

## Included

- Onefix navy/brass branding and Viprojects lockup
- English/Arabic toggle with RTL-aligned Arabic copy
- Ten service categories with the existing USD catalogue and reference prices
- Bundled service-category and item photography
- Activity price-list modal with manpower-only disclaimer
- WhatsApp-first enquiry flow
- Booking form with service, timing, location and details
- Tap-to-call contact action

## Run locally

```bash
npm install
npm start
```

Then open the project in Expo Go or use a connected simulator/device.

## Build / publish

For store-ready builds, install and use EAS CLI:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android
eas build --platform ios
```

An Apple Developer account is required for iOS App Store distribution, and a Google Play Developer account is required for Android Play Store distribution.

## Validation

The app has passed TypeScript validation and an Android production bundle export. The iOS JavaScript bundle uses the same cross-platform Expo source and is validated separately during export.
