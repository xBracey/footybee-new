import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const points = sqliteTable("points", {
  id: text("id"),
  userId: text("user_id"),
  fixtureId: text("fixture_id"),
  points: integer("points"),
});

export type Point = typeof points.$inferSelect;
export type InsertPoint = typeof points.$inferInsert;
