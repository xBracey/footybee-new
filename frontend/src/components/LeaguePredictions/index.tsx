import { Fixture, Prediction, Team } from "../../../../shared/types/database";
import LeagueTable from "../LeagueTable";
import SinglePrediction from "../SinglePrediction";

interface ILeaguePredictions {
  username: string;
  teams: Team[];
  fixtures: Fixture[];
  predictions: Prediction[];
  onPredictionChange: (prediction: Prediction) => void;
}

const LeaguePredictions = ({
  username,
  teams,
  fixtures,
  predictions,
  onPredictionChange,
}: ILeaguePredictions) => {
  const onSinglePredictionChange = (
    newPrediction: Omit<Prediction, "username">
  ) => {
    onPredictionChange({ ...newPrediction, username });
  };

  return (
    <div>
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {fixtures.map((fixture) => (
          <SinglePrediction
            key={fixture.id}
            prediction={predictions.find((p) => p.fixtureId === fixture.id)!}
            onChange={onSinglePredictionChange}
            homeTeam={teams.find((team) => fixture.homeTeamId === team.id)!}
            awayTeam={teams.find((team) => fixture.awayTeamId === team.id)!}
            username={username}
          />
        ))}
      </div>

      <LeagueTable teams={teams} fixtures={fixtures} results={predictions} />
    </div>
  );
};

export default LeaguePredictions;
