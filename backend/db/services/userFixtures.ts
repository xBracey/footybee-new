import { getUserFixturesByUsername } from "../repositories/userFixtures";
import { ServiceHandler } from "./types";

export const getUserFixturesByUsernameHandler: ServiceHandler = async (
  req,
  reply
) => {
  const { username } = req.params as {
    username: string;
  };

  const userFixtures = await getUserFixturesByUsername(username);
  reply.send(userFixtures);
};
