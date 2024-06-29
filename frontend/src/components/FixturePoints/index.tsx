import { useMemo } from "react";
import {
  Fixture,
  Prediction,
  Team,
  UserFixture,
} from "../../../../shared/types/database";
import FixtureComponent from "../Fixture";

interface FixturesWithPoints {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  dateTime: number;
  points: number;
  hasBeenPlayed: boolean;
  prediction?: Prediction;
}

const getBackgroundColor = (
  i: number,
  points: number,
  hasBeenPlayed: boolean
) => {
  if (!hasBeenPlayed) {
    return i % 2 === 0 ? "bg-shamrock-700" : "bg-pine-green-700";
  }

  switch (points) {
    case 25:
      return "bg-green-700";
    case 0:
      return "bg-red-700";
    default:
      return "bg-yellow-700";
  }
};

interface IFixturePoints {
  teams: Team[];
  fixtures: Fixture[];
  userFixtures: UserFixture[];
  predictions: Prediction[];
}

const FixtureTable = ({ fixtures }: { fixtures: FixturesWithPoints[] }) => (
  <div className="mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-md">
    <div className="bg-azure-900 flex px-4 py-2 text-center text-sm">
      <div className="flex-1">
        <p className="text-white">Fixture</p>
      </div>
      <div className="w-20">
        <p className="text-white">Prediction</p>
      </div>
      <div className="flex w-10 justify-end">
        <p className="text-white">Pts</p>
      </div>
    </div>

    {fixtures.map((fixture, i) => (
      <div
        key={fixture.homeTeam + fixture.awayTeam}
        className={`flex flex-row p-4 ${getBackgroundColor(
          i,
          fixture.points,
          fixture.hasBeenPlayed
        )}`}
      >
        <div className="flex-1">
          <FixtureComponent
            homeTeam={fixture.homeTeam}
            awayTeam={fixture.awayTeam}
            homeScore={fixture.homeScore}
            awayScore={fixture.awayScore}
            dateTime={fixture.dateTime}
            hasDate={false}
            isProfilePage
          />
        </div>
        {fixture.prediction && (
          <div className="flex w-20 items-center justify-center text-sm">
            <p className="text-white">{`${fixture.prediction.homeTeamScore} - ${fixture.prediction.awayTeamScore}`}</p>
          </div>
        )}
        <div className="flex w-10 items-center justify-end text-sm">
          <p className="text-white">{fixture.points ?? 0}</p>
        </div>
      </div>
    ))}
  </div>
);

const FixturePoints = ({
  teams,
  fixtures,
  userFixtures,
  predictions,
}: IFixturePoints) => {
  const fixturesWithPoints = useMemo(() => {
    return fixtures.map((fixture) => {
      const homeTeam = teams.find(
        (team) => team.id === fixture.homeTeamId
      )?.name;
      const awayTeam = teams.find(
        (team) => team.id === fixture.awayTeamId
      )?.name;
      const userFixture = userFixtures.find(
        (userFixture) => userFixture.fixtureId === fixture.id
      );
      const prediction = predictions.find(
        (prediction) => prediction.fixtureId === fixture.id
      );
      return {
        homeTeam,
        awayTeam,
        homeScore: fixture.homeTeamScore,
        awayScore: fixture.awayTeamScore,
        dateTime: fixture.dateTime,
        points: userFixture?.points,
        prediction: prediction,
        hasBeenPlayed:
          fixture.homeTeamScore !== null &&
          fixture.awayTeamScore !== null &&
          fixture.homeTeamScore !== undefined &&
          fixture.awayTeamScore !== undefined,
      };
    });
  }, [fixtures, teams, userFixtures]);

  const fixturesPlayed = useMemo(() => {
    return fixturesWithPoints.filter((fixture) => fixture.hasBeenPlayed);
  }, [fixturesWithPoints]);

  const fixturesNotPlayed = useMemo(() => {
    return fixturesWithPoints.filter((fixture) => !fixture.hasBeenPlayed);
  }, [fixturesWithPoints]);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 overflow-hidden rounded-md">
      {fixturesPlayed.length > 0 && <FixtureTable fixtures={fixturesPlayed} />}
      {fixturesNotPlayed.length > 0 && (
        <FixtureTable fixtures={fixturesNotPlayed} />
      )}
    </div>
  );
};

export default FixturePoints;
