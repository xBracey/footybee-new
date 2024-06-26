import { db } from "..";
import { rounds } from "../schema";

export const getRounds = () => db.select().from(rounds).execute();
