import { and, eq, sql } from "drizzle-orm";
import { db } from "..";
import { InsertUserGroup, userGroups } from "../schema";

export const getUserGroups = () => db.select().from(userGroups).execute();

export const getUserGroup = async (username: string, groupLetter: string) => {
  const resp = await db
    .select()
    .from(userGroups)
    .where(
      and(
        eq(userGroups.username, username),
        eq(userGroups.groupLetter, groupLetter)
      )
    )
    .execute();
  return resp.length ? resp[0] : null;
};

export const getUserGroupsByUsername = async (username: string) => {
  const resp = await db
    .select()
    .from(userGroups)
    .where(eq(userGroups.username, username))
    .execute();
  return resp;
};

export const insertUserGroup = (userGroup: InsertUserGroup) => {
  return db.insert(userGroups).values(userGroup).execute();
};

export const insertUserGroups = (userGroupsRaw: InsertUserGroup[]) => {
  return db
    .insert(userGroups)
    .values(userGroupsRaw)
    .onConflictDoUpdate({
      target: [userGroups.username, userGroups.groupLetter],
      set: { switches: sql`excluded.switches` },
    })
    .execute();
};
