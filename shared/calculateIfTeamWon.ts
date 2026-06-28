import { RoundFixture } from "./types/database";

/** Subset of fixture fields used to determine the winner. Permissive
 *  on nullability so the live score worker (which reads from Drizzle
 *  where every column is inferred as `number | null`) can pass its
 *  row type without narrowing. */
export interface WinnerFixtureInput {
  homeTeamId: number | null;
  awayTeamId: number | null;
  homeTeamScore: number | null;
  awayTeamScore: number | null;
  homeTeamExtraTimeScore?: number | null;
  awayTeamExtraTimeScore?: number | null;
  homeTeamPenaltiesScore?: number | null;
  awayTeamPenaltiesScore?: number | null;
}

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

/**
 * Return the ID of the team that has won a knockout match, or `null`
 * if the match is not yet decided.
 *
 * Unlike `calculateIfTeamWon` (which returns `true` for a team as soon
 * as they are ahead at any stage), this function only returns a winner
 * when the match is **definitively** over. It walks the stages from
 * the latest to the earliest, returning a winner as soon as it finds
 * a decisive result:
 *
 *   1. Penalty shootout — if both penalty scores are set, the team
 *      with more penalties wins.
 *   2. Extra time — if both ET scores are set, the team with more ET
 *      goals wins. If ET is tied, the match goes to penalties, so we
 *      still return `null` and wait.
 *   3. Regular time — if 90-min scores are decisive, the team with
 *      more goals wins. If tied, the match goes to extra time, so we
 *      return `null` and wait.
 *
 * Use this when you need to know whether the match is fully complete
 * (e.g. before advancing the winner to the next round of the bracket).
 * Use `calculateIfTeamWon` for cumulative point calculation.
 */
export const getMatchWinner = (fixture: WinnerFixtureInput): number | null => {
  if (
    isNullOrUndefined(fixture.homeTeamId) ||
    isNullOrUndefined(fixture.awayTeamId) ||
    isNullOrUndefined(fixture.homeTeamScore) ||
    isNullOrUndefined(fixture.awayTeamScore)
  ) {
    return null;
  }

  const {
    homeTeamId,
    awayTeamId,
    homeTeamScore,
    awayTeamScore,
    homeTeamExtraTimeScore,
    awayTeamExtraTimeScore,
    homeTeamPenaltiesScore,
    awayTeamPenaltiesScore,
  } = fixture;

  // 1. Penalty shootout decides
  if (
    !isNullOrUndefined(homeTeamPenaltiesScore) &&
    !isNullOrUndefined(awayTeamPenaltiesScore)
  ) {
    if (homeTeamPenaltiesScore > awayTeamPenaltiesScore) return homeTeamId;
    if (awayTeamPenaltiesScore > homeTeamPenaltiesScore) return awayTeamId;
    return null; // penalties tied - shouldn't happen
  }

  // 2. Extra time decides (only if ET was played and is decisive; if
  //    ET is tied, the match goes to penalties so we wait)
  if (
    !isNullOrUndefined(homeTeamExtraTimeScore) &&
    !isNullOrUndefined(awayTeamExtraTimeScore)
  ) {
    if (homeTeamExtraTimeScore > awayTeamExtraTimeScore) return homeTeamId;
    if (awayTeamExtraTimeScore > homeTeamExtraTimeScore) return awayTeamId;
    return null; // ET tied, going to penalties
  }

  // 3. Regular time decides
  if (homeTeamScore > awayTeamScore) return homeTeamId;
  if (awayTeamScore > homeTeamScore) return awayTeamId;
  return null; // tied, going to extra time
};
