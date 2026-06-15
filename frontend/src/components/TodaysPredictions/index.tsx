import { useMemo } from "react";
import dayjs from "dayjs";
import {
  Fixture,
  Prediction,
  RoundFixture,
  Team,
  UserFixture,
} from "../../../../shared/types/database";
import FixtureTable, { FixturesWithPoints } from "../FixtureTable";

interface ITodaysPredictions {
  teams: Team[];
  fixtures: Fixture[];
  roundFixtures?: RoundFixture[];
  predictions: Prediction[];
  userFixtures: UserFixture[];
  /** Heading shown above the section. Defaults to "Today's Predictions". */
  title?: string;
}

const isGroupFixture = (fixture: Fixture | RoundFixture): fixture is Fixture =>
  !("round" in fixture);

const TodaysPredictions = ({
  teams,
  fixtures,
  roundFixtures = [],
  predictions,
  userFixtures,
  title = "Today's Predictions",
}: ITodaysPredictions) => {
  // Combine group + round fixtures, filter to today, and attach the
  // user's prediction + earned points (where applicable).
  const todaysItems = useMemo<FixturesWithPoints[]>(() => {
    const allFixtures = [...fixtures, ...roundFixtures];

    return allFixtures
      .filter((fixture) => dayjs.unix(fixture.dateTime / 1000).isToday())
      .map((fixture) => {
        const homeTeam = teams.find(
          (team) => team.id === fixture.homeTeamId
        )?.name;
        const awayTeam = teams.find(
          (team) => team.id === fixture.awayTeamId
        )?.name;

        // Score predictions only exist for group fixtures; knockout
        // predictions live in `userTeams` and aren't surfaced here.
        const prediction = isGroupFixture(fixture)
          ? predictions.find((p) => p.fixtureId === fixture.id)
          : undefined;

        const userFixture = isGroupFixture(fixture)
          ? userFixtures.find((uf) => uf.fixtureId === fixture.id)
          : undefined;

        const hasBeenPlayed =
          fixture.homeTeamScore !== null &&
          fixture.awayTeamScore !== null &&
          fixture.homeTeamScore !== undefined &&
          fixture.awayTeamScore !== undefined;

        return {
          fixtureId: fixture.id,
          homeTeam,
          awayTeam,
          homeScore: fixture.homeTeamScore,
          awayScore: fixture.awayTeamScore,
          dateTime: fixture.dateTime,
          points: userFixture?.points ?? 0,
          prediction,
          hasBeenPlayed,
        };
      })
      .sort((a, b) => a.dateTime - b.dateTime);
  }, [fixtures, roundFixtures, teams, predictions, userFixtures]);

  if (todaysItems.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto mb-6 flex w-full max-w-xl flex-col gap-2">
      <h3 className="text-center text-lg font-semibold text-white">{title}</h3>
      <FixtureTable fixtures={todaysItems} />
    </div>
  );
};

export default TodaysPredictions;
