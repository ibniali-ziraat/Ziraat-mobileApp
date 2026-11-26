# Ziraat Mobile App

Ziraat is a cross-platform mobile application for agricultural users. It brings together orchard and farm management, crop and weather information, harvest tracking, agricultural advisories, a product marketplace, and community features.

## Features

- Farm and orchard profiles, including orchard measurement and crop information
- Weather information and agricultural advisories
- Harvest and market information
- Product discovery, cart, checkout, orders, and wishlist flows
- User profiles, notifications, and discussion features
- Firebase integrations and Razorpay checkout

Feature availability can depend on the configured backend and third-party services.

## Technology

- React Native 0.81 and React 19
- Expo SDK 54 with Expo Router
- TypeScript and NativeWind
- TanStack Query and Axios for data access
- Firebase services and Razorpay integration

## Requirements

- Node.js (current LTS recommended) and npm
- Android Studio and the Android SDK for local Android builds
- macOS with Xcode for local iOS builds

Expo Go may not support every native dependency used by this project. Use a development build when a native module is required.

## Getting started

1. Clone the repository and open its root directory.
2. Install the locked dependencies:

   ```sh
   npm ci
   ```

3. Create a local environment file from the template:

   ```sh
   cp .env.example .env
   ```

   In Windows PowerShell, use `Copy-Item .env.example .env`.

4. Fill in the values required for the platform and services you use. See [Environment configuration](#environment-configuration).
5. Start the Expo development server:

   ```sh
   npm start
   ```

Use the Expo CLI prompts to open the app on a connected device, emulator, or supported web browser.

## Environment configuration

The app reads the following variables from `.env`:

| Variable | Purpose |
| --- | --- |
| `EXPO_PUBLIC_FIREBASE_IOS_APP_ID` | Firebase app ID used by the iOS JavaScript configuration |
| `EXPO_PUBLIC_FIREBASE_IOS_API_KEY` | Firebase API key used by the iOS JavaScript configuration |
| `EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID` | Firebase app ID used by the Android JavaScript configuration |
| `EXPO_PUBLIC_FIREBASE_ANDROID_API_KEY` | Firebase API key used by the Android JavaScript configuration |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID shared by the platforms |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `EXPO_PUBLIC_FIREBASE_DATABASE_URL` | Firebase database URL; optional in the current app configuration |
| `EXPO_PUBLIC_RAZORPAY_KEY_ID` | Razorpay key ID used for checkout when one is not supplied by the caller |
| `EXPO_PUBLIC_USE_MOCK_OTP` | Set to `true` to enable the development mock OTP flow; otherwise the app uses the OTP API |
| `EXPO_PUBLIC_MOCK_OTP` | Optional development mock OTP; defaults to `123456` when unset |

Use Firebase project configuration files that match the selected Firebase project. The native app configuration references `google-services.json` at the repository root for Android and `GoogleService-Info.plist` at the repository root for iOS.

Expo embeds variables prefixed with `EXPO_PUBLIC_` in the client application. Treat their values as public; do not put private server credentials or payment secrets in them. Keep `.env` local. The committed `.env.example` contains placeholders only and can be copied as a starting point.

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Expo development server |
| `npm run android` | Build and launch the native Android app locally |
| `npm run ios` | Build and launch the native iOS app locally (macOS and Xcode required) |
| `npm run web` | Start the web target |
| `npm run lint` | Run the Expo ESLint configuration |

## Project structure

| Path | Contents |
| --- | --- |
| `src/app/` | Expo Router screens and route layouts |
| `src/modules/` | Feature-specific screens and components |
| `src/api/` | API clients and endpoint definitions |
| `src/services/` | Backend and third-party service operations |
| `src/components/` | Shared UI components |
| `src/hooks/` | Reusable React hooks |
| `src/contexts/` | Shared React context providers |
| `src/domain/`, `src/types/`, `src/schemas/` | Domain models, TypeScript types, and validation schemas |
| `assets/` | Images and other static assets |
| `plugins/` | Local Expo config plugins |

## Build profiles

The repository includes EAS Build profiles in `eas.json` for development, preview, and production builds. Configure the EAS project and its environment variables before building through EAS.

## Environment file policy

`.env` and other local `.env.*` files are ignored by Git. If an environment file was committed or pushed previously, ignoring it does not remove it from earlier Git history; rotate any exposed credentials and follow your repository's history-cleanup process as needed.
