import { useQuery } from "react-query";
import { apiRequest } from "./utils";

export const getGroups = async () => {
  return apiRequest<string[]>(`/groups`, {
    method: "GET",
  });
};

export const useGetGroups = () => {
  const query = useQuery(["getGroups"], () => getGroups());

  return { ...query, data: query.data || [] };
};
