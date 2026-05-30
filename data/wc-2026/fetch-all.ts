/**
 * Fetch all data from Live Score API
 * 
 * Usage: npx ts-node fetch-all.ts
 * 
 * This script runs all fetches in sequence:
 * 1. fetch-teams.ts - Get all teams
 * 2. fetch-fixtures.ts - Get all fixtures  
 * 3. fetch-squads.ts - Get squads for each team
 * 4. download-flags.ts - Download all country flags
 */

import { execSync } from "child_process";
import * as path from "path";

const scripts = [
  { name: "Teams", script: "fetch-teams.ts" },
  { name: "Fixtures", script: "fetch-fixtures.ts" },
  { name: "Squads", script: "fetch-squads.ts" },
  { name: "Flags", script: "download-flags.ts" },
];

async function main() {
  console.log("=".repeat(50));
  console.log("Fetching all data from Live Score API");
  console.log("=".repeat(50));
  console.log("");

  for (const { name, script } of scripts) {
    console.log(`\n📦 Running: ${name}`);
    console.log("-".repeat(30));

    const scriptPath = path.join(__dirname, script);

    try {
      execSync(`npx ts-node "${scriptPath}"`, {
        stdio: "inherit",
        cwd: __dirname,
      });
    } catch (error) {
      console.error(`\n❌ Error running ${script}`);
      process.exit(1);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("✅ All data fetched successfully!");
  console.log("=".repeat(50));
}

main().catch(console.error);
