import { useNavigate } from "@tanstack/react-router";
import { useGetTeam } from "../../../queries/useGetTeam";
import AdminAddEdit from "../AdminAddEdit";
import { useForm } from "@mantine/form";
import { Team } from "../../../../../shared/types/database";
import { useEffect } from "react";
import { useGetGroups } from "../../../queries/useGetGroups";
import { usePostTeam } from "../../../queries/usePostTeam";
import { Button, LoadingOverlay, Select, TextInput } from "@mantine/core";

interface ITeamAdmin {
  id?: number;
}

const TeamAdmin = ({ id }: ITeamAdmin) => {
  const { data: team, isLoading } = useGetTeam(id);
  const { data: groups, isLoading: isLoadingGroups } = useGetGroups();
  const { postTeam, isLoading: isLoadingTeam } = usePostTeam(id);

  const navigate = useNavigate();

  const form = useForm<Omit<Team, "id">>({
    mode: "controlled",
    initialValues: {
      groupLetter: undefined,
      name: undefined,
    },
    validate: (values) => ({
      groupLetter: values.groupLetter ? undefined : "Group is required",
      name: values.name ? undefined : "Name is required",
    }),
  });

  useEffect(() => {
    if (team) {
      form.setValues({
        groupLetter: team.groupLetter,
        name: team.name,
      });
    }
  }, [team]);

  return (
    <AdminAddEdit
      id={id}
      isLoading={isLoading}
      entityIsDefined={!!team}
      title="Team"
    >
      <LoadingOverlay visible={isLoadingTeam || isLoadingGroups} />
      <form
        onSubmit={form.onSubmit((values) => {
          postTeam(values);
          navigate({ to: "/admin" });
        })}
        className="flex flex-col gap-4"
      >
        <Select
          label="Group"
          placeholder="Select group"
          data={groups}
          {...form.getInputProps("groupLetter")}
        />

        <TextInput id="name" label="Name" {...form.getInputProps("name")} />

        <Button type="submit">Submit</Button>
      </form>
    </AdminAddEdit>
  );
};

export default TeamAdmin;
