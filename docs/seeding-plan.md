# Seeding Plan

## Overview

Seeding is the process of populating the database with tournament data. This plan uses the Live Score API to fetch data and store it locally, then seed into the database.

## Data Flow

```
Live Score API
     ↓
Fetch Scripts (data/wc-2026/)
     ↓
JSON Files (data/wc-2026/*.json)
     ↓
Seed Scripts (backend/db/seed/)
     ↓
SQLite Database
```

## Step 1: Fetch Data

```bash
cd data/wc-2026
npm install
npm run fetch:all
```

This creates:
- `teams.json` - 49 teams
- `fixtures.json` - All fixtures with group assignments
- `squads.json` - Player squads
- `flags/` - Country flag images

## Step 2: Review & Validate Data

### Teams
- Verify all 49 teams are present
- Check team names match expected format
- Note team IDs for squad fetching

### Fixtures
- Verify group assignments
- Check date/time formats
- Ensure all matches are included

### Squads
- Not all teams may have squad data available
- Plan for manual entry if needed

## Step 3: Create Seed Script

Create `backend/db/seed/wc-2026.ts`:

```typescript
import { db } from "../db";
import { groups, rounds, teams, fixtures, players } from "../schema";
import wc2026Teams from "../../data/wc-2026/teams.json";
import wc2026Fixtures from "../../data/wc-2026/fixtures.json";
import wc2026Squads from "../../data/wc-2026/squads.json";

export async function seedWC2026() {
  console.log("🌱 Seeding World Cup 2026...");
  
  // 1. Seed groups
  const groupLetters = ["A", "B", "C", "D", "E", "F", "G", "H", ...];
  await db.insert(groups).values(
    groupLetters.map(letter => ({ letter }))
  ).onConflictDoNothing();
  
  // 2. Seed rounds
  await db.insert(rounds).values([
    { round: "Round of 16" },
    { round: "Quarter-finals" },
    { round: "Semi-finals" },
    { round: "Third Place" },
    { round: "Finals" },
  ]).onConflictDoNothing();
  
  // 3. Seed teams
  const teamIdMap = new Map<number, number>(); // API ID → DB ID
  for (const team of wc2026Teams) {
    const [inserted] = await db.insert(teams).values({
      name: team.name,
      groupLetter: team.groupLetter,
    }).returning({ id: teams.id });
    teamIdMap.set(team.id, inserted.id);
  }
  
  // 4. Seed group fixtures
  for (const fixture of wc2026Fixtures) {
    await db.insert(fixtures).values({
      homeTeamId: teamIdMap.get(fixture.homeTeamId),
      awayTeamId: teamIdMap.get(fixture.awayTeamId),
      groupLetter: fixture.groupLetter,
      dateTime: fixture.dateTime,
    });
  }
  
  // 5. Seed players
  for (const squad of wc2026Squads) {
    const teamId = teamIdMap.get(squad.teamId);
    if (!teamId) continue;
    
    for (const player of squad.players) {
      await db.insert(players).values({
        name: player.name,
        teamId: teamId,
      });
    }
  }
  
  console.log("✅ World Cup 2026 seeded!");
}
```

## Step 4: Run Seed

```bash
cd backend
npm run seed:wc-2026
```

## Step 5: Copy Flags

```bash
# Copy downloaded flags to frontend
cp data/wc-2026/flags/*.png frontend/public/flags/

# Or create symlink
ln -s ../../data/wc-2026/flags frontend/public/flags/live-flags
```

## Seed Checklist

- [ ] Fetch all data from Live Score API
- [ ] Review and validate JSON files
- [ ] Map group_ids to correct group letters
- [ ] Handle any missing data
- [ ] Create seed script
- [ ] Run seed against database
- [ ] Copy flags to frontend
- [ ] Test seeding in development
- [ ] Verify data in admin panel

## Environment Variables Required

```bash
LIVE_SCORE_API_KEY=your_key
LIVE_SCORE_API_SECRET=your_secret
```

## Troubleshooting

### Missing Teams
Some teams may not appear in fixtures. Check:
- Are all teams in qualifying?
- Is the competition_id correct?

### Missing Squads
Squad data may not be available until closer to tournament.
- Run script again closer to start date
- Manually enter if needed

### Flag Images
Flags download as PNG. Check:
- File is valid PNG
- Naming matches team names (sanitized)
- Frontend can load from `/flags/` path

## Related

- [[live-score-api]] - API documentation
- [[2026-world-cup]] - 2026 World Cup planning
