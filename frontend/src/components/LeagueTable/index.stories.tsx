import { Story } from "@ladle/react";
import LeagueTable from ".";
import { fixtures } from "../../fixtures/fixtures";
import { results } from "../../fixtures/results";
import { teams } from "../../fixtures/teams";

export const LeagueTableStory: Story = () => (
  <LeagueTable fixtures={fixtures} results={results} teams={teams} />
);

LeagueTableStory.storyName = "LeagueTable";
