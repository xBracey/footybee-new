import { Prediction } from "../../../../shared/types/database";

export type PredictionWithSaved = Prediction & {
  saved: boolean;
};

export type GroupSwitches = {
  [groupLetter: string]: {
    switches: number[];
    saved: boolean;
  };
};

export type SetPredictions = {
  type: "SET_PREDICTIONS";
  payload: Prediction[];
};

export type ChangePredictions = {
  type: "CHANGE_PREDICTIONS";
  payload: PredictionWithSaved[];
};

export type ChangePrediction = {
  type: "CHANGE_PREDICTION";
  payload: PredictionWithSaved;
};

export type AddPredictions = {
  type: "ADD_PREDICTIONS";
  payload: PredictionWithSaved[];
};

export type EditGroupSwitch = {
  type: "EDIT_GROUP_SWITCH";
  payload: { groupLetter: string; switches: number[]; saved: boolean };
};

export type EditGroupSwitches = {
  type: "EDIT_GROUP_SWITCHES";
  payload: GroupSwitches;
};

export type EditBonuses = {
  type: "EDIT_BONUSES";
  payload: {
    playerId?: number;
    teamId?: number;
    saved: boolean;
  };
};

export interface PredictionState {
  predictions: (Prediction & { saved: boolean })[];
  groupSwitches: GroupSwitches;
  bonuses: {
    playerId?: number;
    teamId?: number;
    saved: boolean;
  };
}

export type PredictionActions =
  | SetPredictions
  | ChangePredictions
  | ChangePrediction
  | AddPredictions
  | EditGroupSwitch
  | EditGroupSwitches
  | EditBonuses;
