import { useMemo } from "react";
import dayjs from "dayjs";
import {
  Fixture,
  Prediction,
  RoundFixture,
  rounds,
  Team,
  UserFixture,
  UserTeam,
} from "../../../../shared/types/database";
import FixtureTable, { FixturesWithPoints } from "../FixtureTable";

interface ITodaysPredictions {
  teams: Team[];
  fixtures: Fixture[];
  roundFixtures?: RoundFixture[];
  predictions: Prediction[];
  userFixtures: UserFixture[];
  /** User's knockout bracket predictions (per team). Used to surface
   *  the user's pick ("Home"/"Away") for today's knockout matches. */
  userTeams?: UserTeam[];
  /** Heading shown above the section. Defaults to "Today's Predictions". */
  title?: string;
}

const isGroupFixture = (fixture: Fixture | RoundFixture): fixture is Fixture =>
  !("round" in fixture);

const ROUNDS_WITH_WINNER = [...rounds, "Winner"];

/**
 * For a knockout fixture, determine which side the user picked to
 * advance. Looks up the home/away team in `userTeams` and returns
 * "home" if the user predicted home to advance past this round,
 * "away" for away, or null if neither (or unknown).
 */
const getKnockoutPick = (
  fixture: RoundFixture,
  userTeams: UserTeam[]
): "home" | "away" | null => {
  if (!fixture.round) return null;
  const currentRoundIndex = ROUNDS_WITH_WINNER.indexOf(fixture.round);
  if (currentRoundIndex === -1) return null;

  const homeTeam = userTeams.find((ut) => ut.teamId === fixture.homeTeamId);
  const awayTeam = userTeams.find((ut) => ut.teamId === fixture.awayTeamId);

  const homeAdvances =
    homeTeam?.roundPredictions &&
    ROUNDS_WITH_WINNER.indexOf(homeTeam.roundPredictions) > currentRoundIndex;
  const awayAdvances =
    awayTeam?.roundPredictions &&
    ROUNDS_WITH_WINNER.indexOf(awayTeam.roundPredictions) > currentRoundIndex;

  if (homeAdvances && !awayAdvances) return "home";
  if (awayAdvances && !homeAdvances) return "away";
  return null;
};

const TodaysPredictions = ({
  teams,
  fixtures,
  roundFixtures = [],
  predictions,
  userFixtures,
  userTeams = [],
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

        // Score predictions only exist for group fixtures.
        const prediction = isGroupFixture(fixture)
          ? predictions.find((p) => p.fixtureId === fixture.id)
          : undefined;

        // Knockout picks live in `userTeams`; surface them as a
        // Home/Away label in the Prediction column.
        const knockoutPick = isGroupFixture(fixture)
          ? undefined
          : getKnockoutPick(fixture, userTeams);

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
          knockoutPick,
          hasBeenPlayed,
        };
      })
      .sort((a, b) => a.dateTime - b.dateTime);
  }, [fixtures, roundFixtures, teams, predictions, userFixtures, userTeams]);

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
