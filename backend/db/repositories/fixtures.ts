import { eq } from "drizzle-orm";
import { db } from "..";
import { InsertFixture, fixtures } from "../schema";

export const getFixtures = () => db.select().from(fixtures).execute();

export const getFixture = (id: number) =>
  db.select().from(fixtures).where(eq(fixtures.id, id)).execute();

export const insertFixture = (fixture: InsertFixture) => {
  return db.insert(fixtures).values(fixture).execute();
};
