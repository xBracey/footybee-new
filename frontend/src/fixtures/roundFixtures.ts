import { RoundFixture } from "../../../shared/types/database";

// Sample data for the RoundPredictions Ladle story. Includes the full
// 2026 knockout bracket: 16 R32 + 8 R16 + 4 QF + 2 SF + 1 F.
// Team IDs are arbitrary - the Ladle story only uses these for
// display (it looks up names via the `teams` prop, falling back to
// "TBC" for IDs that don't exist in the sample teams data).
export const roundFixtures: RoundFixture[] = [
  // Round of 32
  { id: 1, round: "Round of 32", homeTeamId: 1, awayTeamId: 2, dateTime: 1782669600000, homeTeamScore: 0, awayTeamScore: 0, order: 0 },
  { id: 2, round: "Round of 32", homeTeamId: 3, awayTeamId: 4, dateTime: 1782748800000, homeTeamScore: 0, awayTeamScore: 0, order: 1 },
  { id: 3, round: "Round of 32", homeTeamId: 5, awayTeamId: 6, dateTime: 1782761400000, homeTeamScore: 0, awayTeamScore: 0, order: 2 },
  { id: 4, round: "Round of 32", homeTeamId: 7, awayTeamId: 8, dateTime: 1782777600000, homeTeamScore: 0, awayTeamScore: 0, order: 3 },
  { id: 5, round: "Round of 32", homeTeamId: 9, awayTeamId: 10, dateTime: 1782835200000, homeTeamScore: 0, awayTeamScore: 0, order: 4 },
  { id: 6, round: "Round of 32", homeTeamId: 11, awayTeamId: 12, dateTime: 1782853200000, homeTeamScore: 0, awayTeamScore: 0, order: 5 },
  { id: 7, round: "Round of 32", homeTeamId: 13, awayTeamId: 14, dateTime: 1782914400000, homeTeamScore: 0, awayTeamScore: 0, order: 6 },
  { id: 8, round: "Round of 32", homeTeamId: 15, awayTeamId: 16, dateTime: 1782936000000, homeTeamScore: 0, awayTeamScore: 0, order: 7 },
  { id: 9, round: "Round of 32", homeTeamId: 17, awayTeamId: 18, dateTime: 1783000800000, homeTeamScore: 0, awayTeamScore: 0, order: 8 },
  { id: 10, round: "Round of 32", homeTeamId: 19, awayTeamId: 20, dateTime: 1783018800000, homeTeamScore: 0, awayTeamScore: 0, order: 9 },
  { id: 11, round: "Round of 32", homeTeamId: 21, awayTeamId: 22, dateTime: 1783080000000, homeTeamScore: 0, awayTeamScore: 0, order: 10 },
  { id: 12, round: "Round of 32", homeTeamId: 23, awayTeamId: 24, dateTime: 1783098000000, homeTeamScore: 0, awayTeamScore: 0, order: 11 },
  { id: 13, round: "Round of 32", homeTeamId: 25, awayTeamId: 26, dateTime: 1783166400000, homeTeamScore: 0, awayTeamScore: 0, order: 12 },
  { id: 14, round: "Round of 32", homeTeamId: 27, awayTeamId: 28, dateTime: 1783180800000, homeTeamScore: 0, awayTeamScore: 0, order: 13 },
  { id: 15, round: "Round of 32", homeTeamId: 29, awayTeamId: 30, dateTime: 1783252800000, homeTeamScore: 0, awayTeamScore: 0, order: 14 },
  { id: 16, round: "Round of 32", homeTeamId: 31, awayTeamId: 32, dateTime: 1783267200000, homeTeamScore: 0, awayTeamScore: 0, order: 15 },

  // Round of 16 (placeholders - filled in by live worker as R32 completes)
  { id: 17, round: "Round of 16", homeTeamId: 1, awayTeamId: 3, dateTime: 1783440000000, homeTeamScore: 0, awayTeamScore: 0, order: 0 },
  { id: 18, round: "Round of 16", homeTeamId: 5, awayTeamId: 7, dateTime: 1783454400000, homeTeamScore: 0, awayTeamScore: 0, order: 1 },
  { id: 19, round: "Round of 16", homeTeamId: 9, awayTeamId: 11, dateTime: 1783526400000, homeTeamScore: 0, awayTeamScore: 0, order: 2 },
  { id: 20, round: "Round of 16", homeTeamId: 13, awayTeamId: 15, dateTime: 1783540800000, homeTeamScore: 0, awayTeamScore: 0, order: 3 },
  { id: 21, round: "Round of 16", homeTeamId: 17, awayTeamId: 19, dateTime: 1783612800000, homeTeamScore: 0, awayTeamScore: 0, order: 4 },
  { id: 22, round: "Round of 16", homeTeamId: 21, awayTeamId: 23, dateTime: 1783627200000, homeTeamScore: 0, awayTeamScore: 0, order: 5 },
  { id: 23, round: "Round of 16", homeTeamId: 25, awayTeamId: 27, dateTime: 1783699200000, homeTeamScore: 0, awayTeamScore: 0, order: 6 },
  { id: 24, round: "Round of 16", homeTeamId: 29, awayTeamId: 31, dateTime: 1783713600000, homeTeamScore: 0, awayTeamScore: 0, order: 7 },

  // Quarter-finals
  { id: 25, round: "Quarter-finals", homeTeamId: 1, awayTeamId: 5, dateTime: 1783872000000, homeTeamScore: 0, awayTeamScore: 0, order: 0 },
  { id: 26, round: "Quarter-finals", homeTeamId: 9, awayTeamId: 13, dateTime: 1783886400000, homeTeamScore: 0, awayTeamScore: 0, order: 1 },
  { id: 27, round: "Quarter-finals", homeTeamId: 17, awayTeamId: 21, dateTime: 1783958400000, homeTeamScore: 0, awayTeamScore: 0, order: 2 },
  { id: 28, round: "Quarter-finals", homeTeamId: 25, awayTeamId: 29, dateTime: 1783972800000, homeTeamScore: 0, awayTeamScore: 0, order: 3 },

  // Semi-finals
  { id: 29, round: "Semi-finals", homeTeamId: 1, awayTeamId: 9, dateTime: 1784124000000, homeTeamScore: 0, awayTeamScore: 0, order: 0 },
  { id: 30, round: "Semi-finals", homeTeamId: 17, awayTeamId: 25, dateTime: 1784210400000, homeTeamScore: 0, awayTeamScore: 0, order: 1 },

  // Finals
  { id: 31, round: "Finals", homeTeamId: 1, awayTeamId: 17, dateTime: 1784404800000, homeTeamScore: 0, awayTeamScore: 0, order: 0 },
];
