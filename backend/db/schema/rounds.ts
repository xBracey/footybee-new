import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const rounds = sqliteTable("rounds", {
  round: text("round").primaryKey(),
});

export type Round = typeof rounds.$inferSelect;
export type InsertRound = typeof rounds.$inferInsert;
