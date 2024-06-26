export interface IRoundPrediction {
  round: "Round of 16" | "Quarter-finals" | "Semi-finals" | "Finals";
  order: number;
  homeTeamId?: number;
  awayTeamId?: number;
  winner?: "home" | "away";
}
