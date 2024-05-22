import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const leagues = sqliteTable("leagues", {
  id: text("id").primaryKey(),
  name: text("name"),
  password: text("password"),
  creatorUsername: text("creator_username").references(() => users.username),
});

export type League = typeof leagues.$inferSelect;
export type InsertLeague = typeof leagues.$inferInsert;
