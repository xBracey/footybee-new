import {
  text,
  sqliteTable,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { fixtures } from "./fixtures";
import { users } from "./users";

export const predictions = sqliteTable(
  "predictions",
  {
    username: text("username").references(() => users.username),
    fixtureId: integer("fixture_id").references(() => fixtures.id),
    homeTeamScore: integer("home_team_score"),
    awayTeamScore: integer("away_team_score"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.username, table.fixtureId] }),
  })
);

export type Prediction = typeof predictions.$inferSelect;
export type InsertPrediction = typeof predictions.$inferInsert;
