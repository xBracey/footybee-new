import { Fixture, Result, Team } from "../../../../shared/types/database";
import { useCalculateTeamStats } from "./utils";

interface LeagueTableProps {
  teams: Team[];
  fixtures: Fixture[];
  results: Omit<Result, "id">[];
}

const LeagueTable: React.FC<LeagueTableProps> = ({
  teams,
  fixtures,
  results,
}) => {
  const teamStats = useCalculateTeamStats(fixtures, results, teams);
  const { table, pairings } = teamStats;

  return (
    <table className="w-full overflow-hidden rounded">
      <thead>
        <tr className="bg-shamrock-400 text-sm uppercase leading-normal text-gray-600">
          <th className="py-3 px-4 text-left">Team</th>
          <th className="py-3 px-4 text-center">
            <span className="hidden sm:inline">Points</span>
            <span className="sm:hidden">Pts</span>
          </th>
          <th className="py-3 px-4 text-center">
            <span className="hidden sm:inline">Wins</span>
            <span className="sm:hidden">W</span>
          </th>
          <th className="py-3 px-4 text-center">
            <span className="hidden sm:inline">Draws</span>
            <span className="sm:hidden">D</span>
          </th>
          <th className="py-3 px-4 text-center">
            <span className="hidden sm:inline">Losses</span>
            <span className="sm:hidden">L</span>
          </th>
          <th className="py-3 px-4 text-center">
            <span className="hidden sm:inline">Goal Difference</span>
            <span className="sm:hidden">GD</span>
          </th>
        </tr>
      </thead>
      <tbody className="text-xs text-gray-600 md:text-sm">
        {table.map((team, index) => (
          <tr
            key={team.id}
            className={index % 2 === 0 ? "bg-shamrock-200" : "bg-shamrock-50"}
          >
            <td className="py-3 px-4">{team.name}</td>
            <td className="py-3 px-4 text-center">{team.points}</td>
            <td className="py-3 px-4 text-center">{team.wins}</td>
            <td className="py-3 px-4 text-center">{team.draws}</td>
            <td className="py-3 px-4 text-center">{team.losses}</td>
            <td className="py-3 px-4 text-center">
              {team.goalsFor - team.goalsAgainst}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeagueTable;
