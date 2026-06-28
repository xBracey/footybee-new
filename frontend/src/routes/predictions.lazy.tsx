import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetFixtures } from "../queries/useGetFixtures";
import { useGetMe } from "../queries/useGetMe";
import Loading from "../components/Loading";
import { PredictionsLayout } from "../layouts/Predictions";
import { useGetPlayers } from "../queries/useGetPlayers";
import { useGetLockStatus } from "../queries/useGetLockStatus";
import { CURRENT_STAGE } from "../../../shared/config";

const Predictions = () => {
  // During the knockout stage, /predictions is the group-stage page
  // and the bracket predictions live at /round-predictions. Redirect
  // so users always land on the active predictions view.
  if (CURRENT_STAGE === "knockout") {
    return <Navigate to="/round-predictions" />;
  }

  const { data: user, isLoading: userIsLoading } = useGetMe();
  const { data: teams } = useGetTeams();
  const { data: fixtures } = useGetFixtures();
  const { data: players } = useGetPlayers();
  const { data: lockStatus } = useGetLockStatus();

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
      isPredictionLocked={true}
    />
  );
};

export const Route = createLazyFileRoute("/predictions")({
  component: Predictions,
});
