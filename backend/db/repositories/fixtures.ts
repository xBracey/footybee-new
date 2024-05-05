import { eq } from "drizzle-orm";
import { db } from "..";
import { InsertFixture, fixtures } from "../schema";

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

export const editFixture = (id: number, fixture: InsertFixture) => {
  return db.update(fixtures).set(fixture).where(eq(fixtures.id, id)).execute();
};
