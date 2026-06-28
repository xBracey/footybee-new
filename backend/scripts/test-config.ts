/**
 * Verifies the env-reader works in both Node (process.env) and the
 * shapes that Vite uses (import.meta.env).
 */
import { CURRENT_STAGE, PREDICTION_LOCK_TIME, KNOCKOUT_PREDICTION_LOCK_TIME, isStagePredictionLocked } from "../../shared/config";

console.log("CURRENT_STAGE:", CURRENT_STAGE);
console.log("PREDICTION_LOCK_TIME:", PREDICTION_LOCK_TIME);
console.log("KNOCKOUT_PREDICTION_LOCK_TIME:", KNOCKOUT_PREDICTION_LOCK_TIME);
console.log("isStagePredictionLocked('group'):", isStagePredictionLocked("group"));
console.log("isStagePredictionLocked('knockout'):", isStagePredictionLocked("knockout"));
