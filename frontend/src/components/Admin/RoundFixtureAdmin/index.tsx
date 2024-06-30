import { useEffect, useMemo } from "react";
import { useGetRoundFixture } from "../../../queries/useGetRoundFixture";
import AdminAddEdit from "../AdminAddEdit";
import { useGetTeams } from "../../../queries/useGetTeams";
import { useForm } from "@mantine/form";
import { useGetRounds } from "../../../queries/useGetRounds";
import { Button, LoadingOverlay, NumberInput, Select } from "@mantine/core";
import { RoundFixture } from "../../../../../shared/types/database";
import { DateTimePicker } from "@mantine/dates";
import { useNavigate } from "@tanstack/react-router";
import { usePostRoundFixture } from "../../../queries/usePostRoundFixture";

interface IFixtureAdmin {
  id?: number;
}

const FixtureAdmin = ({ id }: IFixtureAdmin) => {
  const { data: roundFixture, isLoading } = useGetRoundFixture(id);
  const { data: teams, isLoading: isLoadingTeams } = useGetTeams();
  const { data: rounds, isLoading: isLoadingRounds } = useGetRounds();
  const { postRoundFixture, isLoading: isLoadingFixture } =
    usePostRoundFixture(id);
  const navigate = useNavigate();

  const form = useForm<Omit<RoundFixture, "id">>({
    mode: "controlled",
    initialValues: {
      round: undefined,
      homeTeamId: undefined,
      awayTeamId: undefined,
      dateTime: undefined,
      homeTeamScore: undefined,
      awayTeamScore: undefined,
      homeTeamExtraTimeScore: undefined,
      awayTeamExtraTimeScore: undefined,
      homeTeamPenaltiesScore: undefined,
      awayTeamPenaltiesScore: undefined,
      order: undefined,
    },
    validate: (values) => ({
      round: values.round ? undefined : "Round is required",
      homeTeamId: values.homeTeamId ? undefined : "Home team is required",
      awayTeamId: values.awayTeamId ? undefined : "Away team is required",
      dateTime: values.dateTime ? undefined : "Date is required",
    }),
  });

  useEffect(() => {
    if (roundFixture) {
      form.setValues({
        round: roundFixture.round,
        homeTeamId: roundFixture.homeTeamId,
        awayTeamId: roundFixture.awayTeamId,
        dateTime: roundFixture.dateTime,
        homeTeamScore: roundFixture.homeTeamScore,
        awayTeamScore: roundFixture.awayTeamScore,
        homeTeamExtraTimeScore: roundFixture.homeTeamExtraTimeScore,
        awayTeamExtraTimeScore: roundFixture.awayTeamExtraTimeScore,
        homeTeamPenaltiesScore: roundFixture.homeTeamPenaltiesScore,
        awayTeamPenaltiesScore: roundFixture.awayTeamPenaltiesScore,
        order: roundFixture.order,
      });
    }
  }, [roundFixture]);

  const teamsOptions = useMemo(() => {
    if (!teams) return [];

    return teams.map((team) => ({
      label: team.name,
      value: team.id.toString(),
    }));
  }, [teams, form.values.round]);

  return (
    <AdminAddEdit
      id={id}
      isLoading={isLoading}
      entityIsDefined={!!roundFixture}
      title="Round Fixture"
    >
      <LoadingOverlay
        visible={isLoadingFixture || isLoadingTeams || isLoadingRounds}
      />
      <form
        onSubmit={form.onSubmit((values) => {
          postRoundFixture(values);
          navigate({ to: "/admin" });
        })}
        className="flex flex-col gap-4"
      >
        <Select
          id="round"
          label="Round"
          required
          data={rounds}
          {...form.getInputProps("round")}
        />

        <Select
          id="homeTeamId"
          label="Home Team"
          required
          data={teamsOptions}
          disabled={!form.values.round}
          searchable
          {...form.getInputProps("homeTeamId")}
          value={form.values.homeTeamId?.toString()}
        />

        <Select
          id="awayTeamId"
          label="Away Team"
          required
          data={teamsOptions}
          disabled={!form.values.round}
          searchable
          {...form.getInputProps("awayTeamId")}
          value={form.values.awayTeamId?.toString()}
        />

        <DateTimePicker
          id="dateTime"
          label="Date"
          required
          {...form.getInputProps("dateTime")}
          value={new Date(form.values.dateTime ?? new Date())}
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

        <NumberInput
          id="homeTeamExtraTimeScore"
          label="Home Team Extra Time Score"
          {...form.getInputProps("homeTeamExtraTimeScore")}
        />

        <NumberInput
          id="awayTeamExtraTimeScore"
          label="Away Team Extra Time Score"
          {...form.getInputProps("awayTeamExtraTimeScore")}
        />

        <NumberInput
          id="homeTeamPenaltiesScore"
          label="Home Team Penalties Score"
          {...form.getInputProps("homeTeamPenaltiesScore")}
        />

        <NumberInput
          id="awayTeamPenaltiesScore"
          label="Away Team Penalties Score"
          {...form.getInputProps("awayTeamPenaltiesScore")}
        />

        <NumberInput
          id="order"
          label="Order"
          required
          min={0}
          max={7}
          {...form.getInputProps("order")}
        />

        <Button type="submit">Submit</Button>
      </form>
    </AdminAddEdit>
  );
};

export default FixtureAdmin;
