import {
  getUserGroupsByUsername,
  insertUserGroups,
} from "../repositories/userGroups";
import { ServiceHandler } from "./types";
import { UserGroup } from "../../../shared/types/database";

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

export const insertUserGroupsHandler: ServiceHandler = async (req, reply) => {
  const { username } = req.params as {
    username: string;
  };

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
