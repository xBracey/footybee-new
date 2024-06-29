import { Story } from "@ladle/react";
import FixturePoints from ".";
import { teams } from "../../fixtures/teams";
import { fixtures } from "../../fixtures/fixtures";
import { userFixtures } from "../../fixtures/userFixtures";

export const FixturePointsStory: Story = () => (
  <FixturePoints
    teams={teams}
    fixtures={fixtures}
    userFixtures={userFixtures}
  />
);

FixturePointsStory.storyName = "FixturePoints";
