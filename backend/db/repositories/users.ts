import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";
import { InsertUser } from "../schema/users";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const getUsers = () => db.select().from(users).execute();

export const getUser = async (username: string) => {
  const resp = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .execute();

  if (resp.length === 0) return null;

  return {
    username: resp[0].username,
    password: resp[0].password,
    admin: !!resp[0].admin,
    bonusPlayerId: resp[0].bonusPlayerId,
    bonusTeamId: resp[0].bonusTeamId,
  };
};

export const insertUser = async (user: InsertUser) => {
  // hash password
  const password = await bcrypt.hash(user.password, saltRounds);

  return db
    .insert(users)
    .values({ ...user, password })
    .execute();
};

export const editUser = (username: string, admin: boolean) => {
  return db
    .update(users)
    .set({ admin: admin ? 1 : 0 })
    .where(eq(users.username, username))
    .execute();
};

export const editUserBonuses = (
  username: string,
  bonusPlayerId: number,
  bonusTeamId: number
) => {
  return db
    .update(users)
    .set({ bonusPlayerId, bonusTeamId })
    .where(eq(users.username, username))
    .execute();
};
