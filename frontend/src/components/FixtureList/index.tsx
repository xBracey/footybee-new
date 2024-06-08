import { useMemo } from "react";
import { Fixture, Team } from "../../../../shared/types/database";
import FixtureComponent from "../Fixture";

interface IFixtureList {
  teams: Team[];
  fixtures: Fixture[];
}

const FixtureList = ({ teams, fixtures }: IFixtureList) => {
  const fixturesWithTeams = useMemo(() => {
    const data = [...fixtures].map((fixture) => {
      const homeTeam = teams.find(
        (team) => team.id === fixture.homeTeamId
      )?.name;
      const awayTeam = teams.find(
        (team) => team.id === fixture.awayTeamId
      )?.name;
      return {
        dateTime: fixture.dateTime,
        homeTeam,
        awayTeam,
        homeScore: fixture.homeTeamScore,
        awayScore: fixture.awayTeamScore,
      };
    });

    const dataSorted = data.sort((a, b) => a.dateTime - b.dateTime);
    return dataSorted;
  }, [fixtures, teams]);

  return (
    <div className="flex flex-wrap items-center justify-center">
      {fixturesWithTeams.map((fixture) => (
        <div className="w-full p-2 md:w-1/2 lg:w-1/3">
          <FixtureComponent
            key={`${fixture.homeTeam}-${fixture.awayTeam}`}
            homeTeam={fixture.homeTeam}
            awayTeam={fixture.awayTeam}
            homeScore={fixture.homeScore}
            awayScore={fixture.awayScore}
            dateTime={fixture.dateTime}
          />
        </div>
      ))}
    </div>
  );
};

export default FixtureList;
