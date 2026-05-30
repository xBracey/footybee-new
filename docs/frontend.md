# Frontend

## Overview

React 18 SPA with Vite, TanStack Router, React Query, and Zustand.

## Routing

TanStack Router with file-based routing in `src/routes/`:

### Public Routes
- `/` - Root redirects to `/dashboard` or `/login`
- `/login` - Login page
- `/about` - About page
- `/rules` - Game rules
- `/leaderboard` - Global leaderboard

### Authenticated Routes
- `/dashboard` - Home with today's matches and leagues
- `/predictions` - Group stage predictions
- `/round-predictions` - Knockout bracket predictions
- `/fixtures` - View all fixtures and tables
- `/profile/:username` - User profile with stats

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/:entity` - Entity management (teams, fixtures, etc.)

## Pages (`src/pages/`)

### PredictionsPage
Main prediction interface for group stage matches.

**Features:**
- Groups predictions by letter (A, B, C, etc.)
- Score increment/decrement buttons
- Group switching for tiebreakers
- Bonus player/team selection
- Auto-save with debounce
- Lock indicator when predictions close

### LeaguePage
Displays league standings and rankings.

**Props:**
- `user` - Current user (optional)
- `league` - League data with rankings

### ProfilePage
User profile with point breakdown.

**Sections:**
- Total points summary
- Bonus points (player goals + team wins)
- Team points from knockout predictions
- Fixture points from group stage

### FixturesPage
View all fixtures and group tables.

**Features:**
- Fixtures grouped by stage
- League tables with standings
- Match results when available

## Components (`src/components/`)

### Core Components

| Component | Purpose |
|-----------|---------|
| `Header` | Navigation, PWA install prompt |
| `Footer` | Footer with links |
| `Banner` | Section headers |
| `Box` | Container component |
| `Button` | Button variants |
| `Loading` | Loading spinner |
| `Logo` | App logo |

### Prediction Components

| Component | Purpose |
|-----------|---------|
| `Prediction/SinglePrediction` | Individual match prediction |
| `Prediction/TeamPrediction` | Team score input |
| `RoundPredictions` | Knockout bracket |
| `RoundFixture` | Single knockout match |
| `PredictionLock` | Lock status indicator |

### League Components

| Component | Purpose |
|-----------|---------|
| `UserLeagues` | User's league list |
| `LeaguePreview` | League card |
| `LeagueRankings` | Standings table |
| `LeagueTable` | Group standings |
| `LeagueTableModal` | Tiebreaker configuration |
| `AddLeagueModal` | Create league |
| `JoinLeagueModal` | Join with password |

### Fixture Components

| Component | Purpose |
|-----------|---------|
| `Fixture` | Single match display |
| `FixtureList` | List of matches |
| `FixturePoints` | User's fixture points |
| `TodaysMatches` | Matches happening today |

### Admin Components

| Component | Purpose |
|-----------|---------|
| `AdminEntity` | Entity list with CRUD |
| `AdminAddEdit` | Add/edit form wrapper |
| `TeamAdmin` | Team CRUD form |
| `FixtureAdmin` | Fixture CRUD form |
| `RoundFixtureAdmin` | Knockout fixture CRUD |
| `PlayerAdmin` | Player CRUD |
| `UserAdmin` | User management |

### Utility Components

| Component | Purpose |
|-----------|---------|
| `BonusPoints` | Display bonus selections |
| `UserBonuses` | Edit bonus selections |
| `TeamPoints` | Display knockout team points |
| `InstallModal` | PWA install prompt |

## Queries (`src/queries/`)

React Query hooks for API calls. All use `apiRequest` utility.

### Query Hooks

```typescript
// Get current user (requires auth)
useGetMe()

// Get all teams
useGetTeams()

// Get all fixtures
useGetFixtures()

// Get round fixtures
useGetRoundFixtures()

// Get predictions for user
useGetPredictions(username)

// Get user's leagues
useGetUserLeagues()

// Get global leaderboard
useGetLeaderboard()

// Get user profile
useGetUser(username)

// Get groups
useGetGroups()
```

### Mutation Hooks

```typescript
// Edit predictions
useEditPredictions(onSuccess)

// Edit user teams (knockout)
useEditUserTeams(onSuccess)

// Edit user groups (switches)
useEditUserGroups(onSuccess)

// Add/join league
useAddLeague(onSuccess)
useJoinLeague(onSuccess)

// Login/register
useLoginUser()
useRegisterUser()

// CRUD operations
usePostTeam()
usePostFixture()
usePostRoundFixture()
usePostPlayer()
usePostUser()
```

### API Utility

```typescript
// src/queries/utils.ts
apiRequest<T>(url: string, options?: AxiosRequestConfig)

// In dev: http://localhost:7231
// In prod: https://footyapi.tombrace.co.uk
```

## State Management (`src/zustand/`)

### User Store
```typescript
interface UserStore {
  token: string;
  setToken: (token: string) => void;
}
```
- Persisted to localStorage
- Used for authentication

### Prediction Store
```typescript
interface PredictionState {
  predictions: (Prediction & { saved: boolean })[];
  groupSwitches: GroupSwitches;
  bonuses: { playerId?: number; teamId?: number; saved: boolean };
}
```

**Actions:**
- `SET_PREDICTIONS` - Initialize predictions
- `CHANGE_PREDICTION` - Update single prediction
- `CHANGE_PREDICTIONS` - Bulk update
- `EDIT_GROUP_SWITCH` - Update group switch
- `EDIT_BONUSES` - Update bonus selections

## Layouts (`src/layouts/`)

### Predictions Layout
Wraps the predictions page with:
- User data fetching
- Zustand integration
- Prediction change handlers
- Group switch handling

## Fixtures (`src/fixtures/`)

Test fixtures for Storybook/Ladle:
- `teams.ts` - Sample teams
- `fixtures.ts` - Sample fixtures
- `user.ts` - Sample user
- `leagues.ts` - Sample leagues
- `userFixtures.ts` - Sample user fixtures
- `roundFixtures.ts` - Sample knockout fixtures

## PWA Configuration

- Service worker via `vite-plugin-pwa`
- Auto-update prompts
- Offline support
- Install prompt modal

## Related

- [[architecture]] - System architecture
- [[backend]] - Backend API
- [[database]] - Database schema
