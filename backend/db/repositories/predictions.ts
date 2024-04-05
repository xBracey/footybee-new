import { db } from "..";
import { InsertPrediction, predictions } from "../schema";

export const getPredictions = () => db.select().from(predictions).execute();

export const insertPrediction = (prediction: InsertPrediction) => {
  return db.insert(predictions).values(prediction).execute();
};
