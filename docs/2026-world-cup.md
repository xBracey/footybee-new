# 2026 World Cup Planning

## Overview

The app is designed to be reusable for tournament predictors. This document outlines the plan for adapting Footybee for the 2026 FIFA World Cup.

## What Needs to Change

### 1. Data Seeding

The tournament data needs to be updated:

**Teams (48 teams in 2026 vs 32 in 2022):**
- New group structure: 12 groups of 4 teams
- Need to seed 48 national teams
- Group letters: A through L

**Matches:**
- 48 group stage matches (8 groups × 6 matches)
- 16 knockout matches (Round of 16 × 8, QF × 4, SF × 2, Final × 1, Third Place × 1)
- Total: 65 matches

**Players:**
- Seed top scorers from qualifying
- Update goal counts as tournament progresses

### 2. Database Schema Changes

Consider these schema updates:

```typescript
// Add tournament identifier to allow multiple tournaments
fixtures = {
  // ... existing fields
  tournamentId: text DEFAULT "wc-2026" // NEW
}

roundFixtures = {
  // ... existing fields
  tournamentId: text DEFAULT "wc-2026" // NEW
}

// Alternative: Keep separate databases or use tournament prefix
```

### 3. Frontend Updates

**Group Count:**
- Current: 8 groups (A-H)
- 2026: 12 groups (A-L)
- Update group iteration in components

**Round Fixture Order:**
- Current bracket assumes 32 teams
- 2026 has 48 teams → different bracket structure
- Update `shared/types/database.ts` rounds array

### 4. Tiebreaker Logic

Group stage tiebreakers:
1. Points
2. Goal difference
3. Goals scored
4. Head-to-head
5. Draw (random)

Current tiebreaker implementation handles most cases but may need updates for:
- 3-way ties
- 4-team groups (new in 2026)

## Implementation Plan

### Phase 1: Schema Migration
1. Add migration for new group structure
2. Clear existing fixtures/teams or add tournamentId
3. Update seed script for 48 teams

### Phase 2: Data Seeding
1. Create comprehensive seed file for 2026 WC
2. Include all 48 qualified teams
3. Include all 65 fixtures with dates
4. Seed qualifying top scorers

### Phase 3: Frontend Updates
1. Update group letter mappings
2. Update bracket visualization
3. Test tiebreaker logic with new structure

### Phase 4: Testing
1. Test prediction submission
2. Test point calculation
3. Test league functionality
4. Test admin operations

## Seed File Structure

Recommended seed file: `backend/db/seed/2026-world-cup.ts`

```typescript
export const wc2026Teams = [
  // 48 teams with group assignments
  { name: "Argentina", groupLetter: "A" },
  { name: "Brazil", groupLetter: "B" },
  // ... etc
];

export const wc2026Fixtures = [
  // Group stage fixtures
  { groupLetter: "A", homeTeamId: 1, awayTeamId: 2, dateTime: 1751328000000 },
  // ... etc
];

export const wc2026RoundFixtures = [
  // Knockout fixtures
  { round: "Round of 16", homeTeamId: 33, awayTeamId: 45, order: 1 },
  // ... etc
];
```

## Configuration

Add to environment or config:
```typescript
const TOURNAMENT_ID = "wc-2026";
const PREDICTION_LOCK_TIME = 1751328000000; // June 30, 2025 20:00 UTC
```

## Checklist

- [ ] Create migration for 2026 structure
- [ ] Update seed script with 48 teams
- [ ] Add all group stage fixtures
- [ ] Add knockout bracket fixtures
- [ ] Update frontend group iteration
- [ ] Test tiebreaker logic
- [ ] Update prediction lock time
- [ ] Clear old data or add tournament filter
- [ ] Test admin functionality
- [ ] Update documentation

## Related

- [[seeding-improvements]] - Improved seeding strategy
- [[live-score-integration]] - Live score API plans
- [[project-overview]] - Project description
