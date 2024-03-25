import { db } from "..";
import { InsertTeam, teams } from "../schema";

export const getTeams = () => db.select().from(teams).execute();

export const insertTeam = (team: InsertTeam) => {
  return db.insert(teams).values(team).execute();
};
