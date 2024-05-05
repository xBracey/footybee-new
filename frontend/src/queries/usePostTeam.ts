import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { Team } from "../../../shared/types/database";

interface PostTeamRequest {
  id?: number;
  team: Omit<Team, "id">;
}

export interface PostTeamResponse {
  team: Team;
}

export const addEditTeam = async ({ team, id }: PostTeamRequest) => {
  try {
    const resp = await apiRequest<PostTeamResponse>(
      `/teams${id ? `/${id}` : ""}`,
      {
        method: id ? "PUT" : "POST",
        data: team,
      }
    );
    return resp;
  } catch (error) {
    console.log(error);
    return { error: "Fixture could not be posted" };
  }
};

export const usePostTeam = (id?: number) => {
  const postPutTeam = (team: Omit<Team, "id">) => {
    return addEditTeam({ team, id });
  };

  const { mutate, isLoading, isError, data } = useMutation(postPutTeam);
  return { data, postTeam: mutate, isLoading, isError };
};
