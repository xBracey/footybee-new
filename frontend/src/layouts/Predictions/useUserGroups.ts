import { useCallback, useState } from "react";
import { UserGroup } from "../../../../shared/types/database";
import { useEditUserGroups } from "../../queries/useEditUserGroups";
import { useGetUserGroups } from "../../queries/useGetUserGroups";
import { usePredictionStore } from "../../zustand/predictions";
import { useDebouncedCallback } from "use-debounce";

export const useUserGroups = (username: string) => {
  const [firstGroupSwitchLoad, setFirstGroupSwitchLoad] = useState(false);

  const { state, dispatch } = usePredictionStore();

  const onEditUserGroupsSuccess = (data: UserGroup[]) => {
    dispatch({
      type: "EDIT_GROUP_SWITCHES",
      payload: Object.fromEntries(
        data.map((userGroup) => [
          userGroup.groupLetter,
          {
            switches: userGroup.switches,
            saved: true,
          },
        ])
      ),
    });
  };

  const { editUserGroups: editGroupSwitches } = useEditUserGroups(
    onEditUserGroupsSuccess
  );

  const onEditGroupSwitches = useDebouncedCallback(
    useCallback(() => {
      const localGroupSwitches = Object.entries(state.groupSwitches)
        .filter(([_, groupSwitch]) => groupSwitch.saved === false)
        .map(([groupLetter, groupSwitch]) => ({
          groupLetter,
          switches: groupSwitch.switches,
        }));

      editGroupSwitches(localGroupSwitches);
    }, [state.groupSwitches, editGroupSwitches]),
    2000
  );

  const onEditGroupSwitch = (groupLetter: string, switches: number[]) => {
    dispatch({
      type: "EDIT_GROUP_SWITCH",
      payload: { groupLetter, switches, saved: false },
    });
    onEditGroupSwitches();
  };

  const onUserGroupsSuccess = (data: UserGroup[]) => {
    if (firstGroupSwitchLoad) {
      return;
    }

    setFirstGroupSwitchLoad(true);

    dispatch({
      type: "EDIT_GROUP_SWITCHES",
      payload: Object.fromEntries(
        data.map((userGroup) => [
          userGroup.groupLetter,
          {
            switches: userGroup.switches,
            saved: true,
          },
        ])
      ),
    });
  };

  useGetUserGroups(username, onUserGroupsSuccess);

  return { editGroupSwitches, onEditGroupSwitch };
};
