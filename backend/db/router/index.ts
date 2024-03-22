import { FastifyInstance } from "fastify";
import { buildUserRoutes } from "./users";

export const buildApiRoutes = (
  fastify: FastifyInstance,
  opts: { prefix: string },
  done: (err?: Error | undefined) => void
) => {
  fastify.register(buildUserRoutes, { prefix: "/users" });
};
