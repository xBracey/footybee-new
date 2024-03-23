import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { fixtures } from "./fixtures";
import { users } from "./users";

export const predictions = sqliteTable("predictions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").references(() => users.username),
  fixtureId: text("fixture_id").references(() => fixtures.id),
  homeTeamScore: integer("home_team_score"),
  awayTeamScore: integer("away_team_score"),
});

export type Prediction = typeof predictions.$inferSelect;
export type InsertPrediction = typeof predictions.$inferInsert;
