import { createFileRoute } from "@tanstack/react-router";
import Loading from "../components/Loading";
import { useGetLeaderboard } from "../queries/useGetLeaderboard";
import { LeaguePage } from "../pages/League";
import { useGetMe } from "../queries/useGetMe";

const Leaderboard = () => {
  const { data: user } = useGetMe();
  const { data: leaderboard, isLoading: leaderboardIsLoading } =
    useGetLeaderboard();

  if (leaderboardIsLoading) {
    return <Loading />;
  }

  return (
    <LeaguePage
      league={{
        id: "global",
        name: "Global Leaderboard",
        ranking: leaderboard,
        admin: false,
        user_points: 0,
        user_position: 0,
      }}
      user={user ?? undefined}
    />
  );
};

export const Route = createFileRoute("/leaderboard")({
  component: Leaderboard,
});
