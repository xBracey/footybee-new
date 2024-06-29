import { Lock } from "../Icons/Icons";

interface IPredictionLock {
  isLocked: boolean;
}

const PredictionLock = ({ isLocked }: IPredictionLock) => {
  if (!isLocked) return null;

  return (
    <div className="absolute left-1/2 top-1/2 z-[1000] flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-4 rounded-md bg-white px-4 py-2">
      <p className="whitespace-pre text-xl font-bold">Predictions are locked</p>
      <Lock className="inline h-6 w-6" />
    </div>
  );
};

export default PredictionLock;
