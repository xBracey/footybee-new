import { and, eq } from "drizzle-orm";
import { db } from "..";
import { leagues, userLeagues } from "../schema";

export const getLeague = async (id: string) => {
  const resp = await db
    .select()
    .from(leagues)
    .where(eq(leagues.id, id))
    .execute();
  return resp.length ? resp[0] : null;
};

export const getLeagueByPassword = async (id: string, password: string) => {
  return db
    .select()
    .from(leagues)
    .where(and(eq(leagues.id, id), eq(leagues.password, password)))
    .execute();
};

export const getLeagues = () => db.select().from(leagues).all();

export const getUserLeagues = (username: string) =>
  db
    .select()
    .from(leagues)
    .innerJoin(userLeagues, eq(leagues.id, userLeagues.leagueId))
    .where(eq(userLeagues.username, username))
    .execute();

export const insertLeague = async (league: {
  id: string;
  name: string;
  password: string;
  creatorUsername: string;
}) => {
  return db.insert(leagues).values(league).execute();
};
