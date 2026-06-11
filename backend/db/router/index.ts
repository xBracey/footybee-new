import { Router } from "./types";
import { buildUserRoutes } from "./users";
import { buildTeamsRoutes } from "./teams";
import { buildGroupsRoutes } from "./groups";
import { buildFixturesRoutes } from "./fixtures";
import { buildPredictionsRoutes } from "./predictions";
import { buildUserGroupsRoutes } from "./userGroups";
import { buildUserFixturesRoutes } from "./userFixtures";
import { buildLeaguesRoutes } from "./leagues";
import { buildPlayersRoutes } from "./players";
import { buildRoundFixturesRoutes } from "./roundFixtures";
import { buildRoundsRoutes } from "./rounds";
import { buildUserTeamsRoutes } from "./userTeams";
import { getLockStatus } from "../services/lock";

export const buildApiRoutes: Router = (fastify, _, done) => {
  // Lock status endpoint (no auth required)
  fastify.get("/lock", async (_, reply) => {
    reply.send(getLockStatus());
  });

  fastify.register(buildUserRoutes, { prefix: "/users" });
  fastify.register(buildTeamsRoutes, { prefix: "/teams" });
  fastify.register(buildPlayersRoutes, { prefix: "/players" });
  fastify.register(buildGroupsRoutes, { prefix: "/groups" });
  fastify.register(buildFixturesRoutes, { prefix: "/fixtures" });
  fastify.register(buildPredictionsRoutes, {
    prefix: "/predictions",
  });
  fastify.register(buildUserGroupsRoutes, {
    prefix: "/users/groups",
  });
  fastify.register(buildUserTeamsRoutes, {
    prefix: "/users/teams",
  });
  fastify.register(buildUserFixturesRoutes, {
    prefix: "/users/fixtures/:username",
  });
  fastify.register(buildLeaguesRoutes, { prefix: "/leagues" });
  fastify.register(buildRoundsRoutes, { prefix: "/rounds" });
  fastify.register(buildRoundFixturesRoutes, { prefix: "/round-fixtures" });
  done();
};
