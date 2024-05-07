import { Dispatch } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PredictionActions, PredictionState } from "./types";
import { onChangePrediction } from "./onChangePrediction";
import { onAddPredictions } from "./onAddPredictions";

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

    case "ADD_PREDICTIONS":
      return onAddPredictions(state, action.payload);

    default:
      return state;
  }
};

interface PredictionStore {
  state: PredictionState;
  dispatch: Dispatch<PredictionActions>;
}

export const usePredictionStore = create<PredictionStore>()(
  persist(
    (set) => ({
      state: { predictions: [] },
      dispatch: (action: PredictionActions) =>
        set((state) => ({ ...state, state: reducer(state.state, action) })),
    }),
    {
      name: "prediction",
    }
  )
);
