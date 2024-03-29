import { Fixture } from "../../queries/useGetFixtures";
import { Result } from "../../queries/useGetResults";

interface LeagueTeam {
  id: string;
  name: string;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}

export const useCalculateTeamStats = (
  teams: { id: string; name: string }[],
  fixtures: Fixture[],
  results: Result[]
): LeagueTeam[] => {
  const teamMap: Record<string, LeagueTeam> = {};

  teams.forEach((team) => {
    teamMap[team.id] = {
      id: team.id,
      name: team.name,
      points: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    };
  });

  fixtures.forEach((fixture) => {
    const { homeTeamId, awayTeamId } = fixture;
    const result = results.find((r) => r.fixtureId === fixture.id);

    if (result) {
      const { homeTeamScore, awayTeamScore } = result;

      if (homeTeamScore > awayTeamScore) {
        teamMap[homeTeamId].points += 3;
        teamMap[homeTeamId].wins += 1;
        teamMap[awayTeamId].losses += 1;
      } else if (homeTeamScore < awayTeamScore) {
        teamMap[awayTeamId].points += 3;
        teamMap[awayTeamId].wins += 1;
        teamMap[homeTeamId].losses += 1;
      } else {
        teamMap[homeTeamId].points += 1;
        teamMap[homeTeamId].draws += 1;
        teamMap[awayTeamId].points += 1;
        teamMap[awayTeamId].draws += 1;
      }

      teamMap[homeTeamId].goalsFor += homeTeamScore;
      teamMap[homeTeamId].goalsAgainst += awayTeamScore;
      teamMap[awayTeamId].goalsFor += awayTeamScore;
      teamMap[awayTeamId].goalsAgainst += homeTeamScore;
    }
  });

  const teamStats = Object.values(teamMap);

  teamStats.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    }

    const directMatchesPoints = compareDirectMatches(a, b, fixtures, results);
    if (directMatchesPoints !== 0) {
      return directMatchesPoints;
    }

    const goalDifference =
      b.goalsFor - b.goalsAgainst - (a.goalsFor - a.goalsAgainst);
    if (goalDifference !== 0) {
      return goalDifference;
    }

    return b.goalsFor - a.goalsFor;
  });

  return teamStats;
};

const compareDirectMatches = (
  teamA: LeagueTeam,
  teamB: LeagueTeam,
  fixtures: Fixture[],
  results: Result[]
): number => {
  const directFixtures = fixtures.filter(
    (fixture) =>
      (fixture.homeTeamId === teamA.id && fixture.awayTeamId === teamB.id) ||
      (fixture.homeTeamId === teamB.id && fixture.awayTeamId === teamA.id)
  );

  let pointsA = 0;
  let pointsB = 0;
  let goalsForA = 0;
  let goalsForB = 0;

  directFixtures.forEach((fixture) => {
    const result = results.find((r) => r.fixtureId === fixture.id);
    if (result) {
      const { homeTeamScore, awayTeamScore } = result;
      if (fixture.homeTeamId === teamA.id) {
        if (homeTeamScore > awayTeamScore) {
          pointsA += 3;
        } else if (homeTeamScore === awayTeamScore) {
          pointsA += 1;
          pointsB += 1;
        } else {
          pointsB += 3;
        }
        goalsForA += homeTeamScore;
        goalsForB += awayTeamScore;
      } else {
        if (awayTeamScore > homeTeamScore) {
          pointsB += 3;
        } else if (awayTeamScore === homeTeamScore) {
          pointsA += 1;
          pointsB += 1;
        } else {
          pointsA += 3;
        }
        goalsForB += awayTeamScore;
        goalsForA += homeTeamScore;
      }
    }
  });

  if (pointsA !== pointsB) {
    return pointsB - pointsA;
  }

  const goalDifference = goalsForB - goalsForA;
  if (goalDifference !== 0) {
    return goalDifference;
  }

  return goalsForB - goalsForA;
};
