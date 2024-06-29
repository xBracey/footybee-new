import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { teams } from "./teams";
import { rounds } from "./rounds";

export const roundFixtures = sqliteTable("roundFixtures", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  round: text("round").references(() => rounds.round),
  homeTeamId: integer("home_team_id").references(() => teams.id),
  awayTeamId: integer("away_team_id").references(() => teams.id),
  dateTime: integer("dateTime"),
  homeTeamScore: integer("home_team_score"),
  awayTeamScore: integer("away_team_score"),
  homeTeamExtraTimeScore: integer("home_team_extra_time_score"),
  awayTeamExtraTimeScore: integer("away_team_extra_time_score"),
  homeTeamPenaltiesScore: integer("home_team_penalties_score"),
  awayTeamPenaltiesScore: integer("away_team_penalties_score"),
  order: integer("order"),
});

export type RoundFixture = typeof roundFixtures.$inferSelect;
export type InsertRoundFixture = typeof roundFixtures.$inferInsert;
