import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetFixtures } from "../queries/useGetFixtures";
import { useGetMe } from "../queries/useGetMe";
import Loading from "../components/Loading";
import { PredictionsLayout } from "../layouts/PredictionsLayout";

const Predictions = () => {
  const { data: user, isLoading: userIsLoading } = useGetMe();
  const { data: teams } = useGetTeams();
  const { data: fixtures } = useGetFixtures();

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
    />
  );
};

export const Route = createLazyFileRoute("/predictions")({
  component: Predictions,
});
