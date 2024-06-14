import { Fixture, Prediction, Team } from "../../../../shared/types/database";
import LeagueTable from "../LeagueTable";
import SinglePrediction from "../Prediction/SinglePrediction";
import PredictionLock from "../PredictionLock";

interface ILeaguePredictions {
  username: string;
  teams: Team[];
  fixtures: Fixture[];
  predictions: Prediction[];
  onPredictionChange: (prediction: Prediction) => void;
  groupSwitches?: number[];
  onEditGroupSwitch: (switches: number[]) => void;
  isPredictionLocked: boolean;
}

const LeaguePredictions = ({
  username,
  teams,
  fixtures,
  predictions,
  onPredictionChange,
  groupSwitches = [],
  onEditGroupSwitch,
  isPredictionLocked,
}: ILeaguePredictions) => {
  const onSinglePredictionChange = (
    newPrediction: Omit<Prediction, "username">
  ) => {
    onPredictionChange({ ...newPrediction, username });
  };

  const fixturesWithPredictions: Fixture[] = fixtures.map((fixture) => {
    const prediction = predictions.find((p) => p.fixtureId === fixture.id);
    return {
      ...fixture,
      homeTeamScore: prediction?.homeTeamScore,
      awayTeamScore: prediction?.awayTeamScore,
    };
  });

  return (
    <div className="relative">
      <div
        className={isPredictionLocked ? "pointer-events-none opacity-70" : ""}
      >
        <div className="my-4 grid grid-cols-1 gap-4 py-2 md:grid-cols-2 lg:grid-cols-3">
          {fixtures.map((fixture) => {
            const prediction = predictions.find(
              (p) => p.fixtureId === fixture.id
            );
            const homeTeam = teams.find(
              (team) => fixture.homeTeamId === team.id
            );
            const awayTeam = teams.find(
              (team) => fixture.awayTeamId === team.id
            );

            if (!prediction || !homeTeam || !awayTeam) return null;

            return (
              <SinglePrediction
                key={fixture.id}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                username={username}
                prediction={prediction}
                onChange={onSinglePredictionChange}
              />
            );
          })}
        </div>

        <LeagueTable
          teams={teams}
          fixtures={fixturesWithPredictions}
          isPrediction
          groupSwitches={groupSwitches}
          setGroupSwitches={onEditGroupSwitch}
        />
      </div>

      <PredictionLock isLocked />
    </div>
  );
};

export default LeaguePredictions;
