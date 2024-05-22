import { Router } from "./types";
import {
  getPredictionsHandler,
  insertPredictionsHandler,
} from "../services/predictions";

export const buildPredictionsRoutes: Router = (fastify, _, done) => {
  fastify.get("/:username", getPredictionsHandler);
  fastify.post("/", insertPredictionsHandler(fastify));
  done();
};
