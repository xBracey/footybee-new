import { Router } from "./types";
import {
  getTeamHandler,
  getTeamsHandler,
  insertTeamsHandler,
} from "../services/teams";

export const buildTeamsRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getTeamsHandler);
  fastify.post("/", insertTeamsHandler);
  fastify.get("/:id", getTeamHandler);
  done();
};
