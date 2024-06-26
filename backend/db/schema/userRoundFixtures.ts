import {
  text,
  sqliteTable,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { roundFixtures } from "./roundFixtures";

export const userRoundFixtures = sqliteTable(
  "user_round_fixtures",
  {
    username: text("username").references(() => users.username),
    roundFixtureId: integer("round_fixture_id").references(
      () => roundFixtures.id
    ),
    points: integer("points"),
  },
  (table) => {
    return {
      primaryKey: primaryKey({
        columns: [table.username, table.roundFixtureId],
      }),
    };
  }
);

export type UserRoundFixture = typeof userRoundFixtures.$inferSelect;
export type InsertUserRoundFixture = typeof userRoundFixtures.$inferInsert;
