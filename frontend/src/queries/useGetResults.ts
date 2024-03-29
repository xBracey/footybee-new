import { useQuery } from "react-query";
import { apiRequest } from "./utils";

export interface Result {
  id: string;
  fixtureId: string;
  homeTeamScore: number;
  awayTeamScore: number;
}

export const getResults = async () => {
  return apiRequest<Result[]>(`/results`, {
    method: "GET",
  });
};

export const useGetResults = () => {
  const { data } = useQuery(["getResults"], () => getResults());

  return data;
};
