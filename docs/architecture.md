# Architecture

## Overall System Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Browser/PWA   │────▶│   Hetzner VPS   │────▶│    Mac Mini     │
│                 │     │   (Nginx)       │     │    (PM2)        │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                          │
                                                          ▼
                                                  ┌─────────────────┐
                                                  │                 │
                                                  │    SQLite DB    │
                                                  │                 │
                                                  └─────────────────┘
```

## Request Flow

1. User's browser makes request to `footyapi.tombrace.co.uk`
2. Hetzner server (reverse proxy) receives request
3. Nginx routes request through Tailscale VPN to Mac Mini
4. Mac Mini's PM2 process handles the request:
   - Frontend: Vite dev server serves static files
   - Backend: Fastify API processes requests
5. Backend queries SQLite database
6. Response flows back through the chain

## Frontend Architecture

### Stack
- **Vite** - Build tool and dev server
- **React 18** - UI framework
- **TanStack Router** - File-based routing
- **React Query** - Server state management
- **Zustand** - Client state management
- **Mantine** - UI component library
- **Tailwind CSS** - Utility-first styling

### Routing
Routes are defined in `frontend/src/routes/` using TanStack Router:
- File-based routing with `.lazy.tsx` extension
- Route tree auto-generated to `routeTree.gen.ts`
- Authentication guards redirect to login

### State Management
Two types of state:

1. **Server State** (React Query)
   - Fetched via `src/queries/` hooks
   - Cached and auto-refetched
   - Handles API calls to backend

2. **Client State** (Zustand)
   - `zustand/user.ts` - Authentication token
   - `zustand/predictions/` - Prediction editing state
   - Persisted to localStorage

## Backend Architecture

### Stack
- **Fastify** - Web framework
- **Drizzle ORM** - Type-safe database access
- **better-sqlite3** - SQLite driver
- **bcrypt** - Password hashing
- **JWT** - Stateless authentication

### API Structure
Routes are organized by resource:
```
/api/
├── users/          # User management, auth
├── teams/          # Team CRUD
├── fixtures/       # Group stage matches
├── round-fixtures/ # Knockout matches
├── predictions/    # User predictions
├── leagues/        # League management
├── groups/         # Group definitions
├── rounds/         # Tournament rounds
└── players/        # Player management
```

### Service Layer Pattern
```
Routes → Services → Repositories → Database
  │          │           │            │
  │      Business     Data         SQLite
  │      Logic      Access
  │
  Request/Response handling
```

## Database Architecture

### SQLite
- Single file database: `backend/sqlite.db`
- Migrations managed by Drizzle Kit
- Foreign key relationships between tables

### Key Tables
- `users` - User accounts with bonus selections
- `teams` - Tournament teams with group assignments
- `fixtures` - Group stage matches
- `roundFixtures` - Knockout stage matches
- `predictions` - User score predictions
- `userTeams` - User knockout predictions
- `userLeagues` - League memberships
- `leagues` - League definitions

## PWA Support
- Service worker registration via `virtual:pwa-register`
- Offline capability with cache-first strategy
- Install prompt for mobile users

## Environment
- Backend runs on port `7231`
- Frontend dev server on port `5173`
- Production served via Vite build

## Related

- [[project-overview]] - Project description
- [[backend]] - Backend API reference
- [[frontend]] - Frontend components
- [[database]] - Database schema
