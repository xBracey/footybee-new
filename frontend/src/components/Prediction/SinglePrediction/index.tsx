import React from "react";
import { Prediction, Team } from "../../../../../shared/types/database";
import TeamPrediction from "../TeamPrediction";

interface SinglePredictionProps {
  homeTeam: Team;
  awayTeam: Team;
  username: string;
  prediction: Omit<Prediction, "username">;
  onChange: (Prediction: Omit<Prediction, "username">) => void;
  disabled?: boolean;
}

const SinglePrediction: React.FC<SinglePredictionProps> = ({
  homeTeam,
  awayTeam,
  prediction,
  onChange,
  disabled = false,
}) => {
  const { homeTeamScore, awayTeamScore } = prediction;

  const handleChange = React.useCallback(
    (newScores: { homeTeamScore?: number; awayTeamScore?: number }) => {
      if (disabled) return;
      onChange({
        ...prediction,
        ...newScores,
      });
    },
    [disabled, onChange, prediction]
  );

  const incrementHomeScore = () => handleChange({ homeTeamScore: homeTeamScore + 1 });
  const decrementHomeScore = () => handleChange({ homeTeamScore: Math.max(0, homeTeamScore - 1) });
  const incrementAwayScore = () => handleChange({ awayTeamScore: awayTeamScore + 1 });
  const decrementAwayScore = () => handleChange({ awayTeamScore: Math.max(0, awayTeamScore - 1) });

  return (
    <div className={`flex w-full justify-center md:w-auto ${disabled ? "pointer-events-none" : ""}`}>
      <div className="bg-shamrock-400 flex w-full items-center justify-around gap-4 rounded-md p-2 px-4">
        <TeamPrediction
          teamName={homeTeam.name}
          score={homeTeamScore}
          incrementScore={incrementHomeScore}
          decrementScore={decrementHomeScore}
          disabled={disabled}
        />

        <TeamPrediction
          teamName={awayTeam.name}
          score={awayTeamScore}
          incrementScore={incrementAwayScore}
          decrementScore={decrementAwayScore}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default SinglePrediction;