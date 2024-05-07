import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { Prediction } from "../../../shared/types/database";

interface EditPredictionRequest {
  username: string;
  fixtureId: number;
  homeTeamScore: number;
  awayTeamScore: number;
}

export const editPrediction = async ({
  username,
  fixtureId,
  homeTeamScore,
  awayTeamScore,
}: EditPredictionRequest) => {
  try {
    const resp = await apiRequest<Prediction>(
      `/predictions/${username}/${fixtureId}`,
      {
        method: "PUT",
        data: { homeTeamScore, awayTeamScore },
      }
    );
    return resp;
  } catch (error) {
    console.log(error);
    return { error: "Prediction could not be edited" };
  }
};

export const useEditPrediction = (
  username: string,
  onSuccess: (data: Prediction) => void
) => {
  const putPrediction = ({
    fixtureId,
    homeTeamScore,
    awayTeamScore,
  }: EditPredictionRequest) => {
    return editPrediction({
      username,
      fixtureId,
      homeTeamScore,
      awayTeamScore,
    });
  };

  const { mutate, isLoading, isError, data } = useMutation(putPrediction, {
    onSuccess,
  });
  return { data, editPrediction: mutate, isLoading, isError };
};
