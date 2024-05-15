import { Prediction } from "../../../../shared/types/database";

export type PredictionWithSaved = Prediction & {
  saved: boolean;
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
  payload: { groupLetter: string; switches: number[] };
};

export interface PredictionState {
  predictions: (Prediction & { saved: boolean })[];
  groupSwitches: { [groupLetter: string]: number[] };
}

export type PredictionActions =
  | SetPredictions
  | ChangePredictions
  | ChangePrediction
  | AddPredictions
  | EditGroupSwitch;
