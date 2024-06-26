import { Story } from "@ladle/react";
import RoundPredictions from ".";
import { teams } from "../../fixtures/teams";
import { roundFixtures } from "../../fixtures/roundFixtures";

export const RoundPredictionsStory: Story = () => (
  <RoundPredictions teams={teams} roundFixtures={roundFixtures} />
);

RoundPredictionsStory.storyName = "RoundPredictions";
