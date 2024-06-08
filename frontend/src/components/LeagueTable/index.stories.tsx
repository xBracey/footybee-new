import { Story } from "@ladle/react";
import LeagueTable from ".";
import { fixtures } from "../../fixtures/fixtures";
import { teams } from "../../fixtures/teams";

export const LeagueTableStory: Story = () => (
  <div>
    <h1>Normal Table</h1>
    <LeagueTable fixtures={fixtures} teams={teams} />

    <h1 className="mt-8">Table with pairings</h1>
    <LeagueTable fixtures={fixtures} teams={teams} />
  </div>
);

LeagueTableStory.storyName = "LeagueTable";
