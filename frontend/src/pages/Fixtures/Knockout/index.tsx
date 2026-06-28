import { RoundFixture, Team, rounds } from "../../../../../shared/types/database";
import Banner from "../../../components/Banner";
import FixtureList from "../../../components/FixtureList";

interface KnockoutFixturesPageProps {
  roundFixtures: RoundFixture[];
  teams: Team[];
}

export const KnockoutFixturesPage = ({
  roundFixtures,
  teams,
}: KnockoutFixturesPageProps) => {
  // Group fixtures by round, ordered by the canonical `rounds` array
  // so the page always reads top-down: R32 → R16 → QF → SF → F.
  const fixturesByRound = rounds.reduce<Record<string, RoundFixture[]>>(
    (acc, round) => {
      acc[round] = roundFixtures
        .filter((f) => f.round === round)
        .sort((a, b) => a.order - b.order);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <Banner>
        <h2 className="text-2xl font-bold text-white">Knockout Fixtures</h2>
      </Banner>

      <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col gap-12">
        {rounds.map((round) => {
          const fixtures = fixturesByRound[round] ?? [];
          if (fixtures.length === 0) return null;

          return (
            <div key={round} className="flex flex-col gap-4">
              <h2 className="text-center text-2xl font-bold text-white">
                {round}
              </h2>
              <FixtureList fixtures={fixtures} teams={teams} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
