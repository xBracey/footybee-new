import {
  editMyBonuses,
  editUserHandler,
  getMeHandler,
  getUserHandler,
  getUsersHandler,
  loginUserHandler,
  registerUserHandler,
} from "../services/users";
import { Router } from "./types";

export const buildUserRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getUsersHandler);
  fastify.get("/:username", getUserHandler);
  fastify.get("/me", getMeHandler(fastify));
  fastify.put("/me/bonuses", editMyBonuses(fastify));
  fastify.post("/register", registerUserHandler(fastify));
  fastify.post("/login", loginUserHandler(fastify));
  fastify.put("/:username", editUserHandler);
  done();
};
