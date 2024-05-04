import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { Fixture } from "../../../shared/types/database";

export const getFixture = async (id?: number) => {
  if (!id) {
    return null;
  }

  return apiRequest<Fixture>(`/fixtures/${id}`, {
    method: "GET",
  });
};

export const useGetFixture = (id?: number) => {
  const query = useQuery(["getFixture", id], () => getFixture(id));

  return query;
};
