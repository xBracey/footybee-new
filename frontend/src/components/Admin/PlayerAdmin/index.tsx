import { useNavigate } from "@tanstack/react-router";
import { useGetPlayer } from "../../../queries/useGetPlayer";
import AdminAddEdit from "../AdminAddEdit";
import { useForm } from "@mantine/form";
import { Player } from "../../../../../shared/types/database";
import { useEffect } from "react";
import { usePostPlayer } from "../../../queries/usePostPlayer";
import {
  Button,
  LoadingOverlay,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useGetTeams } from "../../../queries/useGetTeams";

interface IPlayerAdmin {
  id?: number;
}

const PlayerAdmin = ({ id }: IPlayerAdmin) => {
  const { data: player, isLoading } = useGetPlayer(id);
  const { data: teams, isLoading: isLoadingTeams } = useGetTeams();
  const { postPlayer, isLoading: isLoadingPlayer } = usePostPlayer(id);

  const navigate = useNavigate();

  const form = useForm<Omit<Player, "id">>({
    mode: "controlled",
    initialValues: {
      teamId: undefined,
      name: undefined,
      goals: undefined,
    },
    validate: (values) => ({
      teamId: values.teamId ? undefined : "Team is required",
      name: values.name ? undefined : "Name is required",
      goals: values.goals ? undefined : "Goals is required",
    }),
  });

  useEffect(() => {
    if (player) {
      form.setValues({
        teamId: parseInt(`${player.teamId}`),
        name: player.name,
        goals: player.goals,
      });
    }
  }, [player]);

  return (
    <AdminAddEdit
      id={id}
      isLoading={isLoading}
      entityIsDefined={!!player}
      title="Player"
    >
      <LoadingOverlay visible={isLoadingPlayer || isLoadingTeams} />
      <form
        onSubmit={form.onSubmit((values) => {
          postPlayer(values);
          navigate({ to: "/admin" });
        })}
        className="flex flex-col gap-4"
      >
        <Select
          label="Team"
          placeholder="Select team"
          data={teams.map((team) => ({
            value: team.id.toString(),
            label: team.name,
          }))}
          searchable
          {...form.getInputProps("teamId")}
        />

        <TextInput id="name" label="Name" {...form.getInputProps("name")} />

        <NumberInput
          id="goals"
          label="Goals"
          {...form.getInputProps("goals")}
        />

        <Button type="submit">Submit</Button>
      </form>
    </AdminAddEdit>
  );
};

export default PlayerAdmin;
