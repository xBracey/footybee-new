import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const groups = sqliteTable("groups", {
  letter: text("letter").primaryKey(),
});

export type Group = typeof groups.$inferSelect;
export type InsertGroup = typeof groups.$inferInsert;
