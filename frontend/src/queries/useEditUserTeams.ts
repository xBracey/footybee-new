import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { UserTeam } from "../../../shared/types/database";
import { useUserStore } from "../zustand/user";

interface PostUserTeamsRequest {
  token: string;
  userTeams: Omit<UserTeam, "username" | "points">[];
}

export const editUserTeams = async ({
  token,
  userTeams,
}: PostUserTeamsRequest) => {
  console.log(userTeams);

  const resp = await apiRequest<UserTeam[]>(`/users/teams`, {
    method: "POST",
    data: userTeams,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return resp;
};

export const useEditUserTeams = (onSuccess: (data: UserTeam[]) => void) => {
  const { token } = useUserStore();

  const putUserTeams = (userTeams: Omit<UserTeam, "username" | "points">[]) => {
    return editUserTeams({
      token,
      userTeams,
    });
  };

  const { mutate, isLoading, isError, data } = useMutation(putUserTeams, {
    onSuccess,
  });
  return { data, editUserTeams: mutate, isLoading, isError };
};
