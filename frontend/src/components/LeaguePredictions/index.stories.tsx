import { Story } from "@ladle/react";
import LeaguePredictions from ".";
import { fixtures } from "../../fixtures/fixtures";
import { resultsWithPairings } from "../../fixtures/results";
import { teams } from "../../fixtures/teams";
import { useState } from "react";
import { Prediction } from "../../../../shared/types/database";

export const LeaguePredictionsStory: Story = () => {
  const [groupSwitches, setGroupSwitches] = useState<number[]>([]);

  const [predictions, setPredictions] = useState<Prediction[]>(
    resultsWithPairings.map((result) => ({
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
      groupSwitches={groupSwitches}
      onEditGroupSwitch={setGroupSwitches}
    />
  );
};
LeaguePredictionsStory.storyName = "LeaguePredictions";
