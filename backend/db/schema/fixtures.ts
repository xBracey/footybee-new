import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { teams } from "./teams";
import { groups } from "./groups";

export const fixtures = sqliteTable("fixtures", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  groupLetter: text("group_letter").references(() => groups.letter),
  homeTeamId: text("home_team_id").references(() => teams.id),
  awayTeamId: text("away_team_id").references(() => teams.id),
  date: integer("date"),
  time: integer("time"),
});

export type Fixture = typeof fixtures.$inferSelect;
export type InsertFixture = typeof fixtures.$inferInsert;
