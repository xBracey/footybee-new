import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetFixtures } from "../queries/useGetFixtures";
import { useGetPredictions } from "../queries/useGetPredictions";
import { PredictionsPage } from "../pages/Predictions";
import { useGetMe } from "../queries/useGetMe";
import Loading from "../components/Loading";

const Predictions = () => {
  const { data: user, isLoading: userIsLoading } = useGetMe();
  const { data: teams } = useGetTeams();
  const { data: fixtures } = useGetFixtures();
  const { data: predictions } = useGetPredictions();

  if (userIsLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!teams || !fixtures || !predictions) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <PredictionsPage
        teams={teams}
        fixtures={fixtures}
        predictions={predictions}
        username={user.username}
      />
    </div>
  );
};

export const Route = createLazyFileRoute("/predictions")({
  component: Predictions,
});
