import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { groups } from "./groups";
import { rounds } from "./rounds";

export const teams = sqliteTable("teams", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  groupLetter: text("group_letter").references(() => groups.letter),
  roundExit: text("round_exit")
    .references(() => rounds.round)
    .default("Group Stages"),
});

export type Team = typeof teams.$inferSelect;
export type InsertTeam = typeof teams.$inferInsert;
