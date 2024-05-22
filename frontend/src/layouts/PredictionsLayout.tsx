import { useGetPredictions } from "../queries/useGetPredictions";
import { useEditPredictions } from "../queries/useEditPredictions";
import {
  Fixture,
  Prediction,
  Team,
  UserGroup,
} from "../../../shared/types/database";
import { usePredictionStore } from "../zustand/predictions";
import { PredictionsPage } from "../pages/Predictions";
import Loading from "../components/Loading";
import { useCallback, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useEditUserGroups } from "../queries/useEditUserGroups";
import { useGetUserGroups } from "../queries/useGetUserGroups";

interface PredictionsLayoutProps {
  username: string;
  teams: Team[];
  fixtures: Fixture[];
}

export const PredictionsLayout = ({
  username,
  teams,
  fixtures,
}: PredictionsLayoutProps) => {
  const [firstPredictionLoad, setFirstPredictionLoad] = useState(false);
  const [firstGroupSwitchLoad, setFirstGroupSwitchLoad] = useState(false);

  const { state, dispatch } = usePredictionStore();

  const onInitPredictionsSuccess = (data: Prediction[]) => {
    dispatch({
      type: "ADD_PREDICTIONS",
      payload: data.map((prediction) => ({ ...prediction, saved: true })),
    });
  };

  const { editPredictions: initPredictions } = useEditPredictions(
    onInitPredictionsSuccess
  );

  const onEditUserGroupsSuccess = (data: UserGroup[]) => {
    dispatch({
      type: "EDIT_GROUP_SWITCHES",
      payload: Object.fromEntries(
        data.map((userGroup) => [
          userGroup.groupLetter,
          {
            switches: userGroup.switches,
            saved: true,
          },
        ])
      ),
    });
  };

  const { editUserGroups: editGroupSwitches } = useEditUserGroups(
    onEditUserGroupsSuccess
  );

  const onEditGroupSwitches = useDebouncedCallback(
    useCallback(() => {
      const localGroupSwitches = Object.entries(state.groupSwitches)
        .filter(([_, groupSwitch]) => groupSwitch.saved === false)
        .map(([groupLetter, groupSwitch]) => ({
          groupLetter,
          switches: groupSwitch.switches,
        }));

      editGroupSwitches(localGroupSwitches);
    }, [state.groupSwitches, editGroupSwitches]),
    2000
  );

  const onEditGroupSwitch = (groupLetter: string, switches: number[]) => {
    dispatch({
      type: "EDIT_GROUP_SWITCH",
      payload: { groupLetter, switches, saved: false },
    });
    onEditGroupSwitches();
  };

  const onPredictionSuccess = (predictions: Prediction[]) => {
    if (firstPredictionLoad) {
      return;
    }

    setFirstPredictionLoad(true);

    dispatch({ type: "SET_PREDICTIONS", payload: predictions });

    const fixturesWithNoPredictions = fixtures.filter((fixture) => {
      return !predictions.some(
        (prediction) => prediction.fixtureId === fixture.id
      );
    });

    if (fixturesWithNoPredictions.length > 0) {
      initPredictions(
        fixturesWithNoPredictions.map((fixture) => ({
          fixtureId: fixture.id,
          username,
          homeTeamScore: 0,
          awayTeamScore: 0,
          saved: false,
        }))
      );
    }
  };

  const onUserGroupsSuccess = (data: UserGroup[]) => {
    if (firstGroupSwitchLoad) {
      return;
    }

    setFirstGroupSwitchLoad(true);

    dispatch({
      type: "EDIT_GROUP_SWITCHES",
      payload: Object.fromEntries(
        data.map((userGroup) => [
          userGroup.groupLetter,
          {
            switches: userGroup.switches,
            saved: true,
          },
        ])
      ),
    });
  };

  useGetPredictions(username, onPredictionSuccess);
  useGetUserGroups(username, onUserGroupsSuccess);

  const onEditPredictionsSuccess = (data: Prediction[]) => {
    dispatch({
      type: "CHANGE_PREDICTIONS",
      payload: data.map((prediction) => ({ ...prediction, saved: true })),
    });
  };

  const { editPredictions, isError } = useEditPredictions(
    onEditPredictionsSuccess
  );

  const onEditPredictions = useDebouncedCallback(
    useCallback(() => {
      const localPredictions = state.predictions.filter(
        (prediction) => prediction.saved === false
      );
      const localGroupSwitches = Object.entries(state.groupSwitches)
        .filter(([_, groupSwitch]) => groupSwitch.saved === false)
        .map(([groupLetter, groupSwitch]) => ({
          groupLetter,
          switches: groupSwitch.switches,
        }));

      editPredictions(localPredictions);
      editGroupSwitches(localGroupSwitches);
    }, [state.predictions, editPredictions, editGroupSwitches]),
    2000
  );

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
    />
  );
};
