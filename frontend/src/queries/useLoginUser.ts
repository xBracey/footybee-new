import { useMutation } from "react-query";
import { apiRequest } from "./utils";

interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const loginUser = async ({ username, password }: LoginRequest) => {
  try {
    const resp = await apiRequest<LoginResponse>("/users/login", {
      method: "POST",
      data: {
        username: username.trim(),
        password: password.trim(),
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    return { error: "Username or password is incorrect" };
  }
};

export const useLoginUser = () => {
  const { mutate, isLoading, isError, data } = useMutation(loginUser);
  return { data, login: mutate, isLoading, isError };
};
