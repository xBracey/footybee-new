import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { Team } from "../../../shared/types/database";

export const getTeams = async () => {
  return apiRequest<Team[]>(`/teams`, {
    method: "GET",
  });
};

export const useGetTeams = () => {
  const { data } = useQuery(["getTeams"], () => getTeams());

  return data;
};
