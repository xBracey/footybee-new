import { createLazyFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useGetMe } from "../queries/useGetMe";
import { useUserStore } from "../zustand/user";
import Loading from "../components/Loading";
import TodaysMatches from "../components/TodaysMatches";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetFixtures } from "../queries/useGetFixtures";
import { useGetResults } from "../queries/useGetResults";
import Box from "../components/Box";
import { useGetUserLeagues } from "../queries/useGetUserLeagues";
import AddLeagueModal from "../components/AddLeagueModal";
import { useAddLeague } from "../queries/useAddLeague";
import { useState } from "react";

const Dashboard = () => {
  const { token } = useUserStore();
  const { data: user } = useGetMe();
  const { data: teams } = useGetTeams();
  const { data: fixtures } = useGetFixtures();
  const { data: results } = useGetResults();
  const { data: leagues } = useGetUserLeagues();
  const [addLeagueModalOpened, setAddLeagueModalOpened] = useState(false);

  const onAddLeagueSuccess = () => {
    setAddLeagueModalOpened(false);
  };

  const { addLeague, isLoading: isAddingLeague } =
    useAddLeague(onAddLeagueSuccess);

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
          <Box className="relative my-4 text-center">
            <h1 className="text-xl">{user.username} Leagues</h1>

            {leagues.length === 0 && (
              <p className="mt-4">You are not a member of any leagues</p>
            )}

            {leagues.map((league) => (
              <Link to={`/league/${league.id}`} key={league.id}>
                {league.name}
              </Link>
            ))}

            <AddLeagueModal
              addLeague={addLeague}
              isLoading={isAddingLeague}
              opened={addLeagueModalOpened}
              setOpened={setAddLeagueModalOpened}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/dashboard")({
  component: Dashboard,
});
