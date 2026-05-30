/**
 * Download country flags from Live Score API
 * 
 * Usage: npx ts-node download-flags.ts
 * 
 * This script:
 * 1. Reads team IDs from teams.json
 * 2. Downloads flag PNG for each team
 * 3. Saves to flags/ folder
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.LIVE_SCORE_API_KEY;
const API_SECRET = process.env.LIVE_SCORE_API_SECRET;

// Output directory relative to this script
const OUTPUT_DIR = path.join(__dirname, "flags");

interface Team {
  id: number;
  name: string;
}

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "_");
}

async function downloadFlag(teamId: number, teamName: string): Promise<string | null> {
  console.log(`  Downloading flag for ${teamName} (ID: ${teamId})...`);

  try {
    const url = new URL(
      "https://livescore-api.com/api-client/countries/flag.json"
    );
    url.searchParams.set("key", API_KEY!);
    url.searchParams.set("secret", API_SECRET!);
    url.searchParams.set("team_id", String(teamId));

    const response = await fetch(url.toString());

    // Check content type
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("image")) {
      console.log(`    ⚠️  Response is not an image (${contentType})`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = `${sanitizeFilename(teamName)}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    fs.writeFileSync(filepath, buffer);

    console.log(`    ✅ Saved: ${filename}`);
    return filename;
  } catch (error: any) {
    console.log(`    ❌ Error: ${error.message}`);
    return null;
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

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Found ${teams.length} teams\n`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  // Download flag for each team
  const results: { teamId: number; teamName: string; filename: string | null }[] = [];

  for (const team of teams) {
    const filename = await downloadFlag(team.id, team.name);
    results.push({ teamId: team.id, teamName: team.name, filename });

    // Rate limiting - wait between requests
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Save mapping file
  const mappingPath = path.join(__dirname, "flags-mapping.json");
  fs.writeFileSync(mappingPath, JSON.stringify(results, null, 2));

  console.log(`\n✅ Downloaded ${results.filter((r) => r.filename).length}/${teams.length} flags`);
  console.log(`📄 Saved mapping to ${mappingPath}`);
}

main().catch(console.error);
