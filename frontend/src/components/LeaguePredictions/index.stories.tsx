import { Story } from "@ladle/react";
import LeaguePredictions from ".";
import { fixtures } from "../../fixtures/fixtures";
import { results } from "../../fixtures/results";
import { teams } from "../../fixtures/teams";
import { useState } from "react";
import { Prediction } from "../../../../shared/types/database";

export const LeaguePredictionsStory: Story = () => {
  const [predictions, setPredictions] = useState<Prediction[]>(
    results.map((result) => ({
      ...result,
      username: "xBracey",
    }))
  );

  const onPredictionChange = (prediction: Prediction) => {
    const updatedPredictions = predictions.map((p) =>
      p.fixtureId === prediction.fixtureId ? prediction : p
    );
    setPredictions(updatedPredictions);
  };

  return (
    <LeaguePredictions
      fixtures={fixtures}
      predictions={predictions}
      teams={teams}
      username="xBracey"
      onPredictionChange={onPredictionChange}
    />
  );
};
LeaguePredictionsStory.storyName = "LeaguePredictions";
