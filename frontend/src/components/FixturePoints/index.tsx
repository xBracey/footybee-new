import { useMemo } from "react";
import { Fixture, Team, UserFixture } from "../../../../shared/types/database";
import FixtureComponent from "../Fixture";

interface IFixturePoints {
  teams: Team[];
  fixtures: Fixture[];
  userFixtures: UserFixture[];
}

const FixturePoints = ({ teams, fixtures, userFixtures }: IFixturePoints) => {
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
      return {
        homeTeam,
        awayTeam,
        homeScore: fixture.homeTeamScore,
        awayScore: fixture.awayTeamScore,
        dateTime: fixture.dateTime,
        points: userFixture?.points,
      };
    });
  }, [fixtures, teams, userFixtures]);

  return (
    <div className="[&>*:nth-child(odd)]:bg-shamrock-700 [&>*:nth-child(even)]:bg-pine-green-700 mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-md">
      {fixturesWithPoints.map((fixture) => (
        <div
          key={fixture.homeTeam + fixture.awayTeam}
          className="flex flex-row p-4"
        >
          <div className="flex-1">
            <FixtureComponent
              homeTeam={fixture.homeTeam}
              awayTeam={fixture.awayTeam}
              homeScore={fixture.homeScore}
              awayScore={fixture.awayScore}
              dateTime={fixture.dateTime}
              hasDate={false}
            />
          </div>
          <div className="flex w-8 items-center justify-center">
            <p className="text-white">{fixture.points ?? 0}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FixturePoints;
