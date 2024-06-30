import { RoundFixture, rounds } from "../../../../shared/types/database";
import { calculateIfTeamWon } from "../../../../shared/calculateIfTeamWon";

export const calculateRound = (
  teamId: number,
  roundFixtures: RoundFixture[]
) => {
  const roundFixturesForTeam = roundFixtures.filter(
    (roundFixture) =>
      roundFixture.homeTeamId === teamId || roundFixture.awayTeamId === teamId
  );

  if (roundFixturesForTeam.length === 0) {
    return false;
  }

  const roundFixturesWithWins = roundFixturesForTeam.filter((roundFixture) =>
    calculateIfTeamWon(teamId, roundFixture)
  );

  const highestRoundWin = roundFixturesWithWins.reduce((acc, roundFixture) => {
    const round = rounds.find((round) => round === roundFixture.round);
    return round;
  }, "");

  if (!highestRoundWin) {
    return "Round of 16";
  }

  const highestRoundWinIndex = rounds.findIndex(
    (round) => round === highestRoundWin
  );
  const nextRound = rounds[highestRoundWinIndex + 1];

  return nextRound;
};
