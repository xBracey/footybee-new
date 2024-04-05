import { getPredictions } from "../repositories/predictions";
import { ServiceHandler } from "./types";

export const getPredictionsHandler: ServiceHandler = async (_, reply) => {
  const predictions = await getPredictions();

  reply.send(predictions);
};
