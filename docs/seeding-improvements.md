# Seeding Improvements

## Current State

Currently, tournament data is seeded through:
1. Drizzle migrations create the schema
2. Manual data insertion via admin panel
3. No dedicated seed script

This is problematic for:
- Setting up new environments
- Resetting for new tournaments
- Consistency across instances

## Proposed Solution

Create a comprehensive seed system with:

1. **Centralized Seed Files** - All tournament data in one place
2. **Transactional Seeding** - All-or-nothing seeding
3. **Version Control** - Track seed changes
4. **Environment Awareness** - Different data for dev/staging/prod

## Seed File Structure

### Recommended Location
```
backend/db/seed/
├── index.ts              # Main seed orchestrator
├── wc-2022/
│   ├── teams.ts          # 2022 World Cup teams
│   ├── fixtures.ts       # Group stage matches
│   ├── roundFixtures.ts  # Knockout matches
│   └── players.ts        # Top scorers
├── wc-2026/
│   ├── teams.ts          # 2026 World Cup teams
│   ├── fixtures.ts       # Group stage matches
│   ├── roundFixtures.ts  # Knockout matches
│   └── players.ts        # Top scorers (initially from qualifiers)
└── common/
    ├── groups.ts         # Group definitions
    └── rounds.ts         # Round definitions
```

### Team Definition Example

```typescript
// backend/db/seed/wc-2026/teams.ts
export const wc2026Teams = [
  // Pot 1 (Seeds)
  { name: "Argentina", groupLetter: "A", pot: 1 },
  { name: "Brazil", groupLetter: "B", pot: 1 },
  { name: "France", groupLetter: "C", pot: 1 },
  { name: "England", groupLetter: "D", pot: 1 },
  { name: "Spain", groupLetter: "E", pot: 1 },
  { name: "Germany", groupLetter: "F", pot: 1 },
  { name: "Portugal", groupLetter: "G", pot: 1 },
  { name: "Netherlands", groupLetter: "H", pot: 1 },
  { name: "Mexico", groupLetter: "I", pot: 1 },
  { name: "USA", groupLetter: "J", pot: 1 },
  { name: "Qatar", groupLetter: "K", pot: 1 },
  { name: "Japan", groupLetter: "L", pot: 1 },
  
  // Pot 2-4 (remaining 36 teams)
  { name: "Uruguay", groupLetter: "A", pot: 2 },
  // ... etc
] as const;
```

### Fixture Definition Example

```typescript
// backend/db/seed/wc-2026/fixtures.ts
export const wc2026Fixtures = [
  // Match day 1
  { matchDay: 1, groupLetter: "A", homeTeam: "Qatar", awayTeam: "Ecuador", dateTime: 1735689600000 },
  { matchDay: 1, groupLetter: "A", homeTeam: "Senegal", awayTeam: "Netherlands", dateTime: 1735704000000 },
  
  // Match day 2
  { matchDay: 2, groupLetter: "A", homeTeam: "Qatar", awayTeam: "Senegal", dateTime: 1735948800000 },
  // ... etc
] as const;
```

### Main Seed Orchestrator

```typescript
// backend/db/seed/index.ts
import { db } from "../db";
import { groups, rounds, teams, fixtures } from "../schema";
import { wc2026Teams } from "./wc-2026/teams";
import { wc2026Fixtures } from "./wc-2026/fixtures";
import { wc2026RoundFixtures } from "./wc-2026/roundFixtures";

export const GROUP_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] as const;
export const KNOCKOUT_ROUNDS = ["Round of 16", "Quarter-finals", "Semi-finals", "Third Place", "Final"] as const;

export async function seedTournament(tournamentId: string = "wc-2026") {
  console.log(`🌱 Seeding ${tournamentId}...`);
  
  // 1. Seed groups
  console.log("📦 Seeding groups...");
  await db.insert(groups).values(
    GROUP_LETTERS.map(letter => ({ letter }))
  ).onConflictDoNothing();
  
  // 2. Seed rounds
  console.log("📦 Seeding rounds...");
  await db.insert(rounds).values(
    KNOCKOUT_ROUNDS.map(round => ({ round }))
  ).onConflictDoNothing();
  
  // 3. Seed teams
  console.log("📦 Seeding teams...");
  const teamIds = new Map<string, number>();
  for (const team of wc2026Teams) {
    const [inserted] = await db.insert(teams).values({
      name: team.name,
      groupLetter: team.groupLetter,
    }).returning({ id: teams.id });
    teamIds.set(team.name, inserted.id);
  }
  
  // 4. Seed fixtures
  console.log("📦 Seeding fixtures...");
  for (const fixture of wc2026Fixtures) {
    await db.insert(fixtures).values({
      homeTeamId: teamIds.get(fixture.homeTeam),
      awayTeamId: teamIds.get(fixture.awayTeam),
      groupLetter: fixture.groupLetter,
      dateTime: fixture.dateTime,
    });
  }
  
  // 5. Seed round fixtures
  console.log("📦 Seeding round fixtures...");
  for (const fixture of wc2026RoundFixtures) {
    await db.insert(roundFixtures).values({
      homeTeamId: teamIds.get(fixture.homeTeam),
      awayTeamId: teamIds.get(fixture.awayTeam),
      round: fixture.round,
      order: fixture.order,
      dateTime: fixture.dateTime,
    });
  }
  
  console.log("✅ Seeding complete!");
}
```

## CLI Commands

```bash
# Seed 2026 World Cup data
npm run seed

# Seed specific tournament
npm run seed wc-2026

# Clear and reseed
npm run seed:reset

# Seed with verification
npm run seed:verify
```

## Package.json Scripts

```json
{
  "scripts": {
    "seed": "ts-node ./db/seed/index.ts",
    "seed:wc-2026": "ts-node ./db/seed/index.ts wc-2026",
    "seed:reset": "ts-node ./db/seed/reset.ts",
    "seed:verify": "ts-node ./db/seed/verify.ts"
  }
}
```

## Data Verification

Add a verification step to ensure seed data is correct:

```typescript
// backend/db/seed/verify.ts
export async function verifySeed() {
  const teamCount = await db.select().from(teams).execute();
  const fixtureCount = await db.select().from(fixtures).execute();
  
  console.log(`Teams: ${teamCount.length} (expected: 48)`);
  console.log(`Group Fixtures: ${fixtureCount.length} (expected: 48)`);
  
  // Validate relationships
  const teamsWithoutGroup = await db
    .select()
    .from(teams)
    .where(isNull(teams.groupLetter))
    .execute();
    
  if (teamsWithoutGroup.length > 0) {
    throw new Error(`Found ${teamsWithoutGroup.length} teams without groups`);
  }
  
  console.log("✅ Verification passed!");
}
```

## Environment-Specific Seeding

```typescript
// backend/db/seed/index.ts
const env = process.env.NODE_ENV;

if (env === "development") {
  // Seed with sample data for testing
  await seedWithSampleData();
} else if (env === "staging") {
  // Partial seed for staging environment
  await seedPartial();
} else {
  // Full production seed
  await seedTournament("wc-2026");
}
```

## Migration Integration

Update `migrate.ts` to optionally run seeds:

```typescript
// backend/db/migrate.ts
import { seedTournament } from "./seed";

async function main() {
  // Run migrations
  await runMigrations();
  
  // Optionally seed
  if (process.argv.includes("--seed")) {
    await seedTournament();
  }
}
```

## Checklist

- [ ] Create seed directory structure
- [ ] Extract current data to seed files
- [ ] Create main seed orchestrator
- [ ] Add CLI commands
- [ ] Add verification step
- [ ] Add environment-specific options
- [ ] Document seed process
- [ ] Test in development
- [ ] Test reset functionality

## Related

- [[2026-world-cup]] - World Cup planning
- [[live-score-integration]] - Live score integration
- [[database]] - Database schema
