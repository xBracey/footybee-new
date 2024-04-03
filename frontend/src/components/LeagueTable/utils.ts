import { Fixture, Result, Team } from "../../../../shared/types/database";
import {
  calculateTable,
  TablePairings,
} from "../../../../shared/calculateTable/calculateTable";

export const useCalculateTeamStats = (
  fixtures: Fixture[],
  results: Result[],
  teams: Team[]
): TablePairings => {
  const table = calculateTable(fixtures, results, teams);

  return table;
};
