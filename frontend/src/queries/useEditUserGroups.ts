import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { UserGroup } from "../../../shared/types/database";
import { useUserStore } from "../zustand/user";

interface PostUserGroupsRequest {
  token: string;
  userGroups: Omit<UserGroup, "username" | "points">[];
}

export const editUserGroups = async ({
  token,
  userGroups,
}: PostUserGroupsRequest) => {
  const resp = await apiRequest<UserGroup[]>(`/users/groups`, {
    method: "POST",
    data: userGroups,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return resp;
};

export const useEditUserGroups = (onSuccess: (data: UserGroup[]) => void) => {
  const { token } = useUserStore();

  const putUserGroups = (
    userGroups: Omit<UserGroup, "username" | "points">[]
  ) => {
    return editUserGroups({
      token,
      userGroups,
    });
  };

  const { mutate, isLoading, isError, data } = useMutation(putUserGroups, {
    onSuccess,
  });
  return { data, editUserGroups: mutate, isLoading, isError };
};
