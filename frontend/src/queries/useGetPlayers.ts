import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { Player } from "../../../shared/types/database";

export const getPlayers = async () => {
  return apiRequest<Player[]>(`/players`, {
    method: "GET",
  });
};

export const useGetPlayers = () => {
  const query = useQuery(["getPlayers"], () => getPlayers());

  return { ...query, data: query.data || [] };
};
