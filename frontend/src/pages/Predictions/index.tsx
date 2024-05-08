import { Dialog, Loader } from "@mantine/core";
import { Fixture, Prediction, Team } from "../../../../shared/types/database";
import LeaguePredictions from "../../components/LeaguePredictions";
import { usePredictions } from "./usePredictions";
import { Fragment } from "react";

interface PredictionsPageProps {
  fixtures: Fixture[];
  predictions: Prediction[];
  teams: Team[];
  username: string;
  onPredictionChange: (prediction: Prediction) => void;
  isSavingPrediction: boolean;
  isError: boolean;
}

export const PredictionsPage = ({
  fixtures,
  predictions,
  teams,
  username,
  onPredictionChange,
  isSavingPrediction,
  isError,
}: PredictionsPageProps) => {
  const groupFixtures = usePredictions(teams, fixtures, predictions);

  return (
    <div className="flex items-center justify-center">
      <Dialog opened={isSavingPrediction || isError}>
        {isError ? (
          <p className="text-center text-sm text-red-600">
            Error - Predictions editing failed, please refresh the page and try
            again.
          </p>
        ) : (
          <Fragment>
            <div className="mb-2 flex items-center justify-center gap-4">
              <Loader color="blue" size="sm" className="mr-4" />
            </div>
            <p className="text-center text-sm text-blue-600">
              Saving prediction, please wait until this dialog is closed.
            </p>
          </Fragment>
        )}
      </Dialog>

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
