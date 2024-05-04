import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { User } from "./useGetMe";

export const getUsers = async () => {
  return apiRequest<User[]>(`/users`, {
    method: "GET",
  });
};

export const useGetUsers = () => {
  const query = useQuery(["getUsers"], () => getUsers());

  return { ...query, data: query.data || [] };
};
