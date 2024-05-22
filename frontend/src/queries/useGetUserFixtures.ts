import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { UserFixture } from "../../../shared/types/database";

export const getUserFixtures = async (username: string) => {
  return apiRequest<UserFixture[]>(`/users/fixtures/${username}`, {
    method: "GET",
  });
};

export const useGetUserFixtures = (
  username: string,
  onSuccess?: (userFixtures: UserFixture[]) => void
) => {
  const query = useQuery(
    ["getUserFixtures", username],
    () => getUserFixtures(username),
    { onSuccess }
  );

  return { ...query, data: query.data || [] };
};
