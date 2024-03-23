import { getUsers } from "../repositories";
import {
  getUserHandler,
  loginUserHandler,
  registerUserHandler,
} from "../services/users";
import { Router } from "./types";

export const buildUserRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getUsers);
  fastify.get("/:id", getUserHandler);
  fastify.post("/register", registerUserHandler(fastify));
  fastify.post("/login", loginUserHandler(fastify));
  done();
};
