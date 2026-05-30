/**
 * Fetch fixtures from Live Score API and save to JSON
 * 
 * Usage: npx ts-node fetch-fixtures.ts
 * 
 * This script:
 * 1. Fetches all fixtures for the World Cup (pages 1-3)
 * 2. Filters to only group stage fixtures (group_id != 0)
 * 3. Groups them by group_id and assigns group letters
 * 4. Saves to fixtures.json for seeding
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.LIVE_SCORE_API_KEY;
const API_SECRET = process.env.LIVE_SCORE_API_SECRET;
const COMPETITION_ID = 362; // World Cup

interface ApiResponse {
  success: boolean;
  error?: string;
  data: {
    fixtures: ApiFixture[];
  };
}

interface ApiFixture {
  id: number;
  round: string;
  date: string;
  time: string;
  home_id: number;
  home_name: string;
  away_id: number;
  away_name: string;
  group_id: number;
  location: string;
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

async function fetchFixturesPage(page: number): Promise<ApiFixture[]> {
  console.log(`  Fetching page ${page}...`);

  const url = new URL(
    "https://livescore-api.com/api-client/fixtures/matches.json"
  );
  url.searchParams.set("key", API_KEY!);
  url.searchParams.set("secret", API_SECRET!);
  url.searchParams.set("competition_id", String(COMPETITION_ID));
  url.searchParams.set("page", String(page));

  const response = await fetch(url.toString());
  const data: ApiResponse = await response.json();

  if (!data.success) {
    console.log(`    ⚠️  API Error: ${data.error}`);
    return [];
  }

  return data.data.fixtures;
}

function createDateTime(date: string, time: string): number {
  return new Date(`${date}T${time}`).getTime();
}

async function main() {
  if (!API_KEY || !API_SECRET) {
    console.error("Error: LIVE_SCORE_API_KEY and LIVE_SCORE_API_SECRET must be set");
    process.exit(1);
  }

  console.log(`Competition ID: ${COMPETITION_ID}`);
  console.log("Fetching fixtures from pages 1-3...\n");

  // Fetch pages 1-3
  const allFixtures: ApiFixture[] = [];
  for (let page = 1; page <= 3; page++) {
    const fixtures = await fetchFixturesPage(page);
    allFixtures.push(...fixtures);
    await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
  }

  // Filter to only group stage fixtures (group_id != 0)
  const groupFixtures = allFixtures.filter(f => f.group_id !== 0);
  console.log(`\nTotal fixtures: ${allFixtures.length}`);
  console.log(`Group stage fixtures: ${groupFixtures.length}`);

  // Group by group_id
  const grouped = new Map<number, ApiFixture[]>();
  groupFixtures.forEach((fixture) => {
    const existing = grouped.get(fixture.group_id) || [];
    existing.push(fixture);
    grouped.set(fixture.group_id, existing);
  });

  // Sort groups by group_id and assign letters
  const sortedGroups = Array.from(grouped.entries()).sort((a, b) => a[0] - b[0]);
  const groupLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const output: GroupData[] = sortedGroups.map(([group_id, fixtures], index) => ({
    group_id,
    groupLetter: groupLetters[index] || "?",
    fixtures: fixtures.map(f => ({
      id: f.id,
      round: f.round,
      date: f.date,
      time: f.time,
      homeTeamId: f.home_id,
      homeTeamName: f.home_name,
      awayTeamId: f.away_id,
      awayTeamName: f.away_name,
      groupId: f.group_id,
      location: f.location,
      dateTime: createDateTime(f.date, f.time),
    })),
  }));

  // Save to JSON
  const outputPath = path.join(__dirname, "fixtures.json");
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log(`\n✅ Saved ${output.length} groups to ${outputPath}`);
  
  // Print summary
  console.log("\nFixtures per group:");
  output.forEach(group => {
    console.log(`  Group ${group.groupLetter}: ${group.fixtures.length} fixtures`);
  });

  const totalFixtures = output.reduce((sum, g) => sum + g.fixtures.length, 0);
  console.log(`\nTotal: ${totalFixtures} group stage fixtures`);
}

main().catch(console.error);
