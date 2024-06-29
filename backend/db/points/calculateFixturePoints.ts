import { InsertFixture, Prediction } from "../schema";

const calculateSingleFixturePoints = (
  prediction: Prediction,
  fixture: InsertFixture
): number => {
  const phs = prediction.homeTeamScore;
  const pas = prediction.awayTeamScore;
  const fhs = fixture.homeTeamScore;
  const fas = fixture.awayTeamScore;

  if (
    phs === null ||
    phs === undefined ||
    pas === null ||
    pas === undefined ||
    fhs === null ||
    fhs === undefined ||
    fas === null ||
    fas === undefined
  ) {
    return 0;
  }

  // Correct result 25 points
  if (phs === fhs && pas === fas) {
    return 25;
  }
  // Correct draw prediction 10 points
  if (phs === pas && fhs === fas) {
    return 10;
  }
  // Correct score margin 15 points
  if (phs - pas === fhs - fas) {
    return 15;
  }
  // Correct winner 5 points
  if ((phs > pas && fhs > fas) || (phs < pas && fhs < fas)) {
    return 5;
  }

  return 0;
};

export const calculateFixturePoints = (
  fixture: InsertFixture,
  userPredictions: Prediction[]
) => {
  const fixturePoints = userPredictions.map((prediction) => ({
    username: prediction.username,
    points: calculateSingleFixturePoints(prediction, fixture),
    fixtureId: prediction.fixtureId,
  }));

  return fixturePoints;
};
