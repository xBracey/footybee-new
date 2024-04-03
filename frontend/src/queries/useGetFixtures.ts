import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { Fixture } from "../../../shared/types/database";

export const getFixtures = async () => {
  return apiRequest<Fixture[]>(`/fixtures`, {
    method: "GET",
  });
};

export const useGetFixtures = () => {
  const { data } = useQuery(["getFixtures"], () => getFixtures());

  return data;
};
