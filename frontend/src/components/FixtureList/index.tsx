import { useMemo } from "react";
import { Fixture, RoundFixture, Team } from "../../../../shared/types/database";
import FixtureComponent from "../Fixture";

interface IFixtureList {
  teams: Team[];
  fixtures: (Fixture | RoundFixture)[];
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
        homeTeamExtraTimeScore:
          "homeTeamExtraTimeScore" in fixture
            ? fixture.homeTeamExtraTimeScore
            : undefined,
        awayTeamExtraTimeScore:
          "awayTeamExtraTimeScore" in fixture
            ? fixture.awayTeamExtraTimeScore
            : undefined,
        homeTeamPenaltiesScore:
          "homeTeamPenaltiesScore" in fixture
            ? fixture.homeTeamPenaltiesScore
            : undefined,
        awayTeamPenaltiesScore:
          "awayTeamPenaltiesScore" in fixture
            ? fixture.awayTeamPenaltiesScore
            : undefined,
      };
    });

    const dataSorted = data.sort((a, b) => a.dateTime - b.dateTime);
    return dataSorted;
  }, [fixtures, teams]);

  return (
    <div className="grid w-full grid-cols-1 gap-6 p-2 md:grid-cols-2 lg:grid-cols-3">
      {fixturesWithTeams.map((fixture) => (
        <FixtureComponent
          key={`${fixture.homeTeam}-${fixture.awayTeam}`}
          homeTeam={fixture.homeTeam}
          awayTeam={fixture.awayTeam}
          homeScore={fixture.homeScore}
          awayScore={fixture.awayScore}
          homeTeamExtraTimeScore={fixture.homeTeamExtraTimeScore}
          awayTeamExtraTimeScore={fixture.awayTeamExtraTimeScore}
          homeTeamPenaltiesScore={fixture.homeTeamPenaltiesScore}
          awayTeamPenaltiesScore={fixture.awayTeamPenaltiesScore}
          dateTime={fixture.dateTime}
        />
      ))}
    </div>
  );
};

export default FixtureList;
