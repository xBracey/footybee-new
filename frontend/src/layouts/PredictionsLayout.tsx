import { useGetPredictions } from "../queries/useGetPredictions";
import { useEditPrediction } from "../queries/useEditPrediction";
import { useInitPredictions } from "../queries/useInitPredictions";
import { Fixture, Prediction, Team } from "../../../shared/types/database";
import { usePredictionStore } from "../zustand/predictions";
import { PredictionsPage } from "../pages/Predictions";
import Loading from "../components/Loading";
import { useMemo } from "react";

interface PredictionsLayoutProps {
  username: string;
  teams: Team[];
  fixtures: Fixture[];
}

export const PredictionsLayout = ({
  username,
  teams,
  fixtures,
}: PredictionsLayoutProps) => {
  const { state, dispatch } = usePredictionStore();

  const onInitPredictionsSuccess = (data: Prediction[]) => {
    console.log("Initialized predictions", data);
    dispatch({
      type: "ADD_PREDICTIONS",
      payload: data.map((prediction) => ({ ...prediction, saved: true })),
    });
  };

  const { initPredictions } = useInitPredictions(
    onInitPredictionsSuccess,
    username
  );

  const onPredictionSuccess = (predictions: Prediction[]) => {
    dispatch({ type: "SET_PREDICTIONS", payload: predictions });

    const fixturesWithNoPredictions = fixtures.filter((fixture) => {
      return !predictions.some(
        (prediction) => prediction.fixtureId === fixture.id
      );
    });

    if (fixturesWithNoPredictions.length > 0) {
      initPredictions(fixturesWithNoPredictions);
    }
  };

  useGetPredictions(onPredictionSuccess);

  const onEditPredictionSuccess = (data: Prediction) => {
    dispatch({ type: "CHANGE_PREDICTION", payload: { ...data, saved: true } });
  };

  const { editPrediction } = useEditPrediction(
    username,
    onEditPredictionSuccess
  );

  const onPredictionChange = (prediction: Prediction) => {
    dispatch({
      type: "CHANGE_PREDICTION",
      payload: { ...prediction, saved: false },
    });
    editPrediction(prediction);
  };

  const hasAllPredictions = useMemo(() => {
    return state.predictions.length === fixtures.length;
  }, [state.predictions, fixtures]);

  if (!teams || !fixtures || !state.predictions || !hasAllPredictions) {
    return (
      <div className="flex w-full items-center justify-center">
        <div>
          <Loading />
        </div>
        <p className="text-lg text-white">Loading Predictions ...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <PredictionsPage
        teams={teams}
        fixtures={fixtures}
        predictions={state.predictions}
        username={username}
        onPredictionChange={onPredictionChange}
        isSavingPrediction={state.predictions.some(
          (prediction) => prediction.saved === false
        )}
      />
    </div>
  );
};
