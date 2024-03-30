import React, { useState, useEffect } from "react";
import { Fixture } from "../../queries/useGetFixtures";
import { Prediction } from "../../queries/useGetPredictions";
import { Team } from "../../queries/useGetTeams";

interface SinglePredictionProps {
  fixture: Fixture;
  existingPrediction?: Prediction;
  homeTeam: Team;
  awayTeam: Team;
  onChange: (prediction: Prediction) => void;
  username: string;
}

const SinglePrediction: React.FC<SinglePredictionProps> = ({
  fixture,
  existingPrediction,
  homeTeam,
  awayTeam,
  onChange,
  username,
}) => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  useEffect(() => {
    if (existingPrediction) {
      setHomeScore(existingPrediction.homeTeamScore);
      setAwayScore(existingPrediction.awayTeamScore);
    }
  }, [existingPrediction]);

  const handleScoreChange = () => {
    const prediction: Prediction = {
      id: existingPrediction ? existingPrediction.id : "",
      fixtureId: fixture.id,
      homeTeamScore: homeScore,
      awayTeamScore: awayScore,
      username,
    };
    onChange(prediction);
  };

  const incrementHomeScore = () => {
    setHomeScore((prevScore) => prevScore + 1);
    handleScoreChange();
  };

  const decrementHomeScore = () => {
    if (homeScore > 0) {
      setHomeScore((prevScore) => prevScore - 1);
      handleScoreChange();
    }
  };

  const incrementAwayScore = () => {
    setAwayScore((prevScore) => prevScore + 1);
    handleScoreChange();
  };

  const decrementAwayScore = () => {
    if (awayScore > 0) {
      setAwayScore((prevScore) => prevScore - 1);
      handleScoreChange();
    }
  };

  return (
    <div className="flex items-center justify-center space-x-8">
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">{homeTeam.name}</span>
        <div className="flex items-center space-x-2">
          <button
            className="rounded bg-gray-200 px-2 py-1 text-gray-800"
            onClick={decrementHomeScore}
          >
            -
          </button>
          <span className="flex w-4 justify-center text-xl font-bold">
            {homeScore}
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
        <div className="flex items-center space-x-2">
          <button
            className="rounded bg-gray-200 px-2 py-1 text-gray-800"
            onClick={decrementAwayScore}
          >
            -
          </button>
          <span className="flex w-4 justify-center text-xl font-bold">
            {awayScore}
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
