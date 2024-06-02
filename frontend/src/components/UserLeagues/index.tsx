import { useState } from "react";
import { League, User } from "../../../../shared/types/database";
import { useAddLeague } from "../../queries/useAddLeague";
import AddLeagueModal from "../AddLeagueModal";
import { Link } from "@tanstack/react-router";
import Box from "../Box";
import LeaguePreview from "../LeaguePreview";
import JoinLeagueModal from "../JoinLeagueModal";
import { useJoinLeague } from "../../queries/useJoinLeague";

interface IUserLeagues {
  user: User;
  leagues: League[];
  setLeagueTimestamp: (timestamp: number) => void;
}

const UserLeagues = ({ user, leagues, setLeagueTimestamp }: IUserLeagues) => {
  const [addLeagueModalOpened, setAddLeagueModalOpened] = useState(false);
  const [joinLeagueModalOpened, setJoinLeagueModalOpened] = useState(false);

  const onAddLeagueSuccess = () => {
    setAddLeagueModalOpened(false);
    setLeagueTimestamp(Date.now());
  };

  const { addLeague, isLoading: isAddingLeague } =
    useAddLeague(onAddLeagueSuccess);

  const onJoinLeagueSuccess = () => {
    setJoinLeagueModalOpened(false);
    setLeagueTimestamp(Date.now());
  };

  const { joinLeague, isLoading: isJoiningLeague } =
    useJoinLeague(onJoinLeagueSuccess);

  const addJoinLeague = (
    <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
      <AddLeagueModal
        addLeague={addLeague}
        isLoading={isAddingLeague}
        opened={addLeagueModalOpened}
        setOpened={setAddLeagueModalOpened}
      />
      <JoinLeagueModal
        joinLeague={joinLeague}
        isLoading={isJoiningLeague}
        opened={joinLeagueModalOpened}
        setOpened={setJoinLeagueModalOpened}
      />
    </div>
  );

  return (
    <div className="relative my-2 w-full max-w-3xl text-center">
      {leagues.length === 0 && (
        <Box className="max-w-2xl">
          <p className="p-2 text-lg">You are not a member of any leagues</p>

          {addJoinLeague}
        </Box>
      )}

      <div className="flex flex-wrap justify-center gap-4 p-2 md:flex-row md:p-4">
        {leagues.map((league) => (
          <div className="w-full md:w-[calc(50%-0.5rem)]">
            <Link to={`/league/${league.id}`} key={league.id}>
              <LeaguePreview league={league} username={user.username} />
            </Link>
          </div>
        ))}
      </div>

      {leagues.length > 0 && addJoinLeague}
    </div>
  );
};

export default UserLeagues;
