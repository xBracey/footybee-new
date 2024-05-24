import { useState } from "react";
import { League, User } from "../../../../shared/types/database";
import { useAddLeague } from "../../queries/useAddLeague";
import AddLeagueModal from "../AddLeagueModal";
import { Link } from "@tanstack/react-router";
import Box from "../Box";
import LeaguePreview from "../LeaguePreview";

interface IUserLeagues {
  user: User;
  leagues: League[];
}

const UserLeagues = ({ user, leagues }: IUserLeagues) => {
  const [addLeagueModalOpened, setAddLeagueModalOpened] = useState(false);
  const onAddLeagueSuccess = () => {
    setAddLeagueModalOpened(false);
  };

  const { addLeague, isLoading: isAddingLeague } =
    useAddLeague(onAddLeagueSuccess);

  return (
    <div className="relative my-2 w-full max-w-3xl text-center">
      {leagues.length === 0 && (
        <Box>
          <p className="p-2">You are not a member of any leagues</p>

          <AddLeagueModal
            addLeague={addLeague}
            isLoading={isAddingLeague}
            opened={addLeagueModalOpened}
            setOpened={setAddLeagueModalOpened}
          />
        </Box>
      )}

      <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 md:p-4">
        {leagues.map((league) => (
          <Link to={`/league/${league.id}`} key={league.id}>
            <LeaguePreview league={league} username={user.username} />
          </Link>
        ))}
      </div>

      {leagues.length > 0 && (
        <AddLeagueModal
          addLeague={addLeague}
          isLoading={isAddingLeague}
          opened={addLeagueModalOpened}
          setOpened={setAddLeagueModalOpened}
        />
      )}
    </div>
  );
};

export default UserLeagues;
