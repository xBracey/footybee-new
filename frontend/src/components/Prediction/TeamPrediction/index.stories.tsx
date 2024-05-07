import { Story } from "@ladle/react";
import TeamPrediction from ".";

export const TeamPredictionStory: Story = () => (
  <TeamPrediction
    teamName="Arsenal"
    score={0}
    incrementScore={() => {}}
    decrementScore={() => {}}
  />
);

TeamPredictionStory.storyName = "TeamPrediction";
