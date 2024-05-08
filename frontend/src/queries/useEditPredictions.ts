import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { Prediction } from "../../../shared/types/database";

const retryMax = 5;

interface EditPredictionsRequest {
  predictions: Prediction[];
  completedPredictions?: Prediction[];
  retryCount?: number;
}

export const editPredictions = async ({
  predictions,
  completedPredictions = [],
  retryCount = 0,
}: EditPredictionsRequest) => {
  if (retryCount > retryMax) {
    return { error: "Prediction could not be edited" };
  }
  const completedPredictionsFixtureId = completedPredictions.map(
    (prediction) => prediction.fixtureId
  );
  const predictionsToComplete = predictions.filter(
    (prediction) =>
      !completedPredictionsFixtureId.includes(prediction.fixtureId)
  );

  const predictionsPromise = predictionsToComplete.map((prediction) =>
    apiRequest<Prediction>(
      `/predictions/${prediction.username}/${prediction.fixtureId}`,
      {
        method: "PUT",
        data: {
          homeTeamScore: prediction.homeTeamScore,
          awayTeamScore: prediction.awayTeamScore,
        },
      }
    )
  );

  const predictionsResponses = await Promise.allSettled(predictionsPromise);

  for (const prediction of predictionsResponses) {
    if (prediction.status === "rejected") {
      console.log("Prediction could not be edited", prediction.reason);
    } else {
      completedPredictions.push(prediction.value);
    }
  }

  if (predictions.length === completedPredictions.length) {
    return completedPredictions;
  }

  return editPredictions({
    predictions,
    completedPredictions,
    retryCount: retryCount + 1,
  });
};

export const useEditPredictions = (
  username: string,
  onSuccess: (data: Prediction[]) => void
) => {
  const putPrediction = (predictions: Omit<Prediction, "username">[]) => {
    return editPredictions({
      predictions: predictions.map((prediction) => ({
        ...prediction,
        username,
      })),
    });
  };

  const { mutate, isLoading, isError, data } = useMutation(putPrediction, {
    onSuccess,
  });
  return { data, editPredictions: mutate, isLoading, isError };
};
