import { FastifyInstance } from "fastify";
import {
  getPredictionsByUsername,
  insertPredictions,
} from "../repositories/predictions";
import { InsertPrediction } from "../schema";
import { ServiceHandler } from "./types";
import { tokenToUser } from "./utils";

export const getPredictionsHandler: ServiceHandler = async (req, reply) => {
  const { username } = req.params as { username: string };

  const predictions = await getPredictionsByUsername(username);

  reply.send(predictions);
};

export const insertPredictionsHandler: (
  server: FastifyInstance
) => ServiceHandler = (server) => async (req, reply) => {
  const userDecoded = await tokenToUser(server, req, reply);

  if (!userDecoded) {
    return;
  }

  const { username } = userDecoded;

  const predictions = req.body as InsertPrediction[];

  await insertPredictions(username, predictions);

  reply.send(predictions.map((prediction) => ({ ...prediction, username })));
};
