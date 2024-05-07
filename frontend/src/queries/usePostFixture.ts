import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { Fixture } from "../../../shared/types/database";

interface PostFixtureRequest {
  id?: number;
  fixture: Omit<Fixture, "id">;
}

export const addEditFixture = async ({ fixture, id }: PostFixtureRequest) => {
  try {
    const resp = await apiRequest<Fixture>(`/fixtures${id ? `/${id}` : ""}`, {
      method: id ? "PUT" : "POST",
      data: fixture,
    });
    return resp;
  } catch (error) {
    console.log(error);
    return { error: "Fixture could not be posted" };
  }
};

export const usePostFixture = (id?: number) => {
  const postPutFixture = (fixture: Omit<Fixture, "id">) => {
    return addEditFixture({ fixture, id });
  };

  const { mutate, isLoading, isError, data } = useMutation(postPutFixture);
  return { data, postFixture: mutate, isLoading, isError };
};
