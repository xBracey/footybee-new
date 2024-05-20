import { getUserFixturesByUsernameHandler } from "../services/userFixtures";
import { Router } from "./types";

export const buildUserFixturesRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getUserFixturesByUsernameHandler);
  done();
};
