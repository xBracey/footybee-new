import { RoundFixture, Team } from "../../../../shared/types/database";
import { IRoundPrediction } from "./types";

export const calculateInitialFixtures = (
  teams: Team[],
  roundFixtures: RoundFixture[]
) => {
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
