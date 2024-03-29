import { useQuery } from "react-query";
import { apiRequest } from "./utils";

export interface Fixture {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  dateTime: number;
}

export const getFixtures = async () => {
  return apiRequest<Fixture[]>(`/fixtures`, {
    method: "GET",
  });
};

export const useGetFixtures = () => {
  const { data } = useQuery(["getFixtures"], () => getFixtures());

  return data;
};
