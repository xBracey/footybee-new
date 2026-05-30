/**
 * Fetch squads (players) for all teams from Live Score API
 * 
 * Usage: npx ts-node fetch-squads.ts
 * 
 * This script:
 * 1. Reads team IDs from teams.json
 * 2. Fetches squad for each team
 * 3. Saves to squads.json for seeding
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.LIVE_SCORE_API_KEY;
const API_SECRET = process.env.LIVE_SCORE_API_SECRET;
const COMPETITION_ID = 362; // World Cup

interface Team {
  id: number;
  name: string;
}

interface SquadResponse {
  success: boolean;
  error?: string;
  data: {
    id: string;
    name: string;
    shirt_number: string;
    position: string;
  }[];
}

interface Player {
  teamId: number;
  teamName: string;
  players: SquadPlayer[];
}

interface SquadPlayer {
  id: string;
  name: string;
  shirtNumber: string;
  position: string;
}

async function fetchSquad(teamId: number, teamName: string): Promise<SquadPlayer[]> {
  console.log(`  Fetching squad for ${teamName} (ID: ${teamId})...`);

  try {
    const url = new URL(
      "https://livescore-api.com/api-client/competitions/squads.json"
    );
    url.searchParams.set("key", API_KEY!);
    url.searchParams.set("secret", API_SECRET!);
    url.searchParams.set("competition_id", String(COMPETITION_ID));
    url.searchParams.set("team_id", String(teamId));

    const response = await fetch(url.toString());
    const data: SquadResponse = await response.json();

    if (!data.success) {
      console.log(`    ⚠️  No squad available: ${data.error}`);
      return [];
    }

    const squad: SquadPlayer[] = data.data.map((p) => ({
      id: p.id,
      name: p.name,
      shirtNumber: p.shirt_number,
      position: p.position,
    }));

    console.log(`    ✅ Found ${squad.length} players`);
    return squad;
  } catch (error: any) {
    console.log(`    ❌ Error: ${error.message}`);
    return [];
  }
}

async function main() {
  if (!API_KEY || !API_SECRET) {
    console.error("Error: LIVE_SCORE_API_KEY and LIVE_SCORE_API_SECRET must be set");
    process.exit(1);
  }

  // Read teams from teams.json
  const teamsPath = path.join(__dirname, "teams.json");
  if (!fs.existsSync(teamsPath)) {
    console.error("Error: teams.json not found. Run fetch-teams.ts first.");
    process.exit(1);
  }

  const teams: Team[] = JSON.parse(fs.readFileSync(teamsPath, "utf-8"));
  console.log(`Found ${teams.length} teams\n`);

  // Fetch squad for each team
  const allSquads: Player[] = [];

  for (const team of teams) {
    const players = await fetchSquad(team.id, team.name);

    if (players.length > 0) {
      allSquads.push({
        teamId: team.id,
        teamName: team.name,
        players,
      });
    }

    // Rate limiting - wait between requests
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Save to JSON
  const outputPath = path.join(__dirname, "squads.json");
  fs.writeFileSync(outputPath, JSON.stringify(allSquads, null, 2));

  console.log(`\n✅ Saved squads for ${allSquads.length} teams to ${outputPath}`);

  // Print summary
  const totalPlayers = allSquads.reduce((sum, squad) => sum + squad.players.length, 0);
  console.log(`\nTotal players: ${totalPlayers}`);
}

main().catch(console.error);
