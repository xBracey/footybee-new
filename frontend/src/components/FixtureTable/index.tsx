import { Prediction } from "../../../../shared/types/database";
import FixtureComponent from "../Fixture";

/** Row shape consumed by FixtureTable. Each consumer is responsible for
 *  joining fixtures with their user-specific prediction + points. */
export interface FixturesWithPoints {
  fixtureId: number;
  homeTeam?: string;
  awayTeam?: string;
  homeScore: number | null;
  awayScore: number | null;
  dateTime: number;
  points: number;
  hasBeenPlayed: boolean;
  prediction?: Prediction;
}

const getBackgroundColor = (
  i: number,
  points: number,
  hasBeenPlayed: boolean
) => {
  if (!hasBeenPlayed) {
    return i % 2 === 0 ? "bg-shamrock-700" : "bg-pine-green-700";
  }

  switch (points) {
    case 25:
      return "bg-green-700";
    case 0:
      return "bg-red-700";
    default:
      return "bg-yellow-700";
  }
};

interface IFixtureTableProps {
  fixtures: FixturesWithPoints[];
}

const FixtureTable = ({ fixtures }: IFixtureTableProps) => (
  <div className="mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-md">
    <div className="flex bg-azure-900 px-4 py-2 text-center text-sm">
      <div className="flex-1">
        <p className="text-white">Fixture</p>
      </div>
      <div className="w-20">
        <p className="text-white">Prediction</p>
      </div>
      <div className="flex w-10 justify-end">
        <p className="text-white">Pts</p>
      </div>
    </div>

    {fixtures.map((fixture, i) => (
      <div
        key={fixture.fixtureId}
        className={`flex flex-row p-4 ${getBackgroundColor(
          i,
          fixture.points,
          fixture.hasBeenPlayed
        )}`}
      >
        <div className="flex-1">
          <FixtureComponent
            homeTeam={fixture.homeTeam}
            awayTeam={fixture.awayTeam}
            homeScore={fixture.homeScore ?? undefined}
            awayScore={fixture.awayScore ?? undefined}
            dateTime={fixture.dateTime}
            hasDate={false}
            isProfilePage
          />
        </div>
        {fixture.prediction && (
          <div className="flex w-20 items-center justify-center text-sm">
            <p className="text-white">{`${fixture.prediction.homeTeamScore} - ${fixture.prediction.awayTeamScore}`}</p>
          </div>
        )}
        <div className="flex w-10 items-center justify-end text-sm">
          <p className="text-white">{fixture.points ?? 0}</p>
        </div>
      </div>
    ))}
  </div>
);

export default FixtureTable;
