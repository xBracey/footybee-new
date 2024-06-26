import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { InsertRoundFixture, roundFixtures } from "../schema";

export const getRoundFixtures = () => db.select().from(roundFixtures).execute();

export const getRoundFixture = async (id: number) => {
  const resp = await db
    .select()
    .from(roundFixtures)
    .where(eq(roundFixtures.id, id))
    .execute();
  return resp.length ? resp[0] : null;
};

export const insertRoundFixture = (roundfixture: InsertRoundFixture) => {
  return db.insert(roundFixtures).values(roundfixture).execute();
};

export const editRoundFixture = async (
  id: number,
  roundfixture: InsertRoundFixture
) => {
  await db
    .update(roundFixtures)
    .set(roundfixture)
    .where(eq(roundFixtures.id, id))
    .execute();

  // Add points for team
};
