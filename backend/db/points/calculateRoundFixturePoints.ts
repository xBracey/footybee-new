import { rounds } from "../../../shared/types/database";
import { InsertRoundFixture, InsertUserTeam } from "../schema";
import { calculateIfTeamWon } from "./calculateIfTeamWon";

const roundsWithWinners = [...rounds, "Winner"];

const roundPoints: Record<string, number> = {
  "Round of 16": 0,
  "Quarter-finals": 15,
  "Semi-finals": 20,
  Finals: 30,
  Winner: 40,
};

const calculateSingleRoundFixturePoints = (
  userTeam: InsertUserTeam,
  fixture: InsertRoundFixture
): number | false => {
  if (userTeam.username === "xBracey") {
    console.log({ userTeam, fixture });
  }

  if (!userTeam.teamId || !fixture.round || !userTeam.roundPredictions) {
    return 0;
  }

  const didTeamWin = calculateIfTeamWon(userTeam.teamId, fixture);

  if (!didTeamWin) {
    return false;
  }

  const currentRoundIndex = roundsWithWinners.findIndex(
    (round) => round === fixture.round
  );
  const nextRoundIndex = currentRoundIndex + 1;
  const userPredictionIndex = roundsWithWinners.findIndex(
    (round) => round === userTeam.roundPredictions
  );

  const minIndex = Math.min(nextRoundIndex, userPredictionIndex);

  const points = Object.values(roundPoints).reduce((acc, round, index) => {
    if (index <= minIndex) {
      return acc + round;
    }
    return acc;
  }, 0);

  return points;
};

export const calculateRoundFixturePoints = (
  fixture: InsertRoundFixture,
  userTeams: InsertUserTeam[]
) => {
  const fixturePoints = userTeams.map((userTeam) => ({
    username: userTeam.username,
    points: calculateSingleRoundFixturePoints(userTeam, fixture),
    teamId: userTeam.teamId,
  }));

  return fixturePoints;
};
