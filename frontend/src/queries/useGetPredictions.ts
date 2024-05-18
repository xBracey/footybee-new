import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { Prediction } from "../../../shared/types/database";

export const getPredictions = async (username: string) => {
  return apiRequest<Prediction[]>(`/predictions/${username}`, {
    method: "GET",
  });
};

export const useGetPredictions = (
  username: string,
  onSuccess?: (predictions: Prediction[]) => void
) => {
  const query = useQuery(
    ["getPredictions", username],
    () => getPredictions(username),
    {
      onSuccess,
    }
  );

  return { ...query, data: query.data || [] };
};
