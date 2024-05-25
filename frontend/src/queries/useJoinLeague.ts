import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { LeagueWithPassword } from "../../../shared/types/database";
import { useUserStore } from "../zustand/user";

export const joinLeague = async (
  league: Omit<LeagueWithPassword, "name"> & { token: string }
) => {
  const resp = await apiRequest<{ success: boolean }>(`/leagues/join`, {
    method: "POST",
    data: league,
    headers: {
      Authorization: `Bearer ${league.token}`,
    },
  });

  return resp;
};

export const useJoinLeague = (
  onSuccess: (data: { success: boolean }) => void
) => {
  const { token } = useUserStore();

  const joinNewLeague = (league: Omit<LeagueWithPassword, "name">) => {
    return joinLeague({ ...league, token });
  };

  const { mutate, isLoading, isError, data } = useMutation(joinNewLeague, {
    onSuccess,
  });
  return { data, joinLeague: mutate, isLoading, isError };
};
