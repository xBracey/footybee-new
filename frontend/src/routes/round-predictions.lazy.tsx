import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetMe } from "../queries/useGetMe";
import Loading from "../components/Loading";
import { useGetRoundFixtures } from "../queries/useGetRoundFixtures";
import RoundPredictions from "../components/RoundPredictions";

const RoundPredictionsRoute = () => {
  const { data: user, isLoading: userIsLoading } = useGetMe();
  const { data: teams, isLoading: teamsIsLoading } = useGetTeams();
  const { data: roundFixtures, isLoading: roundFixturesIsLoading } =
    useGetRoundFixtures();

  if (userIsLoading || teamsIsLoading || roundFixturesIsLoading) {
    return <Loading />;
  }

  if (!user || !user.username) {
    return <Navigate to="/login" />;
  }

  return <RoundPredictions teams={teams} roundFixtures={roundFixtures} />;
};

export const Route = createLazyFileRoute("/round-predictions")({
  component: RoundPredictionsRoute,
});
