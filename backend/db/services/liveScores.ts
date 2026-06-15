/**
 * Live Score API client
 *
 * Wraps the Live Score API (https://livescore-api.com) and exposes typed
 * methods for fetching live match data. The base URL and credentials are
 * sourced from environment variables (never committed).
 *
 * Required env:
 *   LIVE_SCORE_API_KEY
 *   LIVE_SCORE_API_SECRET
 *
 * The live endpoint (`/api-client/matches/live.json`) returns one entry
 * per currently-live match, with nested team objects and a `scores`
 * object whose values are `"X - Y"` strings. Example:
 *
 *   {
 *     "fixture_id": 1825347,
 *     "status": "IN PLAY",
 *     "scheduled": "19:00",
 *     "added": "2026-06-15 18:45:00",
 *     "home": { "id": 1453, "name": "Belgium" },
 *     "away": { "id": 215,  "name": "Egypt"   },
 *     "scores": { "score": "1 - 1", "ht_score": "0 - 1",
 *                 "ft_score": "", "et_score": "", "ps_score": "" }
 *   }
 */

const API_BASE = "https://livescore-api.com/api-client";

/** Raw shape of a single match returned by the live endpoint. */
interface ApiLiveMatch {
  id?: number;
  fixture_id?: number;
  home?: {
    id?: number;
    name?: string;
  };
  away?: {
    id?: number;
    name?: string;
  };
  /** Kickoff time only, e.g. "19:00" or "19:00:00". */
  scheduled?: string;
  /** Current match minute, e.g. "89" (empty when not started). */
  time?: string;
  /** Full timestamp when the match entered the live tracker, e.g.
   *  "2026-06-15 18:45:00". Used together with `scheduled` to derive
   *  the actual kickoff time. */
  added?: string;
  /** Timestamp of the last score change, e.g. "2026-06-15 20:50:39". */
  last_changed?: string;
  /** e.g. "IN PLAY", "HALF TIME", "FINISHED", "NOT STARTED". */
  status?: string;
  scores?: {
    /** Current score (or full-time score if finished). "X - Y". */
    score?: string;
    ht_score?: string;
    ft_score?: string;
    et_score?: string;
    ps_score?: string;
  };
}

interface ApiLiveResponse {
  success: boolean;
  error?: string;
  data?: {
    /** Live API returns the array under the singular key `match`. */
    match?: ApiLiveMatch[];
  };
}

/** Normalised live match — used by the worker to update DB fixtures. */
export interface LiveMatch {
  /** Live Score's internal match id. */
  id: number;
  /** Live Score's fixture id (matches the `id` field in `fixtures.json`). */
  fixtureId: number;
  homeId: number;
  homeName: string;
  homeScore: number;
  awayId: number;
  awayName: string;
  awayScore: number;
  /** Knockout-only — populated only when extra time has been played. */
  homeExtraTimeScore: number | null;
  awayExtraTimeScore: number | null;
  /** Knockout-only — populated only when a penalty shootout occurred. */
  homePenaltiesScore: number | null;
  awayPenaltiesScore: number | null;
  status: string;
  scheduled: string;
  /** Reconstructed kickoff time as a ms timestamp. */
  dateTime: number;
}

// --- Parsers --------------------------------------------------------------

const parseId = (value: number | null | undefined): number =>
  typeof value === "number" && Number.isFinite(value) ? value : 0;

const parseScoreString = (
  value: string | undefined
): { home: number; away: number } | null => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parts = trimmed.split("-").map((s) => s.trim());
  if (parts.length !== 2) return null;
  const home = parseInt(parts[0], 10);
  const away = parseInt(parts[1], 10);
  if (!Number.isFinite(home) || !Number.isFinite(away)) return null;
  return { home, away };
};

const padTime = (time: string): string => (time.length === 5 ? `${time}:00` : time);

const reconstructScheduledTime = (match: ApiLiveMatch): number => {
  // Preferred: combine the date from `added` with the time from `scheduled`.
  if (match.added && match.scheduled) {
    const date = match.added.split(" ")[0];
    const time = padTime(match.scheduled);
    const ts = new Date(`${date}T${time}`).getTime();
    if (Number.isFinite(ts)) return ts;
  }
  // Fallback: use `added` directly (may be a few minutes off from kickoff).
  if (match.added) {
    const ts = new Date(match.added.replace(" ", "T")).getTime();
    if (Number.isFinite(ts)) return ts;
  }
  return 0;
};

const normaliseMatch = (raw: ApiLiveMatch): LiveMatch => {
  const current = parseScoreString(raw.scores?.score);
  const extra = parseScoreString(raw.scores?.et_score);
  const penalties = parseScoreString(raw.scores?.ps_score);

  return {
    id: parseId(raw.id),
    fixtureId: parseId(raw.fixture_id),
    homeId: parseId(raw.home?.id),
    homeName: raw.home?.name?.trim() ?? "",
    homeScore: current?.home ?? 0,
    awayId: parseId(raw.away?.id),
    awayName: raw.away?.name?.trim() ?? "",
    awayScore: current?.away ?? 0,
    homeExtraTimeScore: extra?.home ?? null,
    awayExtraTimeScore: extra?.away ?? null,
    homePenaltiesScore: penalties?.home ?? null,
    awayPenaltiesScore: penalties?.away ?? null,
    status: raw.status ?? "",
    scheduled: raw.scheduled ?? "",
    dateTime: reconstructScheduledTime(raw),
  };
};

// --- Public API -----------------------------------------------------------

/**
 * Fetch currently-live matches for a given competition.
 *
 * Returns an empty array if the API call fails or no matches are in play,
 * so callers can treat it as a no-op. Throws only on configuration errors
 * (missing credentials) or non-success API responses.
 */
export const fetchLiveMatches = async (
  competitionId: number
): Promise<LiveMatch[]> => {
  const key = process.env.LIVE_SCORE_API_KEY;
  const secret = process.env.LIVE_SCORE_API_SECRET;

  if (!key || !secret) {
    throw new Error(
      "LIVE_SCORE_API_KEY and LIVE_SCORE_API_SECRET must be set to fetch live matches"
    );
  }

  const url = new URL(`${API_BASE}/matches/live.json`);
  url.searchParams.set("key", key);
  url.searchParams.set("secret", secret);
  url.searchParams.set("competition_id", String(competitionId));

  const response = await fetch(url.toString());
  const data = (await response.json()) as ApiLiveResponse;

  if (!data.success) {
    throw new Error(
      `Live Score API error: ${data.error ?? "unknown error"} (competition_id=${competitionId})`
    );
  }

  const matches = data.data?.match ?? [];

  return matches
    .filter((m) => m.home?.name && m.away?.name)
    .map(normaliseMatch);
};
