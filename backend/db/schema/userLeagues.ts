import { text, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { leagues } from "./leagues";
import { users } from "./users";

export const userLeagues = sqliteTable(
  "user_leagues",
  {
    username: text("username").references(() => users.username),
    leagueId: text("league_id").references(() => leagues.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.username, table.leagueId] }),
  })
);

export type UserLeague = typeof userLeagues.$inferSelect;
export type InsertUserLeague = typeof userLeagues.$inferInsert;
