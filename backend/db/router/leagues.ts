import { Router } from "./types";
import {
  addLeagueHandler,
  getUserLeaguesHandler,
  joinLeagueHandler,
} from "../services/leagues";

export const buildLeaguesRoutes: Router = (fastify, _, done) => {
  fastify.post("/", addLeagueHandler(fastify));
  fastify.get("/", getUserLeaguesHandler(fastify));
  fastify.post("/join", joinLeagueHandler(fastify));
  done();
};
