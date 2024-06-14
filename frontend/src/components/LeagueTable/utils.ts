import { Fixture, Team } from "../../../../shared/types/database";
import {
  calculateTable,
  TablePairings,
} from "../../../../shared/calculateTable/calculateTable";

export const useCalculateTeamStats = (
  fixtures: Fixture[],
  teams: Team[]
): TablePairings => {
  const table = calculateTable(fixtures, teams);

  const uniqueTable = table.table.filter(
    (team, index) => table.table.map((t) => t.name).indexOf(team.name) === index
  );

  return { table: [...uniqueTable], pairings: [...table.pairings] };
};
