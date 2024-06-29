import { RoundFixture } from "./types/database";

export const calculateIfTeamWon = (teamId: number, fixture: RoundFixture) => {
  if (!fixture.homeTeamScore || !fixture.awayTeamScore) {
    return false;
  }

  if (teamId === fixture.homeTeamId) {
    if (fixture.homeTeamScore > fixture.awayTeamScore) {
      return true;
    }

    if (
      fixture.homeTeamExtraTimeScore &&
      fixture.awayTeamExtraTimeScore &&
      fixture.homeTeamExtraTimeScore > fixture.awayTeamExtraTimeScore
    ) {
      return true;
    }

    if (
      fixture.homeTeamPenaltiesScore &&
      fixture.awayTeamPenaltiesScore &&
      fixture.homeTeamPenaltiesScore > fixture.awayTeamPenaltiesScore
    ) {
      return true;
    }
  } else if (teamId === fixture.awayTeamId) {
    if (fixture.awayTeamScore > fixture.homeTeamScore) {
      return true;
    }

    if (
      fixture.awayTeamExtraTimeScore &&
      fixture.homeTeamExtraTimeScore &&
      fixture.awayTeamExtraTimeScore > fixture.homeTeamExtraTimeScore
    ) {
      return true;
    }

    if (
      fixture.awayTeamPenaltiesScore &&
      fixture.homeTeamPenaltiesScore &&
      fixture.awayTeamPenaltiesScore > fixture.homeTeamPenaltiesScore
    ) {
      return true;
    }
  }
  return false;
};
