import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const leagues = sqliteTable("leagues", {
  id: text("id"),
  name: text("name"),
  creatorUserId: text("creator_user_id"),
});

export type League = typeof leagues.$inferSelect;
export type InsertLeague = typeof leagues.$inferInsert;
