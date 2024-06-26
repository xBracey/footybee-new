import { and, eq, sql } from "drizzle-orm";
import { db } from "..";
import { InsertUserTeam, userTeams } from "../schema";

export const getUserTeams = () => db.select().from(userTeams).execute();

export const getUserTeam = async (username: string, teamId: number) => {
  const resp = await db
    .select()
    .from(userTeams)
    .where(and(eq(userTeams.username, username), eq(userTeams.teamId, teamId)))
    .execute();
  return resp.length ? resp[0] : null;
};

export const getUserTeamsByUsername = async (username: string) => {
  const resp = await db
    .select()
    .from(userTeams)
    .where(eq(userTeams.username, username))
    .execute();
  return resp;
};

export const insertUserTeam = (userTeam: InsertUserTeam) => {
  return db.insert(userTeams).values(userTeam).execute();
};

export const insertUserTeams = (userTeamsRaw: InsertUserTeam[]) => {
  return db
    .insert(userTeams)
    .values(userTeamsRaw)
    .onConflictDoUpdate({
      target: [userTeams.username, userTeams.teamId],
      set: { roundPredictions: sql`excluded.round_predictions` },
    })
    .execute();
};
