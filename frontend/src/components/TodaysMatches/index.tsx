import dayjs from "dayjs";
import { Fixture, Team } from "../../../../shared/types/database";
import FixtureList from "../FixtureList";
import { useMemo } from "react";
import Banner from "../Banner";

interface ITodaysMatches {
  teams: Team[];
  fixtures: Fixture[];
}

const TodaysMatches = ({ teams, fixtures }: ITodaysMatches) => {
  const todaysFixtures = useMemo(
    () =>
      fixtures.filter((fixture) =>
        dayjs.unix(fixture.dateTime / 1000).isToday()
      ),
    [fixtures]
  );

  return (
    <Banner className="bg-pine-green-800 p-6 md:mb-4">
      <div className="flex w-full flex-col items-center md:max-w-xl lg:max-w-4xl">
        <h2 className="text-2xl font-bold text-white">Today's Matches</h2>
        <div className="my-2 w-full flex-1">
          {todaysFixtures.length > 0 ? (
            <FixtureList fixtures={todaysFixtures} teams={teams} />
          ) : (
            <p className="mt-2 text-center text-xl text-white">
              No matches today
            </p>
          )}
        </div>
      </div>
    </Banner>
  );
};

export default TodaysMatches;
