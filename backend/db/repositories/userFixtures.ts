import { and, eq } from "drizzle-orm";
import { db } from "..";
import { userFixtures, userGroups } from "../schema";

export const getUserFixtures = () => db.select().from(userFixtures).execute();

export const getUserFixture = async (username: string, fixtureId: number) => {
  const resp = await db
    .select()
    .from(userGroups)
    .where(
      and(
        eq(userFixtures.username, username),
        eq(userFixtures.fixtureId, fixtureId)
      )
    )
    .execute();
  return resp.length ? resp[0] : null;
};

export const getUserFixturesByUsername = async (username: string) => {
  const resp = await db
    .select()
    .from(userFixtures)
    .where(eq(userFixtures.username, username))
    .execute();
  return resp;
};
