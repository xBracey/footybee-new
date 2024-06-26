interface IRoundFixture {
  homeTeam: string;
  awayTeam: string;
  onHomeClick: () => void;
  onAwayClick: () => void;
  selected?: "home" | "away";
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
        ? "bg-shamrock-600 hover:bg-shamrock-700"
        : hasNotBeenSelected
        ? "hover:bg-azure-800"
        : "bg-red-600 hover:bg-red-700"
    } flex flex-1 items-center gap-1.5 p-4 px-6 duration-500`}
  >
    <img src={`/flags/${team}.png`} alt={team} className="h-7 w-7" />
    <p>{team}</p>
  </button>
);

const RoundFixture = ({
  homeTeam,
  awayTeam,
  onHomeClick,
  onAwayClick,
  selected,
}: IRoundFixture) => {
  return (
    <div className="flex">
      <div className="bg-azure-500 relative flex flex-col items-center justify-between overflow-hidden rounded-lg text-sm font-bold text-white">
        <div className="relative flex items-center">
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
