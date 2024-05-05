import { getGroups } from "../repositories/groups";
import { ServiceHandler } from "./types";

export const getGroupsHandler: ServiceHandler = async (_, reply) => {
  const groups = await getGroups();

  reply.send(groups.map((group) => group.letter));
};
