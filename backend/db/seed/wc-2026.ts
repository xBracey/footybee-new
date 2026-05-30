/**
 * Seed World Cup 2026 data into the database
 * 
 * Usage: npx ts-node db/seed/wc-2026.ts
 */

const path = require("path");

// Connect to database
const Database = require("better-sqlite3");
const { drizzle } = require("drizzle-orm/better-sqlite3");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { groups, rounds, teams, fixtures, players } = require("../schema");

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

// Load data from data/wc-2026
const fs = require("fs");

interface TeamData {
  id: number;
  name: string;
}

interface FixtureRaw {
  id: number;
  round: string;
  date: string;
  time: string;
  homeTeamId: number;
  homeTeamName: string;
  awayTeamId: number;
  awayTeamName: string;
  groupId: number;
  location: string;
  dateTime: number;
}

interface GroupData {
  group_id: number;
  groupLetter: string;
  fixtures: FixtureRaw[];
}

interface SquadData {
  teamId: number;
  teamName: string;
  players: {
    id: string;
    name: string;
    shirtNumber: string;
    position: string;
  }[];
}

// Data files are in /Users/user/Projects/footybee-new/data/wc-2026/
const DATA_PATH = "/Users/user/Projects/footybee-new/data/wc-2026";

function loadTeams(): TeamData[] {
  const dataPath = path.join(DATA_PATH, "teams.json");
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

function loadFixtures(): GroupData[] {
  const dataPath = path.join(DATA_PATH, "fixtures.json");
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

function loadSquads(): SquadData[] {
  const dataPath = path.join(DATA_PATH, "squads.json");
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

async function seed() {
  console.log("🌱 Seeding World Cup 2026 data...\n");

  // 1. Seed groups
  console.log("📦 Seeding groups...");
  const groupsData = loadFixtures();
  const groupLetters = groupsData.map(g => g.groupLetter);
  
  for (const letter of groupLetters) {
    try {
      db.insert(groups).values({ letter }).run();
    } catch (e: any) {
      if (e.code !== "SQLITE_CONSTRAINT_PRIMARYKEY") {
        throw e;
      }
    }
  }
  console.log(`   ✅ Seeded ${groupLetters.length} groups\n`);

  // 2. Seed rounds
  console.log("📦 Seeding rounds...");
  const roundNames = ["Round of 16", "Quarter-finals", "Semi-finals", "Third Place", "Finals", "Group Stages"];
  for (const round of roundNames) {
    try {
      db.insert(rounds).values({ round }).run();
    } catch (e: any) {
      if (e.code !== "SQLITE_CONSTRAINT_PRIMARYKEY") {
        throw e;
      }
    }
  }
  console.log(`   ✅ Seeded ${roundNames.length} rounds\n`);

  // 3. Seed teams
  console.log("📦 Seeding teams...");
  const teamsData = loadTeams();
  const teamApiIdToDbId = new Map<number, number>();
  
  // Create a map of team names to their group letter from fixtures
  const teamNameToGroup = new Map<string, string>();
  groupsData.forEach(group => {
    group.fixtures.forEach(fixture => {
      teamNameToGroup.set(fixture.homeTeamName, group.groupLetter);
      teamNameToGroup.set(fixture.awayTeamName, group.groupLetter);
    });
  });
  
  for (const team of teamsData) {
    const assignedGroupLetter = teamNameToGroup.get(team.name) || null;

    try {
      const result = db.insert(teams).values({
        name: team.name,
        groupLetter: assignedGroupLetter,
      }).run();
      
      // Get the last inserted ID
      const lastId = sqlite.prepare("SELECT last_insert_rowid() as id").get() as { id: number };
      teamApiIdToDbId.set(team.id, lastId.id);
    } catch (e: any) {
      console.log(`   ⚠️  Error seeding team ${team.name}: ${e.message}`);
    }
  }
  console.log(`   ✅ Seeded ${teamApiIdToDbId.size} teams\n`);

  // 4. Seed fixtures
  console.log("📦 Seeding fixtures...");
  let fixturesInserted = 0;

  for (const group of groupsData) {
    for (const fixture of group.fixtures) {
      const homeTeamDbId = teamApiIdToDbId.get(fixture.homeTeamId);
      const awayTeamDbId = teamApiIdToDbId.get(fixture.awayTeamId);

      if (!homeTeamDbId || !awayTeamDbId) {
        console.log(`   ⚠️  Skipping fixture ${fixture.homeTeamName} vs ${fixture.awayTeamName} - team IDs not found`);
        continue;
      }

      try {
        db.insert(fixtures).values({
          homeTeamId: homeTeamDbId,
          awayTeamId: awayTeamDbId,
          groupLetter: group.groupLetter,
          dateTime: fixture.dateTime,
        }).run();
        fixturesInserted++;
      } catch (e: any) {
        console.log(`   ⚠️  Error seeding fixture: ${e.message}`);
      }
    }
  }
  console.log(`   ✅ Seeded ${fixturesInserted} fixtures\n`);

  // 5. Seed players
  console.log("📦 Seeding players...");
  const squadsData = loadSquads();
  let playersInserted = 0;

  for (const squad of squadsData) {
    const teamDbId = teamApiIdToDbId.get(squad.teamId);
    
    if (!teamDbId) {
      console.log(`   ⚠️  Skipping squad for ${squad.teamName} - team not found`);
      continue;
    }

    for (const player of squad.players) {
      try {
        db.insert(players).values({
          name: player.name,
          teamId: teamDbId,
        }).run();
        playersInserted++;
      } catch (e: any) {
        // Skip duplicates
      }
    }
  }
  console.log(`   ✅ Seeded ${playersInserted} players\n`);

  console.log("=".repeat(50));
  console.log("✅ World Cup 2026 seeding complete!");
  console.log("=".repeat(50));
}

seed().catch(console.error);
