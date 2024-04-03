import { LeagueTeam } from "../types/database";
import { RawPairing } from "./calculateTable";

export const reducePairings = (
  pairings: RawPairing[],
  table: LeagueTeam[]
): string[][] => {
  let matches: string[][] = [];
  const indexesCovered: number[] = [];

  for (let i = 0; i < pairings.length; i++) {
    const pairing = pairings[i];

    if (!indexesCovered.includes(i)) {
      matches[i] = [pairing.a, pairing.b];

      for (let j = i + 1; j < pairings.length; j++) {
        const pairing2 = pairings[j];

        if (
          !indexesCovered.includes(j) &&
          (matches[i].includes(pairing2.a) || matches[i].includes(pairing2.b))
        ) {
          indexesCovered.push(j);
          matches[i].push(pairing2.a);
          matches[i].push(pairing2.b);

          j = i;
        }
      }
    }
  }

  matches = matches
    .filter(
      (match) =>
        !!match &&
        match.every(
          (teamName) => !!table.find((team) => team.name === teamName)
        )
    )
    .map((match) => Array.from(new Set(match)));

  return matches;
};
