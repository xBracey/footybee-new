import { useQuery } from "react-query";
import { apiRequest } from "./utils";

export interface Team {
  id: string;
  groupLetter: string;
  name: string;
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
