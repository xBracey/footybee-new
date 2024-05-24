import { useState } from "react";
import { League, User } from "../../../../shared/types/database";
import { useAddLeague } from "../../queries/useAddLeague";
import AddLeagueModal from "../AddLeagueModal";
import { Link } from "@tanstack/react-router";
import Box from "../Box";

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
    <Box className="relative my-4 text-center">
      <h1 className="text-xl">{user.username} Leagues</h1>

      {leagues.length === 0 && (
        <p className="mt-4">You are not a member of any leagues</p>
      )}

      {leagues.map((league) => (
        <Link to={`/league/${league.id}`} key={league.id}>
          <div className="bg-picton-500 hover:bg-picton-600 my-4 flex items-center justify-center rounded-md p-4 text-white transition-all duration-200">
            {league.name}
          </div>
        </Link>
      ))}

      <AddLeagueModal
        addLeague={addLeague}
        isLoading={isAddingLeague}
        opened={addLeagueModalOpened}
        setOpened={setAddLeagueModalOpened}
      />
    </Box>
  );
};

export default UserLeagues;
