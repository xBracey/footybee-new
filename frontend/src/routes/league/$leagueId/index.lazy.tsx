import { createFileRoute, Navigate } from "@tanstack/react-router";
import Loading from "../../../components/Loading";
import { useGetMe } from "../../../queries/useGetMe";
import { useGetUserLeagues } from "../../../queries/useGetUserLeagues";
import { LeaguePage } from "../../../pages/League";

const League = () => {
  const { leagueId } = Route.useParams();

  const { data: user } = useGetMe();
  const { data: userLeagues, isLoading: userLeaguesIsLoading } =
    useGetUserLeagues();

  if (userLeaguesIsLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  const league = userLeagues?.find((league) => league.id === leagueId);

  if (!league) {
    return <Navigate to="/" />;
  }

  return <LeaguePage user={user} league={league} />;
};

export const Route = createFileRoute("/league/$leagueId/")({
  component: League,
});
