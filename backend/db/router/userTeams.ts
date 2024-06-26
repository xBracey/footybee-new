import { Router } from "./types";
import {
  getUserTeamsByUsernameHandler,
  insertUserTeamsHandler,
} from "../services/userTeams";

export const buildUserTeamsRoutes: Router = (fastify, _, done) => {
  fastify.get("/:username", getUserTeamsByUsernameHandler);
  fastify.post("/", insertUserTeamsHandler(fastify));
  done();
};
