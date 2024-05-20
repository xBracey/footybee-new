import { Story } from "@ladle/react";
import FixturePoints from ".";
import { teams } from "../../fixtures/teams";
import { fixtures } from "../../fixtures/fixtures";
import { results } from "../../fixtures/results";
import { userFixtures } from "../../fixtures/userFixtures";

export const FixturePointsStory: Story = () => (
  <FixturePoints
    teams={teams}
    fixtures={fixtures}
    results={results}
    userFixtures={userFixtures}
  />
);

FixturePointsStory.storyName = "FixturePoints";
