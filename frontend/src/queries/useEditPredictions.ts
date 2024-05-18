import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { Prediction } from "../../../shared/types/database";

interface PostPredictionsRequest {
  username: string;
  predictions: Omit<Prediction, "username">[];
}

export const editPredictions = async ({
  username,
  predictions,
}: PostPredictionsRequest) => {
  const resp = await apiRequest<Prediction[]>(`/predictions/${username}`, {
    method: "POST",
    data: predictions,
  });

  return resp;
};

export const useEditPredictions = (
  username: string,
  onSuccess: (data: Prediction[]) => void
) => {
  const putPrediction = (predictions: Omit<Prediction, "username">[]) => {
    return editPredictions({
      username,
      predictions,
    });
  };

  const { mutate, isLoading, isError, data } = useMutation(putPrediction, {
    onSuccess,
  });
  return { data, editPredictions: mutate, isLoading, isError };
};
