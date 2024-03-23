import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { db } from "..";
import { InsertPrediction, predictions } from "../schema";

export const getPredictions = () => db.select().from(predictions).all();

export const insertPrediction = (prediction: InsertPrediction) => {
  return db.insert(predictions).values(prediction).execute();
};
