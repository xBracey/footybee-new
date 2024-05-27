import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { Player } from "../../../shared/types/database";

export const getPlayer = async (id: number) => {
  if (!id) {
    return null;
  }

  return apiRequest<Player>(`/players/${id}`, {
    method: "GET",
  });
};

export const useGetPlayer = (id: number) => {
  const query = useQuery(["getPlayer", id], () => getPlayer(id));

  return query;
};
