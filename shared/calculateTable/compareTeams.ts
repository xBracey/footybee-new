import { GroupMatch, LeagueTeam } from "../types/database";
import { TablePairings } from "./calculateTable";
import { getMatches } from "./getMatches";
import { tiebreaker } from "./tiebreaker";

export const compareTeams = (
  allGroupMatches: GroupMatch[],
  teams: LeagueTeam[]
): TablePairings => {
  const names = teams.map((team) => team.name);

  const matches = getMatches(allGroupMatches, names);

  const allTable = tiebreaker(allGroupMatches, teams, names);

  const { table, pairings } = tiebreaker(matches, teams);

  if (pairings.length === 1 && pairings[0].length === teams.length) {
    return allTable;
  }

  const modifiedTable = table.map(
    (team) =>
      allTable.table.find((allTableTeam) => team.name === allTableTeam.name)!
  );

  if (!pairings.length) {
    return {
      table: modifiedTable,
      pairings,
    };
  }

  const newTable: LeagueTeam[] = [];
  const newPairings: string[][] = [];

  for (let i = 0; i < table.length; i++) {
    const team = modifiedTable[i];
    for (let j = 0; j < pairings.length; j++) {
      const pairing = pairings[j];

      if (pairing[0] === team.name) {
        const { table: subTable, pairings: subPairings } = compareTeams(
          allGroupMatches,
          pairing.map(
            (teamName) => teams.find((team) => team.name === teamName)!
          )
        );

        newTable.push(...subTable);
        newPairings.push(...subPairings);
      } else if (pairings.flat(1).find((pairing) => pairing === team.name)) {
        newTable.push(team);
      }
    }
  }

  return {
    table: newTable,
    pairings: newPairings,
  };
};
