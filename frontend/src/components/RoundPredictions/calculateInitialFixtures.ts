import {
  RoundFixture,
  UserTeam,
} from "../../../../shared/types/database";
import { IRoundPrediction } from "./types";

/**
 * Determine the winner of a given fixture based on the user's
 * `userTeams` for the two teams. A team "wins" a round if the user
 * has a `userTeams` row for them with a `roundPredictions` past that
 * round (i.e. the user predicted them to advance further).
 *
 * `winners` should be the pre-filtered list of user teams that won
 * the round in question (e.g. for R32 winners, pass the user teams
 * whose `roundPredictions !== "Round of 32"`).
 */
const findWinner = (
  winners: UserTeam[],
  fixture: { homeTeamId: number | undefined; awayTeamId: number | undefined }
) => {
  if (fixture.homeTeamId === undefined || fixture.awayTeamId === undefined) {
    return undefined;
  }

  const homeWinner = winners.find(
    (userTeam) => userTeam.teamId === fixture.homeTeamId
  );
  const awayWinner = winners.find(
    (userTeam) => userTeam.teamId === fixture.awayTeamId
  );
  if (homeWinner) {
    return "home";
  }
  if (awayWinner) {
    return "away";
  }
  return undefined;
};

/**
 * Given the current match `order` and the previous round's fixtures,
 * return the home/away team IDs of the current match by looking up
 * the two previous-round matches that feed into it:
 *
 *   - previous home-side match: order === 2 * order
 *   - previous away-side match: order === 2 * order + 1
 *
 * The home slot of the current match is the winner of the home-side
 * previous match. The away slot is the winner of the away-side
 * previous match. Returns `undefined` for either slot if the
 * corresponding previous match has no winner picked yet.
 */
const findTeamIds = (
  order: number,
  previousRoundFixtures: IRoundPrediction[]
) => {
  const previousRoundHomeFixture = previousRoundFixtures.find(
    (fixture) => fixture.order === order * 2
  );

  const previousRoundAwayFixture = previousRoundFixtures.find(
    (fixture) => fixture.order === order * 2 + 1
  );

  const homeTeamId =
    previousRoundHomeFixture?.winner === "home"
      ? previousRoundHomeFixture.homeTeamId
      : previousRoundHomeFixture?.winner === "away"
      ? previousRoundHomeFixture.awayTeamId
      : undefined;

  const awayTeamId =
    previousRoundAwayFixture?.winner === "home"
      ? previousRoundAwayFixture.homeTeamId
      : previousRoundAwayFixture?.winner === "away"
      ? previousRoundAwayFixture.awayTeamId
      : undefined;

  return { homeTeamId, awayTeamId };
};

export const calculateEmptyFixtures = (roundFixtures: RoundFixture[]) => {
  // R32: real teams from the DB.
  const roundOf32Fixtures: IRoundPrediction[] = roundFixtures
    .filter((fixture) => fixture.round === "Round of 32")
    .map((fixture) => ({
      round: "Round of 32",
      order: fixture.order,
      homeTeamId: fixture.homeTeamId ?? undefined,
      awayTeamId: fixture.awayTeamId ?? undefined,
    }));

  // R16+: empty placeholders. The user has to pick R32 winners
  // before R16 home/away slots populate.
  const roundOf16Fixtures: IRoundPrediction[] = Array.from(
    { length: 8 },
    (_, index) => ({
      round: "Round of 16",
      order: index,
    })
  );

  const quarterFinalsFixtures: IRoundPrediction[] = Array.from(
    { length: 4 },
    (_, index) => ({
      round: "Quarter-finals",
      order: index,
    })
  );

  const semiFinalsFixtures: IRoundPrediction[] = Array.from(
    { length: 2 },
    (_, index) => ({
      round: "Semi-finals",
      order: index,
    })
  );

  const finalsFixtures: IRoundPrediction[] = [{ round: "Finals", order: 0 }];

  return [
    ...roundOf32Fixtures,
    ...roundOf16Fixtures,
    ...quarterFinalsFixtures,
    ...semiFinalsFixtures,
    ...finalsFixtures,
  ];
};

export const calculateInitialFixtures = (
  roundFixtures: RoundFixture[],
  userTeams: UserTeam[]
) => {
  // R32 fixtures come from the DB and have real home/away teams.
  // The user picks a winner for each R32 match; the winner feeds
  // into the corresponding R16 slot.
  const roundOf32Winners = userTeams.filter(
    (userTeam) => userTeam.roundPredictions !== "Round of 32"
  );

  const roundOf32Fixtures: IRoundPrediction[] = roundFixtures
    .filter((fixture) => fixture.round === "Round of 32")
    .map((fixture) => ({
      round: "Round of 32",
      order: fixture.order,
      homeTeamId: fixture.homeTeamId ?? undefined,
      awayTeamId: fixture.awayTeamId ?? undefined,
      winner: findWinner(roundOf32Winners, fixture),
    }));

  // R16 home/away are derived from the user's R32 picks (NOT from
  // the DB - the DB has placeholders that the live worker fills in
  // as games complete, but the prediction UI should reflect what
  // the user actually picked).
  const roundOf16Winners = userTeams.filter(
    (userTeam) => userTeam.roundPredictions !== "Round of 16"
  );

  const roundOf16Fixtures: IRoundPrediction[] = Array.from(
    { length: 8 },
    (_, index) => {
      const { homeTeamId, awayTeamId } = findTeamIds(index, roundOf32Fixtures);
      return {
        round: "Round of 16",
        order: index,
        homeTeamId,
        awayTeamId,
        winner: findWinner(roundOf16Winners, { homeTeamId, awayTeamId }),
      };
    }
  );

  // QF home/away are derived from the user's R16 picks.
  const quarterFinalsWinners = userTeams.filter(
    (userTeam) => userTeam.roundPredictions !== "Quarter-finals"
  );

  const quarterFinalsFixtures: IRoundPrediction[] = Array.from(
    { length: 4 },
    (_, index) => {
      const { homeTeamId, awayTeamId } = findTeamIds(index, roundOf16Fixtures);
      return {
        round: "Quarter-finals",
        order: index,
        homeTeamId,
        awayTeamId,
        winner: findWinner(quarterFinalsWinners, { homeTeamId, awayTeamId }),
      };
    }
  );

  // SF home/away are derived from the user's QF picks.
  const semiFinalsWinners = userTeams.filter(
    (userTeam) => userTeam.roundPredictions !== "Semi-finals"
  );

  const semiFinalsFixtures: IRoundPrediction[] = Array.from(
    { length: 2 },
    (_, index) => {
      const { homeTeamId, awayTeamId } = findTeamIds(
        index,
        quarterFinalsFixtures
      );
      return {
        round: "Semi-finals",
        order: index,
        homeTeamId,
        awayTeamId,
        winner: findWinner(semiFinalsWinners, { homeTeamId, awayTeamId }),
      };
    }
  );

  // F home/away are derived from the user's SF picks.
  const tournamentWinner = userTeams.filter(
    (userTeam) => userTeam.roundPredictions === "Winner"
  );

  const finalsFixtures: IRoundPrediction[] = (() => {
    const { homeTeamId, awayTeamId } = findTeamIds(0, semiFinalsFixtures);
    return [
      {
        round: "Finals",
        order: 0,
        homeTeamId,
        awayTeamId,
        winner: findWinner(tournamentWinner, { homeTeamId, awayTeamId }),
      },
    ];
  })();

  return [
    ...roundOf32Fixtures,
    ...roundOf16Fixtures,
    ...quarterFinalsFixtures,
    ...semiFinalsFixtures,
    ...finalsFixtures,
  ];
};
