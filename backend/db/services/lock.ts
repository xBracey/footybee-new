import { PREDICTION_LOCK_TIME, KNOCKOUT_PREDICTION_LOCK_TIME } from "../../../shared/config";

interface LockStatusResponse {
  isLocked: boolean;
  lockTime: number;
  knockoutLocked: boolean;
  knockoutLockTime: number;
}

export const getLockStatus = (): LockStatusResponse => {
  const isLocked =
    PREDICTION_LOCK_TIME > 0 && Date.now() > PREDICTION_LOCK_TIME;
  const knockoutLocked = true; // Always lock knockout predictions as requested

  return {
    isLocked,
    lockTime: PREDICTION_LOCK_TIME,
    knockoutLocked,
    knockoutLockTime: KNOCKOUT_PREDICTION_LOCK_TIME,
  };
};
