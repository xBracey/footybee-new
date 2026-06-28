import { Navigate } from "@tanstack/react-router";
import { useGetMe } from "../../../queries/useGetMe";
import { useGetKnockoutStatus } from "../../../queries/useGetKnockoutStatus";
import { Button } from "../../Button";
import Loading from "../../Loading";
import KnockoutStatusTable from "./KnockoutStatusTable";

const KnockoutStatusPage = () => {
  const { data: user, isLoading: userLoading } = useGetMe();
  const { data, isLoading, isFetching, refetch } = useGetKnockoutStatus();

  if (userLoading || isLoading) {
    return <Loading />;
  }

  if (!user?.admin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-2xl font-bold text-white">
            Knockout Predictions
          </h1>
          <Button buttonType="secondary" onClick={() => refetch()}>
            {isFetching ? "Refreshing…" : "Refresh"}
          </Button>
        </div>

        {data.length === 0 && (
          <div className="w-full rounded-lg bg-white p-6 text-center text-gray-700 shadow-2xl">
            No leagues found.
          </div>
        )}

        {data.map((league) => (
          <div
            key={league.id}
            className="w-full rounded-lg bg-white p-3 shadow-2xl"
          >
            <h2 className="p-1 pb-3 text-lg font-semibold text-gray-700">
              {league.name}
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({league.members.length}{" "}
                {league.members.length === 1 ? "member" : "members"})
              </span>
            </h2>
            <KnockoutStatusTable members={league.members} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnockoutStatusPage;
