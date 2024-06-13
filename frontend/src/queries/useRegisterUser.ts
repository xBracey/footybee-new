import { useMutation } from "react-query";
import axios from "axios";
import { apiRequest } from "./utils";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const registerUser = async ({ username, password }: LoginRequest) => {
  try {
    const resp = await apiRequest<LoginResponse>("/users/register", {
      method: "POST",
      data: {
        username: username.trim(),
        password: password.trim(),
      },
    });
    return resp;
  } catch (error) {
    return { error: "Username already exists" };
  }
};

export const useRegisterUser = () => {
  const { mutate, isLoading, isError, data } = useMutation(registerUser);
  return { data, register: mutate, isLoading, isError };
};
