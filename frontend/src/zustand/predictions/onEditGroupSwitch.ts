import { PredictionState } from "./types";

export const onEditGroupSwitch = (
  state: PredictionState,
  payload: { groupLetter: string; switches: number[]; saved: boolean }
): PredictionState => {
  const lastTwoSwitches = payload.switches.slice(-2);

  if (lastTwoSwitches.length === 2) {
    if (lastTwoSwitches[0] === lastTwoSwitches[1]) {
      return {
        ...state,
        groupSwitches: {
          ...state.groupSwitches,
          [payload.groupLetter]: {
            switches: payload.switches.slice(0, payload.switches.length - 2),
            saved: payload.saved,
          },
        },
      };
    }
  }

  return {
    ...state,
    groupSwitches: {
      ...state.groupSwitches,
      [payload.groupLetter]: {
        switches: payload.switches,
        saved: payload.saved,
      },
    },
  };
};
