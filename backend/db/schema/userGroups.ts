import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { groups } from "./groups";
import { users } from "./users";

export const userGroups = sqliteTable(
  "user_groups",
  {
    username: text("username").references(() => users.username),
    groupLetter: text("group_letter").references(() => groups.letter),
    switches: text("switches", { mode: "json" }).$type<number[]>().default([]),
    points: integer("points"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.username, table.groupLetter] }),
  })
);

export type UserGroup = typeof userGroups.$inferSelect;
export type InsertUserGroup = typeof userGroups.$inferInsert;
