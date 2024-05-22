import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { LeagueWithPassword, Prediction } from "../../../shared/types/database";
import { useUserStore } from "../zustand/user";

export const addLeague = async (
  league: LeagueWithPassword & { token: string }
) => {
  const resp = await apiRequest<{ success: boolean }>(`/leagues`, {
    method: "POST",
    data: league,
    headers: {
      Authorization: `Bearer ${league.token}`,
    },
  });

  return resp;
};

export const useAddLeague = (
  onSuccess: (data: { success: boolean }) => void
) => {
  const { token } = useUserStore();

  const addNewLeague = (league: LeagueWithPassword) => {
    return addLeague({ ...league, token });
  };

  const { mutate, isLoading, isError, data } = useMutation(addNewLeague, {
    onSuccess,
  });
  return { data, addLeague: mutate, isLoading, isError };
};
