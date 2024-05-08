import { Fixture, Prediction, Team } from "../../../../shared/types/database";

interface Predictions {
  fixtures: Fixture[];
  predictions: Prediction[];
  teams: Team[];
}

export const usePredictions = (
  teams: Team[],
  fixtures: Fixture[],
  predictions: Prediction[]
) => {
  const groups = teams.reduce((acc, team) => {
    if (!acc[team.groupLetter]) {
      acc[team.groupLetter] = {
        fixtures: [],
        predictions: [],
        teams: [],
      };
    }

    acc[team.groupLetter].teams = [
      ...(acc[team.groupLetter].teams || []),
      team,
    ];

    return acc;
  }, {} as Record<string, Predictions>);

  const groupFixtures = fixtures.reduce((acc, fixture) => {
    const prediction = predictions.find(
      (prediction) => prediction.fixtureId === fixture.id
    );

    if (!prediction) return acc;

    acc[fixture.groupLetter].fixtures = [
      ...(acc[fixture.groupLetter].fixtures || []),
      fixture,
    ];

    if (prediction) {
      acc[fixture.groupLetter].predictions = [
        ...(acc[fixture.groupLetter].predictions || []),
        prediction,
      ];
    }

    return acc;
  }, groups as Record<string, Predictions>);

  return groupFixtures;
};
