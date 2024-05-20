import { Story } from "@ladle/react";
import FixtureList from ".";
import { teams } from "../../fixtures/teams";
import { fixtures } from "../../fixtures/fixtures";
import { results } from "../../fixtures/results";

export const FixtureListStory: Story = () => (
  <FixtureList teams={teams} fixtures={fixtures} results={results} />
);

FixtureListStory.storyName = "FixtureList";
