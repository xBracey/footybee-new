import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetMe } from "../queries/useGetMe";
import { useUserStore } from "../zustand/user";
import Loading from "../components/Loading";
import TodaysMatches from "../components/TodaysMatches";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetFixtures } from "../queries/useGetFixtures";
import { useGetResults } from "../queries/useGetResults";
import Box from "../components/Box";

const Dashboard = () => {
  const { token } = useUserStore();
  const { data: user } = useGetMe();
  const { data: teams } = useGetTeams();
  const { data: fixtures } = useGetFixtures();
  const { data: results } = useGetResults();

  if (!token) {
    return <Navigate to="/login" from="/dashboard" />;
  }

  if (!user) {
    return <Loading />;
  }

  return (
    <div>
      <TodaysMatches teams={teams} fixtures={fixtures} results={results} />

      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto w-full max-w-3xl">
          <Box className="my-4 text-center">
            <h1>Welcome {user.username}</h1>
          </Box>
        </div>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/dashboard")({
  component: Dashboard,
});
