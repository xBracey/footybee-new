import { GroupMatch, LeagueTeam, Team } from "../types/database";
import { calculateGroup } from "./calculateGroup";
import { RawPairing, TablePairings } from "./calculateTable";
import { reducePairings } from "./reducePairings";

export const tiebreaker = (
  groupMatches: GroupMatch[],
  teamsArray: { id: number; name: string }[],
  includedTeams?: string[]
): TablePairings => {
  const pairings: RawPairing[] = [];
  const teams = calculateGroup(groupMatches, teamsArray);

  const table: LeagueTeam[] = Object.values(teams).sort((a, b) => {
    if (a.points !== b.points) {
      return a.points < b.points ? 1 : -1;
    }

    if (a.goalDifference !== b.goalDifference) {
      return a.goalDifference < b.goalDifference ? 1 : -1;
    }

    if (a.goalsFor !== b.goalsFor) {
      return a.goalsFor < b.goalsFor ? 1 : -1;
    }

    pairings.push({ a: a.name, b: b.name });
    return a.id - b.id;
  });

  if (includedTeams) {
    const newTable = table.filter((team) => includedTeams.includes(team.name));

    return {
      table: newTable,
      pairings: reducePairings(pairings, newTable),
    };
  }

  return {
    table,
    pairings: reducePairings(pairings, table),
  };
};
