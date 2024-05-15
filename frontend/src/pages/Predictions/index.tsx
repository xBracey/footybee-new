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
  onPredictionChange: (prediction: Prediction, groupLetter: string) => void;
  isSavingPrediction: boolean;
  isError: boolean;
  groupSwitches: { [groupLetter: string]: number[] };
  onGroupSwitchChange: (groupLetter: string, switches: number[]) => void;
}

export const PredictionsPage = ({
  fixtures,
  predictions,
  teams,
  username,
  onPredictionChange,
  isSavingPrediction,
  isError,
  groupSwitches,
  onGroupSwitchChange,
}: PredictionsPageProps) => {
  const groupFixtures = usePredictions(teams, fixtures, predictions);

  const onEditGroupSwitch = (groupLetter: string) => (switches: number[]) => {
    onGroupSwitchChange(groupLetter, switches);
  };

  const onEditPrediction =
    (groupLetter: string) => (prediction: Prediction) => {
      onPredictionChange(prediction, groupLetter);
    };

  return (
    <div className="flex flex-col items-center justify-center">
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

      <h1 className="my-2 mb-6 text-center text-3xl font-bold text-white">
        Fixtures
      </h1>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12">
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
                onPredictionChange={onEditPrediction(groupLetter)}
                groupSwitches={groupSwitches[groupLetter] ?? []}
                onEditGroupSwitch={onEditGroupSwitch(groupLetter)}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};
