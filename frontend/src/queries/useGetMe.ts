import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { useUserStore } from "../zustand/user";

export type User = {
  username: string;
  admin: boolean;
};

export const getMe = async (token: string) => {
  if (!token) {
    return null;
  }

  return apiRequest<User>(`/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useGetMe = () => {
  const { token } = useUserStore();

  const data = useQuery(["getMe"], () => getMe(token));

  return data;
};
