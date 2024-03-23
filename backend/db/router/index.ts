import { buildUserRoutes } from "./users";
import { Router } from "./types";

export const buildApiRoutes: Router = (fastify, _, done) => {
  fastify.register(buildUserRoutes, { prefix: "/users" });
  done();
};
