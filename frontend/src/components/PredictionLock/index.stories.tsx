import { Story } from "@ladle/react";
import PredictionLock from ".";

export const PredictionLockStory: Story = () => (
  <PredictionLock isLocked={false} />
);

PredictionLockStory.storyName = "PredictionLock";
