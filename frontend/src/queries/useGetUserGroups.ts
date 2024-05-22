import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { UserGroup } from "../../../shared/types/database";

export const getUserGroups = async (username: string) => {
  return apiRequest<UserGroup[]>(`/users/groups/${username}`, {
    method: "GET",
  });
};

export const useGetUserGroups = (
  username: string,
  onSuccess?: (userGroups: UserGroup[]) => void
) => {
  const query = useQuery(
    ["getUserGroups", username],
    () => getUserGroups(username),
    { onSuccess }
  );

  return { ...query, data: query.data || [] };
};
