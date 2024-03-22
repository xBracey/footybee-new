import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";
import { InsertUser } from "../schema/users";

export const getUsers = () => db.select().from(users).all();

export const getUser = (id: string) => {
  return db.select().from(users).where(eq(users.id, id)).run();
};

export const insertUser = (user: InsertUser) => {
  return db.insert(users).values(user).run();
};
