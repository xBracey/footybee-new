import { Team } from "../../../../shared/types/database";

interface IFlag {
  team: Team | string;
  height?: number;
  className?: string;
}

export const Flag = ({ team, height = 28, className }: IFlag) => {
  const teamName =
    team == null
      ? ""
      : typeof team === "string"
      ? team
      : team.name;

  return (
    <div
      className={`${className} min-h-7 min-w-7 flex items-center justify-center overflow-hidden rounded-full border border-white`}
    >
      <img
        src={`/flags/${teamName.toLowerCase().split(" ").join("_")}.png`}
        alt={teamName}
        className={"max-w-screen-md"}
        style={{ height }}
      />
    </div>
  );
};
