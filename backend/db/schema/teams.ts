import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const teams = sqliteTable("teams", {
  id: text("id"),
  name: text("name"),
});

export type Team = typeof teams.$inferSelect;
export type InsertTeam = typeof teams.$inferInsert;
