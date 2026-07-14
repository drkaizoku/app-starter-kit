# App Starter Kit

A clean, production-minded starting point for Expo and React Native apps. Clone it, rename it, connect Supabase, and start building product features instead of repeating project setup.

## Included

- Expo SDK 54, React Native, TypeScript, and Expo Router
- Public, onboarding, authentication, and protected route groups
- Supabase email/password authentication and session restoration
- Persistent onboarding state with Zustand and AsyncStorage
- NativeWind setup plus reusable theme tokens for inline styles
- Reusable screen, button, input, auth-layout, and configuration components
- Android, iOS, and web configuration
- Type checking in local scripts and GitHub Actions
- EAS development, preview, and production build profiles
- A script that renames the template for a new product

## Quick start

Requirements: Node.js 22+, npm, and the platform tooling required by Expo.

```bash
npm install
npm run configure -- --name "My App" --slug my-app --scheme myapp --bundle-id com.company.myapp
cp .env.example .env
npm start
```

Press `i` for the iOS simulator, `a` for Android, or `w` for web. Expo's local CLI is used through npm; a global Expo CLI installation is not required.

## Environment variables

Create `.env` from `.env.example`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Find these values in your Supabase project's API settings. Only put public client values in `EXPO_PUBLIC_*` variables. Never place service-role keys or private API secrets in the app bundle.

Enable email authentication in Supabase Authentication. The starter supports:

- Sign up with profile name metadata
- Email and password sign in
- Persisted sessions
- Password reset email requests
- Sign out

Password-reset deep linking and OAuth providers are intentionally left as product-specific extensions because their callback URLs and native credentials depend on your app identifiers.

## Project structure

```text
app/
  (app)/             Authenticated screens
  auth/              Sign in, sign up, password reset
  onboarding/        First-run experience
components/
  auth/              Shared authentication layouts
  shared/            Reusable UI primitives
constants/           Product configuration and design tokens
lib/                 External clients and helpers
stores/              Global and persistent state
scripts/             Template configuration utilities
```

## Starting a new product

1. Run the configure command to update the display name, package name, slug, URL scheme, and native bundle identifiers.
2. Replace icons and splash assets in `assets/`.
3. Update colors and spacing in `constants/theme.ts` and `tailwind.config.js`.
4. Update product text in `constants/config.ts`.
5. Add Supabase environment values and configure authentication URLs.
6. Replace `app/(app)/index.tsx` with your first product feature.

## Commands

```bash
npm start             # Start Expo
npm run start:clear   # Start with Metro cache cleared
npm run ios           # Open iOS
npm run android       # Open Android
npm run web           # Open web
npm run typecheck     # Run strict TypeScript checks
```

## Architecture choices

- Keep product configuration in `constants/config.ts`; avoid scattering the app name and support details through screens.
- Keep design tokens in `constants/theme.ts`. If using NativeWind classes, mirror brand-token changes in `tailwind.config.js`.
- Put authenticated routes inside `app/(app)`. The group layout redirects signed-out users.
- Keep secrets on a server. Mobile app code and `EXPO_PUBLIC_*` values are visible to end users.
- Supabase is pinned to `2.105.4` because newer tracing code currently fails Expo SDK 54's Hermes production export. Retest Android and iOS bundles before upgrading it.
- Add server-state tooling only when the app needs it. TanStack Query, analytics, crash reporting, payments, and push notifications are intentionally not preinstalled.

## Recommended additions by project

- TanStack Query for server-state caching
- Sentry for production crash reporting
- React Hook Form and Zod for large or complex forms
- Expo Notifications for push notifications
- Maestro or Detox for end-to-end testing
- RevenueCat or Stripe for billing

These are not included by default because unused infrastructure makes a starter harder to understand and maintain.
