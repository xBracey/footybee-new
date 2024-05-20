import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { User } from "../../../shared/types/database";

export const getUser = async (username?: string) => {
  if (!username) {
    return null;
  }

  return apiRequest<User>(`/users/${username}`, {
    method: "GET",
  });
};

export const useGetUser = (username?: string) => {
  const query = useQuery(["getUser", { username }], () => getUser(username));

  return query;
};
