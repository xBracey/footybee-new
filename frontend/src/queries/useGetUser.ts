import { useQuery } from "react-query";
import { apiRequest } from "./utils";

export type User = {
  id: number;
  name: string;
};

export const getUser = async (username?: string) => {
  if (!username) {
    return null;
  }

  return apiRequest<User>(`/users/${username}`, {
    method: "GET",
  });
};

export const useGetUser = (username?: string) => {
  const query = useQuery(["users", { username }], () => getUser(username));

  return query;
};
