import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { Fixture, Prediction } from "../../../shared/types/database";

interface InitPredictionRequest {
  predictions: Prediction[];
}

export const initPredictions = async ({
  predictions,
}: InitPredictionRequest) => {
  try {
    const resp = await apiRequest<Prediction[]>(`/predictions`, {
      method: "POST",
      data: predictions,
    });
    return resp;
  } catch (error) {
    console.log(error);
    return { error: "Prediction could not be posted" };
  }
};

export const useInitPredictions = (
  onSuccess: (data: Prediction[]) => void,
  username?: string
) => {
  const postPredictions = async (fixtures: Fixture[]) => {
    const predictions = fixtures.map((fixture) => ({
      username,
      fixtureId: fixture.id,
      homeTeamScore: 0,
      awayTeamScore: 0,
    }));
    return await initPredictions({ predictions });
  };

  const { mutate, isLoading, isError, data } = useMutation(postPredictions, {
    onSuccess,
  });
  return { data, initPredictions: mutate, isLoading, isError };
};
