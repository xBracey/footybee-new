import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { UserTeam } from "../../../shared/types/database";

export const getUserTeams = async (username: string) => {
  if (!username) {
    return [];
  }

  return apiRequest<UserTeam[]>(`/users/teams/${username}`, {
    method: "GET",
  });
};

export const useGetUserTeams = (
  username: string,
  onSuccess?: (userTeams: UserTeam[]) => void
) => {
  const query = useQuery(
    ["getUserTeams", username],
    () => getUserTeams(username),
    { onSuccess }
  );

  return { ...query, data: query.data || [] };
};
