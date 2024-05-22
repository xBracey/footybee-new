import { FastifyInstance } from "fastify";
import { ServiceHandler } from "./types";
import { tokenToUser } from "./utils";
import {
  getLeagueByPassword,
  getUserLeagues,
  insertLeague,
} from "../repositories/leagues";
import { insertUserLeague } from "../repositories/userLeagues";

export const addLeagueHandler: (server: FastifyInstance) => ServiceHandler =
  (server) => async (req, reply) => {
    const userDecoded = await tokenToUser(server, req, reply);

    if (!userDecoded) {
      return;
    }

    const { id, name, password } = req.body as {
      id: string;
      name: string;
      password: string;
    };

    await insertLeague({
      id,
      name,
      password,
      creatorUsername: userDecoded.username,
    });

    await insertUserLeague({
      username: userDecoded.username,
      leagueId: id,
    });

    reply.send({ success: true });
  };

export const joinLeagueHandler: (server: FastifyInstance) => ServiceHandler =
  (server) => async (req, reply) => {
    const userDecoded = await tokenToUser(server, req, reply);

    if (!userDecoded) {
      return;
    }

    const { id, password } = req.body as { id: string; password: string };

    const league = await getLeagueByPassword(id, password);

    if (league.length === 0) {
      reply.status(404).send({ success: false });
      return;
    }

    await insertUserLeague({
      username: userDecoded.username,
      leagueId: id,
    });

    reply.send({ success: true });
  };

export const getUserLeaguesHandler: (
  server: FastifyInstance
) => ServiceHandler = (server) => async (req, reply) => {
  const userDecoded = await tokenToUser(server, req, reply);

  if (!userDecoded) {
    return;
  }

  const leagues = await getUserLeagues(userDecoded.username);

  reply.send(
    leagues.map((league) => ({
      id: league.leagues.id,
      name: league.leagues.name,
      admin: league.leagues.creatorUsername === userDecoded.username,
    }))
  );
};
