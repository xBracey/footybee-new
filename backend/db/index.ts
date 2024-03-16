import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { InsertUser, users } from "./users";

const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite);

export const getUsers = () => db.select().from(users).all();

export const insertUser = (user: InsertUser) => {
  return db.insert(users).values(user).run();
};
