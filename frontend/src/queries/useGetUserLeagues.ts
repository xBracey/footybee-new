import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { League } from "../../../shared/types/database";
import { useUserStore } from "../zustand/user";

export const getUserLeagues = async (token: string) => {
  return apiRequest<League[]>(`/leagues`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useGetUserLeagues = () => {
  const { token } = useUserStore();

  const query = useQuery(["getUserLeagues", token], () =>
    getUserLeagues(token)
  );

  return { ...query, data: query.data || [] };
};
