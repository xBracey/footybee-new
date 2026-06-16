// Tournament configuration - shared between frontend and backend

// Prediction lock time (Unix timestamp in milliseconds)
// Set to the start time of the first match of the tournament
// Once this time passes, all predictions are locked
//
// For backend: Set via PREDICTION_LOCK_TIME environment variable
// For frontend: Retrieved from /api/lock endpoint
//
// Example: 1751328000000 = June 30, 2025 20:00:00 UTC

export const PREDICTION_LOCK_TIME = process.env.PREDICTION_LOCK_TIME
  ? parseInt(process.env.PREDICTION_LOCK_TIME, 10)
  : 0; // Default to 0 = disabled (no lock)

// Check if predictions are currently locked
export const isPredictionLocked = (): boolean => {
  // return PREDICTION_LOCK_TIME > 0 && Date.now() > PREDICTION_LOCK_TIME;
  return true;
};
