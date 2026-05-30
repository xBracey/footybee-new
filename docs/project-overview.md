# Project Overview

## What is Footybee?

Footybee is a full-stack web application for managing Euro Cup and World Cup predictor competitions. Users can:
- Create accounts and login
- Make predictions for group stage matches
- Make predictions for knockout rounds (Round of 16, Quarter-finals, Semi-finals, Finals)
- Create and join leagues with friends
- Earn points based on prediction accuracy
- Track their performance on leaderboards

## Key Features

### 1. Match Predictions
- **Group Stage**: Predict exact scores for all group stage matches
- **Knockout Rounds**: Predict tournament winners through elimination bracket
- **Group Switches**: When teams are tied on points, users can predict tiebreaker order

### 2. Scoring System
- **Exact Score**: 25 points for correct exact score
- **Correct Draw**: 10 points for correct draw prediction
- **Correct Margin**: 15 points for correct goal difference
- **Correct Winner**: 5 points for correct match outcome
- **Bonus Player**: 10 points per goal for selected player
- **Bonus Team**: 10 points per win for selected team

### 3. League System
- Create private leagues with passwords
- Join existing leagues
- Private league leaderboards
- Global leaderboard across all users

### 4. Admin Panel
- CRUD operations for teams, fixtures, players
- Edit match scores (triggers point recalculation)
- Manage users and admin status

## Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify (v4)
- **Database**: SQLite with Drizzle ORM
- **Authentication**: JWT via @fastify/jwt
- **CORS**: @fastify/cors

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: TanStack Router
- **State Management**: Zustand
- **Server State**: React Query
- **UI Components**: Mantine v7
- **Styling**: Tailwind CSS v3
- **Date Handling**: Day.js

### Infrastructure
- **App Server**: Mac Mini via PM2
- **Reverse Proxy**: Hetzner server with Nginx
- **VPN**: Tailscale for private networking

## Project Structure

```
footybee-new/
├── backend/              # Fastify API server
│   ├── db/               # Database layer
│   │   ├── router/       # API route handlers
│   │   ├── services/      # Business logic
│   │   ├── repositories/  # Data access
│   │   ├── schema/        # Drizzle schema definitions
│   │   └── points/       # Point calculation logic
│   └── index.ts          # Server entry point
├── frontend/             # React SPA
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page-level components
│       ├── routes/       # TanStack Router routes
│       ├── queries/      # React Query hooks
│       ├── zustand/      # Zustand state stores
│       └── layouts/      # Layout components
├── shared/               # Shared code between frontend/backend
│   └── types/            # TypeScript interfaces
└── docs/                 # This documentation
```

## Related

- [[architecture]] - Technical architecture details
- [[backend]] - Backend API reference
- [[frontend]] - Frontend component reference
- [[database]] - Database schema
