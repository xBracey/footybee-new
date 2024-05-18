import { Router } from "./types";
import {
  getUserGroupsByUsernameHandler,
  insertUserGroupsHandler,
} from "../services/userGroups";

export const buildUserGroupsRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getUserGroupsByUsernameHandler);
  fastify.post("/", insertUserGroupsHandler);
  done();
};
