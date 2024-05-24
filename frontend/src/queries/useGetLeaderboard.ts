import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { League } from "../../../shared/types/database";

export const getLeaderboard = async () => {
  return apiRequest<League["ranking"]>(`/leagues/leaderboard`, {
    method: "GET",
  });
};

export const useGetLeaderboard = () => {
  const query = useQuery(["getLeaderboard"], () => getLeaderboard());

  return { ...query, data: query.data || [] };
};
