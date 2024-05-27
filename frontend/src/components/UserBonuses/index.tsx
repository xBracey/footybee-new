import { Select } from "@mantine/core";
import { Player, Team } from "../../../../shared/types/database";
import { usePredictionStore } from "../../zustand/predictions";

interface IUserBonuses {
  onEditBonusPlayer: (playerId: number) => void;
  onEditBonusTeam: (teamId: number) => void;
  players: Player[];
  teams: Team[];
}

const UserBonuses = ({
  onEditBonusPlayer,
  onEditBonusTeam,
  players,
  teams,
}: IUserBonuses) => {
  const { state } = usePredictionStore();

  return (
    <div className="flex flex-col gap-4 py-6 text-white">
      <h2 className="text-center text-2xl font-bold">Bonus Predictions</h2>
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
        <Select
          label="Bonus Team (10 points per win)"
          placeholder="Select bonus team"
          data={teams.map((team) => ({
            value: team.id.toString(),
            label: team.name,
          }))}
          searchable
          value={state.bonuses.teamId ? state.bonuses.teamId.toString() : ""}
          onChange={(value) => onEditBonusTeam(parseInt(value, 10))}
        />

        <Select
          label="Bonus Player (10 points per goal)"
          placeholder="Select bonus player"
          data={players.map((player) => ({
            value: player.id.toString(),
            label: player.name,
          }))}
          searchable
          value={
            state.bonuses.playerId ? state.bonuses.playerId.toString() : ""
          }
          onChange={(value) => onEditBonusPlayer(parseInt(value, 10))}
        />
      </div>
    </div>
  );
};

export default UserBonuses;
