import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { Fixture } from "../../../shared/types/database";

export const getRoundFixtures = async () => {
  return apiRequest<Fixture[]>(`/round-fixtures`, {
    method: "GET",
  });
};

export const useGetRoundFixtures = () => {
  const query = useQuery(["getRoundFixtures"], () => getRoundFixtures(), {
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
    keepPreviousData: true,
  });

  return { ...query, data: query.data || [] };
};
