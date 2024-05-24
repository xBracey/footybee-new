import { and, eq } from "drizzle-orm";
import { db } from "..";
import { leagues, userLeagues } from "../schema";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const getLeague = (id: string) =>
  db.select().from(leagues).where(eq(leagues.id, id)).execute();

export const getLeagueByPassword = async (id: string, password: string) => {
  const hashedpassword = await bcrypt.hash(password, saltRounds);

  return db
    .select()
    .from(leagues)
    .where(and(eq(leagues.id, id), eq(leagues.password, hashedpassword)))
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
  const hashedpassword = await bcrypt.hash(league.password, saltRounds);

  return db
    .insert(leagues)
    .values({
      ...league,
      password: hashedpassword,
    })
    .execute();
};
