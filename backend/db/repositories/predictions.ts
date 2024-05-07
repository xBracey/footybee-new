import { and, eq } from "drizzle-orm";
import { db } from "..";
import { InsertPrediction, predictions } from "../schema";

export const getPredictions = () => db.select().from(predictions).execute();

export const insertPrediction = (prediction: InsertPrediction) => {
  return db.insert(predictions).values(prediction).execute();
};

export const insertPredictions = (predictionsRaw: InsertPrediction[]) => {
  return db.insert(predictions).values(predictionsRaw).execute();
};

export const editPrediction = (
  prediction: Omit<InsertPrediction, "username" | "fixtureId">,
  username: string,
  fixtureId: number
) => {
  return db
    .update(predictions)
    .set(prediction)
    .where(
      and(
        eq(predictions.username, username),
        eq(predictions.fixtureId, fixtureId)
      )
    )
    .execute();
};
