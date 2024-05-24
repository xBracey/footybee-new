export interface LeagueTeam {
  id: number;
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
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  groupLetter: string;
  homeGoals: number;
  awayGoals: number;
}

export interface Fixture {
  id: number;
  groupLetter: string;
  homeTeamId: number;
  awayTeamId: number;
  dateTime: number;
}

export interface Prediction {
  username: string;
  fixtureId: number;
  homeTeamScore: number;
  awayTeamScore: number;
}

export interface Result {
  id: number;
  fixtureId: number;
  homeTeamScore: number;
  awayTeamScore: number;
}

export interface Team {
  id: number;
  groupLetter: string;
  name: string;
}

export interface User {
  username: string;
  admin: boolean;
}

export interface UserGroup {
  username: string;
  groupLetter: string;
  switches: number[];
  points: number;
}

export interface UserFixture {
  username: string;
  fixtureId: number;
  points: number;
}

export interface League {
  id: string;
  name: string;
  admin: boolean;
}

export interface LeagueWithPassword {
  id: string;
  name: string;
  password: string;
}
