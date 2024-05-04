import { getTeam, getTeams, insertTeam } from "../repositories/teams";
import { ServiceHandler } from "./types";

export const getTeamsHandler: ServiceHandler = async (_, reply) => {
  const teams = await getTeams();

  reply.send(teams);
};

export const getTeamHandler: ServiceHandler = async (request, reply) => {
  const { id } = request.params as { id: string };
  const team = await getTeam(parseInt(id));

  reply.send(team);
};

export const insertTeamsHandler: ServiceHandler = async (request, reply) => {
  const { name, groupLetter } = request.body as {
    name: string;
    groupLetter: string;
  };

  await insertTeam({ name, groupLetter });

  reply.send({ name, groupLetter });
};
