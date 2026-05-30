# Backend API

## Server Configuration

- **Port**: 7231
- **Host**: 0.0.0.0
- **Framework**: Fastify v4
- **Database**: SQLite via Drizzle ORM

## Authentication

JWT-based authentication. Include token in Authorization header:
```
Authorization: Bearer <token>
```

Token payload contains: `{ username: string }`

## API Routes

### Users (`/api/users`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | Get all users (no passwords) |
| GET | `/:username` | No | Get user by username |
| GET | `/me` | Yes | Get current user |
| POST | `/register` | No | Register new user |
| POST | `/login` | No | Login user |
| PUT | `/me/bonuses` | Yes | Update bonus player/team |
| PUT | `/:username` | No | Edit user (admin) |

### Teams (`/api/teams`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | Get all teams |
| GET | `/:id` | No | Get team by ID |
| POST | `/` | No | Create team |
| PUT | `/:id` | No | Update team |

### Fixtures (`/api/fixtures`)

Group stage matches.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | Get all fixtures |
| GET | `/:id` | No | Get fixture by ID |
| POST | `/` | No | Create fixture |
| PUT | `/:id` | No | Update fixture |

### Round Fixtures (`/api/round-fixtures`)

Knockout stage matches (Round of 16, Quarter-finals, etc.)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | Get all round fixtures |
| GET | `/:id` | No | Get round fixture by ID |
| POST | `/` | No | Create round fixture |
| PUT | `/:id` | No | Update round fixture |

### Predictions (`/api/predictions`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/:username` | No | Get user's predictions |

### Leagues (`/api/leagues`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Yes | Get user's leagues with rankings |
| POST | `/` | Yes | Create new league |
| POST | `/join` | Yes | Join league with password |
| GET | `/leaderboard` | No | Get global leaderboard |

### Rounds (`/api/rounds`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | Get all rounds |

## Request/Response Examples

### Register User
```typescript
// POST /api/users/register
Request: { username: "john", password: "secret123" }
Response: { token: "eyJhbGci..." }
```

### Login User
```typescript
// POST /api/users/login
Request: { username: "john", password: "secret123" }
Response: { token: "eyJhbGci..." }
```

### Get User Leagues
```typescript
// GET /api/leagues
Headers: { Authorization: Bearer <token> }
Response: [
  {
    id: "league-123",
    name: "World Cup 2022",
    admin: true,
    user_points: 450,
    ranking: [
      { username: "john", points: 450 },
      { username: "jane", points: 320 }
    ],
    user_position: 1
  }
]
```

### Update Fixture (Admin)
```typescript
// PUT /api/fixtures/:id
Request: {
  groupLetter: "A",
  homeTeamId: 1,
  awayTeamId: 2,
  dateTime: 1735689600000,
  homeTeamScore: 3,
  awayTeamScore: 1
}
Response: { ... }
```

## Point Calculation

When a fixture is updated, points are automatically recalculated:

1. `editFixture()` in repository updates the fixture
2. All user predictions for that fixture are fetched
3. `calculateFixturePoints()` computes points for each user
4. Points are stored in `userFixtures` table

### Scoring Rules
- **Exact Score**: 25 points
- **Correct Draw**: 10 points
- **Correct Margin**: 15 points
- **Correct Winner**: 5 points
- **No Match**: 0 points

## Data Flow for User Leagues

1. User requests their leagues (`GET /api/leagues`)
2. Service fetches user's league memberships
3. Service fetches all users' total points via `getAllUsersPoints()`
4. For each league, users are ranked by points
5. Response includes user's position in each league

## Related

- [[architecture]] - System architecture
- [[database]] - Database schema
- [[frontend]] - Frontend queries
