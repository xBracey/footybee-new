interface IRoundFixture {
  homeTeam: string;
  awayTeam: string;
  onHomeClick: () => void;
  onAwayClick: () => void;
  selected?: "home" | "away";
  disabled?: boolean;
}

const RoundFixtureTeam = ({
  team,
  onClick,
  selected,
  hasNotBeenSelected,
}: {
  team: string;
  onClick: () => void;
  selected: boolean;
  hasNotBeenSelected: boolean;
}) => (
  <button
    onClick={onClick}
    className={`${
      selected
        ? "bg-shamrock-700 hover:bg-shamrock-800"
        : hasNotBeenSelected
        ? "hover:bg-azure-800"
        : "bg-red-700 hover:bg-red-800"
    } flex flex-1 items-center justify-center gap-1.5 p-4 px-6 duration-500`}
  >
    {team === "TBC" ? (
      <div className="h-7 w-7 rounded-full bg-gray-300" />
    ) : (
      <img src={`/flags/${team}.png`} alt={team} className="h-7 w-7" />
    )}
    <p>{team}</p>
  </button>
);

const RoundFixture = ({
  homeTeam,
  awayTeam,
  onHomeClick,
  onAwayClick,
  selected,
  disabled,
}: IRoundFixture) => {
  return (
    <div
      className={`flex ${
        disabled ? "pointer-events-none opacity-50" : ""
      } w-full`}
    >
      <div className="bg-azure-600 relative flex w-full flex-col items-center justify-between overflow-hidden rounded-lg text-sm font-bold text-white">
        <div className="relative flex w-full items-center">
          <RoundFixtureTeam
            team={homeTeam}
            onClick={onHomeClick}
            selected={selected === "home"}
            hasNotBeenSelected={selected === undefined}
          />

          <RoundFixtureTeam
            team={awayTeam}
            onClick={onAwayClick}
            selected={selected === "away"}
            hasNotBeenSelected={selected === undefined}
          />
        </div>

        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          vs
        </p>
      </div>
    </div>
  );
};

export default RoundFixture;
