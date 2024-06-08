import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { teams } from "./teams";
import { groups } from "./groups";

export const fixtures = sqliteTable("fixtures", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  groupLetter: text("group_letter").references(() => groups.letter),
  homeTeamId: integer("home_team_id").references(() => teams.id),
  awayTeamId: integer("away_team_id").references(() => teams.id),
  dateTime: integer("dateTime"),
  homeTeamScore: integer("home_team_score"),
  awayTeamScore: integer("away_team_score"),
});

export type Fixture = typeof fixtures.$inferSelect;
export type InsertFixture = typeof fixtures.$inferInsert;
