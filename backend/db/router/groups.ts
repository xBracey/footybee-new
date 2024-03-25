import { Router } from "./types";
import { getGroupsHandler } from "../services/groups";

export const buildGroupsRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getGroupsHandler);
  done();
};
