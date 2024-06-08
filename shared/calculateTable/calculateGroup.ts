import { Fixture, GroupMatch, LeagueTeam, Team } from "../types/database";

const defaultTeam = (team: { id: number; name: string }): LeagueTeam => ({
  id: team.id,
  name: team.name,
  played: 0,
  wins: 0,
  draws: 0,
  losses: 0,
  goalsFor: 0,
  goalsAgainst: 0,
  goalDifference: 0,
  points: 0,
});

export interface ILeagueTeams {
  [name: string]: LeagueTeam;
}

export const calculateMatch = (match: GroupMatch, teams: ILeagueTeams) => {
  const { homeTeam, awayTeam, homeGoals, awayGoals } = match;

  const homeTeamName = homeTeam.name;
  const awayTeamName = awayTeam.name;

  if ((!homeGoals && homeGoals !== 0) || (!awayGoals && awayGoals !== 0)) {
    return;
  }

  if (!teams[homeTeamName]) teams[homeTeamName] = defaultTeam(homeTeam);
  if (!teams[awayTeamName]) teams[awayTeamName] = defaultTeam(awayTeam);

  teams[homeTeamName].played += 1;
  teams[awayTeamName].played += 1;

  teams[homeTeamName].goalsFor += homeGoals;
  teams[awayTeamName].goalsFor += awayGoals;

  teams[homeTeamName].goalsAgainst += awayGoals;
  teams[awayTeamName].goalsAgainst += homeGoals;

  if (homeGoals > awayGoals) {
    teams[homeTeamName].wins += 1;
    teams[awayTeamName].losses += 1;
  } else if (homeGoals < awayGoals) {
    teams[homeTeamName].losses += 1;
    teams[awayTeamName].wins += 1;
  } else {
    teams[homeTeamName].draws += 1;
    teams[awayTeamName].draws += 1;
  }
};

export const getGroupMatches = (
  fixtures: Fixture[],
  teamsArray: Team[]
): GroupMatch[] => {
  return fixtures
    .map((fixture) => {
      return {
        id: fixture.id,
        homeTeam: teamsArray.find((team) => team.id === fixture.homeTeamId)!,
        awayTeam: teamsArray.find((team) => team.id === fixture.awayTeamId)!,
        groupLetter: fixture.groupLetter,
        homeGoals: fixture.homeTeamScore,
        awayGoals: fixture.awayTeamScore,
      };
    })
    .filter((match) => !!match);
};

export const calculateGroup = (
  groupMatches: GroupMatch[],
  teamsArray: { id: number; name: string }[]
): ILeagueTeams => {
  const teams: ILeagueTeams = {};
  const teamNames = teamsArray.map((team) => team.name);

  teamsArray.forEach((team) => {
    teams[team.name] = defaultTeam(team);
  });

  groupMatches.forEach((match) => {
    calculateMatch(match, teams);
  });

  teamNames.forEach((name) => {
    teams[name].points = teams[name].wins * 3 + teams[name].draws;
    teams[name].goalDifference =
      teams[name].goalsFor - teams[name].goalsAgainst;
  });

  return teams;
};
