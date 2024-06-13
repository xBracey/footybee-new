import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { InsertFixture, fixtures, predictions, userFixtures } from "../schema";
import { calculateFixturePoints } from "../points/calculateFixturePoints";

export const getFixtures = () => db.select().from(fixtures).execute();

export const getFixture = async (id: number) => {
  const resp = await db
    .select()
    .from(fixtures)
    .where(eq(fixtures.id, id))
    .execute();
  return resp.length ? resp[0] : null;
};

export const insertFixture = (fixture: InsertFixture) => {
  return db.insert(fixtures).values(fixture).execute();
};

export const editFixture = async (id: number, fixture: InsertFixture) => {
  await db.update(fixtures).set(fixture).where(eq(fixtures.id, id)).execute();

  const userPredictions = await db
    .select()
    .from(predictions)
    .where(eq(predictions.fixtureId, id))
    .execute();

  const newPoints = calculateFixturePoints({ ...fixture, id }, userPredictions);

  await db
    .insert(userFixtures)
    .values(newPoints)
    .onConflictDoUpdate({
      target: [userFixtures.username, userFixtures.fixtureId],
      set: { points: sql`excluded.points` },
    })
    .execute();
};
