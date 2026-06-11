import {
  getUserGroupsByUsername,
  insertUserGroups,
} from "../repositories/userGroups";
import { ServiceHandler } from "./types";
import { UserGroup } from "../../../shared/types/database";
import { tokenToUser } from "./utils";
import { FastifyInstance } from "fastify";
import { isPredictionLocked } from "../../../shared/config";

export const getUserGroupsByUsernameHandler: ServiceHandler = async (
  req,
  reply
) => {
  const { username } = req.params as {
    username: string;
  };

  const userGroups = await getUserGroupsByUsername(username);
  reply.send(userGroups);
};

export const insertUserGroupsHandler: (
  server: FastifyInstance
) => ServiceHandler = (server) => async (req, reply) => {
  const userDecoded = await tokenToUser(server, req, reply);

  if (!userDecoded) {
    return;
  }

  if (isPredictionLocked()) {
    reply.status(403).send({ error: "Predictions are locked" });
    return;
  }

  const { username } = userDecoded;

  const userGroups = req.body as Omit<UserGroup, "username" | "points">[];

  await insertUserGroups(
    userGroups.map((userGroup) => ({ username, ...userGroup }))
  );

  reply.send(
    userGroups.map((userGroup) => ({
      ...userGroup,
      username,
      points: 0,
    }))
  );
};
