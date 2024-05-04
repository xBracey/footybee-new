import { Dispatch } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Fixture, Prediction } from "../../../shared/types/database";

type InitialisePredictions = {
  type: "INITIALISE_PREDICTIONS";
  payload: { fixtures: Fixture[]; username: string; predictions: Prediction[] };
};

type SetPredictions = {
  type: "SET_PREDICTIONS";
  payload: { predictions: Prediction[] };
};

type ChangePrediction = {
  type: "CHANGE_PREDICTION";
  payload: { fixtureId: number; homeTeamScore: number; awayTeamScore: number };
};

interface PredictionState {
  predictions: Omit<Prediction, "id">[];
}

type PredictionActions =
  | InitialisePredictions
  | SetPredictions
  | ChangePrediction;

const reducer = (
  state: PredictionState,
  action: PredictionActions
): PredictionState => {
  switch (action.type) {
    case "INITIALISE_PREDICTIONS":
      return {
        ...state,
        predictions: action.payload.fixtures.map((fixture) => {
          const existingPrediction = action.payload.predictions.find(
            (p) => p.fixtureId === fixture.id
          );

          return {
            username: action.payload.username,
            fixtureId: fixture.id,
            homeTeamScore: existingPrediction?.homeTeamScore || 0,
            awayTeamScore: existingPrediction?.awayTeamScore || 0,
          };
        }),
      };
    case "SET_PREDICTIONS":
      const predictions = state.predictions.map((prediction) => {
        const newPrediction = action.payload.predictions.find(
          (p) => p.fixtureId === prediction.fixtureId
        );

        return newPrediction || prediction;
      });

      return { ...state, predictions };

    case "CHANGE_PREDICTION":
      const { fixtureId, homeTeamScore, awayTeamScore } = action.payload;

      const updatedPredictions = state.predictions.map((prediction) => {
        if (prediction.fixtureId === fixtureId) {
          return { ...prediction, homeTeamScore, awayTeamScore };
        }

        return prediction;
      });

      return { ...state, predictions: updatedPredictions };
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
