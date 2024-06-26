import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { RoundFixture } from "../../../shared/types/database";

interface PostFixtureRequest {
  id?: number;
  roundFixture: Omit<RoundFixture, "id">;
}

export const addEditRoundFixture = async ({
  roundFixture,
  id,
}: PostFixtureRequest) => {
  try {
    const resp = await apiRequest<RoundFixture>(
      `/round-fixtures${id ? `/${id}` : ""}`,
      {
        method: id ? "PUT" : "POST",
        data: roundFixture,
      }
    );
    return resp;
  } catch (error) {
    console.log(error);
    return { error: "Fixture could not be posted" };
  }
};

export const usePostRoundFixture = (id?: number) => {
  const postPutRoundFixture = (roundFixture: Omit<RoundFixture, "id">) => {
    return addEditRoundFixture({ roundFixture, id });
  };

  const { mutate, isLoading, isError, data } = useMutation(postPutRoundFixture);
  return { data, postRoundFixture: mutate, isLoading, isError };
};
