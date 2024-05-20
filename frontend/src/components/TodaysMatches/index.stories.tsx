import { Story } from "@ladle/react";
import TodaysMatches from ".";
import { teams } from "../../fixtures/teams";
import { fixtures } from "../../fixtures/fixtures";
import { results } from "../../fixtures/results";

export const TodaysMatchesStory: Story = () => (
  <TodaysMatches teams={teams} fixtures={fixtures} results={results} />
);

TodaysMatchesStory.storyName = "TodaysMatches";
