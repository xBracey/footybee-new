import { eq } from "drizzle-orm";
import { db } from "..";
import { InsertTeam, teams } from "../schema";

export const getTeams = () => db.select().from(teams).execute();

export const getTeam = async (id: number) => {
  const resp = await db.select().from(teams).where(eq(teams.id, id)).execute();
  return resp.length ? resp[0] : null;
};

export const insertTeam = (team: InsertTeam) => {
  return db.insert(teams).values(team).execute();
};

export const editTeam = (id: number, team: InsertTeam) => {
  return db.update(teams).set(team).where(eq(teams.id, id)).execute();
};
