import dayjs from "dayjs";
import { isNullOrUndefined } from "../../utils/isNullOrUndefined";

interface IFixture {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  homeTeamExtraTimeScore?: number;
  awayTeamExtraTimeScore?: number;
  homeTeamPenaltiesScore?: number;
  awayTeamPenaltiesScore?: number;
  dateTime: number;
  hasDate?: boolean;
  isProfilePage?: boolean;
}

const Fixture = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  homeTeamExtraTimeScore,
  awayTeamExtraTimeScore,
  homeTeamPenaltiesScore,
  awayTeamPenaltiesScore,
  dateTime,
  hasDate = true,
  isProfilePage,
}: IFixture) => {
  const isExtraTime =
    !isNullOrUndefined(homeTeamExtraTimeScore) &&
    !isNullOrUndefined(awayTeamExtraTimeScore);

  console.log({
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    homeTeamExtraTimeScore,
    awayTeamExtraTimeScore,
    homeTeamPenaltiesScore,
    awayTeamPenaltiesScore,
    dateTime,
  });
  return (
    <div className="flex flex-col items-center justify-between text-sm font-bold text-white">
      <div className="flex items-center gap-1.5">
        <img
          src={`/flags/${homeTeam}.png`}
          alt={homeTeam}
          className="h-7 w-7"
        />
        <p>{isProfilePage ? homeTeam.slice(0, 3).toUpperCase() : homeTeam}</p>
        {homeScore !== undefined && awayScore !== undefined ? (
          <div
            className={`flex flex-col items-center justify-center ${
              isExtraTime ? "pt-4" : ""
            }`}
          >
            <div className="flex items-center justify-center">
              <p>
                {homeScore +
                  (homeTeamExtraTimeScore ?? 0) +
                  (homeTeamPenaltiesScore ?? 0)}
              </p>
              <p>-</p>
              <p>
                {awayScore +
                  (awayTeamExtraTimeScore ?? 0) +
                  (awayTeamPenaltiesScore ?? 0)}
              </p>
            </div>
            {isExtraTime && <p className="text-xs">AET</p>}
          </div>
        ) : (
          <p>vs</p>
        )}
        <p>{isProfilePage ? awayTeam.slice(0, 3).toUpperCase() : awayTeam}</p>
        <img
          src={`/flags/${awayTeam}.png`}
          alt={awayTeam}
          className="h-7 w-7"
        />
      </div>
      {hasDate && (
        <p className="text-sm text-gray-200">
          {dayjs.unix(dateTime / 1000).format("Do MMM HH:mm")}
        </p>
      )}
    </div>
  );
};

export default Fixture;
