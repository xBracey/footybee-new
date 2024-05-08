import { PredictionState, PredictionWithSaved } from "./types";

export const onChangePredictions = (
  state: PredictionState,
  payload: PredictionWithSaved[]
) => {
  const payloadFixtureIds = payload.map(({ fixtureId }) => fixtureId);

  const updatedPredictions = state.predictions.map((prediction) => {
    if (payloadFixtureIds.includes(prediction.fixtureId)) {
      const { homeTeamScore, awayTeamScore, saved } = payload.find(
        ({ fixtureId }) => fixtureId === prediction.fixtureId
      );

      return {
        ...prediction,
        homeTeamScore,
        awayTeamScore,
        saved,
      };
    }

    return prediction;
  });

  return { ...state, predictions: updatedPredictions };
};
