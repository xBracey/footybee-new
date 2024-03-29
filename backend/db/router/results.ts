import { Router } from "./types";
import { getResultsHandler } from "../services/results";

export const buildResultsRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getResultsHandler);
  done();
};
