# Nepal Travel App

A mobile app for travelers in Nepal — AI-powered itinerary planning, trip communities, and local discovery.

Built with Expo + TypeScript + NativeWind + Supabase.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v22 or higher recommended)
- [Xcode](https://developer.apple.com/xcode/) (for iOS Simulator — macOS only)
- [Android Studio](https://developer.android.com/studio) (for Android Emulator)
- Expo CLI

```bash
npm install -g expo-cli
```

---

## Installation

> Make sure you are using **Node.js v22 or higher** before installing. Can check with `node -v`.

```bash
npm install
```

---

## Environment Setup

Copy the example env file and update with your credentials:

```bash
cp .env.example .env
```

Then open `.env` and fill in your Supabase URL and anon key.

---

## Running on iOS Simulator (macOS)

1. Install **Xcode** from the [Mac App Store](https://apps.apple.com/app/xcode/id497799835)
2. Open Xcode → go to **Settings → Platforms** → download an iOS Simulator
3. Once installed, start the dev server:

```bash
npx expo start
```

4. Press **`i`** in the terminal to launch the iOS Simulator

---

## Running on Android Emulator

1. Download and install [Android Studio](https://developer.android.com/studio)
2. Open Android Studio → **More Actions → Virtual Device Manager**
3. Click **Create Device** → pick a phone (e.g. Pixel 7) → select a system image (API 33+) → Finish
4. Click the **Play** button to start the emulator
5. Once the emulator is running, start the dev server:

```bash
npx expo start
```

6. Press **`a`** in the terminal to open the app on the Android Emulator

---

## Project Structure

```
app/          # Expo Router screens
components/   # Reusable UI components
lib/          # Supabase client, helpers
store/        # Zustand state
assets/       # Images, fonts
```