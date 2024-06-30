import { useMemo } from "react";
import {
  User,
  UserFixture,
  UserGroup,
  Team,
  Fixture,
  Prediction,
  Player,
  RoundFixture,
  UserTeam,
} from "../../../../shared/types/database";
import Banner from "../../components/Banner";
import FixturePoints from "../../components/FixturePoints";
import LogoutButton from "../../components/LogoutButton";
import { getTeamWins } from "../../../../shared/getTeamWins";
import BonusPoints from "../../components/BonusPoints";
import TeamPoints from "../../components/TeamPoints";

interface ProfilePageProps {
  user: User;
  userFixtures: UserFixture[];
  userGroups: UserGroup[];
  userTeams: UserTeam[];
  teams: Team[];
  fixtures: Fixture[];
  roundFixtures: RoundFixture[];
  players: Player[];
  predictions: Prediction[];
  isCurrentUser: boolean;
}

export const ProfilePage = ({
  user,
  userFixtures,
  userGroups,
  userTeams,
  teams,
  fixtures,
  roundFixtures,
  players,
  predictions,
  isCurrentUser,
}: ProfilePageProps) => {
  const totalPoints = useMemo(() => {
    const teamWins = getTeamWins(user.bonusTeamId, [
      ...fixtures,
      ...roundFixtures,
    ]);
    const playerGoals = players.find(
      (player) => player.id === user.bonusPlayerId
    )?.goals;

    const teamPoints = userTeams.reduce((acc, team) => {
      return acc + team.points;
    }, 0);

    const bonusPoints = teamWins * 10 + (playerGoals ?? 0) * 10;

    const fixturePoints = userFixtures.reduce((acc, fixture) => {
      return acc + fixture.points;
    }, 0);
    const groupPoints = userGroups.reduce((acc, group) => {
      return acc + group.points;
    }, 0);

    return bonusPoints + fixturePoints + groupPoints + teamPoints;
  }, [userFixtures, userGroups, userTeams, players]);

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
        fixtures={[...fixtures, ...roundFixtures]}
        teams={teams}
        players={players}
      />

      <TeamPoints
        teams={teams}
        roundFixtures={roundFixtures}
        userTeams={userTeams}
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
