import { PredictionState } from "./types";

export const onEditBonuses = (
  state: PredictionState,
  payload: {
    playerId?: number;
    teamId?: number;
    saved: boolean;
  }
): PredictionState => {
  if (payload.playerId && payload.teamId) {
    return {
      ...state,
      bonuses: {
        saved: payload.saved,
        playerId: payload.playerId,
        teamId: payload.teamId,
      },
    };
  }
  if (payload.playerId) {
    return {
      ...state,
      bonuses: {
        ...state.bonuses,
        playerId: payload.playerId,
        saved: payload.saved,
      },
    };
  }
  if (payload.teamId) {
    return {
      ...state,
      bonuses: {
        ...state.bonuses,
        teamId: payload.teamId,
        saved: payload.saved,
      },
    };
  }
  return state;
};
