import { Router } from "./types";
import { buildUserRoutes } from "./users";
import { buildTeamsRoutes } from "./teams";
import { buildGroupsRoutes } from "./groups";
import { buildFixturesRoutes } from "./fixtures";
import { buildResultsRoutes } from "./results";

export const buildApiRoutes: Router = (fastify, _, done) => {
  fastify.register(buildUserRoutes, { prefix: "/users" });
  fastify.register(buildTeamsRoutes, { prefix: "/teams" });
  fastify.register(buildGroupsRoutes, { prefix: "/groups" });
  fastify.register(buildFixturesRoutes, { prefix: "/fixtures" });
  fastify.register(buildResultsRoutes, { prefix: "/results" });
  done();
};
