import { useEffect, useMemo } from "react";
import { useGetFixture } from "../../../queries/useGetFixture";
import AdminAddEdit from "../AdminAddEdit";
import { useGetTeams } from "../../../queries/useGetTeams";
import { useForm } from "@mantine/form";
import { useGetGroups } from "../../../queries/useGetGroups";
import { usePostFixture } from "../../../queries/usePostFixture";
import { Button, LoadingOverlay, NumberInput, Select } from "@mantine/core";
import { Fixture } from "../../../../../shared/types/database";
import { DateTimePicker } from "@mantine/dates";
import { useNavigate } from "@tanstack/react-router";

interface IFixtureAdmin {
  id?: number;
}

const FixtureAdmin = ({ id }: IFixtureAdmin) => {
  const { data: fixture, isLoading } = useGetFixture(id);
  const { data: teams, isLoading: isLoadingTeams } = useGetTeams();
  const { data: groups, isLoading: isLoadingGroups } = useGetGroups();
  const { postFixture, isLoading: isLoadingFixture } = usePostFixture(id);
  const navigate = useNavigate();

  const form = useForm<Omit<Fixture, "id">>({
    mode: "controlled",
    initialValues: {
      groupLetter: undefined,
      homeTeamId: undefined,
      awayTeamId: undefined,
      dateTime: undefined,
      homeTeamScore: undefined,
      awayTeamScore: undefined,
    },
    validate: (values) => ({
      groupLetter: values.groupLetter ? undefined : "Group is required",
      homeTeamId: values.homeTeamId ? undefined : "Home team is required",
      awayTeamId: values.awayTeamId ? undefined : "Away team is required",
      dateTime: values.dateTime ? undefined : "Date is required",
    }),
  });

  useEffect(() => {
    if (fixture) {
      form.setValues({
        groupLetter: fixture.groupLetter,
        homeTeamId: fixture.homeTeamId,
        awayTeamId: fixture.awayTeamId,
        dateTime: fixture.dateTime,
        homeTeamScore: fixture.homeTeamScore,
        awayTeamScore: fixture.awayTeamScore,
      });
    }
  }, [fixture]);

  const teamsOptions = useMemo(() => {
    if (!teams) return [];

    return teams
      .filter((team) => team.groupLetter === form.values?.groupLetter)
      .map((team) => ({
        label: team.name,
        value: team.id.toString(),
      }));
  }, [teams, form.values.groupLetter]);

  return (
    <AdminAddEdit
      id={id}
      isLoading={isLoading}
      entityIsDefined={!!fixture}
      title="Fixture"
    >
      <LoadingOverlay
        visible={isLoadingFixture || isLoadingTeams || isLoadingGroups}
      />
      <form
        onSubmit={form.onSubmit((values) => {
          postFixture(values);
          navigate({ to: "/admin" });
        })}
        className="flex flex-col gap-4"
      >
        <Select
          id="groupLetter"
          label="Group Letter"
          required
          data={groups}
          {...form.getInputProps("groupLetter")}
        />

        <Select
          id="homeTeamId"
          label="Home Team"
          required
          data={teamsOptions}
          disabled={!form.values.groupLetter}
          {...form.getInputProps("homeTeamId")}
          value={form.values.homeTeamId?.toString()}
        />

        <Select
          id="awayTeamId"
          label="Away Team"
          required
          data={teamsOptions}
          disabled={!form.values.groupLetter}
          {...form.getInputProps("awayTeamId")}
          value={form.values.awayTeamId?.toString()}
        />

        <DateTimePicker
          id="dateTime"
          label="Date"
          required
          {...form.getInputProps("dateTime")}
          value={new Date(form.values.dateTime ?? 0)}
          onChange={(value) =>
            form.setValues({ ...form.values, dateTime: value?.getTime() })
          }
        />

        <NumberInput
          id="homeTeamScore"
          label="Home Team Score"
          {...form.getInputProps("homeTeamScore")}
        />

        <NumberInput
          id="awayTeamScore"
          label="Away Team Score"
          {...form.getInputProps("awayTeamScore")}
        />

        <Button type="submit">Submit</Button>
      </form>
    </AdminAddEdit>
  );
};

export default FixtureAdmin;
