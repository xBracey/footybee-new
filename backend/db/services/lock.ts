import { PREDICTION_LOCK_TIME } from "../../../shared/config";

interface LockStatusResponse {
  isLocked: boolean;
  lockTime: number;
}

export const getLockStatus = (): LockStatusResponse => {
  // const isLocked =
  //   PREDICTION_LOCK_TIME > 0 && Date.now() > PREDICTION_LOCK_TIME;
  const isLocked = false;

  return {
    isLocked,
    lockTime: PREDICTION_LOCK_TIME,
  };
};
