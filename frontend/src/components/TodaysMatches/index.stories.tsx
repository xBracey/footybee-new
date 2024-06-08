import { Story } from "@ladle/react";
import TodaysMatches from ".";
import { teams } from "../../fixtures/teams";
import { fixtures } from "../../fixtures/fixtures";

export const TodaysMatchesStory: Story = () => (
  <TodaysMatches teams={teams} fixtures={fixtures} />
);

TodaysMatchesStory.storyName = "TodaysMatches";
