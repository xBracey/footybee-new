import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { User } from "../../../shared/types/database";

interface PostUserRequest {
  username: string;
  isAdmin: boolean;
}

export const editUser = async ({ username, isAdmin }: PostUserRequest) => {
  try {
    const resp = await apiRequest<User>(`/users/${username}`, {
      method: "PUT",
      data: { isAdmin },
    });
    return resp;
  } catch (error) {
    console.log(error);
    return { error: "Fixture could not be posted" };
  }
};

export const usePostUser = (username: string) => {
  const postPutUser = (isAdmin: boolean) => {
    return editUser({ username, isAdmin });
  };

  const { mutate, isLoading, isError, data } = useMutation(postPutUser);
  return { data, postUser: mutate, isLoading, isError };
};
