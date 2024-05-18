import { and, eq, sql } from "drizzle-orm";
import { db } from "..";
import { InsertPrediction, predictions } from "../schema";

export const getPredictionsByUsername = (username: string) =>
  db
    .select()
    .from(predictions)
    .where(eq(predictions.username, username))
    .execute();

export const insertPrediction = (prediction: InsertPrediction) => {
  return db.insert(predictions).values(prediction).execute();
};

export const insertPredictions = (
  username: string,
  predictionsRaw: InsertPrediction[]
) => {
  return db
    .insert(predictions)
    .values(predictionsRaw.map((prediction) => ({ ...prediction, username })))
    .onConflictDoUpdate({
      target: [predictions.fixtureId, predictions.username],
      set: {
        homeTeamScore: sql`excluded.home_team_score`,
        awayTeamScore: sql`excluded.away_team_score`,
      },
    })
    .execute();
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
