import { useMemo } from "react";
import {
  RoundFixture,
  Team,
  UserTeam,
} from "../../../../shared/types/database";
import { calculateRound } from "./calculateRound";

interface TeamsWithPoints {
  team: Team;
  round: string;
  prediction: string;
  points: number;
}

interface IFixturePoints {
  teams: Team[];
  userTeams: UserTeam[];
  roundFixtures: RoundFixture[];
}

const TeamTable = ({ teams }: { teams: TeamsWithPoints[] }) => (
  <div className="mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-md">
    <div className="bg-azure-900 flex px-4 py-2 text-center text-sm">
      <div className="flex-1">
        <p className="text-white">Team</p>
      </div>
      <div className="w-40">
        <p className="text-white">Round</p>
      </div>
      <div className="w-40">
        <p className="text-white">Prediction</p>
      </div>
      <div className="flex w-10 justify-end">
        <p className="text-white">Pts</p>
      </div>
    </div>

    <div className="[&>*:nth-child(odd)]:bg-pine-green-700 [&>*:nth-child(even)]:bg-shamrock-800 flex flex-col">
      {teams.map((team) => (
        <div
          key={team.team.name}
          className={`flex flex-row p-4 ${
            team.prediction === team.round ? "bg-green-700" : ""
          }`}
        >
          <div className="flex flex-1 items-center justify-center gap-2">
            <img
              src={`/flags/${team.team.name}.png`}
              alt={team.team.name}
              className="h-7 w-7"
            />

            <p className="text-white">{team.team.name}</p>
          </div>

          <div className="flex w-40 items-center justify-end text-sm">
            <p className="text-white">{team.round}</p>
          </div>

          <div className="flex w-40 items-center justify-end text-sm">
            <p className="text-white">{team.prediction}</p>
          </div>

          <div className="flex w-10 items-center justify-end text-sm">
            <p className="text-white">{team.points ?? 0}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TeamPoints = ({ teams, userTeams, roundFixtures }: IFixturePoints) => {
  const teamsWithPoints = useMemo(() => {
    return teams.map((team) => {
      const round = calculateRound(team.id, roundFixtures);
      const userTeam = userTeams.find(
        (userTeam) => userTeam.teamId === team.id
      );
      const prediction = userTeam?.roundPredictions ?? "N/A";
      return {
        team: team,
        round: round,
        prediction: prediction,
        points: userTeam?.points ?? 0,
      };
    });
  }, [teams, userTeams, roundFixtures]);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 overflow-hidden rounded-md">
      <TeamTable teams={teamsWithPoints} />
    </div>
  );
};

export default TeamPoints;
