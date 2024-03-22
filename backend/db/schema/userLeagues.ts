import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const userLeagues = sqliteTable("user_leagues", {
  id: text("id"),
  userId: text("user_id"),
  leagueId: text("league_id"),
});

export type UserLeague = typeof userLeagues.$inferSelect;
export type InsertUserLeague = typeof userLeagues.$inferInsert;
