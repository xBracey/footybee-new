import dayjs from "dayjs";

interface IFixture {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  dateTime: number;
  hasDate?: boolean;
}

const Fixture = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  dateTime,
  hasDate = true,
}: IFixture) => {
  return (
    <div className="flex flex-col items-center justify-between text-sm font-bold text-white">
      <div className="flex items-center gap-1.5">
        <img
          src={`/flags/${homeTeam}.png`}
          alt={homeTeam}
          className="h-7 w-7"
        />
        <p>{homeTeam}</p>
        {homeScore !== undefined && awayScore !== undefined ? (
          <>
            <p>{homeScore}</p>
            <p>-</p>
            <p>{awayScore}</p>
          </>
        ) : (
          <p>vs</p>
        )}
        <p>{awayTeam}</p>
        <img
          src={`/flags/${awayTeam}.png`}
          alt={awayTeam}
          className="h-7 w-7"
        />
      </div>
      {hasDate && (
        <p className="text-xs text-gray-200">
          {dayjs.unix(dateTime).format("Do MMM HH:mm")}
        </p>
      )}
    </div>
  );
};

export default Fixture;
