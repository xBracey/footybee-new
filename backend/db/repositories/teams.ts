import { eq } from "drizzle-orm";
import { db } from "..";
import { InsertTeam, teams } from "../schema";

export const getTeams = () => db.select().from(teams).execute();

export const getTeam = (id: number) =>
  db.select().from(teams).where(eq(teams.id, id)).execute();

export const insertTeam = (team: InsertTeam) => {
  return db.insert(teams).values(team).execute();
};
