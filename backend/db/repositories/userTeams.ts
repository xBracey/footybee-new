import { and, eq, sql } from "drizzle-orm";
import { db } from "..";
import {
  InsertUserTeam,
  leagues,
  roundFixtures,
  userLeagues,
  userTeams,
  users,
} from "../schema";
import {
  LeagueKnockoutStatus,
  UserKnockoutStatus,
} from "../../../shared/types/database";

export const getUserTeams = () => db.select().from(userTeams).execute();

export const getUserTeam = async (username: string, teamId: number) => {
  const resp = await db
    .select()
    .from(userTeams)
    .where(and(eq(userTeams.username, username), eq(userTeams.teamId, teamId)))
    .execute();
  return resp.length ? resp[0] : null;
};

export const getUserTeamsByUsername = async (username: string) => {
  const resp = await db
    .select()
    .from(userTeams)
    .where(eq(userTeams.username, username))
    .execute();
  return resp;
};

export const insertUserTeam = (userTeam: InsertUserTeam) => {
  return db.insert(userTeams).values(userTeam).execute();
};

export const insertUserTeams = (userTeamsRaw: InsertUserTeam[]) => {
  return db
    .insert(userTeams)
    .values(userTeamsRaw)
    .onConflictDoUpdate({
      target: [userTeams.username, userTeams.teamId],
      set: { roundPredictions: sql`excluded.round_predictions` },
    })
    .execute();
};

/**
 * Build a per-user summary of their knockout-stage prediction
 * completion for the admin "who hasn't filled theirs in?" view.
 *
 * `expectedTotal` is derived dynamically from the entry (first)
 * knockout round — the round with the most fixtures in
 * `roundFixtures`. This means it works for both the current
 * 32-team Round of 32 format and any future expansion (or a
 * hypothetical 16-team Round of 16-only format).
 */
export const getKnockoutStatusByLeague = async (): Promise<
  LeagueKnockoutStatus[]
> => {
  const [allLeagues, allUserLeagues, allUserTeams, allRoundFixtures] =
    await Promise.all([
      db.select().from(leagues).execute(),
      db.select().from(userLeagues).execute(),
      db.select({ username: userTeams.username }).from(userTeams).execute(),
      db.select().from(roundFixtures).execute(),
    ]);

  // Find the entry round: the round with the most fixtures. The
  // live worker advances winners into later rounds over time, so
  // the entry round is always the largest fixture count.
  const fixtureCounts = new Map<string, number>();
  for (const f of allRoundFixtures) {
    if (!f.round) continue;
    fixtureCounts.set(f.round, (fixtureCounts.get(f.round) || 0) + 1);
  }

  let entryRound: string | null = null;
  let maxFixtures = 0;
  for (const [round, count] of fixtureCounts) {
    if (count > maxFixtures) {
      maxFixtures = count;
      entryRound = round;
    }
  }

  // Count distinct teams in the entry round — this is what a
  // "complete" bracket requires (one prediction per team).
  const entryTeams = new Set<number>();
  if (entryRound) {
    for (const f of allRoundFixtures) {
      if (f.round !== entryRound) continue;
      if (f.homeTeamId !== null) entryTeams.add(f.homeTeamId);
      if (f.awayTeamId !== null) entryTeams.add(f.awayTeamId);
    }
  }
  const expectedTotal = entryTeams.size;

  // Group userTeams rows by username to count each user's picks.
  const userPickCounts = new Map<string, number>();
  for (const ut of allUserTeams) {
    if (!ut.username) continue;
    userPickCounts.set(ut.username, (userPickCounts.get(ut.username) || 0) + 1);
  }

  // Group userLeagues rows by leagueId so we can look up each
  // league's members in O(1).
  const membersByLeague = new Map<string, string[]>();
  for (const ul of allUserLeagues) {
    if (!ul.leagueId || !ul.username) continue;
    const list = membersByLeague.get(ul.leagueId);
    if (list) {
      list.push(ul.username);
    } else {
      membersByLeague.set(ul.leagueId, [ul.username]);
    }
  }

  const buildStatus = (username: string): UserKnockoutStatus => {
    const totalPredictions = userPickCounts.get(username) || 0;
    return {
      username,
      hasPredictions: totalPredictions > 0,
      isComplete: expectedTotal > 0 && totalPredictions >= expectedTotal,
      totalPredictions,
      expectedTotal,
    };
  };

  // One entry per league. Empty leagues (no members) are omitted
  // so the admin view only shows populated leagues. Users not in
  // any league are excluded entirely — per the chasing flow, the
  // admin only cares about members of leagues they're chasing in.
  return allLeagues
    .map((league) => {
      const memberUsernames = membersByLeague.get(league.id) || [];
      return {
        id: league.id,
        name: league.name ?? league.id,
        members: memberUsernames.map(buildStatus),
      };
    })
    .filter((league) => league.members.length > 0);
};
