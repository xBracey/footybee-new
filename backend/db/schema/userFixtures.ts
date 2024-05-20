import {
  text,
  sqliteTable,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { fixtures } from "./fixtures";
import { users } from "./users";

export const userFixtures = sqliteTable(
  "user_fixtures",
  {
    username: text("username").references(() => users.username),
    fixtureId: integer("fixture_id").references(() => fixtures.id),
    points: integer("points"),
  },
  (table) => {
    return {
      primaryKey: primaryKey({ columns: [table.username, table.fixtureId] }),
    };
  }
);

export type UserFixture = typeof userFixtures.$inferSelect;
export type InsertUserFixture = typeof userFixtures.$inferInsert;
