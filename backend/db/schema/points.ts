import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { fixtures } from "./fixtures";
import { users } from "./users";

export const points = sqliteTable("points", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").references(() => users.username),
  fixtureId: integer("fixture_id").references(() => fixtures.id),
  points: integer("points"),
});

export type Point = typeof points.$inferSelect;
export type InsertPoint = typeof points.$inferInsert;
