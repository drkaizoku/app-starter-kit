# Nepal Travel App 

---

## V1 Prototype

### 1. Auth
- Email / password login
- Google social login
- Apple social login
- Post-signup onboarding (interests, budget, travel style)

---

### 2. AI Trip Planner
**Inputs:**
- Destination (optional)
- Trip duration
- Budget
- Number of people
- Trip type / mood (adventure, trekking, cultural, etc.)

**Output:**
- AI-suggested destination (if none picked by user)
- Day-by-day itinerary
- Expected daily costs (hotels, food, transport)
- Weather info per day
- Road conditions per day
- Online map with key areas highlighted
- Save itinerary to user profile

---

### 3. Discover
- Articles & posts about trips, places, and recommendations
- Content created by both admin and users
- User badge displayed on posts (e.g. Pro Trekker, Hiker)
- Search & filter

---

### 4. Community
- Create & join groups (public / private)
- Group feed (posts, trip shares, discussions)
- Group detail page (members, description, upcoming trips)
- User badges visible within groups

---

### 5. Leaderboard & Badges
- Badges earned by completing trips + submitting trip feedback
- Feedback covers: costs, duration, overall experience
- Badge types: Pro Trekker, Hiker, etc. (to be expanded)
- Leaderboard ranks users by trips completed & contributions

---

## V2

- Group chat & messaging
- Real-time GPS & trail navigation
- Offline maps & downloadable guides (incl. itinerary download)
- Food & restaurant guide
- User reviews & ratings
- Emergency SOS + live location sharing
- Weather alerts & warnings
- Offline emergency contacts
- Trek difficulty ratings
- Photo & video sharing
- Social media sharing
- Currency converter

---

---

## Screen Flow & Navigation

### Bottom Navigation (4 Tabs)
- Home / Discover
- AI Planner
- Communities & Leaderboard
- Profile

---

### Screens

#### Home / Discover
- Feed of posts & articles (from users & communities)
- Floating create post button

#### AI Planner
- TBD

#### Communities & Leaderboard
- TBD

#### Profile
- View & edit profile (name, avatar, bio, preferences)
- Settings
- Terms & Conditions

#### Auth Screens
- TBD (login, signup, onboarding)

#### Post Detail
- TBD

#### Group Detail
- TBD

---

## Architecture

### Frontend Stack
| Layer | Choice |
|---|---|
| Framework | React Native + TypeScript |
| Styling | NativeWind |
| Routing | Expo Router |
| State | Zustand |
| Components | Gluestack UI v2 + custom |
| Workflow | Expo Managed |

> Note: Only Expo + Supabase are locked. Rest added as needed.

---

### Backend
- **Supabase** — auth, database, storage, auto-generated REST API
- No custom edge functions for V1
- AI provider — TBD (research ongoing)

---

### Third Party APIs
| Service | Purpose | Status |
|---|---|---|
| Google Maps | Trip maps, route highlighting | Free tier (watermark OK for prototype) |
| OpenWeatherMap | Weather info per trip day | Free tier |
| Road Conditions | Road status per trip day | TBD (Google Maps or Nepal-specific source) |
| LLM API | AI itinerary generation | TBD (OpenAI or Anthropic) |

---

### Database Schema
- See separate schema doc: `nepal-travel-app-schema.md`

---

### File Storage (Supabase Storage)
- User avatars
- Post images (Discover)

---

## V3

- Hotel / tea house booking integration
- Transport booking (Pathao, InDrive, Tootle)
- Domestic flight info
- Visa & permit info
- Price comparison
- Trekking permit offices directory