import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { Player } from "../../../shared/types/database";

interface PostPlayerRequest {
  id?: number;
  player: Omit<Player, "id">;
}

export const addEditPlayer = async ({ player, id }: PostPlayerRequest) => {
  try {
    const resp = await apiRequest<Player>(`/players${id ? `/${id}` : ""}`, {
      method: id ? "PUT" : "POST",
      data: player,
    });
    return resp;
  } catch (error) {
    console.log(error);
    return { error: "Player could not be posted" };
  }
};

export const usePostPlayer = (id?: number) => {
  const postPutPlayer = (player: Omit<Player, "id">) => {
    return addEditPlayer({ player, id });
  };

  const { mutate, isLoading, isError, data } = useMutation(postPutPlayer);
  return { data, postPlayer: mutate, isLoading, isError };
};
