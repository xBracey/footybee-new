import { PredictionState, PredictionWithSaved } from "./types";

export const onChangePrediction = (
  state: PredictionState,
  payload: PredictionWithSaved
) => {
  const { fixtureId, homeTeamScore, awayTeamScore } = payload;

  const updatedPredictions = state.predictions.map((prediction) => {
    if (prediction.fixtureId === fixtureId) {
      return {
        ...prediction,
        homeTeamScore,
        awayTeamScore,
        saved: payload.saved,
      };
    }

    return prediction;
  });

  return { ...state, predictions: updatedPredictions };
};
