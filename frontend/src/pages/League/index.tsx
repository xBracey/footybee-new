import { User, League } from "../../../../shared/types/database";
import Banner from "../../components/Banner";
import LeagueRankings from "../../components/LeagueRankings";

interface ProfilePageProps {
  user?: User;
  league: League;
}

export const LeaguePage = ({ user, league }: ProfilePageProps) => {
  return (
    <div className="w-full">
      <Banner>
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white">{`${league.name}`}</h2>
        </div>
      </Banner>

      <div className="mx-auto my-4 w-full max-w-2xl">
        <LeagueRankings
          users={league.ranking.map((ranking, i) => ({
            ...ranking,
            position: i + 1,
          }))}
          currentUsername={user?.username}
        />
      </div>
    </div>
  );
};
