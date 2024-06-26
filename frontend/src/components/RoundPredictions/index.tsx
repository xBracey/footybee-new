import { useState } from "react";
import {
  RoundFixture,
  rounds,
  Team,
  UserTeam,
} from "../../../../shared/types/database";
import { IRoundPrediction } from "./types";
import {
  calculateEmptyFixtures,
  calculateInitialFixtures,
} from "./calculateInitialFixtures";
import RoundFixtureComponent from "../RoundFixture";
import { Button, LoadingOverlay } from "@mantine/core";
import Banner from "../Banner";

const calculateNewFixtures = (
  prevFixtures: IRoundPrediction[],
  fixture: IRoundPrediction,
  winner: "home" | "away"
) => {
  const nextRoundIndex =
    rounds.findIndex((round) => round === fixture.round) + 1;
  const nextRound = rounds[nextRoundIndex];

  if (!nextRound) {
    return {
      newFixtures: prevFixtures.map((f) => ({
        ...f,
        winner:
          f.round === fixture.round && f.order === fixture.order
            ? winner
            : f.winner,
      })),
      nextFixture: null,
    };
  }

  const nextOrder = Math.floor(fixture.order / 2);
  const nextWinnerTeamId =
    winner === "home" ? fixture.homeTeamId : fixture.awayTeamId;
  const nextHomeOrAway = fixture.order % 2 === 0 ? "home" : "away";

  const nextFixture = prevFixtures.find(
    (f) => f.round === nextRound && f.order === nextOrder
  );

  const newNextFixture = {
    ...nextFixture,
    homeTeamId:
      nextHomeOrAway === "home" ? nextWinnerTeamId : nextFixture.homeTeamId,
    awayTeamId:
      nextHomeOrAway === "away" ? nextWinnerTeamId : nextFixture.awayTeamId,
  };

  const newFixtures = prevFixtures.map((f) => {
    if (nextRound && f.round === nextRound && f.order === nextOrder) {
      return newNextFixture;
    }

    return {
      ...f,
      winner:
        f.round === fixture.round && f.order === fixture.order
          ? winner
          : f.winner,
    };
  });

  return { newFixtures, nextFixture: newNextFixture };
};

interface IRoundPredictions {
  teams: Team[];
  roundFixtures: RoundFixture[];
  userTeams: UserTeam[];
  onSubmit: (fixtures: IRoundPrediction[]) => void;
  isLoading: boolean;
}

const RoundPredictions = ({
  teams,
  roundFixtures,
  onSubmit,
  isLoading,
  userTeams,
}: IRoundPredictions) => {
  const initialFixtures = calculateInitialFixtures(roundFixtures, userTeams);
  const [fixtures, setFixtures] = useState<IRoundPrediction[]>(initialFixtures);

  const onClick = (fixture: IRoundPrediction, winner: "home" | "away") => {
    setFixtures((prevFixtures) => {
      let newFixturesObj = calculateNewFixtures(prevFixtures, fixture, winner);

      while (
        newFixturesObj.nextFixture &&
        newFixturesObj.nextFixture.round !== "Finals" &&
        newFixturesObj.nextFixture.winner
      ) {
        newFixturesObj = calculateNewFixtures(
          newFixturesObj.newFixtures,
          newFixturesObj.nextFixture,
          newFixturesObj.nextFixture.winner
        );
      }

      return newFixturesObj.newFixtures;
    });
  };

  const submitDisabled = fixtures.some((f) => !f.winner);

  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <LoadingOverlay visible={isLoading} />

      <Banner>
        <h2 className="text-2xl font-bold text-white">Round Predictions</h2>
      </Banner>

      {rounds.map((round) => (
        <div key={round} className="flex w-full max-w-3xl flex-col gap-4 p-4">
          <h2 className="text-center text-2xl font-bold text-white">{round}</h2>
          <div
            className={`grid grid-cols-1 gap-4 ${
              round === "Finals" ? "md:grid-cols-1" : "md:grid-cols-2"
            }`}
          >
            {fixtures
              .filter((fixture) => fixture.round === round)
              .map((fixture) => (
                <RoundFixtureComponent
                  key={`${fixture.round}-${fixture.order}`}
                  homeTeam={
                    teams.find((team) => team.id === fixture.homeTeamId)
                      ?.name || "TBC"
                  }
                  awayTeam={
                    teams.find((team) => team.id === fixture.awayTeamId)
                      ?.name || "TBC"
                  }
                  onHomeClick={() => onClick(fixture, "home")}
                  onAwayClick={() => onClick(fixture, "away")}
                  selected={fixture.winner}
                  disabled={!fixture.homeTeamId || !fixture.awayTeamId}
                />
              ))}
          </div>
        </div>
      ))}

      <div className="flex gap-4 py-4">
        <Button
          size="lg"
          onClick={() => setFixtures(calculateEmptyFixtures(roundFixtures))}
        >
          Reset
        </Button>
        <Button
          color="green"
          size="lg"
          onClick={() => onSubmit(fixtures)}
          disabled={submitDisabled}
          className={submitDisabled ? "disabled:bg-gray-500" : ""}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default RoundPredictions;
