import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { useUserStore } from "../zustand/user";
import { User } from "../../../shared/types/database";

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

export const useGetMe = (onSuccess?: (data: User) => void) => {
  const { token } = useUserStore();

  const query = useQuery(["getMe", { token }], () => getMe(token), {
    onSuccess,
  });

  return query;
};
