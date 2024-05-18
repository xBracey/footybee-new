import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { UserGroup } from "../../../shared/types/database";

interface PostUserGroupsRequest {
  username: string;
  userGroups: Omit<UserGroup, "username">[];
}

export const editUserGroups = async ({
  username,
  userGroups,
}: PostUserGroupsRequest) => {
  const resp = await apiRequest<UserGroup[]>(`/users/${username}/groups`, {
    method: "POST",
    data: userGroups,
  });

  return resp;
};

export const useEditUserGroups = (
  username: string,
  onSuccess: (data: UserGroup[]) => void
) => {
  const putUserGroups = (userGroups: Omit<UserGroup, "username">[]) => {
    return editUserGroups({
      username,
      userGroups,
    });
  };

  const { mutate, isLoading, isError, data } = useMutation(putUserGroups, {
    onSuccess,
  });
  return { data, editUserGroups: mutate, isLoading, isError };
};
