export interface LeagueTeam {
  id: string;
  name: string;
  played: number;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface GroupMatch {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  groupLetter: string;
  homeGoals: number;
  awayGoals: number;
}

export interface Fixture {
  id: string;
  groupLetter: string;
  homeTeamId: string;
  awayTeamId: string;
  dateTime: number;
}

export interface Prediction {
  id: string;
  username: string;
  fixtureId: string;
  homeTeamScore: number;
  awayTeamScore: number;
}

export interface Result {
  id: string;
  fixtureId: string;
  homeTeamScore: number;
  awayTeamScore: number;
}

export interface Team {
  id: string;
  groupLetter: string;
  name: string;
}
