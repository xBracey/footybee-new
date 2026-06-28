import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { useUserStore } from "../zustand/user";
import { LeagueKnockoutStatus } from "../../../shared/types/database";

export const getKnockoutStatus = async (token: string) => {
  if (!token) {
    return [];
  }

  return apiRequest<LeagueKnockoutStatus[]>(`/admin/knockout-status`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useGetKnockoutStatus = () => {
  const { token } = useUserStore();

  const query = useQuery(
    ["getKnockoutStatus", { token }],
    () => getKnockoutStatus(token)
  );

  return { ...query, data: query.data || [] };
};
