import { Router } from "./types";
import {
  getFixturesHandler,
  insertFixturesHandler,
} from "../services/fixtures";

export const buildFixturesRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getFixturesHandler);
  fastify.post("/", insertFixturesHandler);
  done();
};
