import { Fixture, RoundFixture } from "./types/database";

export const getTeamWins = (
  teamId: number,
  teamFixtures: {
    homeTeamId: number | null;
    awayTeamId: number | null;
    homeTeamScore: number | null;
    awayTeamScore: number | null;
  }[]
) => {
  const wins = teamFixtures.filter(
    (fixture) =>
      fixture.homeTeamScore !== null &&
      fixture.awayTeamScore !== null &&
      ((fixture.homeTeamId === teamId &&
        fixture.homeTeamScore > fixture.awayTeamScore) ||
        (fixture.awayTeamId === teamId &&
          fixture.awayTeamScore > fixture.homeTeamScore))
  ).length;

  return wins;
};
