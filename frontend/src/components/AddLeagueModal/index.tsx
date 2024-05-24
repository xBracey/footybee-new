import {
  Button,
  LoadingOverlay,
  Modal,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { LeagueWithPassword } from "../../../../shared/types/database";
import { useForm } from "@mantine/form";
import { useState } from "react";

interface IAddLeagueModal {
  addLeague: (league: LeagueWithPassword) => void;
  isLoading: boolean;
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

const AddLeagueModal = ({
  addLeague,
  isLoading,
  opened,
  setOpened,
}: IAddLeagueModal) => {
  const form = useForm<LeagueWithPassword>({
    mode: "controlled",
    initialValues: {
      id: "",
      name: "",
      password: "",
    },
    validate: (values) => ({
      id: values.id ? undefined : "ID is required",
      name: values.name ? undefined : "Name is required",
      password: values.password ? undefined : "Password is required",
    }),
  });

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add New League"
      >
        <LoadingOverlay visible={isLoading} />

        <form
          onSubmit={form.onSubmit((values) => {
            addLeague(values);
          })}
          className="flex flex-col gap-4"
        >
          <TextInput id="name" label="Name" {...form.getInputProps("name")} />
          <TextInput id="id" label="ID" {...form.getInputProps("id")} />
          <PasswordInput
            id="password"
            label="Password"
            {...form.getInputProps("password")}
          />

          <Button type="submit">Add League</Button>
        </form>
      </Modal>

      <Button className="mt-4" onClick={() => setOpened(true)} size="lg">
        Add New League
      </Button>
    </div>
  );
};

export default AddLeagueModal;
