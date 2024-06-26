import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { RoundFixture } from "../../../shared/types/database";

export const getRoundFixture = async (id?: number) => {
  if (!id) {
    return null;
  }

  return apiRequest<RoundFixture>(`/round-fixtures/${id}`, {
    method: "GET",
  });
};

export const useGetRoundFixture = (id?: number) => {
  const query = useQuery(["getRoundFixture", id], () => getRoundFixture(id));

  return query;
};
