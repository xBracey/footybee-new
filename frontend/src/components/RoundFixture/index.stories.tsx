import { Story } from "@ladle/react";
import RoundFixture from ".";
import { useState } from "react";

export const RoundFixtureStory: Story = () => {
  const [selected, setSelected] = useState<"home" | "away" | undefined>(
    undefined
  );

  const onHomeClick = () => {
    setSelected("home");
  };
  const onAwayClick = () => {
    setSelected("away");
  };

  return (
    <div className="p-4">
      <RoundFixture
        homeTeam="England"
        awayTeam="France"
        onHomeClick={onHomeClick}
        onAwayClick={onAwayClick}
        selected={selected}
      />
    </div>
  );
};

RoundFixtureStory.storyName = "RoundFixture";
