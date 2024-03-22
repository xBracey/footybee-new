import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const results = sqliteTable("results", {
  id: text("id"),
  fixtureId: text("fixture_id"),
  homeTeamScore: integer("home_team_score"),
  awayTeamScore: integer("away_team_score"),
});

export type Result = typeof results.$inferSelect;
export type InsertResult = typeof results.$inferInsert;
