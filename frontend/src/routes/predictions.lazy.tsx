import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetFixtures } from "../queries/useGetFixtures";
import { useGetPredictions } from "../queries/useGetPredictions";
import { PredictionsPage } from "../pages/Predictions";
import { useGetMe } from "../queries/useGetMe";

const Predictions = () => {
  const user = useGetMe();
  const teams = useGetTeams();
  const fixtures = useGetFixtures();
  const predictions = useGetPredictions();

  if (!teams || !fixtures || !predictions || !user) {
    return <div className="p-4">Loading</div>;
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
