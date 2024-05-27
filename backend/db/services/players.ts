import {
  editPlayer,
  getPlayer,
  getPlayers,
  insertPlayer,
} from "../repositories/players";
import { ServiceHandler } from "./types";

export const getPlayersHandler: ServiceHandler = async (_, reply) => {
  const players = await getPlayers();

  reply.send(players);
};

export const getPlayerHandler: ServiceHandler = async (request, reply) => {
  const { id } = request.params as { id: string };
  const player = await getPlayer(parseInt(id));

  reply.send(player);
};

export const insertPlayersHandler: ServiceHandler = async (request, reply) => {
  const { name, teamId } = request.body as {
    name: string;
    teamId: number;
  };

  await insertPlayer({ name, teamId });
};

export const editPlayerHandler: ServiceHandler = async (request, reply) => {
  const { id } = request.params as { id: string };
  const { name, teamId } = request.body as {
    name: string;
    teamId: number;
  };

  await editPlayer(parseInt(id), { name, teamId });

  reply.send({ name, teamId });
};
