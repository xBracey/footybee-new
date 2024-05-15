import { useGetPredictions } from "../queries/useGetPredictions";
import { useEditPredictions } from "../queries/useEditPredictions";
import { useInitPredictions } from "../queries/useInitPredictions";
import { Fixture, Prediction, Team } from "../../../shared/types/database";
import { usePredictionStore } from "../zustand/predictions";
import { PredictionsPage } from "../pages/Predictions";
import Loading from "../components/Loading";
import { useCallback, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

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
  const [firstPredictionLoad, setFirstPredictionLoad] = useState(false);

  const { state, dispatch } = usePredictionStore();

  const onInitPredictionsSuccess = (data: Prediction[]) => {
    dispatch({
      type: "ADD_PREDICTIONS",
      payload: data.map((prediction) => ({ ...prediction, saved: true })),
    });
  };

  const { initPredictions } = useInitPredictions(
    onInitPredictionsSuccess,
    username
  );

  const onEditGroupSwitch = (groupLetter: string, switches: number[]) => {
    dispatch({
      type: "EDIT_GROUP_SWITCH",
      payload: { groupLetter, switches },
    });
  };

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
      initPredictions(fixturesWithNoPredictions);
    }
  };

  useGetPredictions(onPredictionSuccess);

  const onEditPredictionsSuccess = (data: Prediction[]) => {
    dispatch({
      type: "CHANGE_PREDICTIONS",
      payload: data.map((prediction) => ({ ...prediction, saved: true })),
    });
  };

  const { editPredictions, isError } = useEditPredictions(
    username,
    onEditPredictionsSuccess
  );

  const onEditPredictions = useDebouncedCallback(
    useCallback(() => {
      const localPredictions = state.predictions.filter(
        (prediction) => prediction.saved === false
      );

      editPredictions(localPredictions);
    }, [state.predictions, editPredictions]),
    2000
  );

  const onPredictionChange = (prediction: Prediction, groupLetter: string) => {
    dispatch({
      type: "CHANGE_PREDICTION",
      payload: { ...prediction, saved: false },
    });
    dispatch({
      type: "EDIT_GROUP_SWITCH",
      payload: { groupLetter, switches: [] },
    });
    onEditPredictions();
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
    <PredictionsPage
      teams={teams}
      fixtures={fixtures}
      predictions={state.predictions}
      username={username}
      onPredictionChange={onPredictionChange}
      isSavingPrediction={state.predictions.some(
        (prediction) => prediction.saved === false
      )}
      isError={isError}
      groupSwitches={state.groupSwitches}
      onGroupSwitchChange={onEditGroupSwitch}
    />
  );
};
