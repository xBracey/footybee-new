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

  const roundFixturesWithWins = roundFixturesForTeam.filter((roundFixture) =>
    calculateIfTeamWon(teamId, roundFixture)
  );

  const highestRoundWin = roundFixturesWithWins.reduce((acc, roundFixture) => {
    const round = rounds.find((round) => round === roundFixture.round);
    return round;
  }, "");

  return highestRoundWin;
};
