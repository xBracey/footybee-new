import { GroupMatch } from "../types/database";

export const getMatches = (
  groupMatches: GroupMatch[],
  teams: string[]
): GroupMatch[] => {
  return groupMatches.filter(
    (match) =>
      teams.includes(match.homeTeam.name) && teams.includes(match.awayTeam.name)
  );
};
