import { FastifyInstance } from "fastify";
import { ServiceHandler } from "./types";
import { tokenToUser } from "./utils";
import {
  getLeague,
  getLeagueByPassword,
  getUserLeagues,
  insertLeague,
} from "../repositories/leagues";
import { getLeagueUsers, insertUserLeague } from "../repositories/userLeagues";
import { getAllUsersPoints } from "../points/getPoints";
import { InsertLeague, League } from "../schema";

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

  const userPointsPromise = getAllUsersPoints();
  const leaguesPromise = getUserLeagues(userDecoded.username);

  const [userPoints, leagues] = await Promise.all([
    userPointsPromise,
    leaguesPromise,
  ]);

  const leaguesWithPointsPromise = leagues.map(async (league) => {
    const leagueUsers = await getLeagueUsers(league.leagues.id);

    const ranking = leagueUsers
      .map((user) => ({
        username: user.username,
        points:
          userPoints.find((u) => u.username === user.username)?.points || 0,
      }))
      .sort((a, b) => b.points - a.points);

    return {
      id: league.leagues.id,
      name: league.leagues.name,
      admin: league.leagues.creatorUsername === userDecoded.username,
      user_points:
        userPoints.find((u) => u.username === userDecoded.username)?.points ||
        0,
      ranking,
      user_position:
        ranking.findIndex((user) => user.username === userDecoded.username) + 1,
    };
  });

  const leaguesWithPoints = await Promise.all(leaguesWithPointsPromise);

  reply.send(leaguesWithPoints);
};

export const getGlobalLeaderboardHandler: ServiceHandler = async (_, reply) => {
  const userPoints = await getAllUsersPoints();

  const ranking = userPoints.sort((a, b) => b.points - a.points);

  reply.send(ranking);
};
