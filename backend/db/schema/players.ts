import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { teams } from "./teams";

export const players = sqliteTable("players", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  teamId: integer("team_id").references(() => teams.id),
});

export type Player = typeof players.$inferSelect;
export type InsertPlayer = typeof players.$inferInsert;
