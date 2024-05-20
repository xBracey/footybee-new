import { useMemo } from "react";
import {
  User,
  UserFixture,
  UserGroup,
  Team,
  Fixture,
  Result,
} from "../../../../shared/types/database";
import Banner from "../../components/Banner";
import FixturePoints from "../../components/FixturePoints";

interface ProfilePageProps {
  user: User;
  userFixtures: UserFixture[];
  userGroups: UserGroup[];
  teams: Team[];
  fixtures: Fixture[];
  results: Result[];
}

export const ProfilePage = ({
  user,
  userFixtures,
  userGroups,
  teams,
  fixtures,
  results,
}: ProfilePageProps) => {
  const totalPoints = useMemo(() => {
    const fixturePoints = userFixtures.reduce((acc, fixture) => {
      return acc + fixture.points;
    }, 0);
    const groupPoints = userGroups.reduce((acc, group) => {
      return acc + group.points;
    }, 0);

    return fixturePoints + groupPoints;
  }, [userFixtures, userGroups]);

  return (
    <div>
      <Banner>
        <h2 className="text-2xl font-bold text-white">{`${user.username}'s Profile`}</h2>
      </Banner>
      <div className="my-4 flex flex-col items-center">
        <p className="my-4 text-xl font-bold text-white">{`Total points: ${totalPoints}`}</p>
      </div>
      <FixturePoints
        fixtures={fixtures}
        teams={teams}
        results={results}
        userFixtures={userFixtures}
      />
    </div>
  );
};
