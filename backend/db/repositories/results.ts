import { db } from "..";
import { InsertResult, results } from "../schema";

export const getResults = () => db.select().from(results).execute();

export const insertResult = (result: InsertResult) => {
  return db.insert(results).values(result).execute();
};
