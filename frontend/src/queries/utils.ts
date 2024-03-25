import axios, { AxiosRequestConfig } from "axios";

export const apiRequest = async <T>(
  url: string,
  options: AxiosRequestConfig = {}
) => {
  try {
    const response = await axios<T>(`http://localhost:7231/api${url}`, options);

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
