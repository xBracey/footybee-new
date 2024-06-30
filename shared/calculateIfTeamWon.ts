import { RoundFixture } from "./types/database";

export const isNullOrUndefined = <T>(
  value?: T | null
): value is null | undefined => value === null || value === undefined;

export const calculateIfTeamWon = (teamId: number, fixture: RoundFixture) => {
  if (
    isNullOrUndefined(fixture.homeTeamScore) ||
    isNullOrUndefined(fixture.awayTeamScore)
  ) {
    return false;
  }

  if (teamId === fixture.homeTeamId) {
    if (fixture.homeTeamScore > fixture.awayTeamScore) {
      return true;
    }

    if (
      !isNullOrUndefined(fixture.homeTeamExtraTimeScore) &&
      !isNullOrUndefined(fixture.awayTeamExtraTimeScore) &&
      fixture.homeTeamExtraTimeScore > fixture.awayTeamExtraTimeScore
    ) {
      return true;
    }

    if (
      !isNullOrUndefined(fixture.homeTeamPenaltiesScore) &&
      !isNullOrUndefined(fixture.awayTeamPenaltiesScore) &&
      fixture.homeTeamPenaltiesScore > fixture.awayTeamPenaltiesScore
    ) {
      return true;
    }
  } else if (teamId === fixture.awayTeamId) {
    if (fixture.awayTeamScore > fixture.homeTeamScore) {
      return true;
    }

    if (
      !isNullOrUndefined(fixture.awayTeamExtraTimeScore) &&
      !isNullOrUndefined(fixture.homeTeamExtraTimeScore) &&
      fixture.awayTeamExtraTimeScore > fixture.homeTeamExtraTimeScore
    ) {
      return true;
    }

    if (
      !isNullOrUndefined(fixture.awayTeamPenaltiesScore) &&
      !isNullOrUndefined(fixture.homeTeamPenaltiesScore) &&
      fixture.awayTeamPenaltiesScore > fixture.homeTeamPenaltiesScore
    ) {
      return true;
    }
  }
  return false;
};
