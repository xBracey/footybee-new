import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetMe } from "../../queries/useGetMe";
import { useGetTeams } from "../../queries/useGetTeams";
import { useGetFixtures } from "../../queries/useGetFixtures";
import { useGetUsers } from "../../queries/useGetUsers";
import AdminEntity from "../../components/Admin/AdminEntity";
import { useMemo } from "react";
import dayjs from "dayjs";
import Loading from "../../components/Loading";
import { useGetPlayers } from "../../queries/useGetPlayers";
import { useGetRoundFixtures } from "../../queries/useGetRoundFixtures";

const Admin = () => {
  const { data: user, isLoading: userIsLoading } = useGetMe();
  const { data: teams } = useGetTeams();
  const { data: players } = useGetPlayers();
  const { data: fixtures } = useGetFixtures();
  const { data: roundFixtures } = useGetRoundFixtures();
  const { data: users } = useGetUsers();

  console.log(roundFixtures);

  const fixuresWithNames = useMemo(() => {
    return fixtures.map((fixture) => {
      const homeTeam = teams.find((team) => team.id === fixture.homeTeamId);
      const awayTeam = teams.find((team) => team.id === fixture.awayTeamId);

      return {
        id: fixture.id,
        name: fixture.homeTeamId
          ? `${homeTeam?.name} vs ${awayTeam?.name} @ ${dayjs(
              fixture.dateTime
            ).format("D MMM HH:mm")}`
          : "TBD",
      };
    });
  }, [fixtures, teams]);

  const roundFixturesWithNames = useMemo(() => {
    return roundFixtures.map((roundFixture) => {
      const homeTeam = teams.find(
        (team) => team.id === roundFixture.homeTeamId
      );
      const awayTeam = teams.find(
        (team) => team.id === roundFixture.awayTeamId
      );

      return {
        id: roundFixture.id,
        name: roundFixture.homeTeamId
          ? `${homeTeam?.name} vs ${awayTeam?.name} @ ${dayjs(
              roundFixture.dateTime
            ).format("D MMM HH:mm")}`
          : "TBD",
      };
    });
  }, [roundFixtures]);

  if (userIsLoading) {
    return <Loading />;
  }

  if (!user || !user.admin) {
    return <Navigate to="/" />;
  }

  const onUserDelete = (userId: string | number) => {
    // TODO: Delete user
    console.log(`Deleting user ${userId}`);
  };

  const onTeamDelete = (teamId: string | number) => {
    // TODO: Delete team
    console.log(`Deleting team ${teamId}`);
  };

  const onFixtureDelete = (fixtureId: string | number) => {
    // TODO: Delete fixture
    console.log(`Deleting fixture ${fixtureId}`);
  };

  const onPlayerDelete = (playerId: string | number) => {
    // TODO: Delete player
    console.log(`Deleting player ${playerId}`);
  };

  const onRoundFixtureDelete = (roundFixtureId: string | number) => {
    // TODO: Delete round fixture
    console.log(`Deleting round fixture ${roundFixtureId}`);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4">
        <AdminEntity
          name="Fixtures"
          entities={fixuresWithNames}
          path="fixtures"
          onDelete={onFixtureDelete}
        />

        <AdminEntity
          name="Round Fixtures"
          entities={roundFixturesWithNames}
          path="round-fixtures"
          onDelete={onRoundFixtureDelete}
        />

        <AdminEntity
          name="Players"
          entities={players}
          path="players"
          onDelete={onPlayerDelete}
        />

        <AdminEntity
          name="Users"
          entities={users.map((user) => ({
            id: user.username,
            name: user.username,
          }))}
          path="users"
          onDelete={onUserDelete}
          hasAddNew={false}
        />

        <AdminEntity
          name="Teams"
          entities={teams}
          path="teams"
          onDelete={onTeamDelete}
        />
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/admin/")({
  component: Admin,
});
