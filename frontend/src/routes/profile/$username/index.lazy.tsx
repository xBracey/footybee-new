import { createFileRoute, Navigate } from "@tanstack/react-router";
import Loading from "../../../components/Loading";
import { useGetUser } from "../../../queries/useGetUser";
import { useGetUserFixtures } from "../../../queries/useGetUserFixtures";
import { useGetUserGroups } from "../../../queries/useGetUserGroups";
import { useGetTeams } from "../../../queries/useGetTeams";
import { useGetFixtures } from "../../../queries/useGetFixtures";
import { ProfilePage } from "../../../pages/Profile";
import { useGetMe } from "../../../queries/useGetMe";
import { useGetPredictions } from "../../../queries/useGetPredictions";
import { useGetPlayers } from "../../../queries/useGetPlayers";
import { useGetRoundFixtures } from "../../../queries/useGetRoundFixtures";
import { useGetUserTeams } from "../../../queries/useGetUserTeams";

const Profile = () => {
  const { username } = Route.useParams();
  const { data: me } = useGetMe();
  const { data: user, isLoading: userIsLoading } = useGetUser(username);
  const { data: userFixtures, isLoading: userFixturesIsLoading } =
    useGetUserFixtures(username);
  const { data: userGroups, isLoading: userGroupsIsLoading } =
    useGetUserGroups(username);
  const { data: teams, isLoading: teamsIsLoading } = useGetTeams();
  const { data: fixtures, isLoading: fixturesIsLoading } = useGetFixtures();
  const { data: predictions, isLoading: predictionsIsLoading } =
    useGetPredictions(username);
  const { data: players, isLoading: playersIsLoading } = useGetPlayers();
  const { data: roundFixtures, isLoading: roundFixturesIsLoading } =
    useGetRoundFixtures();
  const { data: userTeams, isLoading: userTeamsIsLoading } =
    useGetUserTeams(username);

  if (userIsLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (
    userFixturesIsLoading ||
    userGroupsIsLoading ||
    teamsIsLoading ||
    fixturesIsLoading ||
    predictionsIsLoading ||
    playersIsLoading ||
    roundFixturesIsLoading ||
    userTeamsIsLoading
  ) {
    return <Loading />;
  }

  return (
    <ProfilePage
      user={user}
      userFixtures={userFixtures}
      userGroups={userGroups}
      userTeams={userTeams}
      teams={teams}
      fixtures={fixtures}
      roundFixtures={roundFixtures}
      predictions={predictions}
      players={players}
      isCurrentUser={me && me.username === username}
    />
  );
};

export const Route = createFileRoute("/profile/$username/")({
  component: Profile,
});
