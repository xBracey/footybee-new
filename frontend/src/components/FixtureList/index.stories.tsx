import { Story } from "@ladle/react";
import FixtureList from ".";
import { teams } from "../../fixtures/teams";
import { fixtures } from "../../fixtures/fixtures";

export const FixtureListStory: Story = () => (
  <FixtureList teams={teams} fixtures={fixtures} />
);

FixtureListStory.storyName = "FixtureList";
