import { Router } from "./types";
import {
  getFixtureHandler,
  getFixturesHandler,
  insertFixturesHandler,
} from "../services/fixtures";

export const buildFixturesRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getFixturesHandler);
  fastify.post("/", insertFixturesHandler);
  fastify.get("/:id", getFixtureHandler);
  done();
};
