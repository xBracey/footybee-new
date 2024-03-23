import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const teams = sqliteTable("teams", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
});

export type Team = typeof teams.$inferSelect;
export type InsertTeam = typeof teams.$inferInsert;
