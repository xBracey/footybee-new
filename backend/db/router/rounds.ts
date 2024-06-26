import { Router } from "./types";
import { getRoundsHandler } from "../services/rounds";

export const buildRoundsRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getRoundsHandler);
  done();
};
