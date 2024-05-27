import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { User } from "../../../shared/types/database";
import { useUserStore } from "../zustand/user";

interface PostUserBonusesRequest {
  bonusPlayerId?: number;
  bonusTeamId?: number;
  token: string;
}

export const editUserBonuses = async ({
  bonusPlayerId,
  bonusTeamId,
  token,
}: PostUserBonusesRequest) => {
  try {
    const resp = await apiRequest<User>(`/users/me/bonuses`, {
      method: "PUT",
      data: { bonusPlayerId, bonusTeamId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    return { error: "Fixture could not be posted" };
  }
};

export const usePostUserBonuses = (onSuccess: (user: User) => void) => {
  const { token } = useUserStore();

  const postPutUserBonuses = ({
    bonusPlayerId,
    bonusTeamId,
  }: {
    bonusPlayerId?: number;
    bonusTeamId?: number;
  }) => {
    return editUserBonuses({ bonusPlayerId, bonusTeamId, token });
  };

  const { mutate, isLoading, isError, data } = useMutation(postPutUserBonuses, {
    onSuccess,
  });
  return { data, postUserBonuses: mutate, isLoading, isError };
};
