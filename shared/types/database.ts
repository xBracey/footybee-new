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

export interface Player {
  id: number;
  name: string;
  teamId: number;
}

export interface User {
  username: string;
  admin: boolean;
  bonusPlayerId: number | null;
  bonusTeamId: number | null;
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
  name: string | null;
  admin: boolean;
  user_points: number;
  ranking: {
    username: string | null;
    points: number;
  }[];
  user_position: number;
}

export interface LeagueWithPassword {
  id: string;
  name: string;
  password: string;
}
