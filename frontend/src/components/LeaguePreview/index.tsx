import { useMemo } from "react";
import { League } from "../../../../shared/types/database";
import Box from "../Box";
import LeagueRankings from "../LeagueRankings";
import { Button } from "@mantine/core";

interface ILeaguePreview {
  league: League;
  username: string;
}

const LeaguePreview = ({ league, username }: ILeaguePreview) => {
  const userWithinTwoPlaces = useMemo(() => {
    const userIndex = league.ranking.findIndex(
      (user) => user.username === username
    );

    if (userIndex === 0) {
      return [
        { ...league.ranking[userIndex], position: 1 },
        league.ranking[userIndex + 1]
          ? { ...league.ranking[userIndex + 1], position: 2 }
          : null,
        league.ranking[userIndex + 2]
          ? { ...league.ranking[userIndex + 2], position: 3 }
          : null,
      ].filter((user) => !!user);
    } else if (userIndex === league.ranking.length - 1) {
      return [
        league.ranking[userIndex - 2]
          ? { ...league.ranking[userIndex - 2], position: userIndex - 1 }
          : null,
        league.ranking[userIndex - 1]
          ? { ...league.ranking[userIndex - 1], position: userIndex }
          : null,
        { ...league.ranking[userIndex], position: userIndex + 1 },
      ].filter((user) => !!user);
    }

    return [
      league.ranking[userIndex - 1]
        ? { ...league.ranking[userIndex - 1], position: userIndex }
        : null,
      { ...league.ranking[userIndex], position: userIndex + 1 },
      league.ranking[userIndex + 1]
        ? { ...league.ranking[userIndex + 1], position: userIndex + 2 }
        : null,
    ].filter((user) => !!user);
  }, [league.ranking, username]);

  return (
    <Box className="transform transition-all hover:scale-105">
      <h2 className="mb-2 text-xl font-bold text-gray-700">{league.name}</h2>

      <LeagueRankings users={userWithinTwoPlaces} isPreview />

      <Button className="mt-4">View full league</Button>
    </Box>
  );
};

export default LeaguePreview;
