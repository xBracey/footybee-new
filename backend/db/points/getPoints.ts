import { eq } from "drizzle-orm";
import { db } from "..";
import {
  fixtures,
  players,
  roundFixtures,
  userFixtures,
  userGroups,
  users,
  userTeams,
} from "../schema";
import { getTeamWins } from "../../../shared/getTeamWins";

export const getAllUsersPoints = async () => {
  const userFixturesPromise = db
    .select()
    .from(users)
    .leftJoin(userFixtures, eq(users.username, userFixtures.username))
    .execute();

  const userGroupsPromise = db
    .select()
    .from(users)
    .leftJoin(userGroups, eq(users.username, userGroups.username))
    .execute();

  const userTeamsPromise = db
    .select()
    .from(users)
    .leftJoin(userTeams, eq(users.username, userTeams.username))
    .execute();

  const playersPromise = db.select().from(players).execute();

  const fixturesPromise = db.select().from(fixtures).execute();

  const roundFixturesPromise = db.select().from(roundFixtures).execute();

  const [
    userFixturesResult,
    userGroupsResult,
    fixturesResult,
    roundFixturesResult,
    playersResult,
    userTeamsResult,
  ] = await Promise.all([
    userFixturesPromise,
    userGroupsPromise,
    fixturesPromise,
    roundFixturesPromise,
    playersPromise,
    userTeamsPromise,
  ]);

  const allTeamIds = [
    ...new Set(
      fixturesResult
        .map((fixture) => [fixture.homeTeamId, fixture.awayTeamId])
        .flat()
        .filter((id) => id !== null) as number[]
    ),
  ];

  const teamsWins = Object.fromEntries(
    // @ts-ignore
    allTeamIds.map((teamId) => [
      teamId,
      getTeamWins(teamId, [...fixturesResult, ...roundFixturesResult]),
    ])
  );

  const usersObject = userFixturesResult
    .map((user) => user.users)
    .filter(
      (user, i) =>
        userFixturesResult.findIndex(
          (u) => u.users.username === user.username
        ) === i
    );

  const allUsers = usersObject.map((user) => {
    const playerPoints =
      (playersResult.find((p) => p.id === user.bonusPlayerId)?.goals ?? 0) * 10;

    const teamWins = user.bonusTeamId ? teamsWins[user.bonusTeamId] : 0;
    const teamPoints = teamWins * 10;

    const userFixturesPoints = userFixturesResult
      .filter((u) => u.users.username === user.username)
      .reduce((acc, u) => acc + (u.user_fixtures?.points || 0), 0);
    const userGroupsPoints = userGroupsResult
      .filter((u) => u.users.username === user.username)
      .reduce((acc, u) => acc + (u.user_groups?.points || 0), 0);
    const userTeamsPoints = userTeamsResult
      .filter((u) => u.users.username === user.username)
      .reduce((acc, u) => acc + (u.user_teams?.points || 0), 0);

    return {
      ...user,
      points:
        playerPoints +
        teamPoints +
        userFixturesPoints +
        userGroupsPoints +
        userTeamsPoints,
    };
  });

  return allUsers;
};

export const getPointsForUsers = async (usernames: string[]) => {
  const userPoints = await getAllUsersPoints();
  return usernames.map((username) =>
    userPoints.find((user) => user.username === username)
  );
};

export const getUserPoints = async (username: string) => {
  const userPoints = await getAllUsersPoints();
  return userPoints.find((user) => user.username === username);
};
