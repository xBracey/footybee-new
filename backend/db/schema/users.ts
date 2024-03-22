import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id"),
  username: text("username"),
  password: text("password"),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
