import { Story } from "@ladle/react";
import LeagueRankings from ".";

export const LeagueRankingsStory: Story = () => (
  <LeagueRankings users={[]} currentUsername="test" />
);

LeagueRankingsStory.storyName = "LeagueRankings";
