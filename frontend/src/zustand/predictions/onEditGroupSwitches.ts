import { GroupSwitches, PredictionState } from "./types";

export const onEditGroupSwitches = (
  state: PredictionState,
  payload: GroupSwitches
) => {
  return {
    ...state,
    groupSwitches: { ...state.groupSwitches, ...payload },
  };
};
