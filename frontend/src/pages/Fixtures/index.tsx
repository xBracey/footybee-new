import { Fixture, Result, Team } from "../../../../shared/types/database";
import Banner from "../../components/Banner";
import FixtureList from "../../components/FixtureList";
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
      <Banner>
        <h2 className="text-2xl font-bold text-white">Fixtures</h2>
      </Banner>

      <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col gap-12">
        {Object.entries(groupFixtures).map(
          ([groupLetter, { fixtures, results, teams }]) => (
            <div className="flex flex-col gap-4">
              <h2 className="text-center text-2xl font-bold text-white">
                Group {groupLetter}
              </h2>

              <FixtureList
                fixtures={fixtures}
                teams={teams}
                results={results}
              />

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
