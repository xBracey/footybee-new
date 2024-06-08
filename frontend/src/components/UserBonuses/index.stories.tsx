import { Story } from "@ladle/react";
import UserBonuses from ".";

export const UserBonusesStory: Story = () => (
  <UserBonuses
    isPredictionLocked={false}
    onEditBonusPlayer={() => {}}
    onEditBonusTeam={() => {}}
    players={[]}
    teams={[]}
  />
);

UserBonusesStory.storyName = "UserBonuses";
