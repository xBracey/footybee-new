import React from "react";
import { Prediction, Team } from "../../../../shared/types/database";

const PredictionButton = ({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) => (
  <button
    className="bg-supernova-400 hover:bg-supernova-500 rounded px-2 py-1 text-gray-800 transition-all disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const TeamPrediction = ({
  teamName,
  score,
  incrementScore,
  decrementScore,
}: {
  teamName: string;
  score: number;
  incrementScore: () => void;
  decrementScore: () => void;
}) => (
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

interface SinglePredictionProps {
  homeTeam: Team;
  awayTeam: Team;
  username: string;
  prediction: Omit<Prediction, "username">;
  onChange: (Prediction: Omit<Prediction, "username">) => void;
}

const SinglePrediction: React.FC<SinglePredictionProps> = ({
  homeTeam,
  awayTeam,
  prediction,
  onChange,
}) => {
  const { homeTeamScore, awayTeamScore } = prediction;

  const incrementHomeScore = () =>
    onChange({
      ...prediction,
      homeTeamScore: homeTeamScore + 1,
    });

  const decrementHomeScore = () =>
    onChange({
      ...prediction,
      homeTeamScore: Math.max(0, homeTeamScore - 1),
    });

  const incrementAwayScore = () =>
    onChange({
      ...prediction,
      awayTeamScore: awayTeamScore + 1,
    });

  const decrementAwayScore = () =>
    onChange({
      ...prediction,
      awayTeamScore: Math.max(0, awayTeamScore - 1),
    });

  return (
    <div className="flex justify-center">
      <div className="bg-shamrock-300 flex items-center justify-center gap-4 rounded-md p-2 px-4">
        <TeamPrediction
          teamName={homeTeam.name}
          score={homeTeamScore}
          incrementScore={incrementHomeScore}
          decrementScore={decrementHomeScore}
        />

        <TeamPrediction
          teamName={awayTeam.name}
          score={awayTeamScore}
          incrementScore={incrementAwayScore}
          decrementScore={decrementAwayScore}
        />
      </div>
    </div>
  );
};

export default SinglePrediction;
