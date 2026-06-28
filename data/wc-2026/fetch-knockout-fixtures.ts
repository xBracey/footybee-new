/**
 * Fetch knockout fixtures from Live Score API and save to JSON
 *
 * Usage: npx ts-node fetch-knockout-fixtures.ts
 *
 * This script:
 * 1. Fetches all fixtures for the World Cup (pages 1-5)
 * 2. Filters to only knockout fixtures (group_id === 0)
 * 3. Groups them by round, mapping the API's `round` value to a
 *    round name ("Round of 32", "Round of 16", "Quarter-finals",
 *    "Semi-finals", "Finals", "Third Place") and assigns a bracket
 *    `order` within each round
 * 4. Saves to knockout-fixtures.json for seeding
 *
 * Output shape:
 * [
 *   { round: "Round of 32", fixtures: [{ id, round, date, time,
 *     homeTeamId, homeTeamName, awayTeamId, awayTeamName, location,
 *     dateTime, order }, ...] },
 *   { round: "Round of 16", fixtures: [...] },
 *   ...
 * ]
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

interface KnockoutFixtureRaw {
  id: number;
  round: string;
  date: string;
  time: string;
  homeTeamId: number;
  homeTeamName: string;
  awayTeamId: number;
  awayTeamName: string;
  location: string;
  dateTime: number;
  order: number;
}

interface KnockoutData {
  round: string;
  fixtures: KnockoutFixtureRaw[];
}

/**
 * Map the API's `round` field to a round name used by the app.
 *
 * The Live Score API returns round identifiers as strings. For 2026
 * the convention appears to be numeric ("1"-"3" = group stage,
 * "4" = R32, "5" = R16, etc.) but the exact mapping is not
 * guaranteed. We use a "starts with" + lookup approach so the
 * script keeps working if the API shifts slightly.
 *
 * Update this map if the API returns different identifiers.
 */
const ROUND_NAME_BY_API_ROUND: Record<string, string> = {
  // Full names
  "Round of 32": "Round of 32",
  "Round of 16": "Round of 16",
  "Quarter-finals": "Quarter-finals",
  "Quarter Finals": "Quarter-finals",
  "Semi-finals": "Semi-finals",
  "Semi Finals": "Semi-finals",
  "Finals": "Finals",
  "Final": "Finals",
  "Third Place": "Third Place",
  "3rd Place": "Third Place",
  // Short codes used by the Live Score API for the 2026 World Cup
  R32: "Round of 32",
  R16: "Round of 16",
  QF: "Quarter-finals",
  SF: "Semi-finals",
  F: "Finals",
  "3PPO": "Third Place",
};

const normaliseRoundName = (apiRound: string): string | null => {
  // Direct match first (case-insensitive).
  const direct = Object.entries(ROUND_NAME_BY_API_ROUND).find(
    ([key]) => key.toLowerCase() === apiRound.toLowerCase()
  );
  if (direct) return direct[1];

  // Common abbreviation fallbacks.
  const lower = apiRound.toLowerCase();
  if (lower.includes("3rd") || lower.includes("third")) return "Third Place";
  if (lower.includes("final") && !lower.includes("semi") && !lower.includes("quarter"))
    return "Finals";
  if (lower.includes("semi")) return "Semi-finals";
  if (lower.includes("quarter")) return "Quarter-finals";
  if (lower.includes("round of 16") || lower === "r16") return "Round of 16";
  if (lower.includes("round of 32") || lower === "r32") return "Round of 32";

  return null;
};

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
    console.error(
      "Error: LIVE_SCORE_API_KEY and LIVE_SCORE_API_SECRET must be set"
    );
    process.exit(1);
  }

  console.log(`Competition ID: ${COMPETITION_ID}`);
  console.log("Fetching fixtures from pages 1-5...\n");

  // Fetch pages 1-5 (knockout stage adds more fixtures than the 3 pages
  // the group-stage prefill needed).
  const allFixtures: ApiFixture[] = [];
  for (let page = 1; page <= 5; page++) {
    const fixtures = await fetchFixturesPage(page);
    allFixtures.push(...fixtures);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Rate limiting
  }

  // Filter to only knockout fixtures (group_id === 0).
  const knockoutFixtures = allFixtures.filter((f) => f.group_id === 0);
  console.log(`\nTotal fixtures: ${allFixtures.length}`);
  console.log(`Knockout fixtures: ${knockoutFixtures.length}`);

  if (knockoutFixtures.length === 0) {
    console.error(
      "No knockout fixtures returned. The API may not have knockout data yet, or the round naming has changed. Check the raw response above."
    );
    process.exit(1);
  }

  // First pass: print the unique `round` values we got from the API so
  // we can see what to map. Helpful when the API convention changes.
  const uniqueApiRounds = Array.from(
    new Set(knockoutFixtures.map((f) => f.round))
  );
  console.log("\nUnique `round` values returned by API:");
  uniqueApiRounds.forEach((r) => {
    const mapped = normaliseRoundName(r);
    console.log(`  "${r}"  ->  ${mapped ? `"${mapped}"` : "⚠️  UNMAPPED"}`);
  });

  // Second pass: group by mapped round name, normalising dates and
  // assigning a bracket `order` per round.
  const grouped = new Map<string, ApiFixture[]>();
  let unmapped = 0;
  for (const fixture of knockoutFixtures) {
    const roundName = normaliseRoundName(fixture.round);
    if (!roundName) {
      unmapped++;
      continue;
    }
    const existing = grouped.get(roundName) ?? [];
    existing.push(fixture);
    grouped.set(roundName, existing);
  }

  if (unmapped > 0) {
    console.log(
      `\n⚠️  Skipped ${unmapped} fixture(s) with unmapped round values.`
    );
  }

  // Define the round order so the JSON output is consistent regardless
  // of Map insertion order.
  const ROUND_ORDER = [
    "Round of 32",
    "Round of 16",
    "Quarter-finals",
    "Semi-finals",
    "Third Place",
    "Finals",
  ];

  const output: KnockoutData[] = ROUND_ORDER.filter((round) =>
    grouped.has(round)
  ).map((round) => {
    // Sort each round by date+time so the `order` follows the natural
    // chronological play order.
    const fixtures = (grouped.get(round) ?? []).slice().sort((a, b) => {
      const at = createDateTime(a.date, a.time);
      const bt = createDateTime(b.date, b.time);
      return at - bt;
    });

    return {
      round,
      fixtures: fixtures.map((f, index) => ({
        id: f.id,
        round,
        date: f.date,
        time: f.time,
        homeTeamId: f.home_id,
        homeTeamName: f.home_name,
        awayTeamId: f.away_id,
        awayTeamName: f.away_name,
        location: f.location,
        dateTime: createDateTime(f.date, f.time),
        order: index,
      })),
    };
  });

  // Save to JSON.
  const outputPath = path.join(__dirname, "knockout-fixtures.json");
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log(`\n✅ Saved ${output.length} rounds to ${outputPath}`);

  // Print summary.
  console.log("\nFixtures per round:");
  output.forEach((block) => {
    console.log(`  ${block.round}: ${block.fixtures.length} fixtures`);
  });

  const totalFixtures = output.reduce(
    (sum, block) => sum + block.fixtures.length,
    0
  );
  console.log(`\nTotal: ${totalFixtures} knockout fixtures`);
}

main().catch(console.error);
