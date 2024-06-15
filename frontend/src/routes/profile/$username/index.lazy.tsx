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
    predictionsIsLoading
  ) {
    return <Loading />;
  }

  return (
    <ProfilePage
      user={user}
      userFixtures={userFixtures}
      userGroups={userGroups}
      teams={teams}
      fixtures={fixtures}
      predictions={predictions}
      isCurrentUser={me && me.username === username}
    />
  );
};

export const Route = createFileRoute("/profile/$username/")({
  component: Profile,
});
