import { Fixture, Result, Team } from "../../../../shared/types/database";
import LeagueTable from "../../components/LeagueTable";

interface FixturesPageProps {
  fixtures: Fixture[];
  results: Result[];
  teams: Team[];
}

export const FixturesPage = ({
  fixtures,
  results,
  teams,
}: FixturesPageProps) => {
  const groups = teams.reduce((acc, team) => {
    if (!acc[team.groupLetter]) {
      acc[team.groupLetter] = {
        fixtures: [],
        results: [],
        teams: [],
      };
    }

    acc[team.groupLetter].teams = [
      ...(acc[team.groupLetter].teams || []),
      team,
    ];

    return acc;
  }, {} as Record<string, FixturesPageProps>);

  const groupFixtures = fixtures.reduce((acc, fixture) => {
    const result = results.find((result) => result.fixtureId === fixture.id);

    acc[fixture.groupLetter].fixtures = [
      ...(acc[fixture.groupLetter].fixtures || []),
      fixture,
    ];

    if (result) {
      acc[fixture.groupLetter].results = [
        ...(acc[fixture.groupLetter].results || []),
        result,
      ];
    }

    return acc;
  }, groups as Record<string, FixturesPageProps>);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-2 mb-6 text-center text-3xl font-bold text-white">
        Fixtures
      </h1>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12">
        {Object.entries(groupFixtures).map(
          ([groupLetter, { fixtures, results, teams }]) => (
            <div className="flex flex-col gap-4">
              <h2 className="text-center text-xl font-bold text-white">
                Group {groupLetter}
              </h2>
              <LeagueTable
                key={groupLetter}
                fixtures={fixtures}
                results={results}
                teams={teams}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};
