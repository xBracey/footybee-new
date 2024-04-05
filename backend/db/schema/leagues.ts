import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const leagues = sqliteTable("leagues", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  creatorUsername: text("creator_username").references(() => users.username),
});

export type League = typeof leagues.$inferSelect;
export type InsertLeague = typeof leagues.$inferInsert;
