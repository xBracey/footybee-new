import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetFixtures } from "../queries/useGetFixtures";
import { useGetMe } from "../queries/useGetMe";
import Loading from "../components/Loading";
import { PredictionsLayout } from "../layouts/Predictions";
import { useGetPlayers } from "../queries/useGetPlayers";

const Predictions = () => {
  const { data: user, isLoading: userIsLoading } = useGetMe();
  const { data: teams } = useGetTeams();
  const { data: fixtures } = useGetFixtures();
  const { data: players } = useGetPlayers();

  if (userIsLoading) {
    return <Loading />;
  }

  if (!user || !user.username) {
    return <Navigate to="/login" />;
  }

  return (
    <PredictionsLayout
      username={user.username}
      teams={teams}
      fixtures={fixtures}
      players={players}
    />
  );
};

export const Route = createLazyFileRoute("/predictions")({
  component: Predictions,
});
