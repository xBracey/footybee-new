import { useMemo } from "react";
import { Player, Team, User } from "../../../../shared/types/database";
import { getTeamWins } from "../../../../shared/getTeamWins";

interface IBonusPoints {
  user: User;
  fixtures: {
    homeTeamId: number | null;
    awayTeamId: number | null;
    homeTeamScore: number | null;
    awayTeamScore: number | null;
  }[];
  teams: Team[];
  players: Player[];
}

const BonusPoints = ({ user, fixtures, teams, players }: IBonusPoints) => {
  const team = useMemo(
    () => teams.find((team) => team.id === user.bonusTeamId),
    [user.bonusTeamId, teams]
  );
  const teamWins = useMemo(
    () => getTeamWins(user.bonusTeamId, fixtures),
    [user.bonusTeamId, fixtures]
  );
  const player = useMemo(
    () => players.find((player) => player.id === user.bonusPlayerId),
    [user.bonusPlayerId, players]
  );
  const playerGoals = useMemo(() => player?.goals, [player]);

  if (!team && !player) {
    return null;
  }

  return (
    <div className="mx-auto my-2 mb-6 flex w-full max-w-xl flex-col gap-2 overflow-hidden rounded-md">
      {team && (
        <div className="bg-pine-green-700 flex items-center justify-center gap-2 rounded-md p-4">
          <div className="flex items-center gap-2">
            <img
              src={`/flags/${team?.name}.png`}
              alt={team?.name}
              className="h-7 w-7"
            />
            <p className="text-lg font-bold text-white">{`${team?.name}`}</p>
          </div>
          <p className="text-lg text-white">{`Wins: ${teamWins}`}</p>
          <p className="text-lg text-white">{`Points: ${teamWins * 10}`}</p>
        </div>
      )}

      {player && (
        <div className="bg-pine-green-700 flex items-center justify-center gap-2 rounded-md p-4">
          <p className="text-lg font-bold text-white">{`${player?.name}`}</p>
          <p className="text-lg text-white">{`Goals: ${playerGoals}`}</p>
          <p className="text-lg text-white">{`Points: ${playerGoals * 10}`}</p>
        </div>
      )}
    </div>
  );
};

export default BonusPoints;
