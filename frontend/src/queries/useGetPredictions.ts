import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { Prediction } from "../../../shared/types/database";

export const getPredictions = async () => {
  return apiRequest<Prediction[]>(`/predictions`, {
    method: "GET",
  });
};

export const useGetPredictions = (
  onSuccess?: (predictions: Prediction[]) => void
) => {
  const query = useQuery(["getPredictions"], () => getPredictions(), {
    onSuccess,
  });

  return { ...query, data: query.data || [] };
};
