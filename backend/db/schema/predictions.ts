import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const predictions = sqliteTable("predictions", {
  id: text("id"),
  userId: text("user_id"),
  fixtureId: text("fixture_id"),
  homeTeamScore: integer("home_team_score"),
  awayTeamScore: integer("away_team_score"),
});

export type Prediction = typeof predictions.$inferSelect;
export type InsertPrediction = typeof predictions.$inferInsert;
