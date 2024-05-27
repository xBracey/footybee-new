import { Router } from "./types";
import {
  editPlayerHandler,
  getPlayerHandler,
  getPlayersHandler,
  insertPlayersHandler,
} from "../services/players";

export const buildPlayersRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getPlayersHandler);
  fastify.get("/:id", getPlayerHandler);
  fastify.post("/", insertPlayersHandler);
  fastify.put("/:id", editPlayerHandler);
  done();
};
