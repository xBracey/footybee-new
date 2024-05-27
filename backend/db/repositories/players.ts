import { eq } from "drizzle-orm";
import { db } from "..";
import { InsertPlayer, players } from "../schema";

export const getPlayers = () => db.select().from(players).execute();

export const getPlayer = async (id: number) => {
  const resp = await db
    .select()
    .from(players)
    .where(eq(players.id, id))
    .execute();
  return resp[0] ?? null;
};

export const insertPlayer = (player: InsertPlayer) => {
  return db.insert(players).values(player).execute();
};

export const editPlayer = (id: number, player: InsertPlayer) => {
  return db.update(players).set(player).where(eq(players.id, id)).execute();
};
