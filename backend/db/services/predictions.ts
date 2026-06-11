import { FastifyInstance } from "fastify";
import {
  getPredictionsByUsername,
  insertPredictions,
} from "../repositories/predictions";
import { InsertPrediction } from "../schema";
import { ServiceHandler } from "./types";
import { tokenToUser } from "./utils";
import { isPredictionLocked } from "../../../shared/config";

export const getPredictionsHandler: ServiceHandler = async (req, reply) => {
  const { username } = req.params as { username: string };

  const predictions = await getPredictionsByUsername(username);

  reply.send(
    predictions.map((p) => ({
      ...p,
      fixtureId: parseInt(p.fixtureId?.toString() ?? "0"),
    }))
  );
};

export const insertPredictionsHandler: (
  server: FastifyInstance
) => ServiceHandler = (server) => async (req, reply) => {
  const userDecoded = await tokenToUser(server, req, reply);

  if (!userDecoded) {
    return;
  }

  if (isPredictionLocked()) {
    reply.status(403).send({ error: "Predictions are locked" });
    return;
  }

  const { username } = userDecoded;

  const predictions = req.body as InsertPrediction[];

  await insertPredictions(username, predictions);

  reply.send(predictions.map((prediction) => ({ ...prediction, username })));
};
