import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Fixture, LeagueTeam, Team } from "../../../../shared/types/database";
import { Switch } from "../Icons/Icons";
import LeagueTableModal from "../LeagueTableModal";
import { useCalculateTeamStats } from "./utils";

const switchTableRows = (table: LeagueTeam[], pairingClick: number) => {
  const newTable = [...table];

  const team = newTable[pairingClick];
  const teamAbove = newTable[pairingClick - 1];

  // Should never happen
  if (!teamAbove) return;

  newTable[pairingClick] = teamAbove;
  newTable[pairingClick - 1] = team;

  return newTable;
};

interface LeagueTableProps {
  teams: Team[];
  fixtures: Fixture[];
  isPrediction?: boolean;
  groupSwitches?: number[];
  setGroupSwitches?: Dispatch<SetStateAction<number[]>>;
}

const LeagueTable: React.FC<LeagueTableProps> = ({
  teams,
  fixtures,
  isPrediction = false,
  groupSwitches = [],
  setGroupSwitches,
}) => {
  const teamStats = useCalculateTeamStats(fixtures, teams);
  const { table, pairings } = teamStats;

  const pairingIndexList = useMemo(() => {
    if (pairings.length === 0) return [];

    const newPairingIndexList: number[] = [];

    pairings.forEach((pairing) => {
      const pairingSorted = [...pairing].sort((a, b) => {
        const teamAIdx = table.findIndex((team) => team.name === a);
        const teamBIdx = table.findIndex((team) => team.name === b);

        return teamAIdx - teamBIdx;
      });

      for (let i = 1; i < pairingSorted.length; i++) {
        const belowTeam = pairingSorted[i];

        newPairingIndexList.push(
          table.findIndex((team) => team.name === belowTeam)
        );
      }
    });

    return newPairingIndexList;
  }, [pairings, table]);

  const tableWithGroupSwitches = useMemo(() => {
    if (groupSwitches.length === 0) return table;

    let newTable = [...table];

    groupSwitches.forEach((pairingClick) => {
      newTable = switchTableRows(newTable, pairingClick);
    });

    return newTable;
  }, [pairingIndexList, groupSwitches, table]);

  if (teams.map((team) => team.name).includes("Spain")) {
    console.log({ tableWithGroupSwitches, table });
  }

  const onPairingClick = (pairingListIdx: number) => {
    if (!setGroupSwitches) return;

    setGroupSwitches([...groupSwitches, pairingListIdx]);
  };

  return (
    <div className="relative">
      {isPrediction && (
        <div className="absolute -right-2 -top-2 z-50">
          <LeagueTableModal />
        </div>
      )}
      <table className="relative w-full overflow-hidden rounded">
        <thead>
          <tr className="bg-shamrock-400 text-sm uppercase leading-normal text-gray-600">
            <th className="py-3 px-4 text-left">Team</th>

            <th className="py-3 px-4 text-center">
              <span className="hidden sm:inline">Wins</span>
              <span className="sm:hidden">W</span>
            </th>
            <th className="py-3 px-4 text-center">
              <span className="hidden sm:inline">Draws</span>
              <span className="sm:hidden">D</span>
            </th>
            <th className="py-3 px-4 text-center">
              <span className="hidden sm:inline">Losses</span>
              <span className="sm:hidden">L</span>
            </th>
            <th className="py-3 px-4 text-center">
              <span className="hidden sm:inline">Goal Difference</span>
              <span className="sm:hidden">GD</span>
            </th>
            <th className="py-3 px-4 text-center">
              <span className="hidden sm:inline">Points</span>
              <span className="sm:hidden">Pts</span>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-600 md:text-sm">
          {tableWithGroupSwitches.map((team, index) => (
            <tr
              key={team.id}
              className={`${
                index % 2 === 0 ? "bg-shamrock-200" : "bg-shamrock-50"
              } relative`}
            >
              <td className="py-3 px-4">{team.name}</td>
              <td className="py-3 px-4 text-center">{team.wins}</td>
              <td className="py-3 px-4 text-center">{team.draws}</td>
              <td className="py-3 px-4 text-center">{team.losses}</td>
              <td className="py-3 px-4 text-center">
                {team.goalsFor - team.goalsAgainst}
              </td>
              <td className="py-3 px-4 text-center">{team.points}</td>
              {isPrediction && pairingIndexList.includes(index) && (
                <button
                  className="bot-0 absolute right-1 -translate-y-1/2 md:right-5"
                  onClick={() => onPairingClick(index)}
                >
                  <Switch className="h-5 w-5 rotate-180" />
                </button>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueTable;
