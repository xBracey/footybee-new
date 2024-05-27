import { useState } from "react";
import { Fixture, Prediction } from "../../../../shared/types/database";
import { useEditPredictions } from "../../queries/useEditPredictions";
import { usePredictionStore } from "../../zustand/predictions";
import { useGetPredictions } from "../../queries/useGetPredictions";

export const useInitPredictions = (fixtures: Fixture[], username: string) => {
  const [firstPredictionLoad, setFirstPredictionLoad] = useState(false);

  const { dispatch } = usePredictionStore();

  const onInitPredictionsSuccess = (data: Prediction[]) => {
    dispatch({
      type: "ADD_PREDICTIONS",
      payload: data.map((prediction) => ({ ...prediction, saved: true })),
    });
  };

  const { editPredictions: initPredictions } = useEditPredictions(
    onInitPredictionsSuccess
  );

  const onPredictionSuccess = (predictions: Prediction[]) => {
    if (firstPredictionLoad) {
      return;
    }

    setFirstPredictionLoad(true);

    dispatch({ type: "SET_PREDICTIONS", payload: predictions });

    const fixturesWithNoPredictions = fixtures.filter((fixture) => {
      return !predictions.some(
        (prediction) => prediction.fixtureId === fixture.id
      );
    });

    if (fixturesWithNoPredictions.length > 0) {
      initPredictions(
        fixturesWithNoPredictions.map((fixture) => ({
          fixtureId: fixture.id,
          username,
          homeTeamScore: 0,
          awayTeamScore: 0,
          saved: false,
        }))
      );
    }
  };

  useGetPredictions(username, onPredictionSuccess);
};
