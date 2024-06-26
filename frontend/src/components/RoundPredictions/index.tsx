import { useState } from "react";
import { RoundFixture, Team } from "../../../../shared/types/database";
import { IRoundPrediction } from "./types";
import { calculateInitialFixtures } from "./calculateInitialFixtures";
import RoundFixtureComponent from "../RoundFixture";

interface IRoundPredictions {
  teams: Team[];
  roundFixtures: RoundFixture[];
}

const RoundPredictions = ({ teams, roundFixtures }: IRoundPredictions) => {
  const initialFixtures = calculateInitialFixtures(teams, roundFixtures);
  const [fixtures, setFixtures] = useState<IRoundPrediction[]>(initialFixtures);
  const rounds = ["Round of 16", "Quarter-finals", "Semi-finals", "Finals"];

  const onClick = (fixture: IRoundPrediction, winner: "home" | "away") => {
    const nextRoundIndex =
      rounds.findIndex((round) => round === fixture.round) + 1;
    const nextRound = rounds[nextRoundIndex];

    const nextOrder = Math.floor(fixture.order / 2);
    const nextWinnerTeamId =
      winner === "home" ? fixture.homeTeamId : fixture.awayTeamId;
    const nextHomeOrAway = fixture.order % 2 === 0 ? "home" : "away";

    setFixtures((prevFixtures) => {
      const nextFixture = prevFixtures.find(
        (f) => f.round === nextRound && f.order === nextOrder
      );

      return prevFixtures.map((f) => {
        if (nextRound && f.round === nextRound && f.order === nextOrder) {
          return {
            ...nextFixture,
            homeTeamId:
              nextHomeOrAway === "home" ? nextWinnerTeamId : f.homeTeamId,
            awayTeamId:
              nextHomeOrAway === "away" ? nextWinnerTeamId : f.awayTeamId,
          };
        }

        return {
          ...f,
          winner:
            f.round === fixture.round && f.order === fixture.order
              ? winner
              : f.winner,
        };
      });
    });
  };

  console.log(fixtures);

  return (
    <div>
      {rounds.map((round) => (
        <div key={round}>
          <h2>{round}</h2>
          <div className="grid grid-cols-2 gap-4">
            {fixtures
              .filter(
                (fixture) =>
                  fixture.round === round &&
                  fixture.homeTeamId &&
                  fixture.awayTeamId
              )
              .map((fixture) => (
                <RoundFixtureComponent
                  key={`${fixture.round}-${fixture.order}`}
                  homeTeam={
                    teams.find((team) => team.id === fixture.homeTeamId)?.name
                  }
                  awayTeam={
                    teams.find((team) => team.id === fixture.awayTeamId)?.name
                  }
                  onHomeClick={() => onClick(fixture, "home")}
                  onAwayClick={() => onClick(fixture, "away")}
                  selected={fixture.winner}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoundPredictions;
