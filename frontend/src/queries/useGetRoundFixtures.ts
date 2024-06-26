import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { RoundFixture } from "../../../shared/types/database";

export const getRoundFixtures = async () => {
  return apiRequest<RoundFixture[]>(`/round-fixtures`, {
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
