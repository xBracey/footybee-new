import { Link } from "@tanstack/react-router";

interface ILeagueRankings {
  users: {
    username: string;
    points: number;
    position: number;
  }[];
  currentUsername?: string;
}

const LeagueRankings = ({ users, currentUsername }: ILeagueRankings) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-md text-center text-sm">
      <div className="bg-shamrock-400 flex flex-1 py-3 px-4 font-bold uppercase leading-normal">
        <h3 className="w-16 md:w-20">
          <span className="hidden sm:inline">Position</span>
          <span className="sm:hidden">Pos</span>
        </h3>
        <h3 className="flex-1">Name</h3>
        <h3 className="w-16 md:w-20">
          <span className="hidden sm:inline">Points</span>
          <span className="sm:hidden">Pts</span>
        </h3>
      </div>
      {users.map((user, index) => (
        <Link to={`/profile/${user.username}`}>
          <div
            key={user.username}
            className={`${
              currentUsername === user.username
                ? "bg-picton-500"
                : index % 2 === 0
                ? "bg-shamrock-200"
                : "bg-shamrock-50"
            }  flex flex-1 py-3 px-4 ${
              currentUsername === user.username ? "text-white" : "text-gray-600"
            } `}
          >
            <p className="w-16 md:w-20">{user.position}</p>
            <p className="flex-1">{user.username}</p>
            <p className="w-16 md:w-20">{user.points}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LeagueRankings;
