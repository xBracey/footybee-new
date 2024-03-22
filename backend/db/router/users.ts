import { FastifyInstance } from "fastify";
import { getUsers } from "../repositories";

export const buildUserRoutes = (
  fastify: FastifyInstance,
  opts: { prefix: string },
  done: (err?: Error | undefined) => void
) => {
  fastify.get("/users", getUsers);
};
