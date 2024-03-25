import { Router } from "./types";
import { getTeamsHandler, insertTeamsHandler } from "../services/teams";

export const buildTeamsRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getTeamsHandler);
  fastify.post("/", insertTeamsHandler);
  done();
};
