# Database Schema

## Overview

SQLite database using Drizzle ORM. Database file: `backend/sqlite.db`

## Schema Files

Located in `backend/db/schema/`:

- `index.ts` - Re-exports all schemas
- `users.ts` - User accounts
- `teams.ts` - Tournament teams
- `fixtures.ts` - Group stage matches
- `roundFixtures.ts` - Knockout matches
- `predictions.ts` - User score predictions
- `leagues.ts` - League definitions
- `userLeagues.ts` - League memberships
- `groups.ts` - Group definitions (A, B, C, etc.)
- `userGroups.ts` - User group predictions
- `userFixtures.ts` - User fixture points
- `userTeams.ts` - User knockout predictions
- `userRoundFixtures.ts` - User round fixture points
- `players.ts` - Player definitions
- `rounds.ts` - Round definitions

## Tables

### users
```typescript
users = {
  username: text PRIMARY KEY,
  password: text NOT NULL,
  admin: integer DEFAULT 0,
  bonusPlayerId: integer REFERENCES players(id),
  bonusTeamId: integer REFERENCES teams(id)
}
```

### teams
```typescript
teams = {
  id: integer PRIMARY KEY AUTOINCREMENT,
  name: text,
  groupLetter: text REFERENCES groups(letter),
  roundExit: text REFERENCES rounds(round) DEFAULT "Group Stages"
}
```

### fixtures
Group stage matches.
```typescript
fixtures = {
  id: integer PRIMARY KEY AUTOINCREMENT,
  groupLetter: text REFERENCES groups(letter),
  homeTeamId: integer REFERENCES teams(id),
  awayTeamId: integer REFERENCES teams(id),
  dateTime: integer,
  homeTeamScore: integer,
  awayTeamScore: integer
}
```

### roundFixtures
Knockout stage matches.
```typescript
roundFixtures = {
  id: integer PRIMARY KEY AUTOINCREMENT,
  round: text REFERENCES rounds(round),
  homeTeamId: integer REFERENCES teams(id),
  awayTeamId: integer REFERENCES teams(id),
  dateTime: integer,
  homeTeamScore: integer,
  awayTeamScore: integer,
  homeTeamExtraTimeScore: integer,
  awayTeamExtraTimeScore: integer,
  homeTeamPenaltiesScore: integer,
  awayTeamPenaltiesScore: integer,
  order: integer
}
```

### predictions
User score predictions (composite key).
```typescript
predictions = {
  username: text REFERENCES users(username),
  fixtureId: integer REFERENCES fixtures(id),
  homeTeamScore: integer,
  awayTeamScore: integer,
  PRIMARY KEY (username, fixtureId)
}
```

### leagues
```typescript
leagues = {
  id: text PRIMARY KEY,
  name: text,
  password: text,
  creatorUsername: text REFERENCES users(username)
}
```

### userLeagues
League memberships (composite key).
```typescript
userLeagues = {
  username: text REFERENCES users(username),
  leagueId: text REFERENCES leagues(id),
  PRIMARY KEY (username, leagueId)
}
```

### userGroups
User group predictions for tiebreakers.
```typescript
userGroups = {
  username: text REFERENCES users(username),
  groupLetter: text REFERENCES groups(letter),
  switches: text JSON DEFAULT "[]",
  points: integer,
  PRIMARY KEY (username, groupLetter)
}
```

### userFixtures
Calculated points for fixtures (auto-calculated on fixture update).
```typescript
userFixtures = {
  username: text REFERENCES users(username),
  fixtureId: integer REFERENCES fixtures(id),
  points: integer,
  PRIMARY KEY (username, fixtureId)
}
```

### userTeams
User knockout stage predictions.
```typescript
userTeams = {
  username: text REFERENCES users(username),
  teamId: integer REFERENCES teams(id),
  roundPredictions: text REFERENCES rounds(round),
  points: integer DEFAULT 0,
  PRIMARY KEY (username, teamId)
}
```

### players
```typescript
players = {
  id: integer PRIMARY KEY AUTOINCREMENT,
  name: text,
  teamId: integer REFERENCES teams(id),
  goals: integer DEFAULT 0
}
```

### rounds
```typescript
rounds = {
  round: text PRIMARY KEY
  // Values: "Round of 16", "Quarter-finals", "Semi-finals", "Finals"
}
```

### groups
```typescript
groups = {
  letter: text PRIMARY KEY
  // Values: "A", "B", "C", "D", "E", "F", "G", "H"
}
```

## Migrations

Migrations are managed by Drizzle Kit.

**Commands:**
```bash
# Generate migration
npm run migration

# Run migrations
npm run migrate

# Create empty migration
npm run migration-empty
```

Migration files are in `backend/drizzle/meta/`:
- `0000_snapshot.json`
- `0001_snapshot.json`
- etc.
- `_journal.json` - Migration history

## Point Calculation

Points are automatically recalculated when fixtures are updated.

### calculateFixturePoints

```typescript
const calculateSingleFixturePoints = (
  prediction: Prediction,
  fixture: Fixture
): number => {
  // 25 points - Exact score
  // 10 points - Correct draw prediction
  // 15 points - Correct margin
  // 5 points - Correct winner
  // 0 points - No match
};
```

### getAllUsersPoints

Aggregates all points for users:
- `userFixtures` - Group stage points
- `userGroups` - Tiebreaker points
- `userTeams` - Knockout points
- `players.goals * 10` - Bonus player goals
- `teams.wins * 10` - Bonus team wins

## Shared Types

Located in `shared/types/database.ts`:

```typescript
export interface Fixture {
  id: number;
  groupLetter: string;
  homeTeamId: number;
  awayTeamId: number;
  dateTime: number;
  homeTeamScore: number;
  awayTeamScore: number;
}

export interface Team {
  id: number;
  groupLetter: string;
  name: string;
}

export interface User {
  username: string;
  admin: boolean;
  bonusPlayerId: number | null;
  bonusTeamId: number | null;
}

export interface Prediction {
  username: string;
  fixtureId: number;
  homeTeamScore: number;
  awayTeamScore: number;
}

// etc.
```

## Related

- [[backend]] - Backend API reference
- [[architecture]] - System architecture
