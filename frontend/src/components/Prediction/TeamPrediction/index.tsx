interface IPredictionButton {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const PredictionButton = ({
  onClick,
  children,
  disabled,
}: IPredictionButton) => (
  <button
    className="bg-supernova-400 hover:bg-supernova-500 rounded px-2 py-1 text-gray-800 transition-all disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

interface ITeamPrediction {
  teamName: string;
  score: number;
  incrementScore: () => void;
  decrementScore: () => void;
}

const TeamPrediction = ({
  teamName,
  score,
  incrementScore,
  decrementScore,
}: ITeamPrediction) => (
  <div className="flex flex-col items-center">
    <span className="text-lg font-bold">{teamName}</span>
    <div className="flex items-center gap-5">
      <PredictionButton onClick={decrementScore} disabled={score === 0}>
        -
      </PredictionButton>
      <span className="flex w-4 justify-center text-xl font-bold">{score}</span>
      <PredictionButton onClick={incrementScore}>+</PredictionButton>
    </div>
  </div>
);

export default TeamPrediction;
