import { useEffect } from "react";
import { Fixture, Prediction, Team } from "../../../../shared/types/database";
import LeaguePredictions from "../../components/LeaguePredictions";
import { usePredictionStore } from "../../zustand/predictions";
import { usePredictions } from "./usePredictions";

interface PredictionsPageProps {
  fixtures: Fixture[];
  predictions: Prediction[];
  teams: Team[];
  username: string;
}

export const PredictionsPage = ({
  fixtures,
  predictions,
  teams,
  username,
}: PredictionsPageProps) => {
  const { state, dispatch } = usePredictionStore();

  useEffect(() => {
    dispatch({
      type: "INITIALISE_PREDICTIONS",
      payload: { fixtures, username, predictions },
    });
  }, [dispatch, fixtures, username, predictions]);

  useEffect(() => {
    dispatch({ type: "SET_PREDICTIONS", payload: { predictions } });
  }, [dispatch, predictions]);

  const groupFixtures = usePredictions(teams, fixtures, state.predictions);

  const onPredictionChange = (prediction: Prediction) => {
    dispatch({
      type: "CHANGE_PREDICTION",
      payload: {
        fixtureId: prediction.fixtureId,
        homeTeamScore: prediction.homeTeamScore,
        awayTeamScore: prediction.awayTeamScore,
      },
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12">
        <h1 className="my-2 text-center text-3xl font-bold text-white">
          Fixtures
        </h1>

        {Object.entries(groupFixtures).map(
          ([groupLetter, { fixtures, predictions, teams }]) => (
            <div className="flex flex-col gap-2">
              <h2 className="text-center text-xl font-bold text-white">
                Group {groupLetter}
              </h2>
              <LeaguePredictions
                key={groupLetter}
                fixtures={fixtures}
                predictions={predictions}
                teams={teams}
                username={username}
                onPredictionChange={onPredictionChange}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};
