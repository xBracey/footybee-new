import { Story } from "@ladle/react";
import SinglePrediction from ".";
import { fixtures } from "../../../fixtures/fixtures";
import { teams } from "../../../fixtures/teams";

const fixture = fixtures[0];

const homeTeam = teams.find((team) => team.id === fixture.homeTeamId)!;
const awayTeam = teams.find((team) => team.id === fixture.awayTeamId)!;

export const SinglePredictionStory: Story = () => (
  <SinglePrediction
    homeTeam={homeTeam}
    awayTeam={awayTeam}
    onChange={() => {}}
    username="xBracey"
    prediction={{
      fixtureId: fixture.id,
      homeTeamScore: 0,
      awayTeamScore: 0,
    }}
  />
);

SinglePredictionStory.storyName = "SinglePrediction";
