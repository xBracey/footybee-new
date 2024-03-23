import { text, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";

export const userLeagues = sqliteTable(
  "user_leagues",
  {
    username: text("username"),
    leagueId: text("league_id"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.username, table.leagueId] }),
  })
);

export type UserLeague = typeof userLeagues.$inferSelect;
export type InsertUserLeague = typeof userLeagues.$inferInsert;
