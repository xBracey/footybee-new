import { eq } from "drizzle-orm";
import { db } from "..";
import { InsertUserLeague, userLeagues } from "../schema";

export const getUserLeagues = () => db.select().from(userLeagues).all();

export const insertUserLeague = (userLeague: InsertUserLeague) => {
  return db.insert(userLeagues).values(userLeague).execute();
};

export const getLeagueUsers = (leagueId: string) => {
  return db
    .select()
    .from(userLeagues)
    .where(eq(userLeagues.leagueId, leagueId))
    .execute();
};
