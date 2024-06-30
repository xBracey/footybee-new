import { createLazyFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useGetMe } from "../queries/useGetMe";
import { useUserStore } from "../zustand/user";
import Loading from "../components/Loading";
import TodaysMatches from "../components/TodaysMatches";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetFixtures } from "../queries/useGetFixtures";
import { useGetUserLeagues } from "../queries/useGetUserLeagues";
import UserLeagues from "../components/UserLeagues";
import Box from "../components/Box";
import { useState } from "react";
import { useGetRoundFixtures } from "../queries/useGetRoundFixtures";

const Dashboard = () => {
  const [leagueTimestamp, setLeagueTimestamp] = useState(Date.now());
  const { token } = useUserStore();
  const { data: user } = useGetMe();
  const { data: teams } = useGetTeams();
  const { data: fixtures } = useGetFixtures();
  const { data: roundFixtures } = useGetRoundFixtures();
  const { data: leagues } = useGetUserLeagues(leagueTimestamp);

  if (!token) {
    return <Navigate to="/login" from="/dashboard" />;
  }

  if (!user) {
    return <Loading />;
  }

  return (
    <div>
      <TodaysMatches teams={teams} fixtures={[...fixtures, ...roundFixtures]} />

      <Box className="mx-auto mt-2 max-w-xl border-b-4 border-white p-1 text-center text-xl font-bold text-gray-800 md:text-2xl">
        {user.username}'s Leagues
      </Box>

      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto w-full max-w-3xl">
          <UserLeagues
            user={user}
            leagues={leagues}
            setLeagueTimestamp={setLeagueTimestamp}
          />
        </div>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/dashboard")({
  component: Dashboard,
});
