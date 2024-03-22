import { db } from "..";
import { InsertUserLeague, userLeagues } from "../schema";

export const getUserLeagues = () => db.select().from(userLeagues).all();

export const insertUserLeague = (userLeague: InsertUserLeague) => {
  return db.insert(userLeagues).values(userLeague).run();
};
