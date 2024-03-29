import { useQuery } from "react-query";
import { apiRequest } from "./utils";

export interface Team {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  dateTime: number;
}

export const getTeams = async () => {
  return apiRequest<Team[]>(`/teams`, {
    method: "GET",
  });
};

export const useGetTeams = () => {
  const { data } = useQuery(["getTeams"], () => getTeams());

  return data;
};
