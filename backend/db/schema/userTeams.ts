import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { teams } from "./teams";
import { rounds } from "./rounds";

export const userTeams = sqliteTable(
  "user_teams",
  {
    username: text("username").references(() => users.username),
    teamId: integer("team_id").references(() => teams.id),
    roundPredictions: text("round_predictions").references(() => rounds.round),
    points: integer("points").default(0),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.username, table.teamId] }),
  })
);

export type UserTeam = typeof userTeams.$inferSelect;
export type InsertUserTeam = typeof userTeams.$inferInsert;
