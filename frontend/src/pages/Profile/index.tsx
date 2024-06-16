import { useMemo } from "react";
import {
  User,
  UserFixture,
  UserGroup,
  Team,
  Fixture,
  Prediction,
  Player,
} from "../../../../shared/types/database";
import Banner from "../../components/Banner";
import FixturePoints from "../../components/FixturePoints";
import LogoutButton from "../../components/LogoutButton";
import { getTeamWins } from "../../../../shared/getTeamWins";
import BonusPoints from "../../components/BonusPoints";

interface ProfilePageProps {
  user: User;
  userFixtures: UserFixture[];
  userGroups: UserGroup[];
  teams: Team[];
  fixtures: Fixture[];
  players: Player[];
  predictions: Prediction[];
  isCurrentUser: boolean;
}

export const ProfilePage = ({
  user,
  userFixtures,
  userGroups,
  teams,
  fixtures,
  players,
  predictions,
  isCurrentUser,
}: ProfilePageProps) => {
  const totalPoints = useMemo(() => {
    const teamWins = getTeamWins(user.bonusTeamId, fixtures);
    const playerGoals = players.find(
      (player) => player.id === user.bonusPlayerId
    )?.goals;

    const bonusPoints = teamWins * 10 + (playerGoals ?? 0) * 10;

    const fixturePoints = userFixtures.reduce((acc, fixture) => {
      return acc + fixture.points;
    }, 0);
    const groupPoints = userGroups.reduce((acc, group) => {
      return acc + group.points;
    }, 0);

    return bonusPoints + fixturePoints + groupPoints;
  }, [userFixtures, userGroups]);

  return (
    <div>
      <Banner>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <h2 className="text-2xl font-bold text-white">{`${user.username}'s Profile`}</h2>
          {isCurrentUser && <LogoutButton />}
        </div>
      </Banner>
      <div className="my-4 flex flex-col items-center">
        <p className="my-4 text-xl font-bold text-white">{`Total points: ${totalPoints}`}</p>
      </div>

      <BonusPoints
        user={user}
        fixtures={fixtures}
        teams={teams}
        players={players}
      />

      <FixturePoints
        fixtures={fixtures}
        teams={teams}
        userFixtures={userFixtures}
        predictions={predictions}
      />
    </div>
  );
};
