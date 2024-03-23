import { db } from "..";
import { InsertPoint, points } from "../schema";

export const getPoints = () => db.select().from(points).all();

export const insertPoint = (point: InsertPoint) => {
  return db.insert(points).values(point).execute();
};
