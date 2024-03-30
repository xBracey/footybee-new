import { useQuery } from "react-query";
import { apiRequest } from "./utils";

export interface Prediction {
  id: string;
  username: string;
  fixtureId: string;
  homeTeamScore: number;
  awayTeamScore: number;
}

export const getPredictions = async () => {
  return apiRequest<Prediction[]>(`/predictions`, {
    method: "GET",
  });
};

export const useGetPredictions = () => {
  const { data } = useQuery(["getPredictions"], () => getPredictions());

  return data;
};
