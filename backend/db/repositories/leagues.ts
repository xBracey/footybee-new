import { db } from "..";
import { InsertLeague, leagues } from "../schema";

export const getLeagues = () => db.select().from(leagues).all();

export const insertLeague = (league: InsertLeague) => {
  return db.insert(leagues).values(league).execute();
};
