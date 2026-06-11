import React from "react";

interface IPredictionButton {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const PredictionButton = ({
  onClick,
  children,
  disabled,
}: IPredictionButton) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="bg-picton-400 hover:bg-picton-500 disabled:bg-picton-400 rounded px-2 py-1 text-gray-800 transition-all disabled:cursor-not-allowed disabled:opacity-40"
      type="button"
    >
      {children}
    </button>
  );
};

interface ITeamPrediction {
  teamName: string;
  score: number;
  incrementScore: () => void;
  decrementScore: () => void;
  disabled?: boolean;
}

const TeamPrediction: React.FC<ITeamPrediction> = ({
  teamName,
  score,
  incrementScore,
  decrementScore,
  disabled = false,
}) => {
  return (
    <div className={`text-shamrock-950 flex flex-1 flex-col items-center text-center ${disabled ? "pointer-events-none" : ""}`}>
      <span className="text-lg font-bold">{teamName}</span>
      <div className="flex items-center gap-5">
        <PredictionButton onClick={decrementScore} disabled={disabled || score === 0}>
          -
        </PredictionButton>
        <span className="flex w-4 justify-center text-xl font-bold">{score}</span>
        <PredictionButton onClick={incrementScore} disabled={disabled}>
          +
        </PredictionButton>
      </div>
    </div>
  );
};

export default TeamPrediction;