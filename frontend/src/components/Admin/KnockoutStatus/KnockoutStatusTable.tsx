import { useMemo } from "react";
import { UserKnockoutStatus } from "../../../../../shared/types/database";
import KnockoutStatusBadge from "./KnockoutStatusBadge";

interface IKnockoutStatusTable {
  members: UserKnockoutStatus[];
}

const KnockoutStatusTable = ({ members }: IKnockoutStatusTable) => {
  // Sort: no predictions → partial (lowest count first) → complete,
  // then alphabetical within each group.
  const sorted = useMemo(() => {
    return [...members].sort((a, b) => {
      if (a.isComplete !== b.isComplete) {
        return a.isComplete ? 1 : -1;
      }
      if (a.totalPredictions !== b.totalPredictions) {
        return a.totalPredictions - b.totalPredictions;
      }
      return a.username.localeCompare(b.username);
    });
  }, [members]);

  const titleClass =
    "border-b-2 border-gray-200 bg-gray-100 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-600";

  const entityClass = "border-b border-gray-200 bg-white px-3 py-3 text-sm";

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className={titleClass}>Username</th>
          <th className={titleClass}>Status</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((row) => (
          <tr key={row.username}>
            <td className={entityClass}>{row.username}</td>
            <td className={entityClass}>
              <KnockoutStatusBadge
                isComplete={row.isComplete}
                hasPredictions={row.hasPredictions}
                total={row.totalPredictions}
                expected={row.expectedTotal}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default KnockoutStatusTable;
