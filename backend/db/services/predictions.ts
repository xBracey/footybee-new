import {
  editPrediction,
  getPredictions,
  insertPrediction,
  insertPredictions,
} from "../repositories/predictions";
import { InsertPrediction } from "../schema";
import { ServiceHandler } from "./types";

export const getPredictionsHandler: ServiceHandler = async (_, reply) => {
  const predictions = await getPredictions();

  reply.send(predictions);
};

export const insertPredictionHandler: ServiceHandler = async (req, reply) => {
  const { homeTeamScore, awayTeamScore } = req.body as InsertPrediction;

  const { username, fixtureId } = req.params as {
    username: string;
    fixtureId: string;
  };

  const prediction = await insertPrediction({
    homeTeamScore,
    awayTeamScore,
    username,
    fixtureId: parseInt(fixtureId),
  });

  reply.send(prediction);
};

export const insertPredictionsHandler: ServiceHandler = async (req, reply) => {
  const predictions = req.body as InsertPrediction[];

  await insertPredictions(predictions);

  reply.send(predictions);
};

export const editPredictionHandler: ServiceHandler = async (req, reply) => {
  const { homeTeamScore, awayTeamScore } = req.body as Omit<
    InsertPrediction,
    "username" | "fixtureId"
  >;

  const { username, fixtureId } = req.params as {
    username: string;
    fixtureId: string;
  };

  await editPrediction(
    { homeTeamScore, awayTeamScore },
    username,
    parseInt(fixtureId)
  );

  reply.send({
    homeTeamScore,
    awayTeamScore,
    username,
    fixtureId: parseInt(fixtureId),
  });
};
