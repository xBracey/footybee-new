import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { Fixture } from "../../../shared/types/database";

export const getFixtures = async () => {
  return apiRequest<Fixture[]>(`/fixtures`, {
    method: "GET",
  });
};

export const useGetFixtures = () => {
  const query = useQuery(["getFixtures"], () => getFixtures(), {
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
    keepPreviousData: true,
  });

  return { ...query, data: query.data || [] };
};
