import dayjs from "dayjs";
import { isNullOrUndefined } from "../../utils/isNullOrUndefined";
import { Flag } from "../Flag";

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

  return (
    <div className="flex h-full flex-col items-center justify-between text-sm font-bold text-white">
      <div className="flex h-12 w-full items-center gap-1.5 text-center text-xs">
        <div className="flex flex-1 items-center gap-1.5 text-center">
          <Flag team={homeTeam} className="h-7 w-7" />
          <p className="flex-1">
            {isProfilePage ? homeTeam.slice(0, 3).toUpperCase() : homeTeam}
          </p>
        </div>
        <div className="w-6">
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
        </div>
        <div className="flex flex-1 items-center gap-1.5 text-center">
          <p className="flex-1">
            {isProfilePage ? awayTeam.slice(0, 3).toUpperCase() : awayTeam}
          </p>
          <Flag team={awayTeam} className="h-7 w-7" />
        </div>
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
