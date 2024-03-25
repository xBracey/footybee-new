import { Router } from "./types";
import { buildUserRoutes } from "./users";
import { buildTeamsRoutes } from "./teams";

export const buildApiRoutes: Router = (fastify, _, done) => {
  fastify.register(buildUserRoutes, { prefix: "/users" });
  fastify.register(buildTeamsRoutes, { prefix: "/teams" });
  done();
};
