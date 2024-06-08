import { Story } from "@ladle/react";
import UserLeagues from ".";
import { user } from "../../fixtures/user";
import { leagues } from "../../fixtures/leagues";

export const UserLeaguesStory: Story = () => (
  <UserLeagues user={user} leagues={leagues} setLeagueTimestamp={() => {}} />
);

UserLeaguesStory.storyName = "UserLeagues";
