import dayjs from "dayjs";
import { Fixture, Result, Team } from "../../../../shared/types/database";
import FixtureList from "../FixtureList";
import { useMemo } from "react";
import Banner from "../Banner";

interface ITodaysMatches {
  teams: Team[];
  fixtures: Fixture[];
  results: Result[];
}

const TodaysMatches = ({ teams, fixtures, results }: ITodaysMatches) => {
  const todaysFixtures = useMemo(
    () =>
      fixtures.filter((fixture) =>
        dayjs.unix(fixture.dateTime / 1000).isToday()
      ),
    [fixtures]
  );

  return (
    <Banner className="bg-pine-green-800 p-6 md:mb-4">
      <h2 className="text-2xl font-bold text-white">Today's Matches</h2>
      <div className="w-full">
        {todaysFixtures.length > 0 ? (
          <FixtureList
            fixtures={todaysFixtures}
            teams={teams}
            results={results}
          />
        ) : (
          <p className="mt-2 text-center text-xl text-white">
            No matches today
          </p>
        )}
      </div>
    </Banner>
  );
};

export default TodaysMatches;
