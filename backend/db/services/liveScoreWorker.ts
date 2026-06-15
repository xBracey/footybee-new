/**
 * Live score worker
 *
 * Periodically polls the Live Score API and updates DB fixtures that are
 * currently in play. Optimised to minimise API calls:
 *
 *   1. Use the fixture's own `dateTime` (not the API) to decide whether
 *      a game could be live. A fixture is "in scope" when its kickoff is
 *      within the configured active window (default: last 4 hours).
 *   2. Only call the live API once per tick, and only if at least one
 *      fixture is in scope.
 *   3. Match API matches to DB fixtures by team names + scheduled time,
 *      and skip the DB write if scores haven't changed.
 *
 * Reuses the existing `editFixture` / `editRoundFixture` repositories so
 * user points are recalculated automatically.
 */

import { editFixture, getFixtures } from "../repositories/fixtures";
import {
  editRoundFixture,
  getRoundFixtures,
} from "../repositories/roundFixtures";
import { getTeam } from "../repositories/teams";
import { fetchLiveMatches, LiveMatch } from "./liveScores";

// --- Configuration --------------------------------------------------------

const DEFAULT_POLL_INTERVAL_MS = 60_000; // 1 minute
const DEFAULT_ACTIVE_WINDOW_MS = 4 * 60 * 60 * 1000; // 4 hours
const DEFAULT_COMPETITION_ID = 362; // FIFA World Cup

/** Max allowed difference between a DB fixture's `dateTime` and a live
 *  API match's reconstructed `dateTime`. The live API can return times
 *  that are offset by up to a day (e.g. `added` may be the day after
 *  the actual kickoff), so we use a generous 1-day tolerance rather than
 *  requiring an exact (or bucketed) match. */
const MAX_TIME_DIFF_MS = 24 * 60 * 60 * 1000; // 1 day

const getPollInterval = () =>
  process.env.LIVE_SCORE_POLL_INTERVAL_MS
    ? parseInt(process.env.LIVE_SCORE_POLL_INTERVAL_MS, 10)
    : DEFAULT_POLL_INTERVAL_MS;

const getActiveWindow = () =>
  process.env.LIVE_SCORE_ACTIVE_WINDOW_MS
    ? parseInt(process.env.LIVE_SCORE_ACTIVE_WINDOW_MS, 10)
    : DEFAULT_ACTIVE_WINDOW_MS;

const getCompetitionId = () =>
  process.env.LIVE_SCORE_COMPETITION_ID
    ? parseInt(process.env.LIVE_SCORE_COMPETITION_ID, 10)
    : DEFAULT_COMPETITION_ID;

const isWorkerEnabled = () => process.env.LIVE_SCORE_WORKER_ENABLED !== "false";

// --- State ----------------------------------------------------------------

let timeoutHandle: NodeJS.Timeout | null = null;
let running = false;

export const isLiveScoreWorkerRunning = () => running;

// --- Public API -----------------------------------------------------------

/**
 * Start the polling worker. Safe to call multiple times — only one
 * interval will ever be active. The first tick fires immediately so a
 * freshly-restarted server catches up to in-play games.
 */
export const startLiveScoreWorker = (): void => {
  if (!isWorkerEnabled()) {
    console.log("[live-worker] disabled via LIVE_SCORE_WORKER_ENABLED=false");
    return;
  }

  if (!process.env.LIVE_SCORE_API_KEY || !process.env.LIVE_SCORE_API_SECRET) {
    console.warn(
      "[live-worker] LIVE_SCORE_API_KEY / LIVE_SCORE_API_SECRET not set; worker disabled"
    );
    return;
  }

  if (timeoutHandle) {
    return;
  }

  const interval = getPollInterval();
  const window = getActiveWindow();
  console.log(
    `[live-worker] starting (interval=${interval}ms, window=${window}ms, competition_id=${getCompetitionId()})`
  );

  running = true;
  scheduleNext(0);
};

/** Stop the worker. Useful for graceful shutdown / tests. */
export const stopLiveScoreWorker = (): void => {
  if (timeoutHandle) {
    clearTimeout(timeoutHandle);
    timeoutHandle = null;
  }
  running = false;
  console.log("[live-worker] stopped");
};

// --- Internals ------------------------------------------------------------

const scheduleNext = (delayMs: number) => {
  timeoutHandle = setTimeout(runTick, delayMs);
};

const runTick = async () => {
  try {
    await updateActiveFixtures();
  } catch (err) {
    console.error("[live-worker] tick failed:", err);
  } finally {
    if (running) {
      scheduleNext(getPollInterval());
    }
  }
};

const updateActiveFixtures = async () => {
  const now = Date.now();
  const windowStart = now - getActiveWindow();

  const [allFixtures, allRoundFixtures] = await Promise.all([
    getFixtures(),
    getRoundFixtures(),
  ]);

  // Filter to fixtures whose scheduled kickoff is in the active window.
  // Round fixtures also need both teams assigned (TBDs are skipped).
  const activeFixtures = allFixtures.filter(
    (f) =>
      f.dateTime !== null &&
      f.dateTime !== undefined &&
      f.dateTime >= windowStart &&
      f.dateTime <= now
  );

  const activeRoundFixtures = allRoundFixtures.filter(
    (f) =>
      f.dateTime !== null &&
      f.dateTime !== undefined &&
      f.dateTime >= windowStart &&
      f.dateTime <= now &&
      f.homeTeamId !== null &&
      f.awayTeamId !== null
  );

  if (activeFixtures.length === 0 && activeRoundFixtures.length === 0) {
    // Quiet: this is the common case for the vast majority of minutes.
    return;
  }

  console.log(
    `[live-worker] ${activeFixtures.length} group + ${activeRoundFixtures.length} knockout fixture(s) in window; polling API`
  );

  const liveMatches = await fetchLiveMatches(getCompetitionId());

  if (liveMatches.length === 0) {
    console.log("[live-worker] no live matches returned by API");
    return;
  }

  const liveByKey = buildLiveLookup(liveMatches);

  await Promise.all([
    ...activeFixtures.map((f) => updateGroupFixture(f, liveByKey)),
    ...activeRoundFixtures.map((f) => updateRoundFixture(f, liveByKey)),
  ]);
};

const updateGroupFixture = async (
  fixture: Awaited<ReturnType<typeof getFixtures>>[number],
  liveByKey: Map<string, LiveMatch>
) => {
  if (!fixture.homeTeamId || !fixture.awayTeamId || !fixture.dateTime) {
    return;
  }

  const [home, away] = await Promise.all([
    getTeam(fixture.homeTeamId),
    getTeam(fixture.awayTeamId),
  ]);

  if (!home?.name || !away?.name) return;

  const live = findLiveMatch(liveByKey, home.name, away.name, fixture.dateTime);
  if (!live) return;

  if (
    fixture.homeTeamScore === live.homeScore &&
    fixture.awayTeamScore === live.awayScore
  ) {
    return; // No change
  }

  await editFixture(fixture.id, {
    groupLetter: fixture.groupLetter,
    homeTeamId: fixture.homeTeamId,
    awayTeamId: fixture.awayTeamId,
    dateTime: fixture.dateTime,
    homeTeamScore: live.homeScore,
    awayTeamScore: live.awayScore,
  });

  console.log(
    `[live-worker] fixture #${fixture.id} ${home.name} ${live.homeScore}-${
      live.awayScore
    } ${away.name} (${live.status || "live"})`
  );
};

const updateRoundFixture = async (
  fixture: Awaited<ReturnType<typeof getRoundFixtures>>[number],
  liveByKey: Map<string, LiveMatch>
) => {
  if (!fixture.homeTeamId || !fixture.awayTeamId || !fixture.dateTime) {
    return;
  }

  const [home, away] = await Promise.all([
    getTeam(fixture.homeTeamId),
    getTeam(fixture.awayTeamId),
  ]);

  if (!home?.name || !away?.name) return;

  const live = findLiveMatch(liveByKey, home.name, away.name, fixture.dateTime);
  if (!live) return;

  const nextExtraHome = live.homeExtraTimeScore ?? null;
  const nextExtraAway = live.awayExtraTimeScore ?? null;
  const nextPenHome = live.homePenaltiesScore ?? null;
  const nextPenAway = live.awayPenaltiesScore ?? null;

  if (
    fixture.homeTeamScore === live.homeScore &&
    fixture.awayTeamScore === live.awayScore &&
    fixture.homeTeamExtraTimeScore === nextExtraHome &&
    fixture.awayTeamExtraTimeScore === nextExtraAway &&
    fixture.homeTeamPenaltiesScore === nextPenHome &&
    fixture.awayTeamPenaltiesScore === nextPenAway
  ) {
    return; // No change
  }

  await editRoundFixture(fixture.id, {
    round: fixture.round,
    homeTeamId: fixture.homeTeamId,
    awayTeamId: fixture.awayTeamId,
    dateTime: fixture.dateTime,
    homeTeamScore: live.homeScore,
    awayTeamScore: live.awayScore,
    homeTeamExtraTimeScore: nextExtraHome,
    awayTeamExtraTimeScore: nextExtraAway,
    homeTeamPenaltiesScore: nextPenHome,
    awayTeamPenaltiesScore: nextPenAway,
    order: fixture.order,
  });

  console.log(
    `[live-worker] round fixture #${fixture.id} ${home.name} ${
      live.homeScore
    }-${live.awayScore} ${away.name} (${live.status || "live"})`
  );
};

// --- Match helpers --------------------------------------------------------

const normaliseName = (name: string) =>
  name.trim().toLowerCase().replace(/\s+/g, " ");

const matchKey = (homeName: string, awayName: string) =>
  `${normaliseName(homeName)}|${normaliseName(awayName)}`;

const buildLiveLookup = (matches: LiveMatch[]) => {
  const map = new Map<string, LiveMatch>();
  for (const match of matches) {
    // Group stage guarantees each pair of teams plays at most once, so a
    // team-name key is unambiguous. If a duplicate does show up, keep the
    // one with the most recent `dateTime`.
    const key = matchKey(match.homeName, match.awayName);
    const existing = map.get(key);
    if (!existing || match.dateTime > existing.dateTime) {
      map.set(key, match);
    }
  }
  return map;
};

const findLiveMatch = (
  liveByKey: Map<string, LiveMatch>,
  homeName: string,
  awayName: string,
  dateTime: number
): LiveMatch | undefined => {
  const match = liveByKey.get(matchKey(homeName, awayName));
  if (!match) return undefined;

  // Confirm the live match's reconstructed dateTime is within a day of
  // the DB fixture's scheduled kickoff.
  if (Math.abs(match.dateTime - dateTime) > MAX_TIME_DIFF_MS) {
    return undefined;
  }
  return match;
};
