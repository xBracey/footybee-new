import { Router } from "./types";
import {
  editPredictionHandler,
  getPredictionsHandler,
  insertPredictionHandler,
  insertPredictionsHandler,
} from "../services/predictions";

export const buildPredictionsRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getPredictionsHandler);
  fastify.post("/", insertPredictionsHandler);
  fastify.post("/:username/:fixtureId", insertPredictionHandler);
  fastify.put("/:username/:fixtureId", editPredictionHandler);
  done();
};
