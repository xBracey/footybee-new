import { Story } from "@ladle/react";
import Fixture from ".";

export const FixtureStory: Story = () => (
  <div className="bg-shamrock-700">
    <Fixture
      homeTeam="England"
      awayTeam="France"
      homeScore={1}
      awayScore={0}
      dateTime={1718564400000}
    />
  </div>
);

FixtureStory.storyName = "Fixture";
