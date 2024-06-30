import { eq, or, sql } from "drizzle-orm";
import { db } from "..";
import { InsertRoundFixture, roundFixtures, userTeams } from "../schema";
import { calculateRoundFixturePoints } from "../points/calculateRoundFixturePoints";

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
  roundFixture: InsertRoundFixture
) => {
  await db
    .update(roundFixtures)
    .set(roundFixture)
    .where(eq(roundFixtures.id, id))
    .execute();

  const userTeamsData = await db
    .select()
    .from(userTeams)
    .where(
      or(
        eq(userTeams.teamId, roundFixture.homeTeamId!),
        eq(userTeams.teamId, roundFixture.awayTeamId!)
      )
    )
    .execute();

  const newPoints = calculateRoundFixturePoints(
    { ...roundFixture, id },
    userTeamsData
  ).filter((point) => point.points !== false) as {
    username: string;
    teamId: number;
    points: number;
  }[];

  await db
    .insert(userTeams)
    .values(newPoints)
    .onConflictDoUpdate({
      target: [userTeams.username, userTeams.teamId],
      set: { points: sql`excluded.points` },
    })
    .execute();
};
