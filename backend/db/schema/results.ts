import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { fixtures } from "./fixtures";

export const results = sqliteTable("results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fixtureId: integer("fixture_id").references(() => fixtures.id),
  homeTeamScore: integer("home_team_score"),
  awayTeamScore: integer("away_team_score"),
});

export type Result = typeof results.$inferSelect;
export type InsertResult = typeof results.$inferInsert;
