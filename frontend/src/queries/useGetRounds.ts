import { useQuery } from "react-query";
import { apiRequest } from "./utils";

export const getRounds = async () => {
  return apiRequest<string[]>(`/rounds`, {
    method: "GET",
  });
};

export const useGetRounds = () => {
  const query = useQuery(["getRounds"], () => getRounds());

  return { ...query, data: query.data || [] };
};
