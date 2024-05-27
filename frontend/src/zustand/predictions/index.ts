import { Dispatch } from "react";
import { create } from "zustand";
import { PredictionActions, PredictionState } from "./types";
import { onChangePredictions } from "./onChangePredictions";
import { onAddPredictions } from "./onAddPredictions";
import { onChangePrediction } from "./onChangePrediction";
import { onEditGroupSwitch } from "./onEditGroupSwitch";
import { onEditGroupSwitches } from "./onEditGroupSwitches";
import { onEditBonuses } from "./onEditBonuses";

const reducer = (
  state: PredictionState,
  action: PredictionActions
): PredictionState => {
  switch (action.type) {
    case "SET_PREDICTIONS":
      const predictions = action.payload.map((prediction) => {
        return { ...prediction, saved: true };
      });

      return { ...state, predictions };

    case "CHANGE_PREDICTION":
      return onChangePrediction(state, action.payload);

    case "CHANGE_PREDICTIONS":
      return onChangePredictions(state, action.payload);

    case "ADD_PREDICTIONS":
      return onAddPredictions(state, action.payload);

    case "EDIT_GROUP_SWITCH":
      return onEditGroupSwitch(state, action.payload);

    case "EDIT_GROUP_SWITCHES":
      return onEditGroupSwitches(state, action.payload);

    case "EDIT_BONUSES":
      return onEditBonuses(state, action.payload);

    default:
      return state;
  }
};

interface PredictionStore {
  state: PredictionState;
  dispatch: Dispatch<PredictionActions>;
}

export const usePredictionStore = create<PredictionStore>()((set) => ({
  state: { predictions: [], groupSwitches: {}, bonuses: { saved: true } },
  dispatch: (action: PredictionActions) =>
    set((state) => ({ ...state, state: reducer(state.state, action) })),
}));
