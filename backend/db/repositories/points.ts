import { eq } from "drizzle-orm";
import { db } from "..";
import { userFixtures, userGroups, users } from "../schema";

export const getUserPoints = async (username: string) => {
  const userPointsPromise = db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .execute();

  const userFixturesPromise = db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .leftJoin(userFixtures, eq(users.username, userFixtures.username))
    .execute();

  const userGroupsPromise = db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .leftJoin(userGroups, eq(users.username, userGroups.username))
    .execute();

  const [userPoints, userFixturesResult, userGroupsResult] = await Promise.all([
    userPointsPromise,
    userFixturesPromise,
    userGroupsPromise,
  ]);

  const { points } = userPoints[0];

  const userFixturesPoints = userFixturesResult.reduce(
    (acc, user) => acc + (user.user_fixtures?.points || 0),
    0
  );
  const userGroupsPoints = userGroupsResult.reduce(
    (acc, user) => acc + (user.user_groups?.points || 0),
    0
  );

  return points + userFixturesPoints + userGroupsPoints;
};

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

  const [userFixturesResult, userGroupsResult] = await Promise.all([
    userFixturesPromise,
    userGroupsPromise,
  ]);

  const usersObject = userFixturesResult
    .map((user) => user.users)
    .filter(
      (user, i) =>
        userFixturesResult.findIndex(
          (u) => u.users.username === user.username
        ) === i
    );

  const allUsers = usersObject.map((user) => {
    const userFixturesPoints = userFixturesResult
      .filter((u) => u.users.username === user.username)
      .reduce((acc, u) => acc + (u.user_fixtures?.points || 0), 0);
    const userGroupsPoints = userGroupsResult
      .filter((u) => u.users.username === user.username)
      .reduce((acc, u) => acc + (u.user_groups?.points || 0), 0);

    return {
      ...user,
      points: user.points + userFixturesPoints + userGroupsPoints,
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
