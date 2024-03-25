import { getTeams, insertTeam } from "../repositories/teams";
import { ServiceHandler } from "./types";

export const getTeamsHandler: ServiceHandler = async (_, reply) => {
  const teams = await getTeams();

  reply.send(teams);
};

export const insertTeamsHandler: ServiceHandler = async (request, reply) => {
  const { name, groupLetter } = request.body as {
    name: string;
    groupLetter: string;
  };

  await insertTeam({ name, groupLetter });

  reply.send({ name, groupLetter });
};
