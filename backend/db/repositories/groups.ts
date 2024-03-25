import { db } from "..";
import { groups } from "../schema";

export const getGroups = () => db.select().from(groups).execute();
