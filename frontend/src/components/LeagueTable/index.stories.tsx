import { Story } from "@ladle/react";
import LeagueTable from ".";
import { fixtures } from "../../fixtures/fixtures";
import { results, resultsWithPairings } from "../../fixtures/results";
import { teams } from "../../fixtures/teams";

export const LeagueTableStory: Story = () => (
  <div>
    <h1>Normal Table</h1>
    <LeagueTable fixtures={fixtures} results={results} teams={teams} />

    <h1 className="mt-8">Table with pairings</h1>
    <LeagueTable
      fixtures={fixtures}
      results={resultsWithPairings}
      teams={teams}
    />
  </div>
);

LeagueTableStory.storyName = "LeagueTable";
