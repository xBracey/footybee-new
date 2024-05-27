import { FastifyInstance } from "fastify";
import {
  editUser,
  editUserBonuses,
  getUser,
  getUsers,
  insertUser,
} from "../repositories/users";
import { ServiceHandler } from "./types";
import bcrypt from "bcrypt";
import { tokenToUser } from "./utils";

export const getUserHandler: ServiceHandler = async (request, reply) => {
  const { username } = request.params as { username: string };
  const user = await getUser(username);

  if (!user) {
    reply.status(404).send({ error: "User not found" });
    return;
  }

  reply.send({
    username: user.username,
    admin: !!user.admin,
    bonusPlayerId: user.bonusPlayerId,
    bonusTeamId: user.bonusTeamId,
  });
};

export const getUsersHandler: ServiceHandler = async (request, reply) => {
  const users = await getUsers();

  const usersWithoutPassword = users.map((user) => ({
    username: user.username,
    admin: !!user.admin,
    bonusPlayerId: user.bonusPlayerId,
    bonusTeamId: user.bonusTeamId,
  }));

  reply.send(usersWithoutPassword);
};

export const getMeHandler: (server: FastifyInstance) => ServiceHandler =
  (server) => async (request, reply) => {
    const userDecoded = await tokenToUser(server, request, reply);

    if (!userDecoded) {
      return;
    }

    const user = await getUser(userDecoded.username);

    if (!user) {
      reply.status(404).send({ error: "User not found" });
      return;
    }

    reply.send({
      username: user.username,
      admin: !!user.admin,
      bonusPlayerId: user.bonusPlayerId,
      bonusTeamId: user.bonusTeamId,
    });
  };

export const registerUserHandler: (server: FastifyInstance) => ServiceHandler =
  (server) => async (request, reply) => {
    const { username, password } = request.body as {
      username: string;
      password: string;
    };

    await insertUser({ username, password });

    const token = server.jwt.sign({ username });
    reply.send({ token });
  };

export const loginUserHandler: (server: FastifyInstance) => ServiceHandler =
  (server) => async (request, reply) => {
    const { username, password } = request.body as {
      username: string;
      password: string;
    };

    const user = await getUser(username);

    if (!user) {
      reply.status(404).send({ error: "User not found" });
      return;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      reply.status(401).send({ error: "Invalid password" });
      return;
    }

    const token = server.jwt.sign({ username });
    reply.send({ token });
  };

export const editUserHandler: ServiceHandler = async (request, reply) => {
  const { username } = request.params as { username: string };
  const { admin } = request.body as {
    admin: boolean;
  };

  await editUser(username, admin);

  reply.send({ username, admin });
};

export const editMyBonuses: (server: FastifyInstance) => ServiceHandler =
  (server) => async (request, reply) => {
    const userDecoded = await tokenToUser(server, request, reply);

    if (!userDecoded) {
      return;
    }

    const { bonusPlayerId, bonusTeamId } = request.body as {
      bonusPlayerId: number;
      bonusTeamId: number;
    };

    await editUserBonuses(userDecoded.username, bonusPlayerId, bonusTeamId);

    reply.send({ bonusPlayerId, bonusTeamId });
  };
