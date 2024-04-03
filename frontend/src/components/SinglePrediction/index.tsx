import React from "react";
import { Prediction } from "../../queries/useGetPredictions";
import { Team } from "../../queries/useGetTeams";

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
    <div className="flex items-center justify-center gap-4">
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">{homeTeam.name}</span>
        <div className="flex items-center gap-4">
          <button
            className="rounded bg-gray-200 px-2 py-1 text-gray-800"
            onClick={decrementHomeScore}
          >
            -
          </button>
          <span className="flex w-4 justify-center text-xl font-bold">
            {homeTeamScore}
          </span>
          <button
            className="rounded bg-gray-200 px-2 py-1 text-gray-800"
            onClick={incrementHomeScore}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">{awayTeam.name}</span>
        <div className="flex items-center  gap-4">
          <button
            className="rounded bg-gray-200 px-2 py-1 text-gray-800"
            onClick={decrementAwayScore}
          >
            -
          </button>
          <span className="flex w-4 justify-center text-xl font-bold">
            {awayTeamScore}
          </span>
          <button
            className="rounded bg-gray-200 px-2 py-1 text-gray-800"
            onClick={incrementAwayScore}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePrediction;
