import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { Prediction } from "../../../shared/types/database";

export const getPredictions = async () => {
  return apiRequest<Prediction[]>(`/predictions`, {
    method: "GET",
  });
};

export const useGetPredictions = () => {
  const query = useQuery(["getPredictions"], () => getPredictions());

  return { ...query, data: query.data || [] };
};
