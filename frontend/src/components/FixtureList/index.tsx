import { useMemo } from "react";
import { Fixture, Result, Team } from "../../../../shared/types/database";
import FixtureComponent from "../Fixture";

interface IFixtureList {
  teams: Team[];
  fixtures: Fixture[];
  results: Result[];
}

const FixtureList = ({ teams, fixtures, results }: IFixtureList) => {
  const fixturesWithTeams = useMemo(() => {
    const data = [...fixtures].map((fixture) => {
      const homeTeam = teams.find(
        (team) => team.id === fixture.homeTeamId
      )?.name;
      const awayTeam = teams.find(
        (team) => team.id === fixture.awayTeamId
      )?.name;
      const result = results.find((result) => result.fixtureId === fixture.id);
      return {
        dateTime: fixture.dateTime,
        homeTeam,
        awayTeam,
        homeScore: result?.homeTeamScore,
        awayScore: result?.awayTeamScore,
      };
    });

    const dataSorted = data.sort((a, b) => a.dateTime - b.dateTime);
    return dataSorted;
  }, [fixtures, teams, results]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {fixturesWithTeams.map((fixture) => (
        <FixtureComponent
          key={`${fixture.homeTeam}-${fixture.awayTeam}`}
          homeTeam={fixture.homeTeam}
          awayTeam={fixture.awayTeam}
          homeScore={fixture.homeScore}
          awayScore={fixture.awayScore}
          dateTime={fixture.dateTime}
        />
      ))}
    </div>
  );
};

export default FixtureList;
