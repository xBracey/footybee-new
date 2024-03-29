import { getResults } from "../repositories/results";
import { ServiceHandler } from "./types";

export const getResultsHandler: ServiceHandler = async (_, reply) => {
  const results = await getResults();

  reply.send(results);
};
