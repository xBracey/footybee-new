import { db } from "..";
import { InsertResult, results } from "../schema";

export const getResults = () => db.select().from(results).all();

export const insertResult = (result: InsertResult) => {
  return db.insert(results).values(result).run();
};
