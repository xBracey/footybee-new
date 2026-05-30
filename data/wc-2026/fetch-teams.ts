/**
 * Fetch teams from Live Score API and save to JSON
 * 
 * Usage: npx ts-node fetch-teams.ts
 * 
 * This script:
 * 1. Fetches all fixtures for the World Cup
 * 2. Extracts unique teams with their IDs
 * 3. Saves to teams.json for seeding
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

interface ApiResponse {
  success: boolean;
  error?: string;
  data: {
    fixtures: {
      home_id: number;
      home_name: string;
      away_id: number;
      away_name: string;
    }[];
  };
}

async function fetchTeams(): Promise<Team[]> {
  console.log("Fetching fixtures from Live Score API...");

  const url = new URL(
    "https://livescore-api.com/api-client/fixtures/matches.json"
  );
  url.searchParams.set("key", API_KEY!);
  url.searchParams.set("secret", API_SECRET!);
  url.searchParams.set("competition_id", String(COMPETITION_ID));

  const response = await fetch(url.toString());
  const data: ApiResponse = await response.json();

  if (!data.success) {
    throw new Error(`API Error: ${data.error}`);
  }

  const fixtures = data.data.fixtures;

  // Extract unique teams from home and away
  const teamsMap = new Map<number, string>();

  fixtures.forEach((fixture) => {
    teamsMap.set(fixture.home_id, fixture.home_name);
    teamsMap.set(fixture.away_id, fixture.away_name);
  });

  const teams: Team[] = Array.from(teamsMap.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.id - b.id);

  return teams;
}

async function main() {
  if (!API_KEY || !API_SECRET) {
    console.error("Error: LIVE_SCORE_API_KEY and LIVE_SCORE_API_SECRET must be set");
    process.exit(1);
  }

  console.log(`Competition ID: ${COMPETITION_ID}`);
  console.log("");

  const teams = await fetchTeams();

  // Save to JSON
  const outputPath = path.join(__dirname, "teams.json");
  fs.writeFileSync(outputPath, JSON.stringify(teams, null, 2));

  console.log(`✅ Saved ${teams.length} teams to ${outputPath}`);

  // Print summary
  console.log("\nTeams:");
  teams.forEach((team) => {
    console.log(`  ${team.id}: ${team.name}`);
  });
}

main().catch(console.error);
