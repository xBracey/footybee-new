import { useCallback } from "react";
import {
  Fixture,
  Prediction,
  UserGroup,
} from "../../../../shared/types/database";
import { useEditPredictions } from "../../queries/useEditPredictions";
import { usePredictionStore } from "../../zustand/predictions";
import { useDebouncedCallback } from "use-debounce";
import { useInitPredictions } from "./useInitPredictions";

export const usePredictions = (
  fixtures: Fixture[],
  username: string,
  editGroupSwitches: (data: Omit<UserGroup, "username" | "points">[]) => void
) => {
  const { state, dispatch } = usePredictionStore();

  useInitPredictions(fixtures, username);

  const onEditPredictionsSuccess = (data: Prediction[]) => {
    dispatch({
      type: "CHANGE_PREDICTIONS",
      payload: data.map((prediction) => ({ ...prediction, saved: true })),
    });
  };

  const { editPredictions, isError } = useEditPredictions(
    onEditPredictionsSuccess
  );

  const onEditPredictions = useDebouncedCallback(
    useCallback(() => {
      const localPredictions = state.predictions.filter(
        (prediction) => prediction.saved === false
      );
      const localGroupSwitches = Object.entries(state.groupSwitches)
        .filter(([_, groupSwitch]) => groupSwitch.saved === false)
        .map(([groupLetter, groupSwitch]) => ({
          groupLetter,
          switches: groupSwitch.switches,
        }));

      editPredictions(localPredictions);
      editGroupSwitches(localGroupSwitches);
    }, [state.predictions, editPredictions, editGroupSwitches]),
    2000
  );

  return { onEditPredictions, isError };
};
