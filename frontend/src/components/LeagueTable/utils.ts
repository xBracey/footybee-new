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

  return table;
};
