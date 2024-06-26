import { Router } from "./types";
import {
  editRoundFixtureHandler,
  getRoundFixtureHandler,
  getRoundFixturesHandler,
  insertRoundFixturesHandler,
} from "../services/roundFixtures";

export const buildRoundFixturesRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getRoundFixturesHandler);
  fastify.post("/", insertRoundFixturesHandler);
  fastify.get("/:id", getRoundFixtureHandler);
  fastify.put("/:id", editRoundFixtureHandler);
  done();
};
