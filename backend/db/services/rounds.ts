import { getRounds } from "../repositories/rounds";
import { ServiceHandler } from "./types";

export const getRoundsHandler: ServiceHandler = async (_, reply) => {
  const rounds = await getRounds();

  reply.send(rounds.map((round) => round.round));
};
