import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { Prediction } from "../../../shared/types/database";
import { useUserStore } from "../zustand/user";

interface PostPredictionsRequest {
  token: string;
  predictions: Omit<Prediction, "username">[];
}

export const editPredictions = async ({
  token,
  predictions,
}: PostPredictionsRequest) => {
  const resp = await apiRequest<Prediction[]>(`/predictions`, {
    method: "POST",
    data: predictions,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return resp;
};

export const useEditPredictions = (onSuccess: (data: Prediction[]) => void) => {
  const { token } = useUserStore();

  const putPrediction = (predictions: Omit<Prediction, "username">[]) => {
    return editPredictions({
      token,
      predictions,
    });
  };

  const { mutate, isLoading, isError, data } = useMutation(putPrediction, {
    onSuccess,
  });
  return { data, editPredictions: mutate, isLoading, isError };
};
