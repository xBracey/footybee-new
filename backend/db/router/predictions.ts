import { Router } from "./types";
import { getPredictionsHandler } from "../services/predictions";

export const buildPredictionsRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getPredictionsHandler);
  done();
};
