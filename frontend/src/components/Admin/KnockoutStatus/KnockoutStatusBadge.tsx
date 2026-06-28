interface IKnockoutStatusBadge {
  isComplete: boolean;
  hasPredictions: boolean;
  total: number;
  expected: number;
}

const KnockoutStatusBadge = ({
  isComplete,
  hasPredictions,
  total,
  expected,
}: IKnockoutStatusBadge) => {
  if (isComplete) {
    return (
      <span className="inline-block rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white">
        Complete ({total}/{expected})
      </span>
    );
  }

  if (hasPredictions) {
    return (
      <span className="inline-block rounded bg-amber-500 px-2 py-1 text-xs font-semibold text-white">
        Partial ({total}/{expected})
      </span>
    );
  }

  return (
    <span className="inline-block rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
      None
    </span>
  );
};

export default KnockoutStatusBadge;
