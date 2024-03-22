import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const fixtures = sqliteTable("fixtures", {
  id: text("id"),
  homeTeamId: text("home_team_id"),
  awayTeamId: text("away_team_id"),
  date: integer("date"),
  time: integer("time"),
});

export type Fixture = typeof fixtures.$inferSelect;
export type InsertFixture = typeof fixtures.$inferInsert;
