import {
  getUserTeamsByUsername,
  insertUserTeams,
} from "../repositories/userTeams";
import { ServiceHandler } from "./types";
import { UserTeam } from "../../../shared/types/database";
import { tokenToUser } from "./utils";
import { FastifyInstance } from "fastify";

export const getUserTeamsByUsernameHandler: ServiceHandler = async (
  req,
  reply
) => {
  const { username } = req.params as {
    username: string;
  };

  const userTeams = await getUserTeamsByUsername(username);
  reply.send(userTeams);
};

export const insertUserTeamsHandler: (
  server: FastifyInstance
) => ServiceHandler = (server) => async (req, reply) => {
  const userDecoded = await tokenToUser(server, req, reply);

  if (!userDecoded) {
    return;
  }

  reply.status(403).send({ error: "Predictions are locked" });
  return;

  // const { username } = userDecoded;

  // const userTeams = req.body as Omit<UserTeam, "username" | "points">[];

  // await insertUserTeams(
  //   userTeams.map((userTeam) => ({ username, ...userTeam }))
  // );

  // reply.send(
  //   userTeams.map((userTeam) => ({
  //     ...userTeam,
  //     username,
  //     points: 0,
  //   }))
  // );
};
