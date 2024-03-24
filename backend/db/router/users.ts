import { getUsers } from "../repositories";
import {
  getMeHandler,
  getUserHandler,
  loginUserHandler,
  registerUserHandler,
} from "../services/users";
import { Router } from "./types";

export const buildUserRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getUsers);
  fastify.get("/:id", getUserHandler);
  fastify.get("/me", getMeHandler(fastify));
  fastify.post("/register", registerUserHandler(fastify));
  fastify.post("/login", loginUserHandler(fastify));
  done();
};
