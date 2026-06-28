// Tournament configuration - shared between frontend and backend
//
// The backend (Node/CommonJS) reads these from `process.env` at
// runtime. The frontend (Vite) gets the same values injected at
// build time via the `define` block in `frontend/vite.config.ts`,
// which substitutes `process.env.X` references with the configured
// value (sourced from `VITE_X` or `X` env vars at build time).

const readIntEnv = (key: string, fallback = 0): number => {
  const raw = process.env[key];
  if (typeof raw !== "string" || !raw) return fallback;
  const parsed = parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const readStringEnv = (key: string, fallback = ""): string => {
  const raw = process.env[key];
  return typeof raw === "string" && raw ? raw : fallback;
};

// Prediction lock time (Unix timestamp in milliseconds).
// Set to the start time of the first match of the tournament. Once
// this time passes, group-stage predictions are locked.
//
//   - Backend: PREDICTION_LOCK_TIME in the env
//   - Frontend: VITE_PREDICTION_LOCK_TIME in the env (substituted at
//     build time by `frontend/vite.config.ts`)
export const PREDICTION_LOCK_TIME = readIntEnv("PREDICTION_LOCK_TIME", 0);

// Knockout-specific lock time. Independent from PREDICTION_LOCK_TIME
// so the group stage can be locked while the knockout stage is still
// open for picks, and vice-versa. Set this to the kickoff time of
// the first Round of 32 fixture (e.g. 1782669600000 =
// 2026-06-28T19:00:00Z) so knockout predictions lock at the start
// of the first knockout game.
export const KNOCKOUT_PREDICTION_LOCK_TIME = readIntEnv(
  "KNOCKOUT_PREDICTION_LOCK_TIME",
  0
);

// Check if predictions are currently locked
export const isPredictionLocked = (): boolean => {
  return true;
  return PREDICTION_LOCK_TIME > 0 && Date.now() > PREDICTION_LOCK_TIME;
};

/**
 * Stage-aware prediction lock check. Returns true if the given
 * stage's predictions are locked.
 *
 *   - "group" → uses PREDICTION_LOCK_TIME
 *   - "knockout" → uses KNOCKOUT_PREDICTION_LOCK_TIME
 *
 * A lock time of 0 means "no lock" (always unlocked).
 */
export const isStagePredictionLocked = (stage: TournamentStage): boolean => {
  if (stage === "knockout") {
    return (
      KNOCKOUT_PREDICTION_LOCK_TIME > 0 &&
      Date.now() > KNOCKOUT_PREDICTION_LOCK_TIME
    );
  }
  return PREDICTION_LOCK_TIME > 0 && Date.now() > PREDICTION_LOCK_TIME;
};

/**
 * Current tournament stage. The frontend uses this to decide whether
 * /predictions and /fixtures show the group-stage UI or the knockout
 * UI. Defaults to "knockout" so the live tournament (currently in
 * the knockout stage) renders correctly out of the box; set
 * CURRENT_STAGE=group (or VITE_CURRENT_STAGE=group) to flip back to
 * the group stage after a reset.
 *
 * Valid values: "group" | "knockout"
 */
export type TournamentStage = "group" | "knockout";

export const CURRENT_STAGE: TournamentStage =
  readStringEnv("CURRENT_STAGE", "knockout") === "group" ? "group" : "knockout";

export const isKnockoutStage = (): boolean => CURRENT_STAGE === "knockout";
export const isGroupStage = (): boolean => CURRENT_STAGE === "group";
