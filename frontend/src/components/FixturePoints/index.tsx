import { useMemo } from "react";
import dayjs from "dayjs";
import {
  Fixture,
  Prediction,
  Team,
  UserFixture,
} from "../../../../shared/types/database";
import FixtureTable, {
  FixturesWithPoints,
} from "../FixtureTable";

interface IFixturePoints {
  teams: Team[];
  fixtures: Fixture[];
  userFixtures: UserFixture[];
  predictions: Prediction[];
}

const FixturePoints = ({
  teams,
  fixtures,
  userFixtures,
  predictions,
}: IFixturePoints) => {
  const fixturesWithPoints = useMemo<FixturesWithPoints[]>(() => {
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
        fixtureId: fixture.id,
        homeTeam,
        awayTeam,
        homeScore: fixture.homeTeamScore,
        awayScore: fixture.awayTeamScore,
        dateTime: fixture.dateTime,
        points: userFixture?.points ?? 0,
        prediction,
        hasBeenPlayed:
          fixture.homeTeamScore !== null &&
          fixture.awayTeamScore !== null &&
          fixture.homeTeamScore !== undefined &&
          fixture.awayTeamScore !== undefined,
      };
    });
  }, [fixtures, teams, userFixtures, predictions]);

  // Sort ascending (oldest first) and group by local calendar day.
  const groupedByDate = useMemo(() => {
    const sorted = [...fixturesWithPoints].sort(
      (a, b) => a.dateTime - b.dateTime
    );
    const groups = new Map<string, FixturesWithPoints[]>();
    for (const fixture of sorted) {
      const dateKey = dayjs
        .unix(fixture.dateTime / 1000)
        .format("YYYY-MM-DD");
      const existing = groups.get(dateKey) ?? [];
      existing.push(fixture);
      groups.set(dateKey, existing);
    }
    return Array.from(groups.entries());
  }, [fixturesWithPoints]);

  if (groupedByDate.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 overflow-hidden rounded-md">
      {groupedByDate.map(([dateKey, dayFixtures]) => (
        <div key={dateKey} className="flex flex-col gap-2">
          <h3 className="text-center text-lg font-semibold text-white">
            {dayjs
              .unix(dayFixtures[0].dateTime / 1000)
              .format("dddd Do MMMM YYYY")}
          </h3>
          <FixtureTable fixtures={dayFixtures} />
        </div>
      ))}
    </div>
  );
};

export default FixturePoints;
