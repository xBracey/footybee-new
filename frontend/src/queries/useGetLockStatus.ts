import { useQuery } from "react-query";
import { apiRequest } from "./utils";

interface LockStatus {
  isLocked: boolean;
  lockTime: number;
  knockoutLocked: boolean;
  knockoutLockTime: number;
}

export const getLockStatus = async (): Promise<LockStatus> => {
  return apiRequest<LockStatus>("/lock", {
    method: "GET",
  });
};

export const useGetLockStatus = () => {
  return useQuery(["lockStatus"], () => getLockStatus(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });
};