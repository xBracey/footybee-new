import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { Team } from "../../../shared/types/database";

export const getTeam = async (id?: number) => {
  if (!id) {
    return null;
  }

  return apiRequest<Team>(`/teams/${id}`, {
    method: "GET",
  });
};

export const useGetTeam = (id?: number) => {
  const query = useQuery(["getTeam", id], () => getTeam(id));

  return query;
};
