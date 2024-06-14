import { Dialog, Loader } from "@mantine/core";
import {
  Fixture,
  Player,
  Prediction,
  Team,
} from "../../../../shared/types/database";
import LeaguePredictions from "../../components/LeaguePredictions";
import { usePredictions } from "./usePredictions";
import { Fragment, useEffect, useState } from "react";
import { GroupSwitches } from "../../zustand/predictions/types";
import Banner from "../../components/Banner";
import UserBonuses from "../../components/UserBonuses";

const predictionLockTime = 1718474400000; // 2024-06-15 20:00:00

interface PredictionsPageProps {
  fixtures: Fixture[];
  predictions: Prediction[];
  teams: Team[];
  username: string;
  onPredictionChange: (prediction: Prediction, groupLetter: string) => void;
  isSavingPrediction: boolean;
  isError: boolean;
  groupSwitches: GroupSwitches;
  onGroupSwitchChange: (groupLetter: string, switches: number[]) => void;
  onEditBonusPlayer: (playerId: number) => void;
  onEditBonusTeam: (teamId: number) => void;
  players: Player[];
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
  onEditBonusPlayer,
  onEditBonusTeam,
  players,
}: PredictionsPageProps) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  const groupFixtures = usePredictions(teams, fixtures, predictions);

  const onEditGroupSwitch = (groupLetter: string) => (switches: number[]) => {
    onGroupSwitchChange(groupLetter, switches);
  };

  const onEditPrediction =
    (groupLetter: string) => (prediction: Prediction) => {
      onPredictionChange(prediction, groupLetter);
    };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const isPredictionLocked = currentTime > predictionLockTime || true;

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

      <Banner>
        <h2 className="text-2xl font-bold text-white">Predictions</h2>
      </Banner>

      <UserBonuses
        onEditBonusPlayer={onEditBonusPlayer}
        onEditBonusTeam={onEditBonusTeam}
        players={players}
        teams={teams}
        isPredictionLocked={isPredictionLocked}
      />

      <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col gap-12">
        {Object.entries(groupFixtures).map(
          ([groupLetter, { fixtures, predictions, teams }]) => (
            <div className="flex flex-col gap-2" key={groupLetter}>
              <h2 className="text-center text-2xl font-bold text-white">
                Group {groupLetter}
              </h2>
              <LeaguePredictions
                key={groupLetter}
                fixtures={fixtures}
                predictions={predictions}
                teams={teams}
                username={username}
                onPredictionChange={onEditPrediction(groupLetter)}
                groupSwitches={groupSwitches[groupLetter]?.switches ?? []}
                onEditGroupSwitch={onEditGroupSwitch(groupLetter)}
                isPredictionLocked={isPredictionLocked}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};
