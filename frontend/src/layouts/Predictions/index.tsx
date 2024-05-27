import {
  Fixture,
  Player,
  Prediction,
  Team,
} from "../../../../shared/types/database";
import { usePredictionStore } from "../../zustand/predictions";
import { PredictionsPage } from "../../pages/Predictions";
import Loading from "../../components/Loading";
import { useMemo } from "react";
import { useUserGroups } from "./useUserGroups";
import { usePredictions } from "./usePredictions";
import { useUserBonuses } from "./useUserBonuses";

interface PredictionsLayoutProps {
  username: string;
  teams: Team[];
  fixtures: Fixture[];
  players: Player[];
}

export const PredictionsLayout = ({
  username,
  teams,
  fixtures,
  players,
}: PredictionsLayoutProps) => {
  const { state, dispatch } = usePredictionStore();

  const { onEditGroupSwitch, editGroupSwitches } = useUserGroups(username);
  const { onEditPredictions, isError } = usePredictions(
    fixtures,
    username,
    editGroupSwitches
  );
  const { onEditBonusPlayer, onEditBonusTeam } = useUserBonuses();

  const onPredictionChange = (prediction: Prediction, groupLetter: string) => {
    dispatch({
      type: "CHANGE_PREDICTION",
      payload: { ...prediction, saved: false },
    });
    dispatch({
      type: "EDIT_GROUP_SWITCH",
      payload: { groupLetter, switches: [], saved: false },
    });
    onEditPredictions();
  };

  const hasAllPredictions = useMemo(() => {
    return state.predictions.length === fixtures.length;
  }, [state.predictions, fixtures]);

  if (!teams || !fixtures || !state.predictions || !hasAllPredictions) {
    return (
      <div className="flex w-full items-center justify-center">
        <div>
          <Loading />
        </div>
        <p className="text-lg text-white">Loading Predictions ...</p>
      </div>
    );
  }

  return (
    <PredictionsPage
      teams={teams}
      fixtures={fixtures}
      predictions={state.predictions}
      username={username}
      onPredictionChange={onPredictionChange}
      isSavingPrediction={
        state.predictions.some((prediction) => prediction.saved === false) ||
        Object.values(state.groupSwitches).some(
          (groupSwitch) => groupSwitch.saved === false
        )
      }
      isError={isError}
      groupSwitches={state.groupSwitches}
      onGroupSwitchChange={onEditGroupSwitch}
      onEditBonusPlayer={onEditBonusPlayer}
      onEditBonusTeam={onEditBonusTeam}
      players={players}
    />
  );
};
