import {
  Button,
  LoadingOverlay,
  Modal,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { LeagueWithPassword } from "../../../../shared/types/database";
import { useForm } from "@mantine/form";

interface IJoinLeagueModal {
  joinLeague: (league: Omit<LeagueWithPassword, "name">) => void;
  isLoading: boolean;
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

const JoinLeagueModal = ({
  joinLeague,
  isLoading,
  opened,
  setOpened,
}: IJoinLeagueModal) => {
  const form = useForm<Omit<LeagueWithPassword, "name">>({
    mode: "controlled",
    initialValues: { id: "", password: "" },
    validate: (values) => ({
      id: values.id ? undefined : "ID is required",
      password: values.password ? undefined : "Password is required",
    }),
  });

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Join Existing League"
      >
        <LoadingOverlay visible={isLoading} />

        <form
          onSubmit={form.onSubmit((values) => {
            joinLeague(values);
          })}
          className="flex flex-col gap-4"
        >
          <TextInput id="id" label="ID" {...form.getInputProps("id")} />
          <PasswordInput
            id="password"
            label="Password"
            {...form.getInputProps("password")}
          />

          <Button type="submit">Join League</Button>
        </form>
      </Modal>

      <Button
        className="mt-4"
        onClick={() => setOpened(true)}
        size="lg"
        color="blue"
      >
        Join Existing League
      </Button>
    </div>
  );
};

export default JoinLeagueModal;
