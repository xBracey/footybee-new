import {
  getPredictionsByUsername,
  insertPredictions,
} from "../repositories/predictions";
import { InsertPrediction } from "../schema";
import { ServiceHandler } from "./types";

export const getPredictionsHandler: ServiceHandler = async (req, reply) => {
  const { username } = req.params as { username: string };

  const predictions = await getPredictionsByUsername(username);

  reply.send(predictions);
};

export const insertPredictionsHandler: ServiceHandler = async (req, reply) => {
  const { username } = req.params as { username: string };

  const predictions = req.body as InsertPrediction[];

  await insertPredictions(username, predictions);

  reply.send(predictions.map((prediction) => ({ ...prediction, username })));
};
