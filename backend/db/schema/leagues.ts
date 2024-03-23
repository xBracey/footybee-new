import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const leagues = sqliteTable("leagues", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  creatorusername: text("creator_user_id").references(() => users.username),
});

export type League = typeof leagues.$inferSelect;
export type InsertLeague = typeof leagues.$inferInsert;
