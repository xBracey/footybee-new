import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { Result } from "../../../shared/types/database";

export const getResults = async () => {
  return apiRequest<Result[]>(`/results`, {
    method: "GET",
  });
};

export const useGetResults = () => {
  const { data } = useQuery(["getResults"], () => getResults());

  return data;
};
