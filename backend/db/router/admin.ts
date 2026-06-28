import { Router } from "./types";
import { getKnockoutStatusHandler } from "../services/userTeams";

export const buildAdminRoutes: Router = (fastify, _, done) => {
  fastify.get("/knockout-status", getKnockoutStatusHandler(fastify));
  done();
};
