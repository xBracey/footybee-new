import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { User } from "../../../shared/types/database";

interface PostUserRequest {
  username: string;
  isAdmin?: boolean;
  newPassword?: string;
}

export const editUser = async ({ username, isAdmin, newPassword }: PostUserRequest) => {
  try {
    const resp = await apiRequest<User>(`/users/${username}`, {
      method: "PUT",
      data: { isAdmin, newPassword },
    });
    return resp;
  } catch (error) {
    console.log(error);
    return { error: "User could not be updated" };
  }
};

export const usePostUser = (username: string) => {
  const postPutUser = (params: { isAdmin?: boolean; newPassword?: string }) => {
    return editUser({ username, ...params });
  };

  const { mutate, isLoading, isError, data } = useMutation(postPutUser);
  return { data, postUser: mutate, isLoading, isError };
};
