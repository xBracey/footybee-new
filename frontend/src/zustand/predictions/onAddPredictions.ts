import { PredictionState, PredictionWithSaved } from "./types";

export const onAddPredictions = (
  state: PredictionState,
  payload: PredictionWithSaved[]
) => {
  return { ...state, predictions: [...state.predictions, ...payload] };
};
