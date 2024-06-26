import {
  RoundFixture,
  Team,
  UserTeam,
} from "../../../../shared/types/database";
import { IRoundPrediction } from "./types";

const findWinner = (
  userTeams: UserTeam[],
  fixture: { homeTeamId: number; awayTeamId: number }
) => {
  const homeWinner = userTeams.find(
    (userTeam) => userTeam.teamId === fixture.homeTeamId
  );
  const awayWinner = userTeams.find(
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
    previousRoundHomeFixture.winner === "home"
      ? previousRoundHomeFixture.homeTeamId
      : previousRoundHomeFixture.winner === "away"
      ? previousRoundHomeFixture.awayTeamId
      : undefined;

  const awayTeamId =
    previousRoundAwayFixture.winner === "home"
      ? previousRoundAwayFixture.homeTeamId
      : previousRoundAwayFixture.winner === "away"
      ? previousRoundAwayFixture.awayTeamId
      : undefined;

  return { homeTeamId, awayTeamId };
};

export const calculateEmptyFixtures = (roundFixtures: RoundFixture[]) => {
  const roundOf16Fixtures: IRoundPrediction[] = roundFixtures
    .filter((fixture) => fixture.round === "Round of 16")
    .map((fixture) => ({
      round: "Round of 16",
      order: fixture.order,
      homeTeamId: fixture.homeTeamId,
      awayTeamId: fixture.awayTeamId,
    }));

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
  const roundOf16Winners = userTeams.filter(
    (userTeam) => userTeam.roundPredictions !== "Round of 16"
  );

  const roundOf16Fixtures: IRoundPrediction[] = roundFixtures
    .filter((fixture) => fixture.round === "Round of 16")
    .map((fixture) => ({
      round: "Round of 16",
      order: fixture.order,
      homeTeamId: fixture.homeTeamId,
      awayTeamId: fixture.awayTeamId,
      winner: findWinner(roundOf16Winners, fixture),
    }));

  const quarterFinalsWinners = roundOf16Winners.filter(
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

  const semiFinalsWinners = quarterFinalsWinners.filter(
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

  const finalWinner = semiFinalsWinners.filter(
    (userTeam) => userTeam.roundPredictions !== "Finals"
  );

  const { homeTeamId, awayTeamId } = findTeamIds(0, semiFinalsFixtures);

  const finalsFixtures: IRoundPrediction[] = [
    {
      round: "Finals",
      order: 0,
      homeTeamId,
      awayTeamId,
      winner: findWinner(finalWinner, { homeTeamId, awayTeamId }),
    },
  ];

  return [
    ...roundOf16Fixtures,
    ...quarterFinalsFixtures,
    ...semiFinalsFixtures,
    ...finalsFixtures,
  ];
};
